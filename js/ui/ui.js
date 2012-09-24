var PokerUi = {};
PokerUi.controls = {};
PokerUi.controls.cards = new Array();

PokerUi.renderHand = function() {
    var cardIndex = 'back';

    if (Poker.Game.hand.cards.length < 5) {
        for(var i = 0; i < 5; i++) {
            PokerUi.controls.cards[i].attr('class', 'card back'); 
        }    
        return;
    }

    for(var i = 0; i < 5; i++) {
        cardIndex = Poker.Game.hand.cards[i].getCardIndex();
        PokerUi.controls.cards[i].attr('class', 'card ' + cardIndex).slideDown();
    } 
}

PokerUi.renderBoard = function() {
    var betPrize = 0;
    Poker.Ui.controls.board.html('');
    for(prize in PokerGame.Prizes) {
        betPrize = Poker.Player.bet * PokerGame.Prizes[prize];
        Poker.Ui.controls.board.append('<li><span class="title">' + prize + '</span><span class="points">' + betPrize + '</span></li>');
    }
}

PokerUi.renderPlayer = function() {
    Poker.Ui.controls.player.coins.text(Poker.Player.coins);
    Poker.Ui.controls.player.bet.text(Poker.Player.bet);
}

PokerUi.gameOver = function() {
    Poker.Ui.controls.prize.text('Game Over');
    Poker.Ui.controls.actions.hide();
}

PokerUi.actionBet = function() {
    Poker.Player.increaseBet();
    Poker.Ui.renderBoard();
    Poker.Ui.renderPlayer();
}

PokerUi.actionDeal = function() {
    Poker.Game.deal();

    if (Poker.Game.phase == PokerGame.FIRST_DEAL) {
        Poker.Ui.controls.btnDeal.text('Re Deal');
        Poker.Ui.controls.prize.text('');
    } else if (Poker.Game.phase == PokerGame.SECOND_DEAL) {
        prize = Poker.Game.checkGame();
        if (prize !== 'empty') {
            Poker.Ui.controls.prize.text(prize);
            Poker.Player.collect(PokerGame.Prizes[prize]);
        } else {
            Poker.Ui.controls.prize.text('Loser');
        }
        if (Poker.Player.coins <= 0) {
            PokerUi.gameOver();
        }
        Poker.Ui.controls.btnDeal.text('New Game');
    } else {
        Poker.Player.pay();
        Poker.Ui.controls.prize.text('');
        Poker.Ui.controls.btnDeal.text('Deal');
    }

    Poker.Ui.renderHand();
    Poker.Ui.renderPlayer();
}

PokerUi.actionHold = function (event) {
    var card = $(event.srcElement);
    var cardIndex = card.attr('data');
    if (card.hasClass('back')) {
        return;
    }
    if (card.hasClass('holded')) {
        card.removeClass('holded');
        Poker.Game.hand.unhold(cardIndex);
    } else {
        card.addClass('holded');
        Poker.Game.hand.hold(cardIndex);
    } 
}

$(document).ready(function() {
        $('.hand .card').each(function(index, card) {
            PokerUi.controls.cards[index] = $(card);
            PokerUi.controls.cards[index].live("click", PokerUi.actionHold);
        });

        PokerUi.controls.btnDeal = $('#btn_deal');
        PokerUi.controls.btnDeal.click(PokerUi.actionDeal);

        PokerUi.controls.prize = $('.prize');
        PokerUi.controls.board = $('ul.board');

        PokerUi.controls.btnBet = $('#btn_bet');
        PokerUi.controls.btnBet.click(PokerUi.actionBet);

        PokerUi.controls.player = {};
        PokerUi.controls.player.coins = $('.player .coins .points');
        PokerUi.controls.player.bet = $('.player .bet .points');

        PokerUi.controls.actions = $('.actions');

        Poker.Ui.renderBoard();
        Poker.Ui.renderPlayer();
        Poker.Ui.renderHand();
});
