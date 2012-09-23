Deck = function () {   
  this.isValid = function(card) {
    for (var i = 0; i < this.givenCards.length; i++) {
      if (card.isEqual(this.givenCards[i])) {
        return false;
      }
    }
    return true;
  }
    
  this.giveCard = function() {
    var suite = Math.floor(Math.random() * 4);
    var value = Math.floor(Math.random() * (this.NumberOfCards - 1)) + 1; // 1 - 13
    var card = new Card(suite, value);
    if (this.isValid(card)) {
      this.givenCards.push(card);
      return card;
    }
    return this.giveCard();
  }
    
  this.suites = ['hearts', 'diamonds', 'clubs', 'spades'];
  this.NumberOfCards = 13;
  this.givenCards = new Array();
}