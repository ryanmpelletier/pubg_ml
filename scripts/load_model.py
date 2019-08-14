''' Neural Network PUBG Predictions.

A neural network learning algorithm example using TensorFlow.

Author: Ryan Pelletier

'''
#from __future__ import absolute_import, division, print_function

import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras import layers

print(tf.VERSION)
print(tf.keras.__version__)

#any time you load the weights for a model, you first need to define the structure of the model
model = tf.keras.Sequential()
model.add(layers.Dense(3, activation='relu'))
model.add(layers.Dense(3, activation='relu'))
model.add(layers.Dense(2, activation='softmax'))

#this is some BS workaround which makes it so load_weights doesn't give an error
#you basically have to reinstantiate the model but not train it, then you can load in the weights you saved during training
training = np.genfromtxt('training.csv', delimiter=",")
labels = np.genfromtxt('labels.csv', delimiter=",")
model.compile(optimizer=tf.train.AdamOptimizer(0.001), loss='categorical_crossentropy', metrics=['accuracy'])
model.fit(training, labels, epochs=0)

#load the weights from the previously saved model
model.load_weights('pubg_model_weights.h5')


#now I can make predictions
prediction = model.predict(np.array([(1, 1, 1, 1, 1, 1, 1, 1)]))

print(prediction)


