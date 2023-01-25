Feature: Account verification

  Scenario: Account verification modal
    When member click Account Verification at the profile option
    Then account verification modal is shown

  Scenario: Deposit button exist for verified user
    Given browser is at member Account Verification modal
    Then Deposit button exist

  Scenario Outline: Verify that member can select type <fileList> document to be uploaded
    Given browser is at member Account Verification modal
    When member selects "<fileList>" as document to uploaded
    Then an Upload File button should be visible
    Examples:
        |fileList                 |
        |PASSPORT                 |
        |ID_DOCUMENT_FRONT        |
        |ID_DOCUMENT_BACK         |
        |DRIVING_LICENSE_FRONT    |
        |DRIVING_LICENSE_BACK     |
        |PROOF_OF_ADDRESS_DOCUMENT|
        |BANK_STATEMENT           |
        |OTHER                    |

  Scenario: Shared documents
    Given browser is at member Account Verification modal
    Then Shared document exist with name, date and a delete button