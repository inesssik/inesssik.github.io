let $button = document.getElementById('viewResult')
let roles = []
let arrayOfNumbers = []

function addMaf(){
    roles.push('Mafia')
    console.log(roles)
}

function addDon(){
    roles.push('Don')
}

function addDoc(){
    roles.push("Doctor")
}

function addSheriff(){
    roles.push("Sheriff")
}

function createArray(count){
    for(let i = 1; i <= count; i++){
        arrayOfNumbers[i-1] = i
    }
    console.log(arrayOfNumbers);
    
    takeRandomRoles(arrayOfNumbers)
    arrayOfNumbers = []
}

function takeRandomRoles(arrayArg){
    if(arrayArg[0] == null){
        return console.error('Error, write count of players')
    }
    
    let lengthOfRoles = roles.length

    for(let i = 0; i < lengthOfRoles; i++){

        let randomPlayer = arrayArg[getRandomInt(0, arrayArg.length)]
        console.log(randomPlayer)

        console.log(`${randomPlayer}'th player is ${roles[0]}`)
        arrayArg.splice(arrayArg.indexOf(randomPlayer), 1)
        roles.shift()
        console.log(arrayArg)
    }
}

$button.addEventListener('click', () => {
    createArray(document.querySelector("#countOfPlayers").value)
})

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}


const myInput = document.getElementById("countOfPlayers");
function stepper(btn){
    let id = btn.getAttribute("id");
    let min = myInput.getAttribute("min");
    let max = myInput.getAttribute("max");
    let step = myInput.getAttribute("step");
    let val = myInput.getAttribute("value");
    let calcStep = (id == "increment") ? (step*1) : (step * -1);
    let newValue = parseInt(val) + calcStep;

    if(newValue >= min && newValue <= max){
        myInput.setAttribute("value", newValue);
    }
}