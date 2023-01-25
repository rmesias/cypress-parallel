Feature: Self Assessment

  Scenario: Safer Gaming modal
    When member click Safer Gaming at the profile option
    Then Safer Gaming modal is shown

  Scenario: Admin view Self Assessment
    Given browser is at member Profile settings Safer Gaming History modal
    And navigate to "Self Assessment"
    Then Safer Gaming "Self Assessment" content fields is displayed

  Scenario: Self Assessment
    Given browser is at member Profile settings Safer Gaming History modal
    When member clicks "Self Assessment"
    Then Gambling Self Assessment exist
  
  Scenario: Self Assessment Terms of Use
    Given browser is at member Profile settings Safer Gaming History modal
    When member clicks "Self Assessment"
    Then Self Assessment Terms of Use exist

  
  Scenario: Self Assessment 13 Sentences Low Indicator feedback
    Given browser is at member Profile settings Safer Gaming History modal
    When member clicks "Self Assessment"
    Then Self Assessment 13, products, gambling time and Low Indicator feedback
        |tablist                                                                                        |number|btn      |
        |I gamble for longer than I intend to or lose track of time                                     |0     |Continue |
        |Other people think that I gamble too much                                                      |0     |Continue |
        |I spend time gambling when I should be doing something else                                    |0     |Continue |
        |I gamble more money than I intend to or stake more if I am in profit                           |0     |Continue |
        |I try to win back money that I have lost gambling                                              |0     |Continue |
        |I gamble with money needed for something else or borrow money to gamble                        |0     |Continue |
        |I do not tell other people about how much time and money I spend on my gambling                |0     |Continue |
        |I feel bad when I think about my gambling                                                      |0     |Continue |
        |My gambling has left me short of money needed for something else                               |0     |Continue |
        |I feel restless or irritated when I am not gambling or after I have finished a gambling session|0     |Continue |
        |I take short breaks before starting my next gambling session                                   |0     |Continue |
        |I gamble on products and services I have little or no knowledge about                          |0     |Continue |
        |I have problems controlling my gambling                                                        |0     |Continue |
        |What do you usually gamble on?                                                                 |Bingo |Continue |
        |How much do you usually gamble?                                                                |No more than one day a month|Continue |
  
  Scenario: Self Assessment 13 Sentences Medium Indicator feedback
    Given browser is at member Profile settings Safer Gaming History modal
    When member clicks "Self Assessment"
    Then Self Assessment 13, products, gambling time and Medium Indicator feedback
        |tablist                                                                                        |number|btn      |
        |I gamble for longer than I intend to or lose track of time                                     |3     |Continue |
        |Other people think that I gamble too much                                                      |3     |Continue |
        |I spend time gambling when I should be doing something else                                    |3     |Continue |
        |I gamble more money than I intend to or stake more if I am in profit                           |3     |Continue |
        |I try to win back money that I have lost gambling                                              |3     |Continue |
        |I gamble with money needed for something else or borrow money to gamble                        |3     |Continue |
        |I do not tell other people about how much time and money I spend on my gambling                |3     |Continue |
        |I feel bad when I think about my gambling                                                      |3     |Continue |
        |My gambling has left me short of money needed for something else                               |3     |Continue |
        |I feel restless or irritated when I am not gambling or after I have finished a gambling session|3     |Continue |
        |I take short breaks before starting my next gambling session                                   |3     |Continue |
        |I gamble on products and services I have little or no knowledge about                          |3     |Continue |
        |I have problems controlling my gambling                                                        |2     |Continue |
        |What do you usually gamble on?                                                                 |Bingo |Continue |
        |How much do you usually gamble?                                                                |No more than one day a month|Continue |

