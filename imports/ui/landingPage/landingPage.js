import { Template } from 'meteor/templating';

import "./landingPage.html";
import "./landingPage.css";

Template.landingPage.onCreated(function() {
    if(Meteor.userId()) {
        FlowRouter.go('/userHome');
    }
});

// BlazeLayout.setRoot('html');
Template.landingPage.events({
    'click #notUser': function(event){
        FlowRouter.go('/signUp');
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

export function _login(error) {
    if (error) {
        console.log(error)
        sAlert.error('Error: Incorrect Username or Password');
    } else {
        FlowRouter.go('/userHome');
    }
}