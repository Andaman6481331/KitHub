import pymysql
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Hello World"}

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