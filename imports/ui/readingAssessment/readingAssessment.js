import {
    Template
} from 'meteor/templating';
import {
    Roles
} from 'meteor/alanning:roles';

import "./readingAssessment.html";
import "./readingAssessment.css";

Template.readingAssessment.onCreated(function () {
    if (!Meteor.userId()) {
        FlowRouter.go('/');
    }
});

Template.readingAssessment.events({
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