const _ = require('lodash');

class Player {
  constructor(hand) {
    this.hand = hand;
    this.pile = [];
  }

  cardCount() {
    return this.hand.length + this.pile.length;
  }

  hasCards() {
    return this.hand.length > 0 || this.pile.length > 0;
  }

  getCard() {
    let card;
    if(this.hand.length > 0) {
      card = this.hand.shift();
    } else if(this.pile.length > 0) {
      this.hand = _.shuffle(this.pile);
      this.pile = [];
      card = this.hand.shift();
    }
    return card;
  }

  toString() {
    return `h:${this.hand.length} p:${this.pile.length}`;
  }
}

module.exports = Player;