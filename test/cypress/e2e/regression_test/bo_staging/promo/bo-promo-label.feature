Feature: Back Office withdrawals

Scenario: View list of Promo labels
  Given promo label "QALabel" exist
  Then all promo label is shown in the page

Scenario: Create Promo label
  Given create Promo label form is shown
  When admin adds promo name "QALabel"
  And selects BLUE color
  And clicks submit button
  Then a confirmation message "Promo Label Successfully Created" is shown
  And "QALabel" should be listed in the table

Scenario: Edit Promo label
  Given promo label "QALabel" exist
  When user edits promo label "QARename"
  And change color into RED
  Then a confirmation message "Promo Label Successfully Updated" is shown
  And "QARename" now exist in the table replacing "QALabel"

Scenario: Delete Promo label
  Given promo label "QALabel" exist
  When user deletes Promo label
  Then a confirmation message "Promo Label Successfully Deleted" is shown
  And "QALabel" should no longer be listed in the table
