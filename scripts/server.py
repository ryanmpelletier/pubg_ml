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
from tensorflow.keras.models import load_model
from tensorflow.keras import layers



# initialize our Flask application and the Keras model
app = flask.Flask(__name__)
#model = None

def load_model():
	print("Loading model from saved weights")
	local_model = tf.keras.Sequential()
	local_model.add(layers.Dense(3, activation='relu'))
	local_model.add(layers.Dense(3, activation='relu'))
	local_model.add(layers.Dense(2, activation='softmax'))
	training = np.genfromtxt('training.csv', delimiter=",")
	labels = np.genfromtxt('labels.csv', delimiter=",")
	local_model.compile(optimizer=tf.train.AdamOptimizer(0.001), loss='categorical_crossentropy', metrics=['accuracy'])
	local_model.fit(training, labels, epochs=0)
	print("Finished loading model")
	return local_model


@app.route("/predict", methods=["POST"])
def predict():
	data = {"success":False}
	if flask.request.method == "POST":
		data["success"] = True
		features = flask.request.json["features"]
		local_model = tf.keras.Sequential()
		local_model.add(layers.Dense(3, activation='relu'))
		local_model.add(layers.Dense(3, activation='relu'))
		local_model.add(layers.Dense(2, activation='softmax'))
		training = np.genfromtxt('training.csv', delimiter=",")
		labels = np.genfromtxt('labels.csv', delimiter=",")
		local_model.compile(optimizer=tf.train.AdamOptimizer(0.001), loss='categorical_crossentropy', metrics=['accuracy'])
		local_model.fit(training, labels, epochs=0)
		local_model.load_weights('pubg_model_weights.h5')
		prediction = local_model.predict(np.array([features]))
		print(prediction)
	# return the data dictionary as a JSON response
	return flask.jsonify(data)

# if this is the main thread of execution first load the model and
# then start the server
if __name__ == "__main__":
	print("Flask starting server...")
	#global model
	#model = load_model()
	app.run()
