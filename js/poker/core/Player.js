define(function () {
 /**
 * Object to keep the data of the player
 */
var Player = {};

Player.bet = 1; //Current Player Bet
Player.coins = 39; //Current Coins

/**
 * The player get the paid of prize
 */
Player.collect = function (prize) {
    prize *= this.bet;
    this.coins += prize;
}

/**
 * The player must pay the bet or the computer will break his legs.
 */
Player.pay = function () {
    if (this.bet > this.coins) {
        this.bet = this.coins; //No legs broken, I forgive you.
    }
    this.coins -= this.bet;
    if (this.coins < 0) {
        this.coins = 0;
    }
}

/**
 * Stupid, but just in case, this function Icrease the bet
 */
Player.increaseBet = function () {
    if (0 < this.coins) { 
        this.coins -= 1;
        this.bet += 1;
    } else {
        this.coins += this.bet - 1;
        this.bet = 1; //reinitialize the counter
    }
}

return Player;
})