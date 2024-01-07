var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;
// if we click on the start/reset
document.getElementById("startreset").onclick = function () {
    //if we are playing
    if(playing == true){
        location.reload(); //reload page
    }else{ //if we're not playing
        playing = true; // change mode to playing, reload page
        score = 0;//set score to 0
        document.getElementById("scoreValue").innerHTML = score;
        //show countdown box
        show("timeremaining");
        timeremaining = 60; //set counter to 60
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        //change button to reset
        document.getElementById("startreset").innerHTML = "Reset Game";
        //start countdown
        startCountdown();

        //hide gameover box
        hide("gameover");
        
        //generate new Q&As
        generateQA();
    }
}

for(i=1; i<5; i++){
    document.getElementById("box" + i).onclick = function(){
        //check if we are playing
        if(playing == true){
            if(this.innerHTML == correctAnswer){
                score++; //increase score by 1
                document.getElementById("scoreValue").innerHTML = score;
                //hide wrong box and show correct box
                hide("tryagain");
                show("correct");
                setTimeout(function(){
                    hide("correct");
                },1000);
                
                //generate new Q&A
                generateQA();
                
            }else{
                //wrong answer
                hide("correct");
                show("tryagain");
                setTimeout(function(){
                    hide("tryagain");
                },1000);
            }
        }
    }
}
//functions

//start counter
function startCountdown(){
    action = setInterval(function(){
        timeremaining -= 1;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        if(timeremaining ==0){//game over
            stopCountdown();
        show("gameover"); //display game over message
        //change text to show score
        document.getElementById("gameover").innerHTML = "<p>Game Over!</p><p>Your score is " + score + ".</p>";
        hide("timeremaining");
        hide("correct");
        hide("tryagain");
        playing = false;
        document.getElementById("startreset").innerHTML = "Start Game";
        }

    }, 1000);
}

//stop counter
function stopCountdown(){
    clearInterval(action);
}

//hide an element
function hide(Id) {
    document.getElementById(Id).style.display = "none";
}

//display an element
function show(Id) {
    document.getElementById(Id).style.display = "block";
}

// generate question and multiple answers

function generateQA(){
    var x = 1 + Math.round(9 * Math.random());
    var y = 1 + Math.round(9 * Math.random());
    correctAnswer = x*y;
    document.getElementById("question").innerHTML = x + "x" + y;
    var correctPosition = 1 + Math.round(3 * Math.random());
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer //fill one box with the correct answer
    // fill other boxes with wrong answers
    
    var answers = [correctAnswer];
    
    for (i=1; i<5; i++){
        if(i != correctPosition){
            var wrongAnswer;
            do{
                wrongAnswer = (1 + Math.round(9 * Math.random()) * 1 + Math.round(9 * Math.random())); // a wrong answer
            }
            while(answers.indexOf(wrongAnswer)>-1)
            document.getElementById("box" + i).innerHTML = wrongAnswer;

            answers.push(wrongAnswer);
    }
}
}

// if we click on the start/reset
    //if we are playing
        //reload page
        //set score to 0
    //if we're not playing
        //show countdown box
        //reduce time by 1sec in loops
            //check if there's time left
                //yes--> continue
                //no--> game over
        //change button to reset
        //generate new question and muliple choices


//if click on answer box
    //if we're playing
        //correct?
            //yes
                //increase score
                //show correct box for 1 sec
                // generate new q&a
            //no
                //show try again box for 1 sec