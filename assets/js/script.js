var buttonEl =  document.querySelector("#start-quiz");
// var divButtonEl = document.querySelector("#btn");
var h1El = document.querySelector("#question");
var choiceContainerEl = document.querySelector(".btn");

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
    answer: "Watermelon"
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

var choicesButtonArray = [];

var questionCounter = 0;
var startQuizFlag = false;
var startQuizHandler = function() {
    // remove start quiz button
    buttonEl.remove();
    // create choice buttons
    var choiceButton1El = document.createElement("button");;
    var choiceButton2El = document.createElement("button");
    var choiceButton3El = document.createElement("button");
    var choiceButton4El = document.createElement("button");

    choicesButtonArray = [
        choiceButton1El, choiceButton2El, choiceButton3El, choiceButton4El
    ];
    displayQuestion(choicesButtonArray);    
};

var displayQuestion = function(choicesButtonArray) {
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
};

var checkAnswerHandler = function(event) {

    // grab user answer from button click
    var userAnswer = event.target;

    // correct answer
    var correctAnswer = questionArray[questionCounter].answer;

    // check if answer is correct
    if (userAnswer.textContent === correctAnswer){
        console.log("Good");
    }
    else {
        console.log("BAD");
    }

    // Will increment counter after first question
    if (!startQuizFlag) {
        startQuizFlag = true;
    } else {
        questionCounter++;
    }

    displayQuestion(choicesButtonArray);

    
 }




buttonEl.addEventListener("click", startQuizHandler);
choiceContainerEl.addEventListener("click", checkAnswerHandler);