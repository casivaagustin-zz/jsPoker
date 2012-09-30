define(["poker/core/Player", "poker/core/Hand"], function (Player, Hand) {
/**
 * This Object keeps the logic of the game.
 */
var PokerGame = function() {
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

return PokerGame;
});