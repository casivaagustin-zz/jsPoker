/**
   * Make a new Card
   * @param suite
   * @param value
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
  
  Card.prototype.isEqual = function(card) {
    if (card instanceof Card) {
      if (this.suite === card.suite
         && this.value === card.value) {
         return true;
      }
    }
    return false;
  }