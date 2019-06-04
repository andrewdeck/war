const _ = require('lodash');
const Cards = require('./cards.js');


function playWar() {
  let numberOfTurns = 0;
  let deck = Cards.getShuffledDeck();
  let hands = Cards.dealCards(2, deck);

  let playerOne = {
    hand: hands[0],
    pile: []
  };
  let playerTwo = {
    hand: hands[1],
    pile: []
  }

  while(playerOne.hand.length > 0 && playerTwo.hand.length > 0){
    let playerOneCard = playerOne.hand.shift();
    let playerTwoCard = playerTwo.hand.shift();

    if(playerOneCard.valueIndex > playerTwoCard.valueIndex) {
      playerOne.pile.push(playerOneCard, playerTwoCard);
    } else if (playerTwoCard.valueIndex > playerOneCard.valueIndex) {
      playerTwo.pile.push(playerOneCard, playerTwoCard);
    }


    shuffleIfHandIsEmpty(playerOne);
    shuffleIfHandIsEmpty(playerTwo);
    numberOfTurns++;
    console.log(`P1: h ${playerOne.hand.length} p ${playerOne.pile.length} P2: h ${playerTwo.hand.length} p ${playerTwo.pile.length}`);
  }
  console.log(`The game took ${numberOfTurns} turns`);
  return numberOfTurns;
}

function shuffleIfHandIsEmpty(player) {
  let {hand, pile} = player;

  if(hand.length === 0 && pile.length !== 0) {
    player.hand = _.shuffle(pile);
    player.pile = [];
  }
}


playWar();