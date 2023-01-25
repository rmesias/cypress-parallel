Feature: Profile settings Safer Gaming

  Scenario: Safer Gaming modal
    When member click Safer Gaming at the profile option
    Then Safer Gaming modal is shown

  Scenario Outline: Profile settings Safer Gaming options <tablist>
    Given browser is at member Profile settings Safer Gaming History modal
    And navigate to "<tablist>"
    Then Safer Gaming "<tablist>" content fields is displayed
      Examples:
        |tablist           | 
        |Timeout Facility  |
        |Self Exclusion    |
        |Account Closure   |
        |Limitations       |
        |Self Assessment   |

  Scenario: Timeout facility
    Given browser is at member Profile settings Safer Gaming History modal
    When member clicks "Timeout Facility"
    Then timeout dropdown list and Continue button exist
  
  Scenario: Self Exclusion
    Given browser is at member Profile settings Safer Gaming History modal
    When member clicks "Self Exclusion"
    Then Self Exclusion select and Continue button exist

  Scenario: Account Closure 
    Given browser is at member Profile settings Safer Gaming History modal
    When member clicks "Account Closure"
    Then Account Closure select and Continue button exist

  Scenario: Limitations 
    Given browser is at member Profile settings Safer Gaming History modal
    When member clicks "Limitations"
    Then Limitations month, amount and Confirm button exist

  Scenario: Self Assessment
    Given browser is at member Profile settings Safer Gaming History modal
    When member clicks "Self Assessment"
    Then Self Assessment Start Test button exist
  

