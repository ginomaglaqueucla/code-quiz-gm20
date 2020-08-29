var buttonEl =  document.querySelector("#start-quiz");
var h1El = document.querySelector("#question");
var startQuizHandler = function() {
    console.log("button was");
    h1El.textContent = "TEST TEST";

};







buttonEl.addEventListener("click", startQuizHandler);