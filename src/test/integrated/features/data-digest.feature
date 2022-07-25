Feature: Bank Account

  Scenario: Stores money
    Given DynamoDB analyzedData table is empty
    And The following analysis data was received "data-digest.json"
    When The handler function gets called
    Then The following analyzed data should be stored in DynamoDB "analyzed-data.json"
    And The following analyzed data should be sent out via SNS event "analysis-summary.json"
    And The handler function should exit with true
