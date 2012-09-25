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
      var cardB = new Card(0, -1);
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
    //equal(originalCards[3].isEqual(hand.cards[3]), false, 'Must Be Diferent');
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
    equal(originalCards[4].isEqual(hand.cards[4]), true, 'Must Be Equal');
  });
  
  module('Poker');
  
  test('Game', function() {
    //Game Starts
    var poker = new PokerGame();
    equal(poker.phase, PokerGame.START, 'Starting Game');
    //First deal of cards
    poker.deal();
    equal(poker.phase, PokerGame.FIRST_DEAL, 'First Deal');
    poker.hand.hold(4);
    //After holding something, deal again
    poker.deal();
    equal(poker.phase, PokerGame.SECOND_DEAL, 'Second Deal');
    //Games end, now a new game must start
    poker.deal();
    equal(poker.phase, PokerGame.START, 'Starting Game');
  });
  
  test('Check Games', function() {
    var cards = new Array();
    cards[0] = new Card(0, 1);
    cards[1] = new Card(0, 2);
    cards[2] = new Card(0, 3);
    cards[3] = new Card(0, 4);
    cards[4] = new Card(0, 5);
    var poker = new PokerGame();
    poker.deal(); //New Game
    poker.deal(); //First hand
    poker.hand.cards = cards;
    var game = poker.checkGame();
    equal(game, PokerGame.STRAIGHT_FLUSH, 'Its a Straight Flush');

    cards = new Array();
    cards[0] = new Card(0, 10);
    cards[1] = new Card(0, 11);
    cards[2] = new Card(0, 12);
    cards[3] = new Card(0, 13);
    cards[4] = new Card(0, 2);
    poker = new PokerGame();
    poker.deal(); //New Game
    poker.deal(); //First hand
    poker.hand.cards = cards;
    game = poker.checkGame();
    equal(game, PokerGame.FLUSH, PokerGame.FLUSH);
    
    cards = new Array();
    cards[0] = new Card(0, 10);
    cards[1] = new Card(0, 11);
    cards[2] = new Card(0, 12);
    cards[3] = new Card(0, 13);
    cards[4] = new Card(0, 1);
    poker = new PokerGame();
    poker.deal();
    poker.deal();
    poker.hand.cards = cards;
    game = poker.checkGame();
    equal(game, PokerGame.ROYALE_STRAIGHT_FLUSH, 'Its a Royale Straight Flus');
    
    cards = new Array();
    cards[0] = new Card(0, 10);
    cards[1] = new Card(1, 11);
    cards[2] = new Card(1, 12);
    cards[3] = new Card(0, 13);
    cards[4] = new Card(2, 1);
    poker = new PokerGame();
    poker.deal();
    poker.deal();
    poker.hand.cards = cards;
    game = poker.checkGame();
    equal(game, PokerGame.STRAIGHT, 'Its a Straight');
    
    cards = new Array();
    cards[0] = new Card(1, 3);
    cards[1] = new Card(2, 4);
    cards[2] = new Card(2, 11);
    cards[3] = new Card(1, 6);
    cards[4] = new Card(1, 7);
    poker = new PokerGame();
    poker.deal();
    poker.deal();
    poker.hand.cards = cards;
    game = poker.checkGame();
    equal(game, PokerGame.EMPTY, 'there is no game here');
    
    cards = new Array();
    cards[0] = new Card(1, 3);
    cards[1] = new Card(2, 3);
    cards[2] = new Card(2, 11);
    cards[3] = new Card(1, 6);
    cards[4] = new Card(2, 6);
    poker = new PokerGame();
    poker.deal();
    poker.deal();
    poker.hand.cards = cards;
    game = poker.checkGame();
    equal(game, PokerGame.DOUBLE_PAIR, PokerGame.DOUBLE_PAIR );
    
    cards = new Array();
    cards[0] = new Card(1, 3);
    cards[1] = new Card(2, 3);
    cards[2] = new Card(3, 3);
    cards[3] = new Card(1, 6);
    cards[4] = new Card(2, 6);
    poker = new PokerGame();
    poker.deal();
    poker.deal();
    poker.hand.cards = cards;
    game = poker.checkGame();
    equal(game, PokerGame.FULL_HOUSE, PokerGame.FULL_HOUSE);
   
    cards = new Array();
    cards[0] = new Card(1, 3);
    cards[1] = new Card(2, 3);
    cards[2] = new Card(3, 3);
    cards[3] = new Card(1, 6);
    cards[4] = new Card(2, 5);
    poker = new PokerGame();
    poker.deal();
    poker.deal();
    poker.hand.cards = cards;
    game = poker.checkGame();
    equal(game, PokerGame.THREE_OF_A_KIND, PokerGame.THREE_OF_A_KIND);
    
    cards = new Array();
    cards[0] = new Card(1, 3);
    cards[1] = new Card(2, 3);
    cards[2] = new Card(3, 3);
    cards[3] = new Card(0 , 3);
    cards[4] = new Card(2, 5);
    poker = new PokerGame();
    poker.deal();
    poker.deal();
    poker.hand.cards = cards;
    game = poker.checkGame();
    equal(game, PokerGame.FOUR_OF_A_KIND, PokerGame.FOUR_OF_A_KIND);
    
    cards = new Array();
    cards[0] = new Card(1, 3);
    cards[1] = new Card(2, 3);
    cards[2] = new Card(3, 2);
    cards[3] = new Card(1, 6);
    cards[4] = new Card(2, 5);
    poker = new PokerGame();
    poker.deal();
    poker.deal();
    poker.hand.cards = cards;
    game = poker.checkGame();
    equal(game, PokerGame.SINGLE_PAIR, PokerGame.SINGLE_PAIR );
    
  });  
});


