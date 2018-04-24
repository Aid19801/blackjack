
const suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
const values = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
let deck = [];
let playerHand = [];
let dealerHand = [];
let playerTotal = 0;
let dealerTotal = 0;
let max = 21;
let playerRow, dealerRow;

// GAME ACTIONS
const loadGame = () => {
    myGameArea.start();
    generateDeck();
    startGame();
}

// game area
var myGameArea = {
    canvas: document.createElement('div'),
    start: function() {
        this.canvas.width = 680;
        this.canvas.height = 1570;
        this.canvas.className += 'game-canvas';
        this.canvas.id += 'game-div';
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        createButtons(['Hit', 'Stick']);


        let gameDiv = document.getElementById('game-div');

        let gameContainer = document.createElement('div');
        gameContainer.className += 'container';

        playerRow = document.createElement('div');
        playerRow.className += "row player-row";
        gameContainer.appendChild(playerRow);
        gameDiv.appendChild(gameContainer);

        dealerRow = document.createElement('div');
        dealerRow.className += "row dealer-row";
        gameContainer.appendChild(dealerRow);
    },
    end: function() {
        console.log('end of game');
    }
}

// setup buttons
const createButtons = arr => {
    arr.map(each => {
        let btn = document.createElement('button');
        btn.className += `${each.toLowerCase()}-btn`;
        btn.setAttribute('id', `${each.toLowerCase()}-id`);
        btn.setAttribute('onclick', `${each.toLowerCase()}Me();`)
        btn.innerHTML = each;
        return document.body.appendChild(btn);
    });
}

// create a deck of cards
function generateDeck() {
    suits.map(eachSuit => {
        for (let i = 0; i < values.length; i++) {
            let newCard = {
                name: `${values[i]} of ${eachSuit}`,
                value: values[i]
            }
            deck.push(newCard);
        }
    })
    return deck;
}

// pick one card & deduct it from the deck
function pickACard(arr) {
    let pickedCard = deck[Math.floor(Math.random() * deck.length)];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === pickedCard) {
            let beg = arr.slice(0, i);
            let end = arr.slice(i+1, arr.length);
            deck = beg.concat(end);
        }
    }
    return pickedCard;
}
// map card names to values & update player totals
function updateBothPlayerTotals(arr1, arr2) {

    arr1.map(each => {
        switch (each.value) {
            case 'A':
                playerTotal += 1;
                break;
            case 'J':
                playerTotal += 10;
                break;
            case 'Q':
                playerTotal += 10;
                break;
            case 'K':
                playerTotal += 10;
                break;

            default:
                playerTotal += each.value;
                break;
        }
    });
    arr2.map(each => {
        switch (each.value) {
            case 'A':
                dealerTotal += 1;
                break;
            case 'J':
                dealerTotal += 10;
                break;
            case 'Q':
                dealerTotal += 10;
                break;
            case 'K':
                dealerTotal += 10;
                break;

            default:
                dealerTotal += each.value;
                break;
        }
    });
    document.getElementById('player-total').innerHTML = playerTotal;
    document.getElementById('dealer-total').innerHTML = dealerTotal;
    console.log('playerTotal: ', playerTotal);
    console.log('dealerTotal: ', dealerTotal);
}

// deals the first hand (2 cards to player, 1 to dealer)
function dealFirstHand() {
    playerHand.push(pickACard(deck));
    dealerHand.push(pickACard(deck));
    playerHand.push(pickACard(deck));
    return;
}
// populates a new div for every card that's been dealt
function populateCards() {

    playerHand.map((each, i) => {
        let newCardDiv = document.createElement('div');
        newCardDiv.innerHTML = `The ${each.name}`;
        newCardDiv.className += 'col-xs-3 player-card';
        newCardDiv.id += 'player-card'
        playerRow.appendChild(newCardDiv);
    })

    dealerHand.map((each, i) => {
        let newCardDiv = document.createElement('div');
        newCardDiv.innerHTML = `The ${each.name}`;
        newCardDiv.className += 'col-xs-3 dealer-card';
        dealerRow.appendChild(newCardDiv);
    })

}

// if total is zero, deal 2 cards for player/1 for dealer & setup the cards on screen
// if not, just 'hit' one new card to player.
function startGame() {
    if (playerTotal === 0) {
        dealFirstHand();
        updateBothPlayerTotals(playerHand, dealerHand);
        populateCards();
        return;
    }
    return hitMe();
}

// kills existing card elements (to stop duplication of cards)
// pushes a new card into player's hand, re-populates the divs.
// checks if player has gone over 21.
function hitMe() {
    let playerRow = document.querySelector('.player-row');
    playerRow.innerHTML = null;
    let dealerRow = document.querySelector('.dealer-row');
    dealerRow.innerHTML = null;

    playerTotal = 0;
    dealerTotal = 0;
    playerHand.push(pickACard(deck));
    updateBothPlayerTotals(playerHand, dealerHand);
    populateCards();
    checkIfBust();
}

// once player has 'stuck', hitDealer does the same for dealer.
function hitDealer() {
    alert(`Dealer Is Dealing...`);

    let playerRow = document.querySelector('.player-row');
    playerRow.innerHTML = null;

    let dealerRow = document.querySelector('.dealer-row');
    dealerRow.innerHTML = null;

    dealerTotal = 0;
    playerTotal = 0;

    dealerHand.push(pickACard(deck));
    updateBothPlayerTotals(playerHand, dealerHand);
    populateCards();
    checkIfDealerBust();

    if (dealerTotal < 21) {
        setTimeout(() => {
            hitDealer();
        }, 500);
        
    }
    if (dealerTotal === 21) {
    setTimeout(() => {
        alert('Dealer WINS! 21!')
        return location.reload();
    }, 500);
    }
    if (dealerTotal > 21) {
        setTimeout(() => {
            alert('Dealer BUST! you win!')
            return location.reload();
        }, 500);
    }
    return;
}

// helper function to kill off div elements.
function killElementId(id) {
    return document.getElementById(id).outerHTML = null;
}

// when player wants to 'stick' at a number, remove hit/stick buttons
// then hand over to dealer's go
function stickMe() {
    killElementId('hit-id');
    killElementId('stick-id');
    alert(`You are sticking on ${playerTotal}`);
    hitDealer();
}

function checkIfBust() {
    setTimeout(() => {
        if (playerTotal > 21) {
            hasLostAndRefresh('player', playerTotal);
        } else if (playerTotal === 21) {
            hasWon();
        }
    }, 500);
}

function checkIfDealerBust() {
    setTimeout(() => {
        if (dealerTotal > 21) {
            alert('Dealer is BUST! You Win!');
            return location.reload();
        } else if (dealerTotal === 21) {
            alert('Dealer Got 21! You Lose!');
            return location.reload();
        } else if ((dealerTotal < 21) && (dealerTotal > playerTotal)) {
            alert('Dealer is closer to 21 & sticking. You lose :( !');
            return location.reload();
        }
    }, 500);
}

function hasWon() {
    alert('Congrats! 21! You Have Won!');
    return location.reload();
}

function hasLostAndRefresh(playerOrDealer, playerOrDealerTotal) {
    alert(`${playerOrDealer} is BUST with a score of ${playerOrDealerTotal}!`);
    return location.reload();
}



