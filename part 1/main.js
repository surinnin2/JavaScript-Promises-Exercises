factbox = $('.factlist')

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

// get 4 facts given favorite number
function getFavFacts(favNum) {
    let url = `http://numbersapi.com/${favNum}?json`
    favFacts = []
    for (let i = 0; i < 4; i++) {
        favFacts.push(get(url))
    }

    get(url).then(res => {
        return get(url)
    }).then(res => {
        return get(url)
    }).then(res => {
        return get(url)
    }).then(res => {
        return get(url)
    }).catch(err => console.log(err))

    Promise.all(favFacts)
        .then(factList => (factList.forEach(f => factbox.append($("<li></li>").text(f.text)))))
        .catch(err => console.log(err))
}

// gets 1 fact of numbers 1 through 4
function get4NumberFacts() {
    let url = 'http://numbersapi.com/1,2,3,4?json'

    get(url).then(res => {
        for (fact in res) {
            let f = $("<li></li>").text(res[fact])
            $('.factlist').append(f)
        }
        
        return get(url)
    })
}

//clears factbox 
function clear() {
    factbox.empty()
}

//Init buttons
$('#btn1').on('click', () => {
    clear()
    getFavFacts(23)
    
})

$('#btn2').on('click', () => {
    clear()
    get4NumberFacts()
})