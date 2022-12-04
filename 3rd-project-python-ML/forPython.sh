source ./home/ubuntu/tecky_project3/python-app.py
python3 yolov5/detect.py --source uploads/$fileName --weights 'yolov5/text_detection/feature_extraction2/weights/best.pt' --save-crop
