import {
    Template
} from 'meteor/templating';
import {
    Roles
} from 'meteor/alanning:roles';

import {
    psGameTerms
} from '../../../collections/psTerms.js';

import "./partofspeechGame.html";
import "./partofspeechGame.css";

Template.partofspeechGame.onCreated(function () {
    if (!Meteor.userId()) {
        FlowRouter.go('/');
    }

    percentCorrect = 0;
    gameCount = 0;
});

Template.partofspeechGame.events({
    'click #home': function () {
        if (Meteor.userId()) {
            FlowRouter.go('/userHome');
        } else {
            FlowRouter.go('/')
        }
    },
    'click #logout': function (event) {
        Meteor.logout(_logout);
    },
    'click .gameCaption': function (event) {
        populateGame();
    },
    'click #playposGame': function (event) {
        $('.gameInstructions').hide();
        $('#psGamePanel').show();
        populateGame();
    },
    'click .cardText': function (event) {
        let answerText = event.target.firstChild.nodeValue;
        if (answerText == psQuestion.pos) {
            sAlert.success('Correct! Next Question');
            percentCorrect ++;
            gameCount++;
            console.log(gameCount);
            checkquestionCount();
            populateGame();
        } else {
            sAlert.info('Incorrect! Try Again');
        }
    }
})

function checkquestionCount() {
    if (gameCount >= 10) {
        sAlert.info('Game Over! 10 Questions Asked');
    } else {
        sAlert.info((10 - gameCount) + ' questions left');
    }
}

function populateGame() {

    //sets collection values into array for querying
    let psArray = psGameTerms.find().fetch();

    //intializes variables
    let answerArray = [];
    let psQuestionPick = "";
    let randomIndex = 0;
    //loop to get terms for question
    for (i = 1; i < 4; i++) {
        //choose random index and query from array to equal question pick
        randomIndex = Math.floor(Math.random() * (psArray.length -1));
        psQuestionPick = psArray[randomIndex];

        //remove chosen element and push to answer array
        answerArray.push(psQuestionPick);
    }
    console.log(answerArray);

    //create a random number and choose that index for the question from answer array
    let randomQuestionNumber = Math.floor(Math.random() * (answerArray.length -1));
    // answerArray.splice(randomQuestionNumber, 1);

    //initialize value of chosen question
    psQuestion = "";
    //try to set value of question and format properly
    try {
        psQuestion = JSON.parse(JSON.stringify(answerArray[randomQuestionNumber]));
        // console.log(answerArray);
        // console.log(randomQuestionNumber);
    } catch(exception) {
        // console.log(exception);
        // console.log(answerArray[randomQuestionNumber]);
    }

    //outputs chosen term and pos
    console.log(psQuestion.term + " is a(n) " + psQuestion.pos);
    //sets text value of question div to chosen term
    $('#psQuestion').text(psQuestion.term);

    //array of parts of speech for selection
    let partsofSpeech = [
        'Noun',
        'Verb',
        'Adverb',
        'Preposition',
        'Adjective',
        'Pronoun',
        'Conjunction',
        'Interjection'
    ]

    //random num for position of answers (see lines 109-122)
    let randomNumberOne = Math.floor(Math.random() * 3) + 1;

    //loops until choiceTwo is not a duplicate
    let answerTwo = "";
    let randomNumberTwo = 0;
    do {
        randomNumberTwo = Math.floor(Math.random() * (8 - 1));
        answerTwo = partsofSpeech[randomNumberTwo];
    } while (answerTwo == psQuestion.pos);
    
    //logs the value of a2 compared to psQuestion
    console.log(answerTwo + " and " + psQuestion.pos + " are different.");

    //loops until choiceThree is not a duplicate
    let answerThree = ""
    do {
        let randomNumberThree = Math.floor(Math.random() * (8 - 1));
        answerThree = partsofSpeech[randomNumberThree];
    } while (answerThree == answerTwo || answerThree == psQuestion.pos);

    //logs the value of a3 compared to psQuestion
    console.log(answerThree + " and " + psQuestion.pos + " are different.");

    //sets where to place the answers
    if (randomNumberOne == 1) {
        $('#psAnswerOne').text(psQuestion.pos);
        $('#psAnswerTwo').text(answerTwo);
        $('#psAnswerThree').text(answerThree);
    } else if (randomNumberOne == 2) {
        $('#psAnswerTwo').text(psQuestion.pos);
        $('#psAnswerOne').text(answerTwo);
        $('#psAnswerThree').text(answerThree);
    } else if (randomNumberOne == 3) {
        $('#psAnswerThree').text(psQuestion.pos);
        $('#psAnswerOne').text(answerTwo);
        $('#psAnswerTwo').text(answerThree);
    }
}

function _logout() {
    FlowRouter.go('/');
}