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
from tensorflow.keras import layers
from tensorflow.keras.backend import set_session


# initialize our Flask application and the Keras model
app = flask.Flask(__name__)

from load import *

global model, graph, sess

model, graph, sess = init()




@app.route("/predict", methods=["POST"])
def predict():
	data = {"success":False}
	if flask.request.method == "POST":
		data["success"] = True
		features = flask.request.json["features"]

		with graph.as_default():
			set_session(sess)	
			prediction = model.predict(np.array([features]))
			print(prediction)
	# return the data dictionary as a JSON response
	return flask.jsonify(data)

# if this is the main thread of execution first load the model and
# then start the server
if __name__ == "__main__":
	print("Flask starting server...")
	app.run()
