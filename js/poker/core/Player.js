var Player = {};

Player.bet = 1; //Current Player Bet
Player.coins = 39; //Current Coins

Player.collect = function (prize) {
    prize *= this.bet;
    this.coins += prize;
}

Player.pay = function () {
    if (this.bet > this.coins) {
        this.bet = this.coins;
    }
    this.coins -= this.bet;
    if (this.coins < 0) {
        this.coins = 0;
    }
}

Player.increaseBet = function () {
    if (0 < this.coins) { 
        this.coins -= 1;
        this.bet += 1;
    } else {
        this.coins += this.bet - 1;
        this.bet = 1; //reinitialize the counter
    }
}

