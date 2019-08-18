# USAGE
# Start the server:
# 	python server.py
# Submit a request via cURL:
# 	curl -X POST 'http://localhost:5000/predict'

# import the necessary packages
import numpy as np
import flask
import io
import tensorflow as tf
from tensorflow.keras.backend import set_session


# initialize our Flask application and the Keras model
app = flask.Flask(__name__)

#load in the init() method basically so that we can initialize the model, graph, and session
from load import *

#this is probably not good, but we basically store all these globally
global model, graph, sess

model, graph, sess = init()

@app.route("/predict", methods=["POST"])
def predict():
	if flask.request.method == "POST":
		features = flask.request.json["features"]
		with graph.as_default():
			#make sure to use the same session we loaded the weights on the model with
			set_session(sess)	
			prediction = model.predict(np.array([features]))
			return str(prediction)

@app.route("/batch_predict", methods=["POST"])
def batch_predict():
	if flask.request.method == "POST":
		features = flask.request.json["features"]
		features_list = []
		for feature in features:
			features_list.append(features[feature])
		with graph.as_default():
			set_session(sess)
			prediction = model.predict(np.array(features_list))
			return str(prediction)


# if this is the main thread of execution first load the model and
# then start the server
if __name__ == "__main__":
	print("Flask starting server...")
	app.run()
