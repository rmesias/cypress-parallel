Feature: User GBG Activated with Withdrawal Limit

    Scenario: Verify if Newly Created User will not see Banner
        When User logs in using new account 
        Then user should be able to see the main page without the banner

    Scenario: Verify if Newly Created User will be able to Deposit
        When User logs in using new account
        And user clicks Deposit
        Then User should be able to see Deposit Modal

    Scenario: Verify if Newly Created User will be able to Withdraw
        When User logs in using new account
        And user clicks username
        And user clicks Withdraw
        Then User should be able to see the Withdrawal modal