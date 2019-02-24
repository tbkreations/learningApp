import {
    Template
} from 'meteor/templating';
import {
    Roles
} from 'meteor/alanning:roles';

import "./sightwordGame.html";
import "./sightwordGame.css";

Template.sightwordGame.onCreated(function () {
    if (!Meteor.userId()) {
        FlowRouter.go('/');
    }
});

Template.sightwordGame.events({
    'click #home': function() {
        if(Meteor.userId()) {
            FlowRouter.go('/userHome');
        } else {
            FlowRouter.go('/')
        }
    },
    'click #logout': function (event) {
        Meteor.logout(_logout);
    }
})