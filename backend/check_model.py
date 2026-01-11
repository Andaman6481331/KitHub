# test_yolo_local.py
from ultralytics import YOLO

MODEL_PATH = "model.pt"
TEST_IMAGE_PATH = "test2.jpg"

model = YOLO(MODEL_PATH)
results = model.predict(TEST_IMAGE_PATH)

for i, r in enumerate(results):
    print(f"Result {i+1}:")
    
    if r.boxes is not None and len(r.boxes) > 0:
        print("Class IDs:", r.boxes.cls.tolist())
        print("Confidences:", r.boxes.conf.tolist())
        print("Bounding boxes:", r.boxes.xyxy.tolist())
    else:
        print("No objects detected.")

    # Save annotated image
    annotated_path = f"annotated_{i+1}.jpg"
    r.plot(save=annotated_path)
    print(f"Annotated image saved to {annotated_path}")
