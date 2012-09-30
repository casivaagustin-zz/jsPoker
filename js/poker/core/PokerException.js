 /**
 * Defines a new type of exception for the game
 */
define(function () {
   
var PokerException = function (message) {
  this.message = message;
}

return PokerException;

})