Scenario: Self Assessment 13 Sentences High Indicator feedback
    Given browser is at member Profile settings Safer Gaming History modal
    When member clicks "Self Assessment"
    Then Self Assessment 13, products, gambling time and High Indicator feedback
        |tablist                                                                                        |number|btn      |
        |I gamble for longer than I intend to or lose track of time                                     |5     |Continue |
        |Other people think that I gamble too much                                                      |5     |Continue |
        |I spend time gambling when I should be doing something else                                    |5     |Continue |
        |I gamble more money than I intend to or stake more if I am in profit                           |5     |Continue |
        |I try to win back money that I have lost gambling                                              |5     |Continue |
        |I gamble with money needed for something else or borrow money to gamble                        |5     |Continue |
        |I do not tell other people about how much time and money I spend on my gambling                |5     |Continue |
        |I feel bad when I think about my gambling                                                      |5     |Continue |
        |My gambling has left me short of money needed for something else                               |5     |Continue |
        |I feel restless or irritated when I am not gambling or after I have finished a gambling session|5     |Continue |
        |I take short breaks before starting my next gambling session                                   |5     |Continue |
        |I gamble on products and services I have little or no knowledge about                          |5     |Continue |
        |I have problems controlling my gambling                                                        |5     |Continue |
        |What do you usually gamble on?                                                                 |Bingo |Continue |
        |How much do you usually gamble?                                                                |No more than one day a month|Continue |

  Scenario: Self Assessment 13 Sentences Low risk
    Given browser is at member Profile settings Safer Gaming History modal
    When member clicks "Self Assessment"
    Then Self Assessment 13, products, gambling time and Low risk result 
        |tablist                                                                                        |number|btn      |
        |I gamble for longer than I intend to or lose track of time                                     |0     |Continue |
        |Other people think that I gamble too much                                                      |0     |Continue |
        |I spend time gambling when I should be doing something else                                    |0     |Continue |
        |I gamble more money than I intend to or stake more if I am in profit                           |0     |Continue |
        |I try to win back money that I have lost gambling                                              |0     |Continue |
        |I gamble with money needed for something else or borrow money to gamble                        |0     |Continue |
        |I do not tell other people about how much time and money I spend on my gambling                |0     |Continue |
        |I feel bad when I think about my gambling                                                      |0     |Continue |
        |My gambling has left me short of money needed for something else                               |0     |Continue |
        |I feel restless or irritated when I am not gambling or after I have finished a gambling session|0     |Continue |
        |I take short breaks before starting my next gambling session                                   |0     |Continue |
        |I gamble on products and services I have little or no knowledge about                          |0     |Continue |
        |I have problems controlling my gambling                                                        |0     |Continue |
        |What do you usually gamble on?                                                                 |Bingo |Continue |
        |How much do you usually gamble?                                                                |No more than one day a month|Continue |
        |Results                                                                                        |Your gambling appears to be under control.|Continue |
        |What have we found out?        |PLEASE CONTINUE TO GAMBLE SAFELY AND BE AWARE OF THE TOOLS AND SUPPORT AVAILABLE TO YOU AT ALL TIMES. DOING THE ASSESSMENT PERIODICALLY WILL HELP YOU STAY IN CONTROL OF YOUR GAMBLING.|Submit|

Scenario: Self Assessment 13 Sentences Low-Medium risk
    Given browser is at member Profile settings Safer Gaming History modal
    When member clicks "Self Assessment"
    Then Self Assessment 13, products, gambling time and Low-Medium risk result 
        |tablist                                                                                        |number|btn      |
        |I gamble for longer than I intend to or lose track of time                                     |3     |Continue |
        |Other people think that I gamble too much                                                      |3     |Continue |
        |I spend time gambling when I should be doing something else                                    |3     |Continue |
        |I gamble more money than I intend to or stake more if I am in profit                           |0     |Continue |
        |I try to win back money that I have lost gambling                                              |0     |Continue |
        |I gamble with money needed for something else or borrow money to gamble                        |0     |Continue |
        |I do not tell other people about how much time and money I spend on my gambling                |0     |Continue |
        |I feel bad when I think about my gambling                                                      |0     |Continue |
        |My gambling has left me short of money needed for something else                               |0     |Continue |
        |I feel restless or irritated when I am not gambling or after I have finished a gambling session|0     |Continue |
        |I take short breaks before starting my next gambling session                                   |3     |Continue |
        |I gamble on products and services I have little or no knowledge about                          |0     |Continue |
        |I have problems controlling my gambling                                                        |3     |Continue |
        |What do you usually gamble on?                                                                 |Bingo |Continue |
        |How much do you usually gamble?                                                                |No more than one day a month|Continue |
        |Results                                                                                        |There is a slight risk that you will develop signs of problem gambling.|Continue |
        |What have we found out?        |PLEASE GAMBLE SAFELY AND BE AWARE OF THE TOOLS AND SUPPORT AVAILABLE TO YOU AT ALL TIMES. MAKING SMALL CHANGES AND DOING THE ASSESSMENT PERIODICALLY WILL HELP YOU STAY IN CONTROL OF YOUR GAMBLING.|Submit|

