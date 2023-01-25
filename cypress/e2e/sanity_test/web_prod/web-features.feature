Feature: Features tab
To check if Feature content are showing and was its cta link redirect to its designated page

  Scenario: Header Features tab exist
    Then "Features" tab exist in the header

  Scenario: Header Features tab redirect to Features page
    When member clicks Features tab
    Then member is redirected to Features page

  Scenario: Promotional widget exist at the Features
    Given browser is at Features page
    Then all promotional widget exist

  Scenario Outline: Open promotional <promo> details 
    Given browser is at Features page
    When member clicks Read more "<link>" of promo widget
    Then member is redirected to "<link>" details
      Examples:
          | promo       | link                 |
          | ACCA Boost  | /features/acca-boost |
          | Bet Builder | /features/bet-builder|
          | Cash Out    | /features/cash-out   |
