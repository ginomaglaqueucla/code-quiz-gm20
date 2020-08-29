var buttonEl =  document.querySelector('#start-quiz');
var h1El = document.querySelector('#main');
var pEl = document.querySelector('#secondary');
var choiceContainerEl = document.querySelector('.btn');
var timerEl = document.querySelector('#timer');
var promptContainerDivEl = document.querySelector('#prompt-container')

var questionArray = [
    {
    question: "Which of the following styles a web application?",
    choices: ["HTML", "CSS", "JavaScript", "Potato"],
    answer: "CSS"
    },
    {
    question: "What is the syntax for printing to console?",
    choices: ["window.alert()", "printToConsole()", "console.log()", "Tomato"],
    answer: "console.log()"
    },
    {
    question: "Which of the follow is NOT a data type?",
    choices: ["String", "Object", "Array", "Cucumber"],
    answer: "Cucumber"
    },
    {
    question: "How do you declare an Array?",
    choices: ["var array = {}", "var array = []", "var = array[]", "Apple"],
    answer: "var array = []"
    },
    {
    question: "What is an example of Camel Casing?",
    choices: ["helloworld", "HelloWorld", "hello_world", "helloBanana"],
    answer: "helloBanana"
    },
    {
    question: "Which HTML element results in bigger text",
    choices: ["<h1>", "<h2>", "<h3>", "Watermelon"],
    answer: "<h1>"
    }
];

var highScoresArray = [{}

];

var choicesButtonArray = [];

var questionCounter = 0;
var startQuizFlag = false;
var timeEndFlag = false;
var timeLeft = 0;
var score = 0;
var initials;

var startQuizHandler = function() {
    // remove start quiz button
    buttonEl.remove();

    // remove instructions prompt
    pEl.remove();
    // create choice buttons
    var choiceButton1El = document.createElement('button');
    var choiceButton2El = document.createElement('button');
    var choiceButton3El = document.createElement('button');
    var choiceButton4El = document.createElement('button');

    choicesButtonArray = [
        choiceButton1El, choiceButton2El, choiceButton3El, choiceButton4El
    ];

    // Initialize first question and timer
    // displayQuestion(choicesButtonArray);
    timeLeft = 75
    timer();

    // start timer and set up following questions
    var timeInterval = setInterval(function() {
        timer();
        endQuizCheck();
        if(timeEndFlag) {
            clearInterval(timeInterval);
        }
    }, 1000)
    displayQuestion(choicesButtonArray);
    
};

var displayQuestion = function(choicesButtonArray) {
    if (questionCounter < questionArray.length){
        // Display question
        h1El.textContent = questionArray[questionCounter].question;

        choicesButtonArray[0].textContent = questionArray[questionCounter].choices[0];
        choiceContainerEl.appendChild(choicesButtonArray[0]);

        choicesButtonArray[1].textContent = questionArray[questionCounter].choices[1];
        choiceContainerEl.appendChild(choicesButtonArray[1]);

        choicesButtonArray[2].textContent = questionArray[questionCounter].choices[2];
        choiceContainerEl.appendChild(choicesButtonArray[2]);

        choicesButtonArray[3].textContent = questionArray[questionCounter].choices[3];
        choiceContainerEl.appendChild(choicesButtonArray[3]);
    } else {
        timeLeft = 0;
    }
};

var checkAnswerHandler = function(event) {
    // grab user answer from button click
    var userAnswer = event.target;

    // correct answer
    var correctAnswer = questionArray[questionCounter].answer;

    // Will increment counter after first question
    if (!startQuizFlag) {
        startQuizFlag = true;
        return;
    } else {
        questionCounter++;
    }

    // check if answer is correct
    if (userAnswer.textContent === correctAnswer){
        score++;
        console.log("Good");
    }
    else {
        timeLeft = timeLeft - 5;
        console.log("BAD");
    }
    displayQuestion(choicesButtonArray);
}

var timer = function() {
    timerEl.textContent = timeLeft;
    timeLeft--;
}

var endQuizCheck = function() {
    if (timeLeft < 0) {
        timeEndFlag = true;
        console.log("End of quiz!");
        endQuiz();
    }
};

var endQuiz = function() {
    choiceContainerEl.remove();

    // New element for display score
    var pScoreEl = document.createElement('p');
    // place class name here for styling
    // *** PLACE CODE HERE ****

    // New element to submit high score container
    var divInputInitialsConatinerEl = document.createElement('div')
    // New elements to enter initials
    var pFixedMsg = document.createElement('p');
    var pInput = document.createElement('p');
     
    h1El.textContent = "All Done!";
    pScoreEl.textContent = "Your final score:" + score;
    pInput.innerHTML = "Enter Initials: <input type='text' name='initials' class='text-input'/><button id='submit-score' type='submit'>Submit</button>"

    divInputInitialsConatinerEl.appendChild(pScoreEl);
    divInputInitialsConatinerEl.appendChild(pInput);
    promptContainerDivEl.appendChild(divInputInitialsConatinerEl);

    var submitButton = document.querySelector('#submit-score');

    submitButton.addEventListener('click', highScoreHandler);

};

var highScoreHandler = function(){
    console.log("In high score");
    var highScoreConainterEl = document.createElement('div');
    var buttonContainerEl = document.createElement('div');

    var pHighScoresListEl = document.createElement('p');
    var backButtonEl = document.createElement('span');
    var clearButtonEl = document.createElement('span');

    // grab user initials input
    var initialsInput = document.querySelector("input[name='initials']").value;
    
    // index where to add new entry
    var tempObject = {
        user: initialsInput,
        scoreSaved: score
    };

    console.log(tempObject);

    //add new score and initials to array
    highScoresArray = localStorage.getItem("highScores");
    highScoresArray = JSON.parse(highScoresArray);
    if(highScoresArray === null) {
        highScoresArray = tempObject;
    } else {
        highScoresArray.push(tempObject);
    }

    console.log(highScoresArray);


    // store local
    localStorage.setItem("highScores", JSON.stringify(highScoresArray));

    // remove HTML
    promptContainerDivEl.removeChild(promptContainerDivEl.lastChild);

    // set content
    h1El.textContent = "High Scores";
    // for loop to list high scores
    for(var i = 0; i < highScoresArray.length; i++) {
        pHighScoresListEl.textContent = "1. " +highScoresArray[i].user + " - " +highScoresArray[i].score;
    }
    
    backButtonEl.innerHTML = "<button id='go-back' type='submit'>Go Back</button>"
    clearButtonEl.innerHTML = "<button id='clear' type='submit'>Clear Scores</button>"
    buttonContainerEl.appendChild(backButtonEl);
    buttonContainerEl.appendChild(clearButtonEl);

    highScoreConainterEl.appendChild(pHighScoresListEl);
    highScoreConainterEl.appendChild(buttonContainerEl)

    promptContainerDivEl.appendChild(highScoreConainterEl);

}

buttonEl.addEventListener('click', startQuizHandler);
choiceContainerEl.addEventListener('click', checkAnswerHandler);
