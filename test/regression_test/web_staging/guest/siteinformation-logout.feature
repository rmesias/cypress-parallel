Feature: BetVision siteinformation-logout

#to verify no user is logged in
  Background: 
    Given user should see the Login button


  #Just to confirm everything is existing on Main Page
  Scenario Outline: User searches for Site Information pages
    Then user should see the "<string>"
      Examples:
        | string |
        | About Us |
        | Contact Us |
        | Privacy Policy |
        | Deposit & Withdrawals |
        | RTPs |
        | Terms & Conditions |

  Scenario Outline: User clicks and access specific sites
    When "<button>" is click
    Then it is redirected to "<link>"
      Examples:
        | button | link |
        | About Us | aboutus |
        | Contact Us | contact-us |
        | Privacy Policy | privacy-policy |
        | Deposit & Withdrawals | depositandwithdrawal |
        | RTPs | rtp |
        | Terms & Conditions | terms-and-conditions |
