# USAGE
# Start the server:
# 	python server.py
# Submit a request via cURL:
# 	curl -X POST 'http://localhost:5000/predict'

# import the necessary packages
import numpy as np
import flask
import io

# initialize our Flask application and the Keras model
app = flask.Flask(__name__)
model = None

def load_model():
	global model
	print("pretending to load the model...do do")
	#model = ResNet50(weights="imagenet")

@app.route("/predict", methods=["POST"])
def predict():
	data = {"success": False}

	if flask.request.method == "POST":
		data["success"] = True

	# return the data dictionary as a JSON response
	return flask.jsonify(data)

# if this is the main thread of execution first load the model and
# then start the server
if __name__ == "__main__":
	print("Flask starting server...")
	load_model()
	app.run()
