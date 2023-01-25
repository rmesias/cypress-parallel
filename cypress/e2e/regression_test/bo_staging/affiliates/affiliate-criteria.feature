Feature: Affiliates- Affiliate Criteria

  Background: 
    Given admin is on the "Affiliate Criteria" tab
  
  Scenario: Setting up address, title and phone number to Mandatory
    Then real name gender date of birth number and email are enabled on Mandatory
    And address qq wechat title phone number are enabled on Optional
  