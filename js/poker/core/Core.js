/**
 * Defines a new type of exception for the game
 */
PokerException = function (message) {
  this.message = message;
}

/**
 * Makes a new Card Object
 * 
 * @param Int suite 
 * @param Int value
 */
Card = function(suite, value) {
    if (suite < 0 || suite >= 4) {
        throw new PokerException("Not Valid Suite");
    }

    if (value < 1 || value > 13) {
        throw new PokerException("Not Valid Value");
    }

    this.suite = suite;
    this.value = value;
}

/**
 * Checks if two cards are equals
 */
Card.prototype.isEqual = function(card) {
    if (card instanceof Card) {
        if (this.suite === card.suite
                && this.value === card.value) {
            return true;
        }
    }
    return false;
}

/**
  Returns a String with the name of the card, usefull for bind the card with a CSS
 */
Card.prototype.getCardIndex = function() {
    var cardIndex = '';
    switch(this.suite) {
        case 0:
            cardIndex = 'heart';
        break;
        case 1:
            cardIndex = 'diamond';
        break;
        case 2:
            cardIndex = 'spade';
        break;
        case 3:
            cardIndex = 'club';
        break;
    }
    return cardIndex + this.value;
}

/**
 * Defines a Deck
 */
Deck = function () {   
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

/**
 * This object holds the cards in the hand.
 */ 
Hand = function() {
  
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

/**
 * Object to keep the data of the player
 */
var Player = {};

Player.bet = 1; //Current Player Bet
Player.coins = 39; //Current Coins

/**
 * The player get the paid of prize
 */
Player.collect = function (prize) {
    prize *= this.bet;
    this.coins += prize;
}

/**
 * The player must pay the bet or the computer will break his legs.
 */
Player.pay = function () {
    if (this.bet > this.coins) {
        this.bet = this.coins; //No legs broken, I forgive you.
    }
    this.coins -= this.bet;
    if (this.coins < 0) {
        this.coins = 0;
    }
}

/**
 * Stupid, but just in case, this function Icrease the bet
 */
Player.increaseBet = function () {
    if (0 < this.coins) { 
        this.coins -= 1;
        this.bet += 1;
    } else {
        this.coins += this.bet - 1;
        this.bet = 1; //reinitialize the counter
    }
}

/**
 * This Object keeps the logic of the game.
 */
PokerGame = function() {
  this.phase = PokerGame.START;
  this.hand = new Hand();
  this.Player = Player;
}

/** States of the Game **/
PokerGame.START = 'start';
PokerGame.FIRST_DEAL = 'first_deal';
PokerGame.SECOND_DEAL = 'second_deal';
  
//Posible Hands
PokerGame.STRAIGHT = 'straight';
PokerGame.FLUSH = 'flush';
PokerGame.STRAIGHT_FLUSH = 'straight flush';
PokerGame.ROYALE_STRAIGHT_FLUSH = 'royale straight flush';
PokerGame.SINGLE_PAIR = 'single pair';
PokerGame.DOUBLE_PAIR = 'double pair';
PokerGame.THREE_OF_A_KIND = 'three of a kind';
PokerGame.FOUR_OF_A_KIND = 'four of a kind';
PokerGame.FULL_HOUSE = 'full house';
PokerGame.EMPTY = 'empty';

//Prizes
PokerGame.Prizes = {
    'royale straight flush' : 500,
    'straight flush' : 100,
    'four of a kind' : 40,
    'full house' : 10,
    'flush' : 7,
    'straight': 5,
    'three of a kind' : 3,
    'double pair' : 2,
    'single pair' : 1
}

/**
 * Refresh the Cards
 */
PokerGame.prototype.deal = function() {
  if (this.phase == PokerGame.START) {
    this.hand.deal();
    this.phase = PokerGame.FIRST_DEAL;
  } else if (this.phase == PokerGame.FIRST_DEAL) {
    this.hand.redeal();
    this.phase = PokerGame.SECOND_DEAL;
  } else {
    this.hand = new Hand(); //New Hand
    this.phase = PokerGame.START;
  }
}
  
/**
 * Check if the Hand have a flush.
 * @return true or false
 */
PokerGame.prototype.isFlush = function () {
  var suite = this.hand.cards[0].suite;
  for(var i = 1; i < 5; i++) {
    if (suite !== this.hand.cards[i].suite) {
      return false;
    }
  }
  return true;
}
  
/**
 * Checks if the Hand have a straight
 * @return true or false
 */
PokerGame.prototype.isStraight = function () {
  var sequence = true;
  var i = 0;
  while(sequence && i < 4) {
    if ((this.hand.cards[i].value + 1) !== this.hand.cards[i+1].value) {
      sequence = false;
    }
    i += 1;
  }
    
  if (!sequence) {
    sequence = this.isRoyaleStraight();
  }
    
  return sequence;
}
  
/**
 * Checks if the hand have a royale streight.
 * @return true or false
 */
PokerGame.prototype.isRoyaleStraight = function() {
  var sum = 0;
  for(var i = 0; i < 5; i++) {
    sum += this.hand.cards[i].value;
  }
  if (sum === 47) {
    return true;
  }
  return false;
}

/**
 * Gets a counter of sequences of the same value cards
 * @returns array, an entry per each repeated value card.
 */
PokerGame.prototype.getSequences = function() {
  var sequences = new Array();
  for(var i = 0; i < 5; i++) {
    for(var j = i + 1; j < 5; j++) {
      if (this.hand.cards[i].value == this.hand.cards[j].value) {
        if ((j-i) == 1) {
          sequences.push(2); 
        } else {
          sequences[sequences.length - 1]++;
        }
      } else {
        i = j - 1;
        break;
      }
    }
  }  
  return sequences; 
}
  
/**
 * Checks if the user won any game.
 * @returns String the Game Name or empty.
 */
PokerGame.prototype.checkGame = function() {
  var haveFlush = false;
  var haveStraight = false;
  var sequences = false;
  
  if (this.phase !== PokerGame.SECOND_DEAL) {
    throw new PokerException('Must Deal Again');
  }
  
  this.hand.order();
  sequences = this.getSequences();
  
  if (sequences.length == 1) {
    switch(sequences[0]) {
      case 2:
        return PokerGame.SINGLE_PAIR;
      case 3:
        return PokerGame.THREE_OF_A_KIND;
      case 4:
        return PokerGame.FOUR_OF_A_KIND;
    }
  }
  
  if (sequences.length == 2) {
    if (sequences[0] == 2 && sequences[1] == 2) {
      return PokerGame.DOUBLE_PAIR;
    }
    return PokerGame.FULL_HOUSE;
  }
  
  haveFlush = this.isFlush();
  haveStraight = this.isStraight();
    
  if (haveFlush) {
    if (haveStraight) {
      if (this.isRoyaleStraight()) {
        return PokerGame.ROYALE_STRAIGHT_FLUSH;
      }
      return PokerGame.STRAIGHT_FLUSH;
    }
    return PokerGame.FLUSH;
  } 
  
  if (haveStraight) {
    return PokerGame.STRAIGHT;
  }
    
  return PokerGame.EMPTY;
}


