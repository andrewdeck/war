const _ = require('lodash');
const ProgressBar = require('progress');

const Cards = require('./cards.js');
const Player = require('./player')

const NUM_SAMPLES = 1000000;
let totalTurns = 0;

let bar = new ProgressBar('[:bar] :percent :elapseds', {total: NUM_SAMPLES});

for(let i=0; i<NUM_SAMPLES; i++) {
  let turns = playWar();
  bar.tick();
  totalTurns += turns;
}

console.log(`Average # of Turns: ${Math.round(totalTurns/NUM_SAMPLES)}`);

function playWar() {
  let numberOfTurns = 0;
  let deck = Cards.getShuffledDeck();
  let hands = Cards.dealCards(2, deck);

  let playerOne = new Player(hands[0]);
  let playerTwo = new Player(hands[1]);

  while(playerOne.hasCards() && playerTwo.hasCards()){
    let playerOneCard = playerOne.getCard();
    let playerTwoCard = playerTwo.getCard();

    if(playerOneCard.valueIndex > playerTwoCard.valueIndex) {
      playerOne.pile.push(playerOneCard, playerTwoCard);
    } else if (playerTwoCard.valueIndex > playerOneCard.valueIndex) {
      playerTwo.pile.push(playerOneCard, playerTwoCard);
    } else { // tie
      let winnerCards = [];

      while(playerOneCard && playerTwoCard && playerOneCard.valueIndex === playerTwoCard.valueIndex ) {
        winnerCards.push(playerOneCard, playerTwoCard);
        winnerCards.push(playerOne.getCard(), playerTwo.getCard());
        playerOneCard = playerOne.getCard();
        playerTwoCard = playerTwo.getCard();
      }

      if(!playerOneCard) {
        playerTwo.pile.push(...winnerCards); // win condition
      } else if (!playerTwoCard) {
        playerOne.pile.push(...winnerCards); // win condition
      } else if (playerOneCard.valueIndex > playerTwoCard.valueIndex) {
        playerOne.pile.push(...winnerCards);
        playerOne.pile.push(playerOneCard, playerTwoCard);
      } else if (playerTwoCard.valueIndex > playerOneCard.valueIndex) {
        playerTwo.pile.push(...winnerCards);
        playerTwo.pile.push(playerOneCard, playerTwoCard);
      }
    }

    numberOfTurns++;
  }
  return numberOfTurns;
}