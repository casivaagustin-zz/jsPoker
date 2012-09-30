/**
 * Proxy object to wrapp the important elements
 */
define([
         "poker/core/PokerGame", 
         "poker/core/Player"
        ], 
        function (PokerGame, Player) {

            var Poker = Poker || {};
            Poker.Game = new PokerGame();
            Poker.Player = Player;

            return Poker;
        });

