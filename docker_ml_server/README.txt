Run 'docker build -t tensorflow/pubg_ml_server:1.0.0 .' in this directory to build the dockerfile. It has flask dependencies installed so you can serve up the model.

Run the image with 'docker run --network=host --runtime=nvidia  tensorflow/pubg_ml_server:1.0.0'

This is a POST to the flask server which can send data to it, you can expand on this to provide data to get predictions on.

curl -X POST -H "Content-Type: application/json" -d @predict_request.json  http://localhost:5000/predict
curl -X POST -H "Content-Type: application/json" -d @batch_predict_request.json  http://localhost:5000/batch_predict
