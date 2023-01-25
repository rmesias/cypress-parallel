Feature: Join and register 
 Verfiy that Join and register modal are working as intended

  Scenario: Join button existed
    Then "Join" button existed at landing page header

  Scenario: Register cta existed
    When user clicks "Login"
    Then Register cta existed at login modal

  # Scenario: Validation message "<warning>" prompts in the first page sign-up
  #   When guest clicks "Join" button and continue
  #   And clicks "Next" button without inputing any data
  #   Then warning message is shown
  #     |warning                      |
  #     |First Name should be entered |
  #     |Last Name should be entered  |
  #     |Date of Birth should be entered|
  #     |E-mail should be entered     |
  
  # Scenario Outline: Validation message "<warning>" prompts in the second page
  #   When guest clicks "Join" button and continue
  #   And filled first page with valid data
  #     |field     | 
  #     |First Name|
  #     |Last Name | 
  #     |Email Address |
  #   And supply the "<data>" at the second page
  #   Then "<warning>" message is shown
  #     Examples:
  #     |data                         |warning                        |
  #     |                             |Mobile Number must be entered  |
  #     |5165220176                   |Postal Code is required        |

  # Scenario Outline: Validation message "<warning>" prompts in the third page for username
  #   When guest clicks "Join" button and continue
  #   And filled first page with valid data
  #     |field      |
  #     |First Name |
  #     |Last Name  |
  #     |Email Address |
  #   And filled second page
  #   And enter username "<value>"
  #   Then "<warning>" message is shown
  #     Examples:
  #     |value                        |warning                        | 
  #     |Username                     |Username is Required           |
  #     |test                         |Username must be 6-20 characters long only  |
  #     |thisistotesttheusernameabove20chracters   |Username must be 6-20 characters long only      |
  #     |username@                    |Username must not have special characters |

  #  Scenario Outline: Validation message "<warning>" prompts in the third page for password
  #   When guest clicks "Join" button and continue
  #   And filled first page with valid data
  #     |field      |
  #     |First Name |
  #     |Last Name  |
  #     |Email Address |
  #   And filled second page
  #   And enter password "<value>"
  #   Then "<warning>" message is shown
  #     Examples:
  #     |value                        |warning                        | 
  #     |Password                     |Password is Required           |
  #     |test                         |Password must be 8-20 characters long |
  #     |thisistotesttheusernameabove20chracters   |Password must be 8-20 characters long     |
  #     |password                     |Password must contain symbols from at least three of the following four categories: lowercase letters, uppercase letters, numerical digits (0-9) and special characters (!,@,#,$,%,&,*,(,))|
  
  #  Scenario Outline: Validation message "<warning>" prompts in the third page for confirm password
  #   When guest clicks "Join" button and continue
  #   And filled first page with valid data
  #     |field      |
  #     |First Name |
  #     |Last Name  |
  #     |Email Address |
  #   And filled second page
  #   And enter confirm username "<value>"
  #   Then "<warning>" message is shown
  #     Examples:
  #     |value                        |warning                        | 
  #     |Confirm_password             |Confirm Password is Required   |
  #     |test                         |Passwords Must Match |

  # Scenario: Validation message "<warning>" prompts from Username, Password , Confirm password , Terms and Conditions fields
  #   When guest clicks "Join" button and continue
  #   And filled first page with valid data
  #     |field      |
  #     |First Name |
  #     |Last Name  |
  #     |Email Address |
  #   And filled second page
  #   And click "Create my account" button
  #   Then warning message below is found on each fields:
  #     |fields              |warning|
  #     |Username            |Username is Required|
  #     |Password            |Password is Required|
  #     |Confirm Password    |Confirm Password is Required|
  #     |Terms and Conditions|Please accept Terms and Conditions|