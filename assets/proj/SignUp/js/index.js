(function() {
	"use strict";
	var input;
	var container;
	var classSuccess = "success";
	var classError = "error";
	var	formValidator = {

			restart: function() {
				this.cacheDom();  //this = formValidator
				this.bindEvents(); //this = formValidator
			},

			cacheDom: function() {
				//access elements
				this.submissionForm = document.getElementById("submissionForm");
				this.formHead = document.querySelector("#formHead h1");
				this.formBody = document.getElementById("formBody");
				this.inputContainer = document.getElementsByClassName("inputContainer");
				this.fields = {
					userName: document.getElementById("userName"),
					userEmail: document.getElementById("userEmail"),
					userPassword: document.getElementById("userPassword"),
					usercPassword: document.getElementById("usercPassword")
				};
				this.submitButton = document.getElementById("submitButton");
			},

			bindEvents: function() {
				var i;
				//runs setRules when submit button clicked
				this.submitButton.onclick = this.setRules.bind(this);
				//binds events
				for (i in this.fields) {
					if (this.fields.hasOwnProperty(i)) {
						//variables
						input = this.fields[i];
						container = input.parentElement;
						//Runs setRules when input has focus
						input.onfocus = this.setRules.bind(this);
						//Removes errors when container is clicked
						container.onclick = this.clearErrors.bind(this, input);
					}
				}
			},

			setRules: function(evnt) {
				var target = evnt.target,
						type = evnt.type;
				//if submit button is clicked
				if (target === this.submitButton) {
					//Prevent form submission
					this.preventDefault(evnt);
					//if input has focus
				} else if (type === "focus") {
					//remove error/success messages
					this.resetClasses(target.parentElement);
					//reset errors
					this.clearErrors(target);
					return false;
				}
				this.resetClasses();
				this.validateFields();
			},

			preventDefault: function(evnt) {
				evnt.preventDefault();
			},

			validateFields: function() {
				var i,
						validFields = 0,
						//r-mail regular expression
						filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
				// check each input
				for (i in this.fields) {
					if (this.fields.hasOwnProperty(i)) {
						input = this.fields[i];


						if (input.value === "") {

							this.addClass(input, classError);
							//else if the e-mail input filter is not passed
						}
						else if (i === "userEmail" && !filter.test(input.value)) {

							this.addClass(input, classError);
						}
						else if (i === "userPassword" && input.value.length  < 8 ) {

							this.addClass(input, classError);
						}
						else if (i === "usercPassword" && input.value != userPassword.value ) {

							this.addClass(input, classError);
						}

						else {
							//input is valid, continue looping
							this.addClass(input, classSuccess);
							validFields += 1;
						}
					}
				}
				//if all inputs are valid
				if (validFields === 4) {
					//submit
					this.submitForm();
				}
			},

			addClass: function(input, clss) {
				container = input.parentElement;
				//if error class has been added
				if (clss === classError) {
					//show error message
					this.errorMessage(input);
				}
				//Add class
				input.parentElement.classList.add(clss);
			},

			errorMessage: function(input) {
				var message = '';

				if (input === this.fields.userName) {
					message = "You forgot your name!";

				}

				if (input === this.fields.userEmail) {
					message = "E-mail address invalid!";

				}

				if(input.id == 'userPassword'){

					if(input.value.length < 8){ message = "Password must be 8 characters!"; }
			
				}

				if(input.id == 'usercPassword'){
					if ( input.value.length == 0 ) { message = "You forgot to confirm password!"; }
					// if ConfirmPassword is empty ERROR is display
					if(input.value != userPassword.value){ message = "Passwords do not match!"; }
					// iF Password is wrong Error is display
				}
				this.addError(input, message);
			},

			addError: function(input, message) {
				var html;
				container = input.parentElement;
				//render
				html = document.createElement("div");
				html.setAttribute("class", "message");
				html.innerHTML = message;
				//if element doesnt exist
				if (!container.getElementsByClassName("message")[0]) {
					//add message
					container.insertBefore(html, container.firstElementChild);
				}
			},

			resetClasses: function(input) {
				var i;
				//if targeting particular input
				if (input) {
					//access input container
					container = input.parentElement;
					container.classList.remove(classError, classSuccess);
					input.focus();
				} else {
					for (i in this.fields) {
						if (this.fields.hasOwnProperty(i)) {
							//remove classes from all fields
							this.fields[i].parentElement.classList.remove(classError, classSuccess);
						}
					}
				}
			},

			clearErrors: function(input) {
				//get input container
				container = input.parentElement;
				//if error
				if (container.classList.contains(classError)) {
					this.resetClasses(input);
				}
			},

			submitForm: function() {
				var waitForAnimation;
				//add success class
				this.submissionForm.classList.add(classSuccess);
				//wait for animation to finish
				this.changeHead("Success!<br/><span>No data actually posted. However.</span><br/><input id='ResetButton' onClick='window.location.reload()' class='submitButton' type='reset' value='RESET'>");
			},

			changeHead: function(text) {
				//change head text
				this.formHead.innerHTML = text;
			}
		};
	formValidator.restart();
}());
