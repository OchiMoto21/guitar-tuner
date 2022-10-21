import datetime, time
import os, sys
import numpy as np
import PIL
from base64 import b64decode
from flask import Flask, json, render_template,jsonify,Response,request
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'


# model = keras.models.load_model('./my_h5_model.h5')

app = Flask(__name__)

# def process(img: PIL.Image.Image, model):
#   img_array = keras.preprocessing.image.img_to_array(img)
#   img_array = tf.expand_dims(img_array, 0)  # Create batch axis

#   class_names = ['alphabet-A', 'alphabet-B', 'alphabet-C', 'alphabet-D', 'alphabet-E', 'alphabet-G', 'alphabet-H', 'alphabet-I', 'alphabet-J', 'alphabet-K', 'nothing']


#   predictions = model.predict(img_array)
#   score = tf.nn.softmax(predictions[0])
#   predicted_class = class_names[np.argmax(score)]
#   predicted_prob = 100 * np.max(score)
#   return (img, predictions, score, predicted_class, predicted_prob)

# def prediction(img, model):

#     # resized = cv2.resize(img,(266,200), interpolation =cv2.INTER_AREA)
#     # img = resized[0:200,33:233]
#     prediction = process(img, model)
#     predicted_class = str(prediction[3])
#     predicted_prob =  "{:d}%".format(int(prediction[4]))
#     return (predicted_class, predicted_prob)


# def js_to_image(js_reply):
#   """
#   Params:
#           js_reply: JavaScript object containing image from webcam
#   Returns:
#           img: OpenCV BGR image
#   """
#   # decode base64 image
#   image_bytes = b64decode(js_reply.split(',')[1])
#   # convert bytes to numpy array
#   jpg_as_np = np.frombuffer(image_bytes, dtype=np.uint8)
#   # decode numpy array into OpenCV BGR image
#   img = cv2.imdecode(jpg_as_np, flags=1)

#   return img
    

# @app.route('/api', methods =['GET','POST'])
# def api():
#     if request.method == "GET":
#         return jsonify({"class": "no picture"})
#     elif request.method == "POST":
#         image = request.form.get("content")
#         img = js_to_image(image)
#         predictions = prediction(img, model)
#         dataReply = {'class':predictions[0], 'probability':predictions[1]}
#         return jsonify(dataReply)

# @application.route('/video_feed')
# def video_feed():
#     return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/requests',methods=['POST','GET'])
def tasks():
    if request.method=='GET':
        return render_template('test.html')
    return render_template('test.html')

@app.route('/')
def homepage():
    return render_template('test.html')

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT",8080))).run(port=3264)