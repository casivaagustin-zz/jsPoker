(function($) {
  
  PokerException = function (message) {
    this.message = message;
  }
  
  Card = function(suite, value) {
    if (suite < 0 || suite >= 4) {
      throw new PokerException("Not Valid Suite");
    }
    
    if (value <= 0 || value > 13) {
      throw new PokerException("Not Valid Value");
    }
    
    this.suite = suite;
    this.value = value;
  }
  
  Card.prototype.isEqual = function(card) {
    if (card instanceof Card) {
      if (this.suite === card.suite
         && this.value === card.value) {
         return true;
      }
    }
    return false;
  }
  
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
      var value = Math.floor(Math.random() * (this.NumberOfCards - 1) + 1); // 1 - 13
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
  
  Hand = function() {
    this.deck = new Deck();
    
    this.deal = function() {
      this.cards = new Array();
      for(var i = 0; i < 5; i++) {
        this.cards.push(this.deck.giveCard());
      }
    }
    
    this.redeal = function() {
      
    }
    
    this.hold = function(cardNumber) {
      
    }
    
    this.unhold = function(cardNumber) {
      
    }
    
    this.deal();
  }
  
  PokerGame = function() {
    
  }
  
  PokerGame.prototype.starts = function() {
    this.hand = new Hand();
    console.log(this.hand.cards);
  }
  
  PokerGame.prototype.deal = function() {
    
  }
  
  PokerGame.prototype.checkGame = function() {
    
  }
  
})(jQuery, document);
