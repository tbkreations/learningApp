import {
    Template
} from 'meteor/templating';

import {_login} from '../landingPage/landingPage.js';

import "./signUp.html";
import "./signUp.css";

Template.signUp.onCreated(function () {
    if (Meteor.userId()) {
        FlowRouter.go('/userHome');
    }
});

// Template.signUp.helpers({
//     fullInput: function() {
//         if($('#email').val() || $('#firstname').val() || $('#lastname').val() || $('#username').val() || $('#password').val() == "") {
//             return true;
//         }
//     }
// });

Template.signUp.events({
    'click #isUser': function (event) {
        FlowRouter.go('/');
    },

    'submit .signupForm'(event) {

        if ($('#password').val() != $('#confirm').val()) {
            $('#errorMessage').html('Error: The Passwords Do Not Match').css('color', 'red');
            event.preventDefault();
        } else if($('#email').val() == "" || $('#firstname').val() == "" || $('#lastname').val() == "" || $('#username').val() == "" || $('#password').val() == "") {
            sAlert.error('Please Fill in All Fields', {effect: 'genie', position: 'top-right', timeout: '5000ms', onRouteClose: false, stack: false, offset: '80px'});
            console.log($('#email').val());
            console.log($('#firstname').val());
            console.log($('#lastname').val());
            console.log($('#username').val());
            console.log($('#password').val());
            event.preventDefault();
        } else {
            console.log('sign up')
            // Prevent default browser form submit
            event.preventDefault();

            // Get value from form element
            const target = event.target;

            Meteor.call('newUser', target.username.value, target.firstname.value, target.lastname.value, target.email.value, target.password.value, target.confirm.value, function() {
                Meteor.loginWithPassword(target.username.value, target.password.value, _login);
            });
        }
    }
});