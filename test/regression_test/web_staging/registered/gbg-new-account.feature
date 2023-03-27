Feature: User GBG Activated For Successful Signup 

    Scenario: Verify if Newly Created User will see Banner
        When User logs in using new account
        Then user should see red banner with a statement

    Scenario: Verify if Newly Created User will not be able to Deposit
        When User logs in using new account
        And user clicks Deposit
        Then User should be able to see the verification statement

    Scenario: Verify if Newly Created User will not be able to Withdraw
        When User logs in using new account
        And user clicks username
        And user clicks Withdraw
        Then User should be able to see the Withdrawal modal