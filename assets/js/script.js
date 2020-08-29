var buttonEl =  document.querySelector("#start-quiz");
// var divButtonEl = document.querySelector("#btn");
var h1El = document.querySelector("#question");
var choiceContainerEl = document.querySelector(".btn");

var questionArray = [
    {
    question: "Which of the following styles a web application?",
    choices: ["HTML", "CSS", "JavaScript", "Potato"],
    answer: "CSS"
    }
];
var startQuizHandler = function() {
    // create choice buttons
    var choiceButton1El = buttonEl;
    var choiceButton2El = document.createElement("button");
    var choiceButton3El = document.createElement("button");
    var choiceButton4El = document.createElement("button");

    for (var i = 0; i < questionArray.length; i++) {
        // Display question
        h1El.textContent = questionArray[i].question;

        choiceButton1El.textContent = questionArray[i].choices[0];
        choiceContainerEl.appendChild(choiceButton1El);

        choiceButton2El.textContent = questionArray[i].choices[1];
        choiceContainerEl.appendChild(choiceButton2El);

        choiceButton3El.textContent = questionArray[i].choices[2];
        choiceContainerEl.appendChild(choiceButton3El);

        choiceButton4El.textContent = questionArray[i].choices[3];
        choiceContainerEl.appendChild(choiceButton4El);
    }

};







buttonEl.addEventListener("click", startQuizHandler);