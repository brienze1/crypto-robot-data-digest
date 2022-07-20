<div id="top"></div>

# Crypto Data Analysis Generator

1. [About the Project](#about-the-project)
    1. [Input](#input)
    2. [Output](#output)
    3. [Rules](#rules)
    4. [Built With](#built-with)
       1. [Dependencies](#dependencies)
       2. [Test Dependencies](#test-dependencies)
       3. [Plugins](#plugins)
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
the events should have an indication to BUY or SELL

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
        }
    ]
}
```

WIP

### Rules

WIP

* Rule example

### Built With

WIP

#### Dependencies

* [Jackson Databind](https://github.com/FasterXML/jackson-databind)

#### Test Dependencies

* [Junit4](https://github.com/junit-team/junit4): Used to run unit tests
* [Mockito](https://github.com/mockito/mockito): Used to generate mocks used in unit tests
* [Cucumber (Junit)](https://cucumber.io/docs/cucumber/api/#junit): Used to integrate cucumber with Junit4
* [Cucumber (Java)](https://cucumber.io/docs/installation/java/): Used to integrate Gherkin with Java

#### Plugins

* [Maven Compiler Plugin](https://maven.apache.org/plugins/maven-compiler-plugin/): Used to compile the app
* [Maven Assembly Plugin](https://maven.apache.org/plugins/maven-assembly-plugin/): Used to generate an executable jar
* [Maven Wrapper](https://maven.apache.org/wrapper/): Used to run mvn commands

### Roadmap

* [ ] Implement Behaviour tests (BDD) with cucumber
* [ ] Implement Unit tests 
* [x] Implement application logic 
* [x] Add maven wrapper to run mvn commands locally 
* [ ] Create Dockerfile 
* [x] Create Docker compose for local infrastructure 
* [ ] Document everything in Readme

<p align="right">(<a href="#top">back to top</a>)</p>

## Getting Started

### Prerequisites

- Install version 18 of the JDK
    - [Manual](https://adoptium.net/?variant=openjdk18)
    - [IntelliJ](https://www.jetbrains.com/help/idea/sdk.html#jdk)
    - [Homebrew](https://docs.brew.sh/Installation)
      ```bash
      brew install openjdk@18
      ```

- Set the `JAVA_HOME` environment variable to the path where your JDK is located
    - [Windows](https://confluence.atlassian.com/doc/setting-the-java_home-variable-in-windows-8895.html)
    - macOS/Linux/WSL
      ```bash
      echo 'export JAVA_HOME=/path/to/jdk' >> ~/.bashrc 
      ```

- Install Docker (Optional)
    - [Windows/macOS/Linux/WSL](https://www.docker.com/get-started/)

### Installation

- Run the following to install dependencies and compile the project:
    - Windows
      ```bash
      mvnw.bat clean install
      ```
    - macOS/Linux/WSL
      ```bash
      ./mvnw clean install
      ```

### Requirements

To run the application locally, first a local infrastructure needs to be deployed

#### Deploying Local Infrastructure

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
      java -jar ./application/target/crypto-robot-analysis-generator.jar --spring.profiles.active=localstack
      ```
      
- To stop the application just press Ctrl+C 

#### Docker Input
- In case you want to use a Docker container to run the application first you need to build the Docker image from Dockerfile:
    - Windows/macOS/Linux/WSL
      ```bash
      docker build -t crypto-robot-data-analysis-gen .
      ```
      
- And then run the new created image:
  - Windows/macOS/Linux/WSL
    ```bash
    docker run --rm -it crypto-robot-data-analysis-gen:latest
    ```
    
### Testing 

- To run the tests just type the command bellow in terminal:
    - Windows
      ```bash
      mvnw.bat test
      ```
    - macOS/Linux/WSL
      ```bash
      ./mvnw test
      ```

<p align="right">(<a href="#top">back to top</a>)</p>
