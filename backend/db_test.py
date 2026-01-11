import pymysql
import os
import shutil
import traceback
from fastapi import FastAPI, UploadFile, File, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from ultralytics import YOLO
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount the assets directory to serve images
# Path relative to backend/db_test.py -> ../frontend/KitHub/assets/stockImages
app.mount("/images", StaticFiles(directory="../frontend/KitHub/assets/stockImages"), name="images")

# Load YOLO model once
model = YOLO("model2.pt")


# Stock Update
class StockUpdate(BaseModel):
    sku: str
    delta: int  # +1 or -1
@app.post("/items/update-stock")
def update_stock(payload: StockUpdate):
    conn = pymysql.connect(
        host="127.0.0.1",
        port=3306,
        user="root",
        password="Andaman#1",
        database="kithub"
    )

    try:
        with conn.cursor() as cursor:
            # Update stock safely
            cursor.execute(
                """
                UPDATE items
                SET stock = GREATEST(stock + %s, 0)
                WHERE sku = %s
                """,
                (payload.delta, payload.sku)
            )

        conn.commit()
        return {"success": True}

    except Exception as e:
        conn.rollback()
        return {"success": False, "error": str(e)}

    finally:
        conn.close()

@app.get("/items/")
def get_items():
    # Connect to MySQL
    conn = pymysql.connect(
        host="127.0.0.1",
        port=3306, 
        user="root",
        password="Andaman#1",
        database="kithub"
    )
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM items")
    rows = cursor.fetchall()
    conn.close()
    return {"items": rows}
 # http://127.0.0.1:8000/items/
 # uvicorn db_test:app --reload

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    temp_file_path = f"temp_{file.filename}"

    # Save uploaded file
    with open(temp_file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        print("Run YOLO classification...")
        results = model.predict(temp_file_path)

        probs = results[0].probs

        # Top-5 (YOLO returns all 5)
        top5_idx = probs.top5          # list[int]
        top5_conf = probs.top5conf.tolist()  # list[float]

        # Use only the top 3
        class_names = model.names

        top3 = []
        for i in range(3):
            top3.append({
                "label": class_names[top5_idx[i]],
                "confidence": round(float(top5_conf[i]), 3)
            })

        return {"top3": top3}

    except Exception as e:
        return {"error": str(e)}
    finally:
        os.remove(temp_file_path)
# @app.post("/predict")
# async def predict(file: UploadFile = File(...)):
#     try:
#         # Save uploaded file
#         temp_path = f"temp_{file.filename}"
#         with open(temp_path, "wb") as buffer:
#             shutil.copyfileobj(file.file, buffer)

#         print("Predicting:", temp_path)

#         # Run YOLO
#         results = model.predict(temp_path)

#         # Remove temp image
#         os.remove(temp_path)

#         # Extract predictions safely
#         item_ids = []
#         for r in results:
#             if r.boxes is None:
#                 continue
#             if r.boxes.cls is not None:
#                 item_ids.extend(r.boxes.cls.tolist())

#         print("Prediction result:", item_ids)

#         return {"item_ids": item_ids}

#     except Exception as e:
#         print("🔥 ERROR inside /predict")
#         print(traceback.format_exc())     # <- this prints real error in terminal
#         return {"error": str(e)}