''' Neural Network PUBG Predictions.

A neural network learning algorithm example using TensorFlow.

Author: Ryan Pelletier

'''
from __future__ import absolute_import, division, print_function

import numpy as np
import tensorflow as tf
from tensorflow.keras import layers


print(tf.VERSION)
print(tf.keras.__version__)


def create_model():
  model = tf.keras.Sequential()
  model.add(layers.Dense(10, activation='relu', input_dim=23))
  model.add(layers.Dense(10, activation='relu'))
  model.add(layers.Dense(2, activation='softmax'))
  return model

#create a sequential keras model
model = create_model()

model.compile(optimizer=tf.train.AdamOptimizer(0.001), loss='categorical_crossentropy', metrics=['accuracy'])


training = np.genfromtxt('training.csv', delimiter=",")

labels = np.genfromtxt('labels.csv', delimiter=",")

print("TRAINING SHAPE: ", training.shape)
print("LABELS SHAPE: ", labels.shape)

model.fit(training, labels, epochs=10, batch_size=50)


#you can only call summary after calling build() or fit()
model.summary()

#save the model, we can serve this up from a python rest API
model.save_weights('pubg_model_weights.h5')
