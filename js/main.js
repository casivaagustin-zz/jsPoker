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
    this.holded = new Array(); //Index of card to hold
    
    this.deal = function() {
      this.cards = new Array();
      for(var i = 0; i < 5; i++) {
        this.cards.push(this.deck.giveCard());
      }
    }
    
    this.redeal = function() {
      for(var i = 0; i < 5; i++) {
        if (this.isHolded(i) < 0) {
          this.cards[i] = this.deck.giveCard();
        }
      }
    }
    
    /**
     * Checks if the cardNumber is holded
     * @returns -1 on false, >= 0 on true, the number is 
     * the index of the value
     */
    this.isHolded = function(cardNumber) {
      for(var i = 0; i < this.holded.length; i++) { 
        if(this.holded[i] == cardNumber) {
          return i;
        }
      }
      return -1;
    }
    
    /**
     * Holds a card for the next deal
     * @param cardNumber The index of the card to hold [0-4]
     */
    this.hold = function(cardNumber) {
      if (cardNumber >= 0 && cardNumber < 5) {
        this.holded.push(cardNumber);
      }
    }
    
    /**
     * Removes the card from holdings a card for the next deal
     * @param cardNumber The index of the card to hold [0-4]
     */
    this.unhold = function(cardNumber) {
      if (cardNumber >= 0 && cardNumber < 5) {
        for(var i = 0; i < this.holded.length; i++) {
          if(this.holded[i] == cardNumber) {
            this.holded.splice(i, 1);
            return;
          }
        }
      }
    }
    
    this.deal();
  }
  
  PokerGame = function() {
    this.phase = PokerGame.FIRST_DEAL;
    this.hand = new Hand();
  }
  
  PokerGame.FIRST_DEAL = 'first_deal';
  PokerGame.SECOND_DEAL = 'second_deal';
  
  PokerGame.prototype.deal = function() {
    if (this.phase == PokerGame.FIRST_DEAL) {
      this.hand.deal();
      this.phase = PokerGame.SECOND_DEAL;
    } else {
      this.hand.redeal();
      this.checkGame();
      this.phase = PokerGame.FIRST_DEAL;
    }
  }
  
  PokerGame.prototype.checkGame = function() {
    console.log('I will check');
  }
  
})(jQuery, document);
