Feature: Features tab
To check feature entries and headers exists

    Scenario: Verify "ACCA Boost" Banner and Title
        When user clicks Feature
        And user clicks 'Read More' of ACCA Boost
        Then user should see ACCA Boost title and cover headers

    Scenario: Verify "Bet Builder" Banner and Title
        When user clicks Feature
        And user clicks 'Read More' of Bet Builder
        Then user should see Bet Builder title and cover headers

   Scenario: Verify "Cash Out" Banner and Title
        When user clicks Feature
        And user clicks 'Read More' of Cash Out
        Then user should see Cash Out title and cover headers