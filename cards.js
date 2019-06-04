const _ = require('lodash');
const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

function generateDeck() {
  let deck = [];

  for(let i = 0, iLen = suits.length; i<iLen; i++) {
    for(let j = 0, jLen = values.length; j<jLen; j++) {
      deck.push({
        suit: suits[i],
        value: values[j],
        valueIndex: j
      });
    }
  }
  if(deck.length != 52) throw new Error('something went wrong in deck generation');
  return deck;
}

function getShuffledDeck() {
  let deck = generateDeck();
  return _.shuffle(deck);
}

module.exports.getShuffledDeck = getShuffledDeck;

function dealCards(numPlayers, deck) {
  let hands = [];
  for(let i = 0; i<numPlayers; i++) {
    hands.push([]);
  }

  for(let i = 0, len = deck.length; i<len; i++) {
    let player = i % numPlayers;
    let hand = hands[player];
    hand.push(deck[i]);
  }
  return hands;
} 

module.exports.dealCards = dealCards;