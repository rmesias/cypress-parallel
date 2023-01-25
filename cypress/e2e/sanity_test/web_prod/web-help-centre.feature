Feature: Help Centre

  Scenario: Help Centre at the header
    Then Help Centre exist at the header

  Scenario: Help Centre at the footer
    Then Help Centre at the footer

  Scenario: Navigate to Help Centre from header cta
    When member clicks Help Centre at the header
    Then member is redirected to Help Centre page

  Scenario: Navigate to Help Centre from footer cta
    When member clicks Help Centre at the footer
    Then member is redirected to Help Centre page