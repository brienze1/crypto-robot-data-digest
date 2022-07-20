<div id="top"></div>

# Crypto Data Analysis Generator

1. [About the Project](#about-the-project)
    1. [Input](#input)
    2. [Output](#output)
    3. [Rules](#rules)
    4. [Built With](#built-with)
       1. [Dependencies](#dependencies)
       2. [Compiler Dependencies](#compiler-dependencies)
       3. [Test Dependencies](#test-dependencies)
    5. [Roadmap](#roadmap)
2. [Getting Started](#getting-started)
    1. [Prerequisites](#prerequisites)
    2. [Installation](#installation)
    3. [Requirements](#requirements)
       1. [Deploying Local Infrastructure](#deploying-local-infrastructure)
    4. [Usage](#usage)
       1. [Manual Input](#manual-input)
       2. [Docker Input](#docker-input)
    5. [Testing](#testing)

## About the Project

The objective of this project is to implement an application that can digest analysis data and generate a BUY or SELL event.

### Input

The input should be received as an SNS message sent through an SQS subscription. This message will trigger the lambda handler to perform the service. 
Data should come in intervals of analysis, each interval should have two types of analysis (initially, this could improve in the future) 
simple moving average analysis (SMA) and exponential moving average analysis (EMA), each of them will have 6 periods of data analysed. 
The analysis will have an indicator for the period evaluated this can range from a STRONG_SELL up to a STRONG_BUY indication.

The intervals will be received as:
- ONE_MINUTE
- FIVE_MINUTES
- FIFTEEN_MINUTES
- THIRTY_MINUTES
- ONE_HOUR
- SIX_HOURS
- ONE_DAY

Each interval will analyse the data according to these periods:
- 5
- 10
- 20
- 50
- 100
- 200

Analysis indicators:
- STRONG_BUY
- BUY
- NEUTRAL
- SELL
- STRONG_SELL

Example of how the data should look like:

```
{
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
}
```

### Output

Since this is an async application there is no output to be received, but events are generated accordingly to the data received, 
the events should have an indication to BUY or SELL.

Example of how the line should look like:

```
{
    "summary": "BUY",
    "timestamp": "20-07-2022 02:18:10",
    "analysed_data": [
        {
          "interval": "0NE_MINUTE",  
          "timestamp": "20-07-2022 02:18:10",
          "summary": "BUY",
          "analysis": [
            {
                "indicator": "SIMPLE_MOVING_AVERAGE",
                "summary": "BUY",
                "score": {
                    "buy": 4,
                    "sell": 2
                }
            },
            {
                "indicator": "EXPONENTIAL_MOVING_AVERAGE",
                "summary": "NEUTRAL",
                "score": {
                    "buy": 3,
                    "sell": 3
                }
            }
          ]   
        },
        {
          "interval": "FIVE_MINUTES",
          "timestamp": "20-07-2022 02:18:10",
          "summary": "STRONG_BUY",
          "analysis": [
            {
                "indicator": "SIMPLE_MOVING_AVERAGE",
                "summary": "BUY",
                "score": {
                    "buy": 4,
                    "sell": 2
                }
            },
            {
                "indicator": "EXPONENTIAL_MOVING_AVERAGE",
                "summary": "NEUTRAL",
                "score": {
                    "buy": 3,
                    "sell": 3
                }
            }
          ]   
        },
        {
          "interval": "FIFTEEN_MINUTES",
          "timestamp": "20-07-2022 02:18:10",
          "summary": "STRONG_BUY",
          "analysis": [
            {
                "indicator": "SIMPLE_MOVING_AVERAGE",
                "summary": "BUY",
                "score": {
                    "buy": 4,
                    "sell": 2
                }
            },
            {
                "indicator": "EXPONENTIAL_MOVING_AVERAGE",
                "summary": "NEUTRAL",
                "score": {
                    "buy": 3,
                    "sell": 3
                }
            }
          ]   
        },
        {
          "interval": "THIRTY_MINUTES",
          "timestamp": "20-07-2022 02:18:10",
          "summary": "STRONG_BUY",
          "analysis": [
            {
                "indicator": "SIMPLE_MOVING_AVERAGE",
                "summary": "BUY",
                "score": {
                    "buy": 4,
                    "sell": 2
                }
            },
            {
                "indicator": "EXPONENTIAL_MOVING_AVERAGE",
                "summary": "NEUTRAL",
                "score": {
                    "buy": 3,
                    "sell": 3
                }
            }
          ]   
        },
        {
          "interval": "ONE_HOUR",
          "timestamp": "20-07-2022 02:18:10",
          "summary": "STRONG_BUY",
          "analysis": [
            {
                "indicator": "SIMPLE_MOVING_AVERAGE",
                "summary": "BUY",
                "score": {
                    "buy": 4,
                    "sell": 2
                }
            },
            {
                "indicator": "EXPONENTIAL_MOVING_AVERAGE",
                "summary": "NEUTRAL",
                "score": {
                    "buy": 3,
                    "sell": 3
                }
            }
          ]   
        },
        {
          "interval": "SIX_HOURS",
          "timestamp": "20-07-2022 02:18:10",
          "summary": "STRONG_BUY",
          "analysis": [
            {
                "indicator": "SIMPLE_MOVING_AVERAGE",
                "summary": "BUY",
                "score": {
                    "buy": 4,
                    "sell": 2
                }
            },
            {
                "indicator": "EXPONENTIAL_MOVING_AVERAGE",
                "summary": "NEUTRAL",
                "score": {
                    "buy": 3,
                    "sell": 3
                }
            }
          ]   
        },
        {
          "interval": "ONE_DAY",
          "timestamp": "20-07-2022 02:18:10",
          "summary": "STRONG_BUY",
          "analysis": [
            {
                "indicator": "SIMPLE_MOVING_AVERAGE",
                "summary": "BUY",
                "score": {
                    "buy": 4,
                    "sell": 2
                }
            },
            {
                "indicator": "EXPONENTIAL_MOVING_AVERAGE",
                "summary": "NEUTRAL",
                "score": {
                    "buy": 3,
                    "sell": 3
                }
            }
          ]   
        }
    ]
}
```

The most important field is the "summary" field, but the detailed indicators could also be used if necessary.

### Rules

Here are some rules that need to be implemented in this application.

* Data needs to be updated on the database
* Data received should be checked to see if it's newer than the one saved
* The app should gather all the data saved and generate an indication
* If there is no data saved on the database, the summary should be generated using only the data received
* The data should be sent via SNS topic event

### Built With

This application is build with Node.js Typescript, code is build using a Dockerfile every deployment into the main branch 
in GitHub using GitHub actions.
Local environment is created using localstack for testing purposes using 
[crypto-robot-localstack](https://github.com/brienze1/crypto-robot-localstack).

#### Dependencies

* [aws-lambda](https://github.com/FasterXML/jackson-databind)
* [winston](https://github.com/FasterXML/jackson-databind)
* [uuid](https://github.com/FasterXML/jackson-databind)

#### Compiler Dependencies

* [typescript](https://github.com/junit-team/junit4): Used to run unit tests
* [eslint](https://github.com/junit-team/junit4): Used to run unit tests
* [babel](https://github.com/junit-team/junit4): Used to run unit tests

#### Test Dependencies

* [jest](https://github.com/junit-team/junit4): Used to run unit tests
* [ts-jest](https://github.com/junit-team/junit4): Used to run unit tests

### Roadmap

* [ ] Implement Behaviour tests (BDD) 
* [ ] Implement Unit tests 
* [ ] Implement application logic 
* [x] Create Dockerfile 
* [x] Create Docker compose for local infrastructure 
* [ ] Document everything in Readme

<p align="right">(<a href="#top">back to top</a>)</p>

## Getting Started

### Prerequisites

- Install Node and npm
  - Windows/MacOS/Linux 
    - [Manual](https://nodejs.org/)
  - macOS
    - [Homebrew](https://docs.brew.sh/Installation)
      ```bash
      brew install node
      ```
  - Linux
    - Via terminal
      ```bash
      sudo apt install nodejs
      sudo apt install npm
      ```

- Install Docker (Optional)
    - [Windows/macOS/Linux/WSL](https://www.docker.com/get-started/)


### Installation

- Run the following to install dependencies and compile the project:
    - Windows/MacOS/Linux/WSL
      ```bash
      npm install && npm run build
      ```

### Requirements

To run the application locally, first a local infrastructure needs to be deployed

#### Deploying Local Infrastructure

This requires [docker](#prerequisites) to be installed. Localstack will deploy aws local integration and create the 
topic used by this application to send the events.

- Start the required infrastructure via localstack using docker compose command:
    - Windows/macOS/Linux/WSL
      ```bash
      docker-compose up
      ```

- To stop localstack:
    - Windows/macOS/Linux/WSL
      ```bash
      docker-compose down
      ```

### Usage

#### Manual Input
      
- Start the compiled application:
    - Windows/macOS/Linux/WSL
      ```bash
      npm run dev
      ```
      
- To stop the application just press Ctrl+C 

#### Docker Input
- In case you want to use a Docker container to run the application first you need to build the Docker image from Dockerfile:
    - Windows/macOS/Linux/WSL
      ```bash
      docker build -t crypto-robot-data-digest .
      ```
      
[//]: # (TODO fix this)
- And then run the new created image:
  - Windows/macOS/Linux/WSL
    ```bash
    docker run --rm -it crypto-robot-data-analysis-gen:latest
    ```
    
### Testing 

- To run the tests just type the command bellow in terminal:
    - Windows/macOS/Linux/WSL
      ```bash
      npm run test
      ```

<p align="right">(<a href="#top">back to top</a>)</p>
