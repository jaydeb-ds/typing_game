const typingText = document.querySelector(".typing-text p")
const inputField = document.querySelector(".input-field")
const TryAgain = document.querySelector(".again")
const mistakeTag = document.querySelector(".mistake span")
const timeTag = document.querySelector(".time span")
const wpmTag = document.querySelector(".wpm span")
const againBotton = document.querySelector(".againBtn")
const setTimer = document.querySelector("select")
let charIndex = 0
let mistake = 0
let isTyping = 0
let maxTime = 60
setTimer.addEventListener("change",(e)=>{
    let time = e.target.value

    maxTime = parseInt(time)
    timeLeft = maxTime
    timeTag.innerHTML = timeLeft

    console.log("selecton",maxTime);
    console.log(timer);
    console.log(timeLeft);
    
})


let timer,
timeLeft = maxTime+1
let wpm;

function randomParagraph() {
    let randomIndex = Math.floor(Math.random() * paragraphs.length)

    paragraphs[randomIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    });

    document.addEventListener('keydown', () => inputField.focus());
    typingText.addEventListener("click", () => inputField.focus())
}

function initTyping() {
    const characters = typingText.querySelectorAll("span");
    let typedChar = inputField.value.split("")[charIndex];

if(charIndex < characters.length - 1 && timeLeft > 0) {


    if (!isTyping) {
        timer = setInterval(initTimer,1000)
        isTyping = true
    }

    if (typedChar == null) {
        charIndex--;
        if (characters[charIndex].classList.contains("incorrect")) {
            mistake--;
        }
        characters[charIndex].classList.remove("correct", "incorrect")
        characters[charIndex+1].classList.remove("active")

    } else {
        if (characters[charIndex].innerHTML === typedChar) {
            characters[charIndex].classList.add("correct")
        } else {
            mistake++;
            characters[charIndex].classList.add("incorrect")
        }
        charIndex++;
    }
    characters[charIndex].classList.add("active")
    characters[charIndex-1].classList.remove("active")
    characters[0].classList.remove("active")
    mistakeTag.innerHTML = mistake

    wpm= Math.round((((charIndex-mistake) / 5) / (maxTime - timeLeft)) * 60)
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm
    wpmTag.innerHTML = wpm
}
    else {
        inputField.value= ""
        clearInterval(timer)
        alert(`\n WPM : ${wpm} \nMistakes : ${mistake} \n press 'OK' to restart`,window.location.reload())
    }
  
}

function initTimer() {
    if(timeLeft >0)
    {
        timeLeft--;
        timeTag.innerHTML = timeLeft;
    }
    else{
        clearInterval(timer)
    }
}

initTimer()

randomParagraph()

inputField.addEventListener('input', initTyping)

againBotton.addEventListener("click",()=>{
    window.location.reload()
})

