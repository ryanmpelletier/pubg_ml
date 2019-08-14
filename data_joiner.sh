#!/bin/bash
#run this inside the directory where all the training.csv and labels.csv are


SORTED_TRAINING=`find . -name "*training*" | sort`
SORTED_LABELS=`find . -name "*labels*" | sort`

OUTPUT_TRAINING_FILE="training.csv"
OUTPUT_LABELS_FILE="labels.csv"

#first remove old joined data
if [ -f labels.csv ]; then
    rm labels.csv
    
fi

if [ -f training.csv ]; then
    rm training.csv
fi


#build the combined training file
for training in $SORTED_TRAINING
do
  cat $training >> $OUTPUT_TRAINING_FILE
  echo '' >> $OUTPUT_TRAINING_FILE
done


#build the combined labels file
for labels in $SORTED_LABELS
do
  cat $labels >> $OUTPUT_LABELS_FILE
  echo '' >> $OUTPUT_LABELS_FILE
done
