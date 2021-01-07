# The ludo game

This is my first project using JavaScript to display my understanding and ability to use the language and build interactive websites.

* The main purpose of this game is provide a funny moment to the player.
* The player will have the chance to choose to play against a robot or another human player.

The live version of this game can be viewed [here](https://thiagoluizfb.github.io/ludogame/)

----------------------------------------------------------------------------------------------------------------------------------------

# User Experience - UX 


- ## User stories
  - I am a Ludo fan and I would like play the game in my computer or in a mobile.
  - I would like to play Ludo with my friends or against the machine;
  - When playing against the machine, I would like to challenging opponent to have a sense of competitiveness;
  - I would like to have an interactive and imersive moments that reminds me the live board game.


- ## Design

  - ### Colours and Positioning
    - The main background colour throughout the website is lightgreen, dark purple was used to contrast the background, used in menus and dice;
    - The board was designed to be always in the center of the page, regardless the device used, it is shown only in portrait position of the device, or if the height of the screen is higher than the board + dice size;
    - The board is zoomed in or out according to the screen size;
    - The colours of the main menu is correspondent to the colour of the players in the game.
    
  - ### Typography
     - The entire website used only two fonts. The game title uses the Luckiest Guy font, while the all the other letters and numbers are under the Acme family. These two fonts were selected due to their attractive appearance which matches with the purpose of the website.
     
     
  - ### Wireframe
     - The initial wireframe for this project can be found [here](https://xd.adobe.com/view/f42bf006-739d-4402-624e-0fbf4cdd84f0-821a/).

---------------------------------------------------------------------------------------------------------------------------------------

# Features

- ## General
  - ## Sounds are played to grab the attention of the player
    - When it is the player turn;
    - When the dice are selected;
    - When a token is moving;
    
- ## Dice
  * When it is a player turn, the dice has a pulsing animation;
  * When the dice is clicked, it will show an animation simulating the dice rolling;
  * When it shows double dice, they become golden;

- ## Tokens
  * When showing the move options, the tokens are highlighted with the options available;
  * When a token moves, animation was added to give the sensation of movement from-to;
  * When a position is blocked by two tokens, they share the space by slightly moving left-top and right-bottom;
  * When a token is hit by another, it is sent home to its initial position.
  * When playing as a robot, the token will always try to end its movement on a safe place to make the game more dynamic.
  
----------------------------------------------------------------------------------------------------------------------------------------

# Technologies Used

## Languages Used

-   [HTML5](https://en.wikipedia.org/wiki/HTML5);
-   [CSS3](https://en.wikipedia.org/wiki/Cascading_Style_Sheets).
-   [JAVASCRIPT](https://en.wikipedia.org/wiki/JavaScript).

## Frameworks, Libraries & Programs Used

1. [Bootstrap 4.5:](https://getbootstrap.com/docs/4.5/getting-started/introduction/)
    - Bootstrap was used to assist with positioning.
1. [Google Fonts:](https://fonts.google.com/)
    - Google fonts were used to import the 'Luckiest Guy' and 'Acme' fonts into the style.css file which is used on all pages throughout the project.
1. [Font Awesome 5.6.3:](https://fontawesome.com/)
    - Font Awesome was used to style the dice, trophy and star on the board.
1. [Git](https://git-scm.com/)
    - Git was used for version control by utilizing the Gitpod terminal to commit to Git and Push to GitHub.
1. [GitHub:](https://github.com/)
    - GitHub is used to store the projects code after being pushed from Git.
1. [Adobe Xd:](https://www.adobe.com/products/xd.html)
    - Adobe Xd was used to create the initial [wireframe](https://xd.adobe.com/view/f42bf006-739d-4402-624e-0fbf4cdd84f0-821a/) for this project

---------------------------------------------------------------------------------------------------------------------------------------

# Testing

The W3C Markup Validator and W3C CSS Validator Services were used to validate every page of the project to ensure there were no syntax errors in the project.

-   [W3C Markup Validator](https://jigsaw.w3.org/css-validator/#validate_by_input)
-   [W3C CSS Validator](https://jigsaw.w3.org/css-validator/#validate_by_input)
-   [JS Hint](https://jshint.com/)

## Testing User Stories from User Experience (UX) Section

  ### I am a Ludo fan and I would like play the game in my computer or in a mobile
  
  - The game was developed to be responsive, it keeps a nice resolution across different devices.
  
  ![Responsive Ludo](https://user-images.githubusercontent.com/62474197/103904280-fb1a9e00-50f4-11eb-9941-c79afc4b6617.png) 

  
  
  ### I would like to play Ludo with my friends or against the machine
  
  - Ludo is a board game made for 2 or 4 players, this options is also available in this developed game. The user has the option to play against another players (in the same device) or against the machine.
  - The options are available before the game starts.
  
  ![Ludo Multiplayer](https://user-images.githubusercontent.com/62474197/103907672-7c742f80-50f9-11eb-90ab-e26b09f909bb.png)
  
  
  
  ### When playing against the machine, I would like to challenging opponent to have a sense of competitiveness;
  
  - The game has a special feature that allows the player to play against the machine. It can be challenging, specially if it is programated to optimize its moves to the best option possible.
  - An AI was created to promote some challenge. It plays defensively, instead of trying to hit the oppenent, it will always play with the token that will end the movement in a safe places present in the board.
  
  ![Ludo AI safe spaces](https://user-images.githubusercontent.com/62474197/103924476-fa423600-510d-11eb-88f9-c06299558427.png)
  
  
  
  ### I would like to have an interactive and imersive moments that reminds me the live board game.
  
  - The game has sounds and highlights to grab the player's attention and make it intuitive

## Further Testing

-   The Website was tested on Google Chrome, Internet Explorer and Microsoft Edge browsers;
-   The website was viewed on a variety of devices such as Desktop in multiple screen sizes, iPad, iPad Pro, Moto G4, Galaxy S5, Xiaomi M3, Nokia 6, Pixel 2, Pixel 2XL, iPhone 5/SE, iPhone 6/7/8+Plus models and iPhoneX.

## Issues acknowledgement

- Game is not fully finished;
- It is missing styled alerts;
- The game does not end until all pieces of the board are at the end, no special rule was coded for the end of the game;
- There is a bug that does not block the pieces in the last lane;
- Once started, the settings cannot be reconfigured.

---------------------------------------------------------------------------------------------------------------------------------------

# Credits

-   This ReadMe file was based on a sample available on [Code Institute Solutions repositories](https://github.com/Code-Institute-Solutions)

-   Quick information of "how to" was promplty found on [W3Schools](https://www.w3schools.com/)

-   To all comunity present in stackoverflow, where quick questions were easily found.

-   The game rules were based on this [post](https://howdoyouplayit.com/parcheesi-rules-play-parcheesi/) (rules can slightly vary)
---------------------------------------------------------------------------------------------------------------------------------------- 

# Acknowledgements

-   My Mentor for continuous helpful feedback.

-   Code Institute video classes with its helpful content.

-   My wife, Cristina, who supported me pantiently in the long hours spent coding (again)
