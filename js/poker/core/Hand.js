define(["poker/core/Deck"], function (Deck) {
/**
 * This object holds the cards in the hand.
 */ 
var Hand = function() {
  
  this.deck = new Deck();    //The Deck where the cards comes
  this.holded = new Array(); //Index of card to hold
  this.cards = new Array();  //Cards in the Hand 
 
  /**
   * This create the first hand of cards
   */
  this.deal = function() {
    this.cards = new Array();
    this.holded = new Array(); //Index of card to hold
    this.deck.recoverCards();
    for(var i = 0; i < 5; i++) {
      this.cards.push(this.deck.giveCard());
    }
  }
    
  /**
   * This function changes the unholded cards with new cards
   */
  this.redeal = function() {
    for(var i = 0; i < 5; i++) {
      if (this.isHolded(i) < 0) {
        this.cards[i] = this.deck.giveCard();
      }
    }
  }
    
  /**
   * Checks if the cardNumber is holded
   * @param Int the Card Number
   * @returns -1 on false, >= 0 on true, the number is 
   * the index of the value
   */
  this.isHolded = function(cardNumber) {
    for(var i = 0; i < this.holded.length; i++) { 
      if(this.holded[i] == cardNumber) {
        return i;
      }
    }
    return false;
  }
    
  /**
   * Holds a card for the next deal
   * @param cardNumber The index of the card to hold [0-4]
   */
  this.hold = function(cardNumber) {
    if (cardNumber >= 0 && cardNumber < 5 && typeof(this.cards[cardNumber]) !== 'undefined') {
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
    
  /**
   * Orders the cards by number Value
   * Needed to check games.
   */
  this.order = function() {
    var ordered = new Array();
    while(this.cards.length > 0) {
      var current_index = 0;
      var minimun = this.cards[current_index];
      for(var i = 0; i < this.cards.length; i++) {
        if (this.cards[i].value < minimun.value) {
          current_index = i;
          minimun = this.cards[current_index];
        }
      }
      this.cards.splice(current_index, 1);
      ordered.push(minimun);
    }
    this.cards = ordered; 
  }
    
}

return Hand;
})