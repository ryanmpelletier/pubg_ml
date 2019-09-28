FROM tensorflow/tensorflow:latest

RUN pip install flask gevent requests pillow

COPY training.csv /root/training.csv
COPY labels.csv /root/labels.csv
COPY pubg_model_weights.h5 /root/pubg_model_weights.h5
COPY load.py /root/load.py
COPY server.py /root/server.py

CMD [ "python", "/root/server.py" ]

LABEL maintainer="ryanmatthewpelletier@gmail.com"
