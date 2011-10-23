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
  
  module('Hand');
  
  test('Testing Holds', function() {
    var hand = new Hand();
    hand.deal();
    hand.hold(1);
    hand.hold(4);
    equal(hand.holded.length, 2, 'Two Cards Holded');
    hand.unhold(1);
    equal(hand.holded.length, 1, 'One Cards Holded');
    equal(hand.isHolded(4), 0, 'Is holded' );
    hand.hold(0);
    var originalCards = hand.cards.slice();
    hand.redeal();
    equal(originalCards[3].isEqual(hand.cards[3]), false, 'Must Be Diferent');
    equal(originalCards[4].isEqual(hand.cards[4]), true, 'Must Be Equal');
  });
  
  test('Deals and redeal', function() {
    var hand = new Hand();
    hand.deal();
    equal(hand.cards.length, 5, 'Five cards');
    hand.hold(1);
    hand.hold(4);
    var originalCards = hand.cards.slice();
    hand.redeal();
    equal(hand.cards.length, 5, 'Five cards');
    equal(originalCards[3].isEqual(hand.cards[3]), false, 'Must Be Diferent');
    equal(originalCards[4].isEqual(hand.cards[4]), true, 'Must Be Equal');
  });
  
  module('Poker');
  
  test('Game', function() {
    var poker = new PokerGame();
    equal(poker.phase, PokerGame.FIRST_DEAL, 'First Deal');
    poker.deal();
    poker.hand.hold(4);
    var originalCards = poker.hand.cards.slice();
    equal(poker.phase, PokerGame.SECOND_DEAL, 'Second Deal');
    poker.deal();
    equal(originalCards[4].isEqual(poker.hand.cards[4]), true, 'Must Be Equal');
    equal(originalCards[3].isEqual(poker.hand.cards[3]), false, 'Must Be Diferent');
    
    originalCards = poker.hand.cards.slice();
    /** Other Game **/
    equal(poker.phase, PokerGame.FIRST_DEAL, 'First Deal Again');
    poker.deal();
    equal(originalCards[4].isEqual(poker.hand.cards[4]), false, 'Must Be Diferent');
    equal(originalCards[3].isEqual(poker.hand.cards[3]), false, 'Must Be Diferent');
  });
  
});


