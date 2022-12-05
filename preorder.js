/*	
	DEV 265 Final Project
	
	Author: 	Ben Webb, Tyler Smekens, Jeff Longsworth
	Date:   	12/1/2022
	Filename: preorder.js
*/

"use strict"; // interpret document contents in Javascript strict mode

/* global variables */
var formValidity = true;
var statesArray = new Array("AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN",
	"IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV",
	"NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN",
"TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY" );

/* setup the page on loading */
function setupPage()
{	
	var selectElement = document.getElementById("state");
	selectElement.remove(0);
	for (var state = 0; state < statesArray.length; state++)
	{
		var option = document.createElement('option');
		option.value = statesArray[state];
		option.innerHTML = statesArray[state];
		selectElement.appendChild(option);
	}
	
	var currentDate = new Date();
	
	document.getElementById("cardExpMonth").value = currentDate.getMonth() + 1;
	document.getElementById("cardExpYear").value = currentDate.getFullYear();	
}

function validateAddress()
{
	var inputElements = document.querySelectorAll("#addressInfo input");
	var errorDiv = document.getElementById("errorText");
	var elementCount = inputElements.length;
	var requiredValidity = true;
	var currentElement;
	
	try
	{
		for (var i = 0; i < elementCount; i++)
		{
			currentElement = inputElements[i];
			if (currentElement.id !== "aptNumber")
			{
				if (currentElement.value === "")
				{
					currentElement.style.background = "rgb(255,233,233)";
					requiredValidity = false;
				}
				else
				{
					currentElement.style.background = "white";
				}
			}
		}
		if (requiredValidity === false)
		{
			throw "Please complete all required fields.";
		}
		errorDiv.style.display = "none";
		errorDiv.innerHTML = "";
	}
	catch(msg)
	{
		errorDiv.style.color = "red";
		errorDiv.style.display = "block";
		errorDiv.innerHTML = msg;
		formValidity = false;
	}
}

function validatePayment()
{
	var inputElements = document.querySelectorAll("#paymentInfo input");
	//T: We may want to change this line below; the variable name, as well as the element it's
	// trying to get. Identical to another variable in another function
	var errorDiv = document.getElementById("errorText");
	var elementCount = inputElements.length;
	var requiredValidity = true;
	var currentElement;
	
	try
	{
		for (var i = 0; i < elementCount; i++)
		{
			currentElement = inputElements[i];
			if (currentElement.id === "cardNumber")
			{
				validateCardNumber();
			}
			else
			{
				if (currentElement.value === "")
				{
					currentElement.style.background = "rgb(255,233,233)";
					requiredValidity = false;
				}
				else
				{
					currentElement.style.background = "white";
				}
			}
		}
		if (requiredValidity === false)
		{
			throw "Please complete all required fields.";
		}
		errorDiv.style.display = "none";
		errorDiv.innerHTML = "";
	}
	catch(msg)
	{
		errorDiv.style.color = "red";
		errorDiv.style.display = "block";
		errorDiv.innerHTML = msg;
		formValidity = false;
	}
}

function validateCardNumber()
{	
	var cardNumber = document.getElementById("cardNumber").value;
	var cardProvider = document.getElementById("cardProvider");
	//T: First number in credit card # must match the one specified
	// in the visa, mc, discover, & amex variables below
	// ("/^#"; e.x. visa starts with 4).
	//T: What do the other specifications for these cards mean?
	var visa = /^4[0-9]{12}(?:[0-9]{3})?$/;
	//T: MasterCard must start with a 6, then the next number is between 1-5
	var mc = /^5[1-5][0-9]{14}$/;
	//T: Discover must start with "6011"
	var discover = /^6(?:011|5[0-9]{2})[0-9]{12}$/;
	//T: American Express must start with "347" and only has 15 digits

	var amex = /^3[47][0-9]{13}$/;
	var requiredValidity = false;
	
	if (visa.test(cardNumber))
	{
		requiredValidity = true;
	}
	else if (mc.test(cardNumber))
	{
		requiredValidity = true;
	}		
	else if (discover.test(cardNumber))
	{
		requiredValidity = true;
	}
	else if (amex.test(cardNumber))
	{
		requiredValidity = true;
	}
	
	if (requiredValidity === false)
	{
		throw "Enter a valid credit card number.";
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
	validateAddress();
	validatePayment();
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
	window.addEventListener("load", setupPage, false);
}
else if (window.attachEvent)
{
	window.attachEvent("onload", createEventListeners);
	window.addEventListener("onload", setupPage);
}	