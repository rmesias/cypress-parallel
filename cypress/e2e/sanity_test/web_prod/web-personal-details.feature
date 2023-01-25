Feature: Personnal Details

  Scenario: Personal Details modal exist
    When member click Personal Details at the profile option
    Then Personal Details modal is shown

  Scenario Outline: Member Personnal info <fields> are correct
    Given browser is at member Personal info modal
    Then member personal info "<value>" is shown
    Examples:
      |fields        |value            |
      |First Name    |natalie          |
      |Last Name     |portman          |
      |Gender        |Female           |
      |Title         |Ms/Mrs.          | 
      |Email Address |pipow@tafmail.com|
      |Mobile Number |220365214        |
      |Birthday      |19/09/1979       |
      |Country       |United Kingdom   |
      |Post Code     |AB25 3XA         |
      |Street Address|1/1, 16, Jamaica Street, |
      |Currency      |£ (Pound Sterling)|

  Scenario: Member emails and notification 
    Given browser is at member Personal info modal
    Then all member emails and notification are checked

  Scenario: Button update personal Info
    Given browser is at member Personal info modal
    Then button for updating personal info exist