Scenario: Self Assessment 13 Sentences Medium risk
    Given browser is at member Profile settings Safer Gaming History modal
    When member clicks "Self Assessment"
    Then Self Assessment 13, products, gambling time and Medium risk result 
        |tablist                                                                                        |number|btn      |
        |I gamble for longer than I intend to or lose track of time                                     |3     |Continue |
        |Other people think that I gamble too much                                                      |3     |Continue |
        |I spend time gambling when I should be doing something else                                    |3     |Continue |
        |I gamble more money than I intend to or stake more if I am in profit                           |3     |Continue |
        |I try to win back money that I have lost gambling                                              |3     |Continue |
        |I gamble with money needed for something else or borrow money to gamble                        |0     |Continue |
        |I do not tell other people about how much time and money I spend on my gambling                |0     |Continue |
        |I feel bad when I think about my gambling                                                      |0     |Continue |
        |My gambling has left me short of money needed for something else                               |0     |Continue |
        |I feel restless or irritated when I am not gambling or after I have finished a gambling session|0     |Continue |
        |I take short breaks before starting my next gambling session                                   |3     |Continue |
        |I gamble on products and services I have little or no knowledge about                          |3     |Continue |
        |I have problems controlling my gambling                                                        |3     |Continue |
        |What do you usually gamble on?                                                                 |Bingo |Continue |
        |How much do you usually gamble?                                                                |No more than one day a month|Continue |
        |Results                                                                                        |There is a higher risk that you will develop signs of problem gambling.|Continue |
        |What have we found out?        |IT MIGHT BE A GOOD IDEA TO PUT SOME BLOCKS IN PLACE AND MAKE CHANGES TO MAKE IT HARDER FOR YOURSELF TO GAMBLE WHEN YOU GET THE URGE. PLEASE SEE THE SUPPORT AND TOOLS THAT ARE AVAILABLE.|Submit|

Scenario: Self Assessment 13 Sentences Medium-High risk
    Given browser is at member Profile settings Safer Gaming History modal
    When member clicks "Self Assessment"
    Then Self Assessment 13, products, gambling time and Medium-High risk result 
        |tablist                                                                                        |number|btn      |
        |I gamble for longer than I intend to or lose track of time                                     |5     |Continue |
        |Other people think that I gamble too much                                                      |5     |Continue |
        |I spend time gambling when I should be doing something else                                    |5     |Continue |
        |I gamble more money than I intend to or stake more if I am in profit                           |5     |Continue |
        |I try to win back money that I have lost gambling                                              |5     |Continue |
        |I gamble with money needed for something else or borrow money to gamble                        |0     |Continue |
        |I do not tell other people about how much time and money I spend on my gambling                |0     |Continue |
        |I feel bad when I think about my gambling                                                      |0     |Continue |
        |My gambling has left me short of money needed for something else                               |0     |Continue |
        |I feel restless or irritated when I am not gambling or after I have finished a gambling session|0     |Continue |
        |I take short breaks before starting my next gambling session                                   |5     |Continue |
        |I gamble on products and services I have little or no knowledge about                          |5     |Continue |
        |I have problems controlling my gambling                                                        |5     |Continue |
        |What do you usually gamble on?                                                                 |Bingo |Continue |
        |How much do you usually gamble?                                                                |No more than one day a month|Continue |
        |Results                                                                                        |You are showing some signs of problem gambling.|Continue |
        |What have we found out?        |PROBLEM GAMBLING CAN BE PREVENTED EARLY THROUGH PROFESSIONAL ADVICE AND BY MAKING CHANGES TO MAKE IT HARDER FOR YOURSELF TO GAMBLE. PLEASE SEE THE SUPPORT AND TOOLS THAT ARE AVAILABLE.|Submit|


