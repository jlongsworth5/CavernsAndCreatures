/*	
	DEV 265 Final Project
	
	Author: 	Ben Webb, Tyler Smekens, Jeff Longsworth
	Date:   	11/18/2022
	
	Filename: quiz.js
*/

"use strict"; // interpret document contents in Javascript strict mode
const questions = new Array("Question 1: The world can be a dangerous place, how do you prepare yourself?",
	"Question 2: You must recover from your injuries, what is the best use of this time while you cannot physically train?",
	"Question 3: Why would you seek to learn everything there is to know about a subject?",
	"Question 4: Training requires you learn the craft, work with others, and challenge yourself; What area will you need to grow the most to reach success?",
	"Question 5: You will rally others, what in you motivates them?",
	"Question 6: Where would you most like to live?",
	"Question 7: What do you seek when you travel?",
	"Question 8: You must spend the next year on a project, which would be best for you?",
	"Question 9: What gives you the most fulfillment in life?",
"Question 10: You need to rebuild your life after a difficult time and must stay positive, how do you view this?");

const answers = new Array("	A. I must be strong, physically and mentally. Prepared to defend myself and others.",
	"B. I must learn all I can, strength lives or dies on planning. ",
	"C. It will take the efforts of many to survive, we must cultivate allies and create hope.",
	"A. I will rest well. Returning stronger requires patience.",
	"B. I will examine how and why this happened to ensure my training doesn't lapse again.",
	"C. I seek the counsel of my caretakers; they will make me strong again.",
	"A. This is what is necessary, that makes it important.",
	"B. Ways of knowing are the key to advancement for myself and the world.",
	"C. I have no right to walk among others without understanding their world.",
	"A. I will walk away with a greater understanding of study.  A fight is not always won in the ring.",
	"B. I have overcome many challenges before, but this will require more than just me.",
	"C. I cannot rely on everyone else all the time, I must harden my grit to get through.",
	"A. They will be inspired by my resolve.",
	"B. They will see that I am prepared.",
	"C. Their morale is lifted by my presence.",
	"A. In a city or town with others like me, living alongside others and contributing.",
	"B. On a university campus where I balance my life with pursuits of mastery.",
	"C. On a farm where I work to sustain my home's self-sufficiency.",
	"A. To see the world.",
	"B. To learn about new places.",
	"C. To collect memories and mementos.",
	"A. Write a book about whatever you want.",
	"B. Learn a new skill.",
	"C. Improve myself physically and mentally to improve the rest of my life.",
	"A. My career.",
	"B. My hobbies.", 
	"C. My family.",
	"A. I can rebuild my life with those who are still a part of it.",
	"B. This is an opportunity to reinvent myself!",
"C. I have made it to the other side of this struggle, my life will improve as a result.");

/* Global variables */
var questionIndex = 0;

function setupPage()
{
	document.getElementById("submitButton").action = startQuiz();
}

function startQuiz(evt)
{
	if (evt.preventDefault)
	{
		evt.preventDefault(); // prevent form from submitting
	}
	else
	{
		evt.returnValue = false; // prevent form from submitting in IE8
	}
	
	var submitButton = document.getElementById("submitButton");
	var label = document.getElementById("questionLabel");
	var answer1 = document.getElementById("answer1Label");
	var answer2 = document.getElementById("answer2Label");
	var answer3 = document.getElementById("answer3Label");
	var radioButtons = document.querySelectorAll("input[type=radio]");
	
	for (var i = 0; i < radioButtons.length; i++)
	{
		radioButtons[i].hidden = false;
	}
	
	label.innerHTML = questions[questionIndex];
	answer1Label.innerHTML = answers[questionIndex];
	answer2Label.innerHTML = answers[questionIndex + 1];
	answer3Label.innerHTML = answers[questionIndex + 2];
	
	submitButton.value = "Next Question";
	
	var form = document.getElementsByTagName("form")[0];	
	if (form.addEventListener)
	{
		form.removeEventListener("submit", startQuiz, false);
		form.addEventListener("submit", submitAnswer, false);
	}
	else if (form.attachEvent)
	{
		form.detachEvent("onsubmit", startQuiz);
		form.attachEvent("onsubmit", submitAnswer);
	}
}

function submitAnswer(evt)
{	
	if (evt.preventDefault)
	{
		evt.preventDefault(); // prevent form from submitting
	}
	else
	{
		evt.returnValue = false; // prevent form from submitting in IE8
	}
	
	questionIndex++;
	if (questionIndex > questions.length - 1)
	{
		getResults();
	}
	
	var answerValues = answers.slice(questionIndex * 3, (questionIndex * 3) + 3);
	var label = document.getElementById("questionLabel");
	var answer1 = document.getElementById("answer1Label");
	var answer2 = document.getElementById("answer2Label");
	var answer3 = document.getElementById("answer3Label");
	
	label.innerHTML = questions[questionIndex];
	answer1Label.innerHTML = answerValues[0];
	answer2Label.innerHTML = answerValues[1];
	answer3Label.innerHTML = answerValues[2];
}

function getResults()
{
	document.getElementsByTagName("form")[0].submit();
	
}

/* create event listeners */
function createEventListeners()
{
	var form = document.getElementsByTagName("form")[0];
	if (form.addEventListener)
	{
		form.addEventListener("submit", startQuiz, false);
	}
	else if (form.attachEvent)
	{
		form.attachEvent("onsubmit", startQuiz);
	}
}

/* run setup when page finishes loading */
if (window.addEventListener)
{
	window.addEventListener("load", createEventListeners, false);
}
else if (window.attachEvent)
{
	window.attachEvent("onload", createEventListeners);
}	