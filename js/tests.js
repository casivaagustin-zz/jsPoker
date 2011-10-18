/** Poker Tests **/
$(document).ready(function(){

  module('Cards');
  
  test('Tests Instanciation', function () {
    raises(function(){
      var cardB = new Card(10, 5);
    }, PokerException, 'Exception con Suite mayor');
    raises(function(){
      var cardB = new Card(-1, 5);
    }, PokerException, 'Exception con Suite minor');
    raises(function(){
      var cardB = new Card(0, 14);
    }, PokerException, 'Exception con Value mayor');
    raises(function(){
      var cardB = new Card(0, 0);
    }, PokerException, 'Exception con Value minor');
  });

  test('Tests Equals', function () {
    var cardA = new Card(1, 5);
    var cardB = new Card(1, 5);
    var cardC = new Card(3, 11);
    ok(cardA.isEqual(cardB), 'Cards are Equals');
    equal(cardC.isEqual(cardA), false, 'Shuld be diferent Cards');
  });
  
  module('Deck');
  
  test('Testing Give Card', function() {
    var deck = new Deck();
    var card = deck.giveCard();
    equal(typeof(card), 'object', 'Shuld be a Card');
    ok((function(card){
      if (card.suite >= 0 && card.suite < 4) {
        if (card.value > 0 && card.value < 14 ) {
          return true;
        }
      }
      return false;
    })(card), 'Isnt a valid card');

    equal(deck.givenCards.length, 1, 'Should be 1');
    equal(card.isEqual(deck.givenCards[0]), true, 'Should be the same');
    equal(deck.isValid(card), false, 'Was Gived before');
    
  });
  
});