Scenario: Self Assessment 13 Sentences High risk
    Given browser is at member Profile settings Safer Gaming History modal
    When member clicks "Self Assessment"
    Then Self Assessment 13, products, gambling time and High risk result 
        |tablist                                                                                        |number|btn      |
        |I gamble for longer than I intend to or lose track of time                                     |5     |Continue |
        |Other people think that I gamble too much                                                      |5     |Continue |
        |I spend time gambling when I should be doing something else                                    |5     |Continue |
        |I gamble more money than I intend to or stake more if I am in profit                           |5     |Continue |
        |I try to win back money that I have lost gambling                                              |5     |Continue |
        |I gamble with money needed for something else or borrow money to gamble                        |5     |Continue |
        |I do not tell other people about how much time and money I spend on my gambling                |0     |Continue |
        |I feel bad when I think about my gambling                                                      |0     |Continue |
        |My gambling has left me short of money needed for something else                               |5     |Continue |
        |I feel restless or irritated when I am not gambling or after I have finished a gambling session|0     |Continue |
        |I take short breaks before starting my next gambling session                                   |5     |Continue |
        |I gamble on products and services I have little or no knowledge about                          |5     |Continue |
        |I have problems controlling my gambling                                                        |5     |Continue |
        |What do you usually gamble on?                                                                 |Bingo |Continue |
        |How much do you usually gamble?                                                                |No more than one day a month|Continue |
        |Results                                                                                        |You are showing clear signs of problem gambling.|Continue |
        |What have we found out?        |YOU SHOULD SEEK PROFESSIONAL SUPPORT AND MAKE SOME MAJOR CHANGES TO YOUR ROUTINE TO ENSURE YOU DO NOT COMPLETELY LOSE CONTROL. PLEASE SEE THE SUPPORT AND TOOLS THAT ARE AVAILABLE.|Submit|

Scenario: Self Assessment 13 Sentences very High risk
    Given browser is at member Profile settings Safer Gaming History modal
    When member clicks "Self Assessment"
    Then Self Assessment 13, products, gambling time and very High risk result 
        |tablist                                                                                        |number|btn      |
        |I gamble for longer than I intend to or lose track of time                                     |5     |Continue |
        |Other people think that I gamble too much                                                      |5     |Continue |
        |I spend time gambling when I should be doing something else                                    |5     |Continue |
        |I gamble more money than I intend to or stake more if I am in profit                           |5     |Continue |
        |I try to win back money that I have lost gambling                                              |5     |Continue |
        |I gamble with money needed for something else or borrow money to gamble                        |5     |Continue |
        |I do not tell other people about how much time and money I spend on my gambling                |5     |Continue |
        |I feel bad when I think about my gambling                                                      |5     |Continue |
        |My gambling has left me short of money needed for something else                               |5     |Continue |
        |I feel restless or irritated when I am not gambling or after I have finished a gambling session|5     |Continue |
        |I take short breaks before starting my next gambling session                                   |5     |Continue |
        |I gamble on products and services I have little or no knowledge about                          |5     |Continue |
        |I have problems controlling my gambling                                                        |5     |Continue |
        |What do you usually gamble on?                                                                 |Bingo |Continue |
        |How much do you usually gamble?                                                                |No more than one day a month|Continue |
        |Results                                                                                        |You are showing very clear signs of problem gambling.|Continue |
        |What have we found out?        |YOU SHOULD NOT BE GAMBLING AND SHOULD SEEK PROFESSIONAL SUPPORT IN ORDER TO MAKE POSITIVE CHANGES TO YOUR ROUTINE. PLEASE SEE THE SUPPORT AND TOOLS THAT ARE AVAILABLE.|Submit|
