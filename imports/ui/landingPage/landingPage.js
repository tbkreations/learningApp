import { Template } from 'meteor/templating';

import "./landingPage.html";
import "./landingPage.css";

// BlazeLayout.setRoot('html');
Template.landingPage.events({
    'submit .signupForm'(event) {
        console.log('sign up')
        // Prevent default browser form submit
        event.preventDefault();
    
        // Get value from form element
        const target = event.target;
    
        Meteor.call('newUser', target.username.value, target.email.value, target.password.value, _register);
    },

    'submit .loginForm'(event) {
      // Prevent default browser form submit
      console.log('login')
      event.preventDefault();
  
      // Get value from form element
      const target = event.target;
  
      Meteor.loginWithPassword(target.username.value, target.password.value, _login);
    }
});

function _register(error){
    if(error){
        console.log(error)
        sAlert.error(error.reason);
    } else {
        FlowRouter.go('/userHome');
    }
}


function _login(error) {
    if (error) {
        console.log(error)
        sAlert.error(error.reason);
    } else {
        
        FlowRouter.go('/userHome');
    }
}