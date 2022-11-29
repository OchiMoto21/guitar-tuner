import datetime, time
import os, sys
import numpy as np
from base64 import b64decode
from flask import Flask,json,render_template,jsonify,Response,request,send_from_directory
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

HTMLFILE = "tuner.html"
app = Flask(__name__,
            static_url_path='', 
            static_folder='web/static',
            template_folder='web/templates')

@app.route('/reports/<path:path>')
def send_report(path):
    return send_from_directory('reports', path)

@app.route('/')
def homepage():
    return render_template(HTMLFILE)

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT",8080))).run(port=3264)