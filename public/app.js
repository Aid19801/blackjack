// set up game
const suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
const values = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
let deck = [];

let playerHand = [];
let dealerHand = [];
let playerTotal = 0;
let dealerTotal = 0;

let gameHasStarted = false;

// generate the deck of cards
function generateDeck() {
    gameHasStarted = true;
    suits.map(eachSuit => {
        for (let i = 0; i < values.length; i++) {
            let newCard = {
                name: `${values[i]} of ${eachSuit}`,
                value: values[i]
            }
            deck.push(newCard);
        }
    })
}

// pick one individual card from deck, update/deduct from deck
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

// create a new card for each dealt card
function populateCardsFromWhatsInHand(arr, player) {
    arr.map(each => {
        let cardsSection = document.getElementById(`${player}-cards`);
        let newCardDiv = document.createElement('div');
        newCardDiv.innerHTML = `The ${each.name}`;
        newCardDiv.className += 'col-xs-6';
        cardsSection.appendChild(newCardDiv);
    })
}

function updateBothPlayerTotals(arr1, tot1, arr2, tot2) {
    
    const playerTotalHTML = document.getElementById('player-total');
    const dealerTotalHTML = document.getElementById('dealer-total');

    arr1.map(each => {
        switch(each.value) {
            case 'A':
                tot1 += 1;
                break;
            case 'J':
                tot1 += 10;
                break;
            case 'Q':
                tot1 += 10;
                break;
            case 'K':
                tot1 += 10;
                break;

            default:
                tot1 += each.value;
                break;
        }
    });
    arr2.map(each => {
        switch (each.value) {
            case 'A':
                tot2 += 1;
                break;
            case 'J':
                tot2 += 10;
                break;
            case 'Q':
                tot2 += 10;
                break;
            case 'K':
                tot2 += 10;
                break;

            default:
                tot2 += each.value;
                break;
        }
    });
    playerTotalHTML.innerHTML = tot1;
    dealerTotalHTML.innerHTML = tot2;
}

function hitMe(total) {
    
    // WHY DOES THIS COME THROUGH AS ZERO
}

// start the game, sets up, removes the start-game button
function startGame() {
    let startBtn = document.getElementById('start-game-button');
    generateDeck();
    playerHand.push(pickACard(deck));
    dealerHand.push(pickACard(deck));
    playerHand.push(pickACard(deck));

    populateCardsFromWhatsInHand(playerHand, 'player');
    populateCardsFromWhatsInHand(dealerHand, 'dealer');
    gameHasStarted ? startBtn.className += '-hide' : null;

    updateBothPlayerTotals(playerHand, playerTotal, dealerHand, dealerTotal);
}






