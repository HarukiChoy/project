from sanic import Sanic
from sanic.response import json
import tensorflow as tf
import numpy as np
import os
from PIL import Image
import pytesseract

app = Sanic("Python-Hosted-Model")

cnn = tf.keras.models.load_model('recognition.h5')
class_names = ['#', '$', '&', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '@', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

import subprocess

@app.post('/upload_paper')
async def callYOLO(request):
    try:
        fileName = request.json['filePath'].split('/')[-1]
        print('filePath: ', request.json['filePath'])
        print('fileName: ', fileName)
        #os.system(f"python3 yolov5/detect.py --source uploads/{fileName} --weights 'yolov5/text_detection/feature_extraction2/weights/best.pt' --save-crop")
        

        subprocess.call(
            f"cd yolov5 && python3 detect.py --source '../uploads/{fileName}' --weights 'text_detection/feature_extraction2/weights/best.pt' --save-crop",  shell=True
        )
        
        return json({"result" : True})
    except Exception as ex:
        print(ex)
        return json({"result" : False})

@app.post("/predict_paper")
async def callModel(request):
    result_arr = []
    yolo_result_folder = os.listdir('./yolov5/runs/detect/')
    yolo_result_folder = sorted(yolo_result_folder)
    print(yolo_result_folder)

    images_path = './yolov5/runs/detect/' + yolo_result_folder[-1] + '/crops/Text/'
    print(images_path)
    try:
        images = os.listdir(images_path)
        for image in images:
            path = images_path + image
            img_data = tf.keras.utils.load_img(
                path,
                color_mode='grayscale',
                target_size=(28, 28),
                interpolation='nearest',
                keep_aspect_ratio=True
                )

            array = tf.keras.preprocessing.image.img_to_array(img_data)
            array = np.array([array])

            predictions = cnn.predict(array)
            prediction = predictions.argmax()
            print('This is the index of prediction:', prediction)
            print('The correct answer is:', class_names[prediction])
            result_arr.append(class_names[prediction])
            print(result_arr)
        return json({"result": ''.join(result_arr)})
    except Exception as ex:
        print(ex)
        return json({'error': 'Conversion error. This file type is not yet supported.'})

# @app.post('/predict_word')
# def callModelOnly(request):
#     filePath = request.json['filePath']
#     print(request.json)

#     img_data = tf.keras.utils.load_img(
#             filePath,
#             color_mode = 'grayscale',
#             target_size = (28, 28),
#             interpolation = 'nearest',
#             keep_aspect_ratio = True
#         )
#     print(img_data)
    
#     try:
#         img_data = tf.keras.utils.load_img(
#             filePath,
#             color_mode = 'grayscale',
#             target_size = (28, 28),
#             interpolation = 'nearest',
#             keep_aspect_ratio = True
#         )
#         print(img_data)
#         array = tf.keras.preprocessing.image.img_to_array(img_data)
#         array = np.array([array])

#         predictions = cnn.predict(array)
#         prediction = predictions.argmax()
#         print('This is the index of prediction:', prediction)
#         print('The correct answer is:', class_names[prediction])
#         return json({"result": class_names[prediction]})
#     except:
#         return json({'error': 'Conversion error.'})

# @app.post("/predict_paper")
# async def callModel(request):
#     # yoloModel(request)
#     fileName = request.json['filePath'].split('/')[-1]
#     print(fileName)

#     # os.system("./forPython.sh")
    
#     # command = !python3 detect.py --source /Users/sheungpanlo/Desktop/Self_programming/Deep_learning/yolov5/yolov5/dataset/text/images/test/TEST_0001.jpg --weights 'text_detection/feature_extraction2/weights/best.pt' --save-crop
#     pid = os.fork()

#     if pid:
#         os.wait()
#         result_arr = []

#         yolo_result_folder = os.listdir('./yolov5/runs/detect/')
#         yolo_result_folder = sorted(yolo_result_folder)
#         print(yolo_result_folder)

#         images_path = './yolov5/runs/detect/' + yolo_result_folder[-1] + '/crops/Text/'
#         print(images_path)
#         images = os.listdir(images_path)
#         for image in images:
#                 path = images_path + image
#                 img_data = tf.keras.utils.load_img(
#                     path,
#                     color_mode='grayscale',
#                     target_size=(28, 28),
#                     interpolation='nearest',
#                     keep_aspect_ratio=True
#                 )

#                 array = tf.keras.preprocessing.image.img_to_array(img_data)
#                 array = np.array([array])

#                 predictions = cnn.predict(array)
#                 prediction = predictions.argmax()
#                 print('This is the index of prediction:', prediction)
#                 print('The correct answer is:', class_names[prediction])
#                 result_arr.append(class_names[prediction])
#         print(result_arr)
#         return json({"result": ''.join(result_arr)})
#     else: 
#         os.system(f"python3 yolov5/detect.py --source uploads/{fileName} --weights 'yolov5/text_detection/feature_extraction2/weights/best.pt' --save-crop")


@app.post('/predict_doc')
def callOCR(request):
    filePath = request.json['filePath']
    try:
        img = Image.open(filePath)
        text = pytesseract.image_to_string(img, lang='eng')
        print(text)
        return json({"result": text})
    except Exception as ex:
        print(ex)
        return json({'error': 'Conversion error. This file type is not yet supported.'})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=6000)