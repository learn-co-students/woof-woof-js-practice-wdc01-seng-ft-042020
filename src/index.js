

document.addEventListener('DOMContentLoaded', function(){

    const filterButton = document.querySelector('button#good-dog-filter')
    filterButton.addEventListener("click", handleFilter)
    loadDogs()
    
})

function handleFilter(e) {

    const bar = document.querySelector('div#dog-bar');
    bar.innerHTML = ''
    if (e.target.innerText.includes("OFF")) {

        loadGoodDogs()
        e.target.innerText = "Filter good dogs: ON"
    } else {
        

        e.target.innerText = "Filter good dogs: OFF"
        loadDogs()
    }
}

function loadDogs(){
    fetch('http://localhost:3000/pups')
    .then(res => res.json() )
    .then( data => {
        data.forEach( dog => renderDogBar(dog))
        } )
}

function loadGoodDogs(){
    fetch('http://localhost:3000/pups')
    .then(res => res.json() )
    .then( data => {
   
        let filteredArray = data.filter( dog =>  dog.isGoodDog )
        filteredArray.forEach( dog => renderDogBar(dog) )

        } )
}


function renderDogBar(dog){
    
    const bar = document.querySelector('div#dog-bar');

    const text = document.createElement('span');
    text.dataset.goodDog = dog.isGoodDog;
    text.id = `dog-${dog.id}`
    text.textContent = dog.name;
    
    bar.appendChild(text);
    
    text.addEventListener("click", (e) => handleClick(e, dog))

}

function renderDog(dog){

    const dogDiv = document.querySelector('div#dog-info');
    dogDiv.innerHTML = '';

    const heading = document.createElement('h2');
    const image = document.createElement('img');
    const button = document.createElement('button');

    heading.textContent = dog.name
    heading.id = `dog-${dog.id}`
    image.src = dog.image
    dog.isGoodDog ? button.textContent = 'Good Dog!' : button.textContent = 'Bad Dog!'; 

    dogDiv.append( image, heading, button);

    button.addEventListener('click', (e) => {handleButtonClick(e)})
    
}

function handleClick(e, dog){
    
    e.target.dataset.goodDog === 'true' ? dog["isGoodDog"] = true : dog["isGoodDog"] = false
    renderDog(dog)
    
}

function handleButtonClick(e) {
    let dogState;
    e.target.innerText === "Good Dog!" ? dogState = true : dogState = false; 
    
    let idString = e.target.parentElement.childNodes[1].id.split("-")[1]

    fetch(`http://localhost:3000/pups/${idString}`, {
        method: 'PATCH',
        headers: {"Content-Type": "application/json",
            "Accept": "application/json"},
        body: JSON.stringify({
            isGoodDog: !dogState
        })
    })
    .then(res => res.json())
    .then(dog =>
       {  //console.log(dog);
            const menuDog = document.querySelector(`div#dog-bar span#dog-${dog.id}`) 
            menuDog.dataset.goodDog == 'true' ? menuDog.dataset.goodDog = 'false' : menuDog.dataset.goodDog = 'true'
           dog.isGoodDog ? 
        e.target.textContent = 'Good Dog!' : 
        e.target.textContent = 'Bad Dog!';  }
        )

}