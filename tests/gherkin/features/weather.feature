Feature: Weather Information
  Scenario: Check weather for a specific city
    Given I open the weather app
    When I enter "New York" in the search box
    Then I should see the weather for "New York"