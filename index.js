let $button = document.getElementById('viewResult')
let roles = []
let arrayOfNumbers = []
let $role_list = document.querySelector('.role_list')
let second = 1000
let $timer = document.getElementById('timer')
let $timerTime = document.getElementById('timer_time')
let $resume = document.querySelector('.timer_resume')
let $pause = document.querySelector('.timer_pause')
let $timerStart = document.querySelector('.timer_start')
let $plus30 = document.querySelector('.plus30')
let $minus30 = document.querySelector('.minus30')


function addMaf(){
    console.log(roles.length)
    if(roles.length < 13 && roles.length < document.querySelector("#countOfPlayers").value){
        roles.push('Mafia')
        $role_list.innerHTML += 
        `<p class="role_item" id=${$role_list.childElementCount}>Mafia</p>`
    }
}

function addDon(){
    if(roles.length < 13 && roles.length < document.querySelector("#countOfPlayers").value){
        roles.push('Don')
        $role_list.innerHTML += 
        `<p class="role_item" id=${$role_list.childElementCount}>Don</p>`
    }
}

function addDoc(){
    if(roles.length < 13 && roles.length < document.querySelector("#countOfPlayers").value){
        roles.push("Doctor")
        $role_list.innerHTML += 
        `<p class="role_item" id=${$role_list.childElementCount}>Doctor</p>`
    }
}


function addSheriff(){
    if(roles.length < 13 && roles.length < document.querySelector("#countOfPlayers").value){
        roles.push("Sheriff")
        $role_list.innerHTML += 
        `<p class="role_item" id=${$role_list.childElementCount}>Sheriff</p>`
    }
}

