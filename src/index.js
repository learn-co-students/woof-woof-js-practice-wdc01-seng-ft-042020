const URL = 'http://localhost:3000/pups'


document.addEventListener('DOMContentLoaded', () => {
    getPups()

})

function getPups() {
    fetch(URL)
    .then(resp => resp.json())
    .then(pups => {
        pups.forEach( pup => renderPupinSpan(pup))
    })
}

function renderPupinSpan(pup) {
    dogBar = document.getElementById('dog-bar')
    span = document.createElement('span')
    span.innerText = pup.name
    span.id = pup.id

    dogBar.appendChild(span)

    span.addEventListener('click', () => handleSpanClick(pup))
    
}

function handleSpanClick(pup) {
    dogInfo = document.getElementById('dog-info')
    img = document.createElement('img')
    img.src = pup.image
    nameEl = document.createElement('h2')
    nameEl = pup.name
    statusButton = document.createElement('button')
    if (pup.isGoodDog === true) {
        statusButton.innerText = "Good Dog!"
    } else {
        statusButton.innerText = "Bad Dog!"
    }

    while(dogInfo.firstChild){
        dogInfo.removeChild(dogInfo.firstChild)
    } 

    dogInfo.append(img, nameEl, statusButton)
    statusButton.addEventListener('click', toggleStatus)
    
}   

function toggleStatus(e) {
    let value;
    if (e.target.innerText.includes('Good')) {
        e.target.innerText = "Bad Dog!"
        value = false;
    } else {
        e.target.innerText = "Good Dog!"
        value = true;
    }
    toggleGoodDog(e.target.dataset.id, value)
}


function toggleGoodDog(id, value) {
    let obj = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            isGoodDog: value
        })
    }
    return fetch(URL + `/${id}`, obj)
    .then(resp => resp.json())
}






/*  
<div id="filter-div">
      <button id="good-dog-filter">Filter good dogs: OFF</button>
    </div>
    <div id="dog-bar">

    </div>
    <div id="dog-summary-container">
      <h1>DOGGO:</h1>
      <div id="dog-info">

      </div>
    </div>

*/