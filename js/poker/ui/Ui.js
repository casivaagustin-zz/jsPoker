requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js/'
});

define([    
     "vendor/jquery/jquery",
     "vendor/bootstrap/bootstrap",
     "poker/Poker",
     "poker/core/PokerGame"
    ], 
function(_, __, Poker, PokerGame) {

/**
 * This file defines some methods for the UI
 */

var PokerUi = {};
PokerUi.controls = {}; //Controls Holder to avoid the DOM search all the time.
PokerUi.controls.cards = new Array(); //Cards DOM elements holder.

var Poker = Poker || {};
Poker.Ui = PokerUi;

/**
 * Renders the current hand
 */
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

/**
 * Renders the Prize board
 */
PokerUi.renderBoard = function() {
    var betPrize = 0;
    Poker.Ui.controls.board.html('');
    for(prize in PokerGame.Prizes) {
        betPrize = Poker.Player.bet * PokerGame.Prizes[prize];
        Poker.Ui.controls.board.append('<li><span class="title">' + prize + '</span><span class="points">' + betPrize + '</span></li>');
    }
}

/**
 * Renders the player status, coins and bet
 */
PokerUi.renderPlayer = function() {
    Poker.Ui.controls.player.coins.text(Poker.Player.coins);
    Poker.Ui.controls.player.bet.text(Poker.Player.bet);
}

/**
 * You are done men
 */
PokerUi.gameOver = function() {
    Poker.Ui.controls.prize.text('Game Over');
    Poker.Ui.controls.actions.hide();
}

/**
 * Increase the bet
 */
PokerUi.actionBet = function() {
    Poker.Player.increaseBet();
    Poker.Ui.renderBoard();
    Poker.Ui.renderPlayer();
}

/**
 * Deal and update the game status
 */
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

/**
 * Holds a card
 */
PokerUi.actionHold = function (event) {
    var card = $(event.srcElement);
    var cardIndex = card.attr('data');
    if (Poker.Game.phase !== PokerGame.FIRST_DEAL) {
        //You can't hold no groove if you ain't got no pocket
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

return PokerUi;

});