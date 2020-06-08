
const dogBar = () => document.querySelector("#dog-bar")
const dogDiv = () => document.querySelector("#dog-info")
const dogFilter = () => document.querySelector("#good-dog-filter")
const url = "http://localhost:3000/pups"

document.addEventListener("DOMContentLoaded", () => {
    //console.log("Hello!")
    getAllDoggos()
    dogFilter().addEventListener("click", handleFilterClick)
})

function getAllDoggos() {
    return fetch(url)
        .then( r => r.json())
        .then( dgAry => dgAry.forEach(renderOneDog))
}

function handleFilterClick(e) {
    let revDictionary = {"OFF": "ON", "ON": "OFF"}

    let status = e.target.innerText.split(": ")[1]
    let otherText = e.target.innerText.split(": ")[0]

    if (status == "OFF") {
        fetch(url)
            .then( r => r.json())
            .then( dgAry => dgAry.filter((d) => d.isGoodDog == true ))
            .then(goodAry => {
                dogBar().innerHTML = ''
                goodAry.forEach(renderOneDog)
            })
            .then( () => {
                e.target.innerText = `${otherText}: ${revDictionary[status]}`
            })
    }
    else {
        dogBar().innerHTML = ''
        getAllDoggos()
            .then(() => {
                e.target.innerText = `${otherText}: ${revDictionary[status]}`
            })
    }
}



function handleButtonClick(e, dogID) {
    let val = e.target.innerText
    let revDictionary = {"Good Dog!": false, "Bad Dog!": true}
    let secDictionary = {"Good Dog!": "Bad Dog!", "Bad Dog!": "Good Dog!"}

    fetch(`${url}/${dogID}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"},
        body: JSON.stringify({"isGoodDog": revDictionary[val]})
    })
        .then( document.querySelector("#QWERTY").innerText = secDictionary[val])
}


function handleInfoClick(e, dogID) {
    let dogZoom = document.createElement("div")
    let pic = document.createElement("img")
    let nomen = document.createElement("h2")
    let btn = document.createElement("button")
    btn.id = "QWERTY"
    btn.addEventListener("click", (e) => handleButtonClick(e, dogID))

    dogDiv().innerHTML = '' //there must be a better way to do this.

    fetch(`${url}/${dogID}`)
        .then( r => r.json())
        .then( (canis) => {
            pic.src = canis.image
            nomen.innerText = canis.name
            if (canis.isGoodDog) {
                btn.innerText = "Good Dog!"
            }
            else {
                btn.innerText = "Bad Dog!"
            }
            dogZoom.append(pic, nomen, btn)
            dogDiv().append(dogZoom)
        })
        .catch( () => alert("The JSON server is down! Sorry for the inconcenience."))
}

function renderOneDog(dog) {
    dogSpan = document.createElement("span")
    dogSpan.innerText = dog.name
    dogSpan.addEventListener("click", (e) => handleInfoClick(e, dog.id))
    dogBar().appendChild(dogSpan)
}
