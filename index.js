let $button = document.getElementById('viewResult')
let roles = []
let arrayOfNumbers = []
let $role_list = document.querySelector('.role_list')
let second = 1000
let $timer = document.getElementById('timer')
let $timerTime = document.getElementById('timer_time')
let $resume = document.getElementById('timer_resume')
let $pause = document.getElementById('timer_pause')
let $timerStart = document.querySelector('.timer_start')
let $plus30 = document.querySelector('.plus30')

function addMaf(){
    roles.push('Mafia')
    $role_list.innerHTML += 
    `<p class="role_item" id=${$role_list.childElementCount}>Mafia</p>`
}

function addDon(){
    roles.push('Don')
    $role_list.innerHTML += 
    `<p class="role_item" id=${$role_list.childElementCount}>Don</p>`

}

function addDoc(){
    roles.push("Doctor")
    $role_list.innerHTML += 
    `<p class="role_item" id=${$role_list.childElementCount}>Doctor</p>`
}


function addSheriff(){
    roles.push("Sheriff")
    $role_list.innerHTML += 
    `<p class="role_item" id=${$role_list.childElementCount}>Sheriff</p>`
}

function createArray(count){
    for(let i = 1; i <= count; i++){
        arrayOfNumbers[i-1] = i
    }

    for(let j = 0; j < $role_list.childElementCount; j++){
        roles[j] = document.querySelectorAll('.role_item')[j].id
    }   

    console.log(roles)

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

        document.querySelectorAll('.role_item')[i].innerText += ` — ${randomPlayer}'th player`
    
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
$(myInput).val(12)

function stepper(btn){
    let id = btn.getAttribute("id");
    let min = myInput.getAttribute("min");
    let max = myInput.getAttribute("max");
    let step = myInput.getAttribute("step");
    let val = $(myInput).val();
    let calcStep = (id == "increment") ? (step*1) : (step * -1);
    let newValue = parseInt(val) + calcStep;

    $(myInput).val(newValue);
    
    $(document).ready(function(){
        jQuery(myInput).keyup(function(){
                        jQuery(myInput).val(jQuery(this).val());
        });
    });
    console.log($(myInput).val())
 }

 function resetRole(){
    roles = []
    $role_list.innerHTML = ""
}



// Animation of Pause/Resume

let $imgAnim = document.querySelector('.imgAnim')
let needReverse = false

function imgAnim() {
    if(!needReverse){
    $imgAnim.setAttribute('src', 'pauseTimerImg/resumeToPause.gif')
    $imgAnim.setAttribute('id', 'timer_pause')
    $pause = document.querySelector('#timer_pause')
    setTimeout(() => {
        $imgAnim.setAttribute('src', 'pauseTimerImg/pause.png')
    }, 666)
    needReverse = true
    
    }else{
        $imgAnim.setAttribute('src', 'pauseTimerImg/pauseToResume.gif')
        $imgAnim.setAttribute('id', 'timer_resume')
        $resume = document.querySelector('#timer_resume')
        setTimeout(() => {
            $imgAnim.setAttribute('src', 'pauseTimerImg/resume.png')
        }, 666) 
        needReverse = false
    }
    
}

$timerTime.innerText = 60
let isFirst = true
let forSecondInterval
let changableTimeForTimer = 10

// $resume.addEventListener('click', () => {
//     startNewTimer(changableTimeForTimer)
// })

$('.timer_new60').click(() => {
    clearInterval(forSecondInterval)
    changableTimeForTimer = 60
    $timerTime.innerText = changableTimeForTimer

    if($imgAnim.id = 'timer_pause'){
    $imgAnim.setAttribute('src', 'pauseTimerImg/pauseToResume.gif')
        $imgAnim.setAttribute('id', 'timer_resume')
        $resume = document.querySelector('#timer_resume')
        setTimeout(() => {
            $imgAnim.setAttribute('src', 'pauseTimerImg/resume.png')
        }, 666)   
    }
    needReverse = false
}) 


function startNewTimer(time = 60){
    if(!isFirst) clearInterval(forSecondInterval)

    $pause = document.querySelector('#timer_pause')

    
    
    

    // $plus30.addEventListener('click', () => {
    //     time += 30
    // }) 

    forSecondInterval = setInterval(() => {
        $timerTime.innerText = time -= 1
        if(time <= 0){
            clearInterval(forSecondInterval)
        }
        changableTimeForTimer = time
    }, 1 * second)
}

$resume.addEventListener('click', () => {
    return new Promise((resolve, reject) => {
        imgAnim()
        resolve()
    }).then(() => {
        startNewTimer(changableTimeForTimer)
        $pause.addEventListener('click', () => {
            return new Promise((resolve, reject) => {
                imgAnim()
                resolve()
            }).then(() => {startNewTimer(changableTimeForTimer)})
    })
})



