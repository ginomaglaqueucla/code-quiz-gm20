var buttonEl =  document.querySelector('#start-quiz');
var h1El = document.querySelector('#main');
var pEl = document.querySelector('#secondary');
var choiceContainerEl = document.querySelector('#btn-container');
var timerEl = document.querySelector('#timer');
var promptContainerDivEl = document.querySelector('#prompt-container');
var aViewHighScoreTag = document.querySelector('#viewHS');


var questionArray = [
    {
    question: "Which of the following styles a web application?",
    choices: ["1. HTML", "2. CSS", "3. JavaScript", "4. Potato"],
    answer: "2. CSS"
    },
    {
    question: "What is the syntax for printing to console?",
    choices: ["1. window.alert()", "2. printToConsole()", "3. console.log()", "4. Tomato"],
    answer: "3. console.log()"
    },
    {
    question: "Which of the follow is NOT a data type?",
    choices: ["1. String", "2. Object", "3. Array", "4. Cucumber"],
    answer: "4. Cucumber"
    },
    {
    question: "How do you declare an Array?",
    choices: ["1. var array = {}", "2. var array = []", "3. var = array[]", "4. Apple"],
    answer: "3. var array = []"
    },
    {
    question: "What is an example of Camel Casing?",
    choices: ["1. helloworld", "2. HelloWorld", "3. hello_world", "4. helloBanana"],
    answer: "4. helloBanana"
    },
    {
    question: "Which HTML element results in bigger text",
    choices: ["1. <h1>", "2. <h2>", "3. <h3>", "4. Watermelon"],
    answer: "1. <h1>"
    }
];

var highScoresArray = [{}

];

var choicesButtonArray = [];
var quizTakenCounter;
var questionCounter = 0;
var startQuizFlag = false;
var timeEndFlag = false;
var timeLeft = 0;
var score = 0;


var startQuizHandler = function() {

  //  localStorage.setItem("quizTakenCounter", JSON.stringify(quizTakenCounter));
    // remove start quiz button
    buttonEl.remove();

    // remove instructions prompt
    pEl.remove();
    // create choice buttons
    var choiceButton1El = document.createElement('button');
    choiceButton1El.className = "btn choice-btn";
    var choiceButton2El = document.createElement('button');
    choiceButton2El.className = "btn choice-btn";
    var choiceButton3El = document.createElement('button');
    choiceButton3El.className = "btn choice-btn";
    var choiceButton4El = document.createElement('button');
    choiceButton4El.className = "btn choice-btn";

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
    displayQuestion();



};

var displayQuestion = function() {
    
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

    choicesButtonArray[0].addEventListener('click', checkAnswerHandler);
    choicesButtonArray[1].addEventListener('click', checkAnswerHandler);
    choicesButtonArray[2].addEventListener('click', checkAnswerHandler);
    choicesButtonArray[3].addEventListener('click', checkAnswerHandler);
};

var checkAnswerHandler = function(event) {
    // grab user answer from button click
    var userAnswer = event.target;
    console.log(userAnswer);

    // correct answer
    var correctAnswer = questionArray[questionCounter].answer;

    // Will increment counter after first question
    // if (!startQuizFlag) {
    //     startQuizFlag = true;
    //     return;
    // } else {
    //     questionCounter++;
    // }
    questionCounter++;

    // check if answer is correct
    if (userAnswer.textContent === correctAnswer){
        score++;
        console.log("Good");
    }
    else {
        timeLeft = timeLeft - 5;
        console.log("BAD");
    }
    displayQuestion();
}

var timer = function() {
    timerEl.textContent = 'Timer: '+timeLeft;
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
    pInput.innerHTML = "Enter Initials: <input type='text' name='initials' class='text-input'/><button class='btn' id='submit-score' type='submit'>Submit</button>"

    divInputInitialsConatinerEl.appendChild(pScoreEl);
    divInputInitialsConatinerEl.appendChild(pInput);
    promptContainerDivEl.appendChild(divInputInitialsConatinerEl);

    var submitButton = document.querySelector('#submit-score');

    submitButton.addEventListener('click', highScoreHandler);

};

var highScoreHandler = function(){
    event.preventDefault();
    
    //collect most recent
    quizTakenCounter = JSON.parse(localStorage.getItem("quizTakenCounter"));
    // increment quiz counter
    quizTakenCounter++;
    localStorage.setItem("quizTakenCounter", JSON.stringify(quizTakenCounter));

    // grab user initials input
    var initialsInput = document.querySelector("input[name='initials']").value;

    // index where to add new entry
    var tempObject = {
        user: initialsInput,
        scoreSaved: score
    };

    // store local
    localStorage.setItem("highScores"+quizTakenCounter, JSON.stringify(tempObject));

    displayHighScore();
}

var displayHighScore = function() {
    console.log(event);
    // remove HTML
    promptContainerDivEl.removeChild(promptContainerDivEl.lastChild);
    pEl.remove();
    buttonEl.remove();
    choiceContainerEl.remove();

    //collect most recent
    quizTakenCounter = JSON.parse(localStorage.getItem("quizTakenCounter"));

    console.log("In highscore");
    // container for High Score List
    var highScoreContainerEl = document.createElement('div');
    highScoreContainerEl.className = 'high-scores';

    // container for buttons
    var buttonContainerEl = document.createElement('div');
    var backButtonEl = document.createElement('span');
    var clearButtonEl = document.createElement('span');

    // Display "High Scores"
    h1El.textContent = "High Scores";

    var temp;
    // for loop goes through every locally stored item
    for(var i = 0; i < quizTakenCounter; i++){
        temp = JSON.parse(localStorage.getItem("highScores"+(i+1)));
        var pHSEntryEl = document.createElement('div');
        pHSEntryEl.textContent = i+1+". " +temp.user + " - " +temp.scoreSaved;
        highScoreContainerEl.appendChild(pHSEntryEl);
    }

    promptContainerDivEl.appendChild(highScoreContainerEl);

    // defining buttons
    backButtonEl.innerHTML = "<button class='btn' id='go-back' type='submit'>Go Back</button>"
    clearButtonEl.innerHTML = "<button class='btn' id='clear' type='submit'>Clear Scores</button>"
   
    buttonContainerEl.appendChild(backButtonEl);
    buttonContainerEl.appendChild(clearButtonEl);
    promptContainerDivEl.appendChild(buttonContainerEl)

    // Event Listener for buttons
    backButtonEl.addEventListener('click', refreshBrowser);
    clearButtonEl.addEventListener('click', clearStorage);

    aViewHighScoreTag.removeEventListener('click', displayHighScore);
};

var refreshBrowser = function() {
    location.reload(true);
};

var clearStorage = function(){
    localStorage.clear();
    var highScoreConainterEl = document.querySelector('.high-scores');
    highScoreConainterEl.remove();
};

buttonEl.addEventListener('click', startQuizHandler);
aViewHighScoreTag.addEventListener('click', displayHighScore);
