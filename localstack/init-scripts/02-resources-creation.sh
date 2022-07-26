#!/bin/bash

echo "-----------------Script-02----------------- [localstack]"

echo "########### Creating SNS ###########"
aws sns create-topic --name cryptoAnalysisSummaryTopic --endpoint-url http://localhost:4566

echo "########### Listing SNS ###########"
aws sns list-topics --endpoint-url http://localhost:4566

echo "########### Creating DynamoDB 'crypto_robot.analyzed_data' table ###########"
aws dynamodb create-table \
--table-name crypto_robot.analyzed_data  \
--attribute-definitions AttributeName=interval,AttributeType=S \
--key-schema AttributeName=interval,KeyType=HASH \
--provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
--endpoint-url=http://localhost:4566
