<div id="top"></div>

# Crypto Data Digest

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/brienze1/crypto-robot-data-digest/blob/main/LICENSE)
![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/brienze1/crypto-robot-data-digest)
![Build](https://img.shields.io/github/workflow/status/brienze1/crypto-robot-data-digest/Build?label=Build)
[![Coverage Status](https://coveralls.io/repos/github/brienze1/crypto-robot-data-digest/badge.svg?branch=main)](https://coveralls.io/github/brienze1/crypto-robot-data-digest?branch=main)
![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/brienze1/crypto-robot-data-digest/dev/typescript?label=Typescript)

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
3. [About Me](#about-me)

## About the Project

The objective of this project is to implement an application that can digest analysis data and generate a BUY or SELL event.

### Input

The input should be received as an SNS message sent through an SQS subscription. This message will trigger the lambda handler to perform the service.
Data should come in intervals of analysis, each interval should have two types of analysis (initially, this could improve in the future)
simple moving average analysis (SMA) and exponential moving average analysis (EMA), each of them will have 6 periods of data analysed.
The analysis will have an indicator for the period evaluated this can range from a STRONG_SELL up to a STRONG_BUY indication.

The intervals will be received as:

-   ONE_MINUTE
-   FIVE_MINUTES
-   FIFTEEN_MINUTES
-   THIRTY_MINUTES
-   ONE_HOUR
-   SIX_HOURS
-   ONE_DAY

Each interval will analyse the data according to these periods:

-   5
-   10
-   20
-   50
-   100
-   200

Analysis indicators:

-   STRONG_BUY
-   BUY
-   NEUTRAL
-   SELL
-   STRONG_SELL

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
                "metric": "SIMPLE_MOVING_AVERAGE",
                "indicator": "BUY",
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

Implemented:

-   Data needs to be updated on the database once it is received
-   The app should gather all the data saved and generate an indication
-   The data should be sent via SNS topic event

Not implemented:

-   Data received should be checked to see if it's newer than the one saved
-   If there is no data saved on the database, the summary should be generated using only the data received

### Built With

This application is build with Node.js Typescript, code is build using a Dockerfile every deployment into the main branch
in GitHub using GitHub actions.
Local environment is created using localstack for testing purposes using
[crypto-robot-localstack](https://github.com/brienze1/crypto-robot-localstack).

#### Dependencies

-   [aws-lambda](https://www.npmjs.com/package/aws-lambda): Used in Lambda Handler integration
-   [aws-sdk](https://www.npmjs.com/package/aws-sdk): Used in SNS integration (Needs to be replaced for SNS specific dependency)
-   [dynamoose](https://www.npmjs.com/package/dynamoose): Used as ORM for DynamoDB
-   [winston](https://www.npmjs.com/package/winston): Used for logging purposes
-   [uuid](https://www.npmjs.com/package/uuid): Used to generate uuids

#### Compiler Dependencies

-   [typescript](https://www.npmjs.com/package/typescript): Used run/compile typescript code
-   [eslint](https://www.npmjs.com/package/eslint): Used to enforce coding practices
-   [babel](https://babeljs.io/): Used to transpile code into js on build
-   [dotenv](https://www.npmjs.com/package/dotenv): Used to map .env variables

#### Test Dependencies

-   [jest](https://www.npmjs.com/package/jest): Used to run unit tests
-   [@cucumber/cucumber](https://www.npmjs.com/package/@cucumber/cucumber): Used to run integration tests
-   [chai](https://www.npmjs.com/package/chai): Used to perform test assertions with cucumber
-   [sinon](https://www.npmjs.com/package/sinon): Used to create mocks/stubs/spy's
-   [aws-sdk-mock](https://www.npmjs.com/package/aws-sdk-mock): Used to create mocks for AWS integrations

### Roadmap

-   [X] Implement Behaviour tests (BDD)
-   [X] Implement Unit tests
-   [X] Implement application logic
-   [X] Create Dockerfile
-   [X] Create Docker compose for local infrastructure
-   [X] Document everything in Readme

<p align="right">(<a href="#top">back to top</a>)</p>

## Getting Started

### Prerequisites

-   Install Node and npm

    -   Windows/MacOS/Linux
        -   [Manual](https://nodejs.org/)
    -   macOS
        -   [Homebrew](https://docs.brew.sh/Installation)
            ```bash
            brew install node
            ```
    -   Linux
        -   Via terminal
            ```bash
            sudo apt install nodejs
            sudo apt install npm
            ```

-   Install Docker
    -   [Windows/macOS/Linux/WSL](https://www.docker.com/get-started/)

### Installation

-   Run the following to install dependencies and compile the project:
    -   Windows/MacOS/Linux/WSL
        ```bash
        npm install && npm run build
        ```

### Requirements

To run the application locally, first a local infrastructure needs to be deployed

#### Deploying Local Infrastructure

This requires [docker](#prerequisites) to be installed. Localstack will deploy aws local integration and create the
topic used by this application to send the events.

Obs: Make sure Docker is running before.

-   Start the required infrastructure via localstack using docker compose command:

    -   Windows/macOS/Linux/WSL
        ```bash
        docker-compose up
        ```

-   To stop localstack:
    -   Windows/macOS/Linux/WSL
        ```bash
        docker-compose down
        ```

### Usage

#### Manual Input

-   Start the compiled application:
    -   Windows/macOS/Linux/WSL
        ```bash
        npm run dev
        ```
-   To stop the application just press Ctrl+C

#### Docker Input

-   In case you want to use a Docker container to run the application first you need to build the Docker image from Dockerfile:
    -   Windows/macOS/Linux/WSL
        ```bash
        docker build -t crypto-robot-data-digest .
        ```

-   And then run the new created image:
    -   Windows/macOS/Linux/WSL
        ```bash
        docker run --network="host" -d -it crypto-robot-data-digest bash -c "npm install && npm run dev:docker"
        ```

### Testing

-   To run the tests just type the command bellow in terminal:
    -   Windows/macOS/Linux/WSL
        ```bash
        npm run test
        ```

<p align="right">(<a href="#top">back to top</a>)</p>

## About me

Hello! :)

My name is Luis Brienze, and I'm a Software Engineer.

I focus primarily on software development, but I'm also good at system architecture, mentoring other developers,
etc... I've been in the IT industry for 4+ years, during this time I worked for companies like Itau, Dock, Imagine
Learning and
EPAM.

I graduated from UNESP studying Automation and Control Engineering in 2022, and I also took multiple courses on Udemy
and Alura.

My main stack is Java, but I'm also pretty good working with Kotlin and Typescript (both server side).
I have quite a good knowledge of AWS Cloud, and I'm also very conformable working with Docker.

During my career, while working with QA's, I've also gained alot of valuable experience with testing applications in
general from unit/integrated
testing using TDD and BDD, to performance testing apps with JMeter for example.

If you want to talk to me, please fell free to reach me anytime at [LinkedIn](https://www.linkedin.com/in/luisbrienze/)
or [e-mail](lfbrienze@gmail.com).

<p align="right">(<a href="#top">back to top</a>)</p>
