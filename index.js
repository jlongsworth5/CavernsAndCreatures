/*	
	DEV 265 Final Project
	
	Author: 	Ben Webb, Tyler Smekens, Jeff Longsworth
	Date:   	12/1/2022
	
	Filename: index.html
*/

"use strict"; // interpret document contents in Javascript strict mode

/* global variables */	
var formValidity = true;

/* validate that an email address is entered */
function validateEmail()
{
	var emailInput = document.getElementById("newsEmail");
	var emailCheck = /^[_\w\-]+(\.[_\w\-]+)*@[\w\-]+(\.[\w\-]+)*(\.[\D]{2,6})$/;
	var errorDiv = document.getElementById("errorEmail");
	var requiredValidity = true;
	
	try
		{
		if (emailCheck.test(emailInput.value) === false)
		{
			throw "Please provide a valid email address";
		}	
		
		// remove any email error styling and message
		emailInput.style.background = "";
		errorDiv.innerHTML = "";
		errorDiv.style.display = "none";
		// convert email address to lowercase
		emailInput.value = emailInput.value.toLowerCase();
	}
	catch(msg)
	{
		emailInput.style.background = "rgb(255,233,233)";
		errorDiv.style.display = "block";
		errorDiv.style.color = "red";
		errorDiv.innerHTML = msg;
		formValidity = false;
	}
}

/* validate form */
function validateForm(evt)
{
	if (evt.preventDefault)
	{
		evt.preventDefault(); // prevent form from submitting
	}
	else
	{
		evt.returnValue = false; // prevent form from submitting in IE8
	}
	formValidity = true;	
	validateEmail();
	if (formValidity === true)
	{
		document.getElementsByTagName("form")[0].submit();
	}
}

/* create event listeners */
function createEventListeners()
{
	var form = document.getElementsByTagName("form")[0];
	if (form.addEventListener)
	{
		form.addEventListener("submit", validateForm, false);
	}
	else if (form.attachEvent)
	{
		form.attachEvent("onsubmit", validateForm);
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