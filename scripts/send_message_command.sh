#!/bin/sh

echo "########### Sending message to SNS ###########"
aws sns publish \
--endpoint-url=http://localhost:4566 \
--topic-arn arn:aws:sns:sa-east-1:000000000000:cryptoAnalysisTopic \
--profile localstack \
--message '{
             "interval": "SIX_HOURS",
             "analysisData": {
               "simpleMovingAverages": [
                 {
                   "period": 5,
                   "value": 21720.034,
                   "indicator": "NEUTRAL"
                 },
                 {
                   "period": 10,
                   "value": 21477.829,
                   "indicator": "NEUTRAL"
                 },
                 {
                   "period": 20,
                   "value": 21011.074,
                   "indicator": "STRONG_BUY"
                 },
                 {
                   "period": 50,
                   "value": 20840.5982,
                   "indicator": "BUY"
                 },
                 {
                   "period": 100,
                   "value": 20521.7347,
                   "indicator": "BUY"
                 },
                 {
                   "period": 200,
                   "value": 23285.4764,
                   "indicator": "NEUTRAL"
                 }
               ],
               "exponentialMovingAverages": [
                 {
                   "period": 5,
                   "value": 21480.44981,
                   "indicator": "NEUTRAL"
                 },
                 {
                   "period": 10,
                   "value": 21219.48731,
                   "indicator": "BUY"
                 },
                 {
                   "period": 20,
                   "value": 20778.21281,
                   "indicator": "BUY"
                 },
                 {
                   "period": 50,
                   "value": 20619.44775,
                   "indicator": "NEUTRAL"
                 },
                 {
                   "period": 100,
                   "value": 20698.25329,
                   "indicator": "STRONG_BUY"
                 },
                 {
                   "period": 200,
                   "value": 25140.26348,
                   "indicator": "NEUTRAL"
                 }
               ]
             }
           }'
