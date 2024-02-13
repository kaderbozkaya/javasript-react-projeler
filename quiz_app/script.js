let timeLeft= document.querySelector(".time-left")
let quizContainer= document.getElementById("container")
let nextBtn=document.getElementById("next-button")
let countQuestion=document.querySelector(".number-question")
let displaySection=document.getElementById("display-section")
let scoreSection=document.querySelector(".score-section")
let restart=document.getElementById("restart")
let userScore=document.getElementById("user-score")
let startScreen=document.querySelector(".start-screen")
let startBtn=document.getElementById("start-button")

let questionCount;
let scoreCount=0
let count=11;
let countDown;

const quizArr= [
    {
        id:"0",
        question: "HTML stands for_______?",
        options: [
            "HighText Machine Language",
            "HyperText and links Markup Language",
            "HyperText Markup Language",
            "None of these."
        ],
        correct:  "HyperText Markup Language"
    },
    {
        id:"1",
        question: "Which of the following element is repsponsible for making the text bold in HTML?",
        options: [
            "pre",
            "a",
            "b",
            "br"
        ],
        correct:  "b"
    },
    {
        id:"2",
        question: "Which of the following tag is used for inserting the largest heading in HTML?",
        options: [
            "h3",
            "h1",
            "h5",
            "h6"
        ],
        correct:  "h1"
    },
    {
        id:"3",
        question: "Which of the following tag used to insert a line-break in HTML?",
        options: [
            "b",
            "pre",
            "a",
            "br"
        ],
        correct:  "br"
    },
    {
        id:"4",
        question: "Which of the following attribute is used to provide o unique name to an element?",
        options: [
            "class",
            "id",
            "type",
            "None of the above"
        ],
        correct:  "id"
    },
    {
        id:"5",
        question: "The main computer that stores the files that can be sent to computers thar are networked together is:",
        options: [
            "Clip art",
            "Mother board",
            "Peripheral",
            "File Server"
        ],
        correct: "File Server"
    },
    {
        id:"6",
        question: "How can you catch a computer virus?",
        options: [
            "Opening e-mail attachments",
            "Shopping on-line",
            "Sending e-mail messages",
            "Using a laptop during the winter"
        ],
        correct: "Opening e-mail attachments"
    },
    
    {
        id:"7",
        question: "Google(www.google.com) is a:?",
        options: [
            "Search engine.",
            "Number in math",
            "Directory of image",
            "Chat service on the web"
        ],
        correct:  "Search engine."
    },
    {
        id:"8",
        question: "Which is not an Internet protocol?",
        options: [
            "HTTP",
            "FTP",
            "STP",
            "IP"
        ],
        correct: "STP"
    },
    {
        id:"9",
        question: "Which of the following is not a valid domain name?",
        options: [
            "www.yahoo.com",
            "www.yahoo.co.uk",
            "www.com.yahoo",
            "www.yahoo.co.in"
        ],
        correct:  "www.yahoo.com"
    }, 
    
]

restart.addEventListener("click", ()=> {
    initial() 
    displaySection.classList.remove("hide")
    scoreSection.classList.add("hide")
})

nextBtn.addEventListener("click", (displayNext=()=> {
    questionCount+=1
    if(questionCount==quizArr.length){
        displaySection.classList.add("hide")
        scoreSection.classList.remove("hide")
        userScore.innerHTML="Your score is" + scoreCount + "out of" + questionCount
    }else {
        countQuestion.innerHTML=questionCount+1+ "of" +quizArr.length + "Question"
        quizDisplay(questionCount)
        count=11
        clearInterval(countDown)
        timerDisplay()
    }

}))
const timerDisplay= ()=> {
    countDown=setInterval(()=> {
        count--
        timeLeft.innerHTML= `${count}s`
        if(count===0) {
            clearInterval(countDown)
            displayNext()
        }
    },1000)
}

const quizDisplay=(questionCount)=> {
    let quizCards=document.querySelectorAll(".container-mid")
    quizCards.forEach((card)=> {
        card.classList.add("hide")

    })
    quizCards[questionCount].classList.remove("hide")
}
function quizCreater() {
    quizArr.sort(()=> Math.random()-0.5)
    for(let i of quizArr){
        i.options.sort(()=>Math.random()-0.5)
        let div=document.createElement("div")
        div.classList.add("container-mid", "hide")
        countQuestion.innerHTML= 1 + " of " + quizArr.length + " Question"

        let question_Div= document.createElement("p")
        question_Div.classList.add("question")
        question_Div.innerHTML=i.question
        div.appendChild(question_Div)

        div.innerHTML += `<button class="option-div" onclick= "checker(this)">${i.options[0]}</button>
        <button class="option-div" onclick= "checker(this)">${i.options[1]}</button>
        <button class="option-div" onclick= "checker(this)">${i.options[2]}</button>
         <button class="option-div" onclick= "checker(this)">${i.options[3]}</button>
        `
        quizContainer.appendChild(div)
     }
}
function checker(userOption){
    let userSolution= userOption.innerText;
    let question=document.getElementsByClassName("container-mid")[questionCount]
    let options=question.querySelectorAll(".option-div")

    if(userSolution===quizArr[questionCount].correct) {
        userOption.classList.add("correct")
        scoreCount++
    }else {
        userOption.classList.add("incorrect")
        options.forEach((element)=> {
            if((element.innerText==quizArr[questionCount].correct)){
                element.classList.add("correct")
            }
        })
    }
    clearInterval(countDown)
    options.forEach((element)=> {
        element.disabled=true
    })

}

function initial() {
    quizContainer.innerHTML= ""
    questionCount=0
    scoreCount=0
    count=11
    clearInterval(countDown)
    timerDisplay()
    quizCreater()
    quizDisplay(questionCount)
}
startBtn.addEventListener("click", ()=> {
    startScreen.classList.add("hide")
    displaySection.classList.remove("hide")
    initial()
})
window.onload= ()=> {
    startScreen.classList.remove("hide")
    displaySection.classList.add("hide")
}