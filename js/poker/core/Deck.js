define(["poker/core/Card"], function(Card) {
/**
 * Defines a Deck
 */
var Deck = function () {   
  this.isValid = function(card) {
    for (var i = 0; i < this.givenCards.length; i++) {
      if (card.isEqual(this.givenCards[i])) {
        return false;
      }
    }
    return true;
  }
    
  this.giveCardImp = function() {
    var suite = Math.floor(Math.random() * 4);
    var value = Math.floor(Math.random() * (this.NumberOfCards - 1)) + 1; // 1 - 13
    var card = new Card(suite, value);
    if (this.isValid(card)) {
      this.givenCards.push(card);
      return card;
    }
    return this.giveCard();
  }
    
  this.giveCard = function() {
    try { //Hack to avoid stack limit
        return this.giveCardImp();
    } catch(e) {
        console.log(e);
        return this.giveCard();
    }
  }

  this.recoverCards = function () {
      this.givenCards = new Array();
  }

  this.suites = ['hearts', 'diamonds', 'clubs', 'spades'];
  this.NumberOfCards = 13;
  this.givenCards = new Array();
}

return Deck;
});