import {
    Template
} from 'meteor/templating';
import {
    Roles
} from 'meteor/alanning:roles';

import {
    psGameTerms
} from '../../../collections/psTerms.js';

import "./manageTerms.html";
import "./manageTerms.css";

Template.manageTerms.onCreated(function () {
    if (!Meteor.userId() || Roles.userIsInRole(Meteor.userId(), ["Student"])) {
        FlowRouter.go('/');
    }
});

//events for nav bar
Template.manageTerms.events({
    'click #logout': function (event) {
        Meteor.logout(_logout);
    },

    'click #home': function () {
        if (Meteor.userId()) {
            FlowRouter.go('/userHome');
        }
    },
    'click #removetermButton': function (event) {
        let termId = event.target.dataset.id;
        Meteor.call("removeTerm", {
            term: termId
        })
    },
})

//page helpers
Template.manageTerms.helpers({
    terms: function () {
        let terms = psGameTerms.find({});
        return terms;
    }
});