function addCustomRole(){
    if(roles.length < 13 && roles.length <= document.querySelector("#countOfPlayers").value && document.querySelector('.customRoleInput').value != ''){
        roles.push(document.querySelector('.customRoleInput').value)
        $role_list.innerHTML += 
        `<p class="role_item" id=${$role_list.childElementCount}>${document.querySelector('.customRoleInput').value}</p>`
        document.querySelector('.customRoleInput').value = ''
    }
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

let isSecond = false
let lastRoles = 0

function takeRandomRoles(arrayArg){

    if(arrayArg[0] == null){
        return console.error('Error, write count of players')
    }
    
    let lengthOfRoles = roles.length
    
    if(isSecond){
    for(let j = 0; j < lastRoles; j++)
        document.querySelectorAll('.role_item')[j].innerHTML = document.querySelectorAll('.role_item')[j].innerHTML.slice(0, this.length - 14)
    }

    lastRoles = 0

    for(let i = 0; i < lengthOfRoles; i++){

        let randomPlayer = arrayArg[getRandomInt(0, arrayArg.length)]
        if(randomPlayer >= 10){
            document.querySelectorAll('.role_item')[i].innerText += ` — ${randomPlayer}'th player`
        }else{
            document.querySelectorAll('.role_item')[i].innerText += ` — 0${randomPlayer}'th player`
        }
        arrayArg.splice(arrayArg.indexOf(randomPlayer), 1)
        roles.shift()
        lastRoles++
    }
    
    if(lengthOfRoles > 0){
        isSecond = true
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
    isSecond = false
    lastRoles = 0
    roles = []
    $role_list.innerHTML = ""
}



// Animation of Pause/Resume

let $imgAnim = document.querySelector('.imgAnim')


function imgAnim(needReverse) {
    $resume = document.querySelector('.timer_resume')
    let $resumeToPause = document.querySelector(".resumeToPause")
    $pause = document.querySelector(".timer_pause")
    let $pauseToResume = document.querySelector('.pauseToResume')

    if(!needReverse){
        $resume.classList.add('displayNone');
        $resumeToPause.classList.remove('displayNone');
        $('.timer_new60').unbind()
    setTimeout(() => {
        $resumeToPause.classList.add('displayNone');
        $pause.classList.remove('displayNone');
        $('.timer_new60').click(() => {
            clearInterval(forSecondInterval)
            changableTimeForTimer = 60
            $timerTime.innerText = changableTimeForTimer
        
            $resume = document.querySelector('.timer_resume')
            $pause = document.querySelector(".timer_pause")
            let $pauseToResume = document.querySelector('.pauseToResume')
        
            if($resume.classList.contains('displayNone')){
                $pause.classList.add('displayNone');
                $pauseToResume.classList.remove('displayNone');
                setTimeout(() => {
                    $pauseToResume.classList.add('displayNone');
                    $resume.classList.remove('displayNone');
                }, 666)
        
                needReverse = false
            }
        }) 
    }, 666)
    needReverse = true

    }else{
        $pause.classList.add('displayNone');
        $pauseToResume.classList.remove('displayNone');
        $('.timer_new60').unbind()
        setTimeout(() => {
            $('.timer_new60').click(() => {
                clearInterval(forSecondInterval)
                changableTimeForTimer = 60
                $timerTime.innerText = changableTimeForTimer
            
                $resume = document.querySelector('.timer_resume')
                $pause = document.querySelector(".timer_pause")
                let $pauseToResume = document.querySelector('.pauseToResume')
            
                if($resume.classList.contains('displayNone')){
                    $pause.classList.add('displayNone');
                    $pauseToResume.classList.remove('displayNone');
                    setTimeout(() => {
                        $pauseToResume.classList.add('displayNone');
                        $resume.classList.remove('displayNone');
                    }, 666)
            
                    needReverse = false
                }
                
            }) 
            $pauseToResume.classList.add('displayNone');
            $resume.classList.remove('displayNone');
        }, 666)

        needReverse = false
    }
    
}

$timerTime.innerText = 60
let isFirst = true
let forSecondInterval
let changableTimeForTimer = 60

$plus30.addEventListener('click', () => {
    changableTimeForTimer += 30
    $timerTime.innerText = changableTimeForTimer
})

$minus30.addEventListener('click', () => {
    if(changableTimeForTimer > 30){
        changableTimeForTimer -= 30
        $timerTime.innerText = changableTimeForTimer
    }
})

$('.timer_new60').click(() => {
        clearInterval(forSecondInterval)
        changableTimeForTimer = 60
        $timerTime.innerText = changableTimeForTimer

        $resume = document.querySelector('.timer_resume')
        $pause = document.querySelector(".timer_pause")
        let $pauseToResume = document.querySelector('.pauseToResume')

        if($resume.classList.contains('displayNone')){
            $pause.classList.add('displayNone');
            $pauseToResume.classList.remove('displayNone');
            setTimeout(() => {
                $pauseToResume.classList.add('displayNone');
                $resume.classList.remove('displayNone');
            }, 666)

            needReverse = false
        }
}) 

$('#decrement').click(() => {
    if(document.querySelector('.container').style.height > '50px'){
        document.querySelector('.decrBtn').style.fontSize = '50px'
        setTimeout(() => {document.querySelector('.decrBtn').setAttribute('style', '')}, 100)
    }
})

$('#increment').click(() => {
    if(document.querySelector('.container').style.height > '50px'){
        document.querySelector('.incrBtn').style.fontSize = '50px'
        setTimeout(() => {document.querySelector('.incrBtn').setAttribute('style', '')}, 100)
    }
})

$resume.addEventListener('click', () => {
    imgAnim(false)
    startNewTimer(changableTimeForTimer)
}) 

function startNewTimer(time = 60){
    if(!isFirst) clearInterval(forSecondInterval)

    $pause.addEventListener('click', () => {
        imgAnim(true)
        clearInterval(forSecondInterval)
    })

    forSecondInterval = setInterval(() => {
        time = changableTimeForTimer
        $timerTime.innerText = time -= 1
        if(time <= 0){
            clearInterval(forSecondInterval)
        }
        changableTimeForTimer = time
    }, 1 * second)
}



