Feature: Member logout

Scenario: Member logout to wallet back office
  Given admin is already login to Back Office wallet
  When admin clicks account name at the upper right corner of the page
  And selects logout
  Then admin is redirectec to sign in page
  
