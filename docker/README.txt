Run 'docker build .' in this directory to build the dockerfile. It has flask dependencies installed so you can serve up the model.

This is a POST to the flask server which can send data to it, you can expand on this to provide data to get predictions on.
curl -X POST -H "Content-Type: application/json" -d '{"key":"value"}' http://localhost:5000/predict
