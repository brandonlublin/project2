# project2
This is group project number 2
## KEBÄBbb: A Trivia Experience
###### Group Project #2

Fibbage type application that uses chat amongst players so you can have teams and play on your own computer. **Our mvp is just the game itself.** 
- If you don’t know what fibbage is, it’s like a multiplayer trivia game that you play on your own computer

### Team Members
- Gabbi Stein - PM
- Stephen Cheng - 
- Brandon Lublin - 
- Kurtis Santillanes -

### New tech
- Use Colyseus for multiplayer gameplay
- Passport for login or express-session, whichever seems easiest and most efficient
- Lots of css animations for an exciting UI

### MVP PSUEDOCODE
Landing Page: 
- User enters site and enters name. 
- Submit

Question Input:
- User is prompted with the first question with blank to fill in
- On submit, modal appears with "wait for others" text

Game Loop (4 rounds, each round increasing in point values):
- Question Input (20 seconds):
    - User is prompted with the first question with blank to fill in
    - Each player/team has 20 seconds to give their best/funniest answer
    - On submit, modal appears with "wait for others" text
    - When all players submit answer OR on timeout, move to answers.
- Answer Reveal (~ seconds):
    - 4 rounds, each round increasing in point values. Points will be stored in the database after each round, and added up at the completion of the 4th round
- Loop (~ times):
    - Reset clock and start after each question is displayed on the screen
    - Point values increase

Final Result:
- Show result
- Present "start over" button option

### POST MVP

Landing Page: 
- Landing page: small description of game, logo at top
- User signs in with username and password
- If no account, user creates account
    - http://www.passportjs.org/
- Submit

Lobby:
- User is routed to lobby where they can see how many players are available
- Once all players join room (8 max?) ask if they want to join teams or play individually
    - If teams, join increments of two players and store in an object of teamPlayers
        - Teams will have the option to have a chat on their devices to sync up what their answer will be without having to whisper or talk out loud
    - If individual, each player has their own player object
- When all players submit answer OR on timeout, move to game loop

Game Loop (4 rounds, each round increasing in point values):
- Question Input (20 seconds):
    - User is prompted with the first question with blank to fill in
    - Each player/team has 20 seconds to give their best/funniest answer
    - On submit, modal appears with "wait for others" text
    - When all players submit answer OR on timeout, move to answers.
- Answer Reveal (~ seconds):
    - 4 rounds, each round increasing in point values. Points will be stored in the database after each round, and added up at the completion of the 4th round
- Loop (~ times):
    - Reset clock and start after each question is displayed on the screen
    - Point values increase

Final Result:
- Show result
- Present "start over" button option