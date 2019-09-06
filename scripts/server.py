# USAGE
# Start the server:
# 	python server.py
# Submit a request via cURL:
# 	curl -X POST -d @request.json 'http://localhost:5000/predict'
# 	curl -X POST -d @batch_request.json 'http://localhost:5000/batch_predict'

# import the necessary packages
import numpy as np
import flask
import io
import tensorflow as tf
from tensorflow.keras.backend import set_session
from flask import jsonify

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
			predictions = model.predict(np.array([features]))
			if predictions[0][0] > predictions[0][1]:
				return "alive"
			return "dead"

@app.route("/batch_predict", methods=["POST"])
def batch_predict():
	if flask.request.method == "POST":
		features = flask.request.json["features"]
		features_list = []
		response_list = []
		for player_name in features:
			features_list.append(features[player_name])
			response_list.append({player_name:"dead"})
		with graph.as_default():
			set_session(sess)
			predictions = model.predict(np.array(features_list))
			#these predictions should be in the same order as as my request, so build a response
			for i in range(len(predictions)):
				if predictions[i][0] > predictions[i][1]:
					for player in response_list[i]:
						response_list[i][player] = "alive"
			return jsonify(response_list)


# if this is the main thread of execution first load the model and
# then start the server
if __name__ == "__main__":
	print("Flask starting server...")
	app.run()
