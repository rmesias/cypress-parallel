Feature: BetVision Homepage

  Background: 
    Given admin is on the BetVision Homepage 2

  Scenario Outline: Verify user can see the specific page
    When user clicks "<page>"
    Then user should be routed to "<link>" page
      Examples:
        | page  | link  |
        | About Us  | aboutus |
        | Contact Us | contact-us |
        | Privacy Policy | privacy-policy |
        | Deposit & Withdrawals | depositandwithdrawal |
        | RTPs | rtp  |
        | Terms & Conditions | terms-and-conditions |
        | Betting Rules | betting-rules |
        | Rules | rules |
        | Safe & Secure | safeandsecure |
        | Safer Gaming | safer-gaming |
        | Help Centre | help-centre |
        
    Scenario Outline: Verify user can click icon
      When user click "<image>" icon
      Then user redirected to "<link>"
        Examples:
            | image | link |
            | https://static-development.aonewallet.com/images/@sites/betvision/images/partners/safe-secure.jpg | safeandsecure |
            | https://static-development.aonewallet.com/images/@sites/betvision/images/partners/over18.jpg  | responsible-gambling |
