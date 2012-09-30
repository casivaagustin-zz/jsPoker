define(["poker/core/PokerException"], function (PokerException) {
/**
 * Makes a new Card Object
 * 
 * @param Int suite 
 * @param Int value
 */
var Card = function(suite, value) {
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

return Card;
})