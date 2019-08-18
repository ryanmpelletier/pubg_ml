''' Neural Network PUBG Predictions.

A neural network learning algorithm example using TensorFlow.

Author: Ryan Pelletier

'''

import numpy as np
import tensorflow as tf
from tensorflow.keras import layers

print(tf.VERSION)
print(tf.keras.__version__)
model = None

def load_model2():
	global model
	model = tf.keras.Sequential()
	model.add(layers.Dense(3, activation='relu'))
	model.add(layers.Dense(3, activation='relu'))
	model.add(layers.Dense(2, activation='softmax'))
	training = np.genfromtxt('training.csv', delimiter=",")
	labels = np.genfromtxt('labels.csv', delimiter=",")
	model.compile(optimizer=tf.train.AdamOptimizer(0.001), loss='categorical_crossentropy', metrics=['accuracy'])
	model.fit(training, labels, epochs=0)
	model.load_weights('pubg_model_weights.h5')

def predict():
	prediction = model.predict(np.array([[1, 1, 1, 1, 1, 1, 1, 1]]))
	print(prediction)


load_model2()
predict()


