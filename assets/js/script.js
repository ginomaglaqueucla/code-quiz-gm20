// start quiz button
var buttonEl =  document.querySelector('#start-quiz');
// main prompt
var h1El = document.querySelector('#main');
// Instructions
var pEl = document.querySelector('#secondary');
// Choice Button container
var choiceContainerEl = document.querySelector('#btn-container');
// timer
var timerEl = document.querySelector('#timer');
// main container
var promptContainerDivEl = document.querySelector('#prompt-container');
// View High Score
var aViewHighScoreTag = document.querySelector('#viewHS');
// results
var resultEl = document.createElement('div');
resultEl.className ='result';

// Question Array
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
    },
    {
    question: "Which of the following is not a HTML element?",
    choices: ["1. <h1>", "2. <section>", "3. <footer>", "4. Peach"],
    answer: "4. Peach"
    },
    {
    question: "Methods are also referred to as?",
    choices: ["1.functions", "2. groups", "3. blocks", "4. Lettuce"],
    answer: "1. functions"
    },
];


var choicesButtonArray = [];
var quizTakenCounter;
var questionCounter = 0;
var timeEndFlag = false;
var timeLeft = 0;
var score = 0;

// Handles when start quiz button is clicked
var startQuizHandler = function() {

    // Remove start quiz button
    buttonEl.remove();
    // Remove instructions prompt
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
    // Assign to array
    choicesButtonArray = [
        choiceButton1El, choiceButton2El, choiceButton3El, choiceButton4El
    ];

    // Initialize timer
    timeLeft = 75
    timer();

    // start timer and stop accordingly
    var timeInterval = setInterval(function() {
        timer();
        endQuizCheck();
        if(timeEndFlag) {
            clearInterval(timeInterval);
        }
    }, 1000)
    // Display first question and choice buttons
    displayQuestion();
};

// Displays questions and choice buttons
var displayQuestion = function() {

    // checks if there are any questions left
    if (questionCounter < questionArray.length){
        // Assign and Display question
        h1El.textContent = questionArray[questionCounter].question;

        // Assign and Display choice buttons
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
    // Listens for any choice button click
    choicesButtonArray[0].addEventListener('click', checkAnswerHandler);
    choicesButtonArray[1].addEventListener('click', checkAnswerHandler);
    choicesButtonArray[2].addEventListener('click', checkAnswerHandler);
    choicesButtonArray[3].addEventListener('click', checkAnswerHandler);
};

// Handles when choice button is clicked - checks answer
var checkAnswerHandler = function(event) {
    // grab user answer from button click
    var userAnswer = event.target;

    // correct answer
    var correctAnswer = questionArray[questionCounter].answer;

    // increment question array index counter
    questionCounter++;

    // check if answer is correct
    if (userAnswer.textContent === correctAnswer){
        score++;
        console.log("Good");
        resultEl.textContent = 'Correct!';
    }
    else {
        timeLeft = timeLeft - 5;
        console.log("BAD");
        resultEl.textContent = 'Wrong!'
    }
    // Display Result
    promptContainerDivEl.appendChild(resultEl);
    // Prompt next question
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

// When timer goes to 0 or if there are no more questions in the array
var endQuiz = function() {
    // remove choice buttons
    choiceContainerEl.remove();

    // New element for display score
    var pScoreEl = document.createElement('p');

    // New element to submit high score container
    var divInputInitialsConatinerEl = document.createElement('div')
    
    // New elements to enter initials
    var pInput = document.createElement('p');
    
    // All Done message
    h1El.textContent = "All Done!";
    // Final score
    pScoreEl.textContent = "Your final score: " + score;
    // Initial input and submit button
    pInput.innerHTML = "Enter Initials: <input type='text' name='initials' class='text-input'/><button class='btn' id='submit-score' type='submit'>Submit</button>"

    // append elements to display
    divInputInitialsConatinerEl.appendChild(pScoreEl);
    divInputInitialsConatinerEl.appendChild(pInput);
    promptContainerDivEl.appendChild(divInputInitialsConatinerEl);

    // Listen for when submit button is clicked
    var submitButton = document.querySelector('#submit-score');
    submitButton.addEventListener('click', highScoreHandler);
};

// Handles when submit button is clicked - new score inputted
var highScoreHandler = function(){
    event.preventDefault();

    //collect most recent
    quizTakenCounter = JSON.parse(localStorage.getItem("quizTakenCounter"));
    // increment quiz counter
    quizTakenCounter++;
    // store 
    localStorage.setItem("quizTakenCounter", JSON.stringify(quizTakenCounter));

    // grab user initials input
    var initialsInput = document.querySelector("input[name='initials']").value;

    // temp object
    var tempObject = {
        user: initialsInput,
        scoreSaved: score
    };

    // store local
    localStorage.setItem("highScores"+quizTakenCounter, JSON.stringify(tempObject));

    // display high score
    displayHighScore();
}

// Displays high score after new score has been stored or view high score link clicked
var displayHighScore = function() {
    console.log(event);
    // remove unwanted HTML
    promptContainerDivEl.removeChild(promptContainerDivEl.lastChild);
    pEl.remove();
    buttonEl.remove();
    choiceContainerEl.remove();

    //collect most recent
    quizTakenCounter = JSON.parse(localStorage.getItem("quizTakenCounter"));

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

    // append to display
    promptContainerDivEl.appendChild(highScoreContainerEl);

    // defining go back and clear buttons
    backButtonEl.innerHTML = "<button class='btn' id='go-back' type='submit'>Go Back</button>"
    clearButtonEl.innerHTML = "<button class='btn' id='clear' type='submit'>Clear Scores</button>"
   
    // append to display
    buttonContainerEl.appendChild(backButtonEl);
    buttonContainerEl.appendChild(clearButtonEl);
    promptContainerDivEl.appendChild(buttonContainerEl)

    // Event Listener for buttons
    backButtonEl.addEventListener('click', refreshBrowser);
    clearButtonEl.addEventListener('click', clearStorage);

    // remove listener for view high score link
    aViewHighScoreTag.removeEventListener('click', displayHighScore);
};
// "Go Back"
var refreshBrowser = function() {
    location.reload(true);
};

// "Clear Storage"
var clearStorage = function(){
    localStorage.clear();
    var highScoreConainterEl = document.querySelector('.high-scores');
    highScoreConainterEl.remove();
};

buttonEl.addEventListener('click', startQuizHandler);
aViewHighScoreTag.addEventListener('click', displayHighScore);
