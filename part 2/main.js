let $cardpile = $('.cardpile')
let deckID = null

//get function axios clone
function get(url) {
    const request = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
        request.onload = function () {
            if (request.readyState !== 4) return;
    
            if (request.status >= 200 && request.status < 300) {
                resolve(JSON.parse(request.response))
            } else {
                reject(request.status)
            }
    
        }
        request.onerror = function handleError() {
            request = null;
            reject('Network Error!')
        }
        request.open('GET', url);
        request.send();
    })

}

//1. 
get('http://deckofcardsapi.com/api/deck/new/draw/?count=1').then(res => {
    console.log(res.cards[0].value, 'of', res.cards[0].suit)
})

//2. 
get('http://deckofcardsapi.com/api/deck/new/draw/?count=1').then(res => {
    console.log(res.cards[0].value, 'of', res.cards[0].suit)
    return get(`http://deckofcardsapi.com/api/deck/${res.deck_id}/draw/?count=1`)
}).then(res => {
    console.log(res.cards[0].value, 'of', res.cards[0].suit)
})

//3.
$('document').ready(function() {
    get('http://deckofcardsapi.com/api/deck/new/shuffle').then(res => {
        deckID = res.deck_id
    })
    let $btn = $('#btn1')

    $btn.on('click', function() {
        get(`http://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`).then(res => {
            $cardpile.append(
                $(`<img src='${res.cards[0].image}' >`)
            )
            if (res.remaining == 0) $btn.remove()
        })
    })
})
