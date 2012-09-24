var PokerUi = {};
PokerUi.controls = {};
PokerUi.controls.cards = new Array();

PokerUi.renderHand = function() {
    var cardIndex = 'back';

    for(var i = 0; i < 5; i++) {
        cardIndex = Poker.Game.hand.cards[i].getCardIndex();
        PokerUi.controls.cards[i].attr('class', 'card ' + cardIndex);
    } 
}

PokerUi.renderBoard = function() {

}

PokerUi.actionDeal = function() {
    Poker.Game.deal();
    Poker.Ui.renderHand();

    if (Poker.Game.phase == PokerGame.FIRST_DEAL) {
       Poker.Ui.controls.btnDeal.text('Re Deal');
       Poker.Ui.controls.prize.text('');
    } else {
       prize = Poker.Game.checkGame();
       if (prize !== 'empty') {
           Poker.Ui.controls.prize.text(prize);
       } else {
           Poker.Ui.controls.prize.text('Loser');
       }
       Poker.Ui.controls.btnDeal.text('Deal');
    }
}

$(document).ready(function() {
    $('.hand .card').each(function(index, card) {
        PokerUi.controls.cards[index] = $(card);
    });

    PokerUi.controls.btnDeal = $('#btn_deal');
    PokerUi.controls.btnDeal.click(PokerUi.actionDeal);

    PokerUi.controls.prize = $('.prize');
    Poker.Ui.renderHand();
    Poker.Ui.controls.btnDeal.text('Re Deal');
});
