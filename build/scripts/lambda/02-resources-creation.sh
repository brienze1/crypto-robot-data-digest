#!/bin/bash


echo "-----------------Script-02----------------- [data-digest]"

echo "########### Copy the lambda function to the S3 bucket ###########"
aws s3 cp /lambda-files/crypto-robot-data-digest.zip s3://lambda-functions \
  --endpoint-url http://localstack:4566

echo "########### Cloudformation Start ###########"
aws cloudformation deploy \
 --stack-name crypto-robot-data-digest \
 --template-file "/cloudformation/crypto-robot-data-digest.yaml" \
 --endpoint-url http://localstack:4566

