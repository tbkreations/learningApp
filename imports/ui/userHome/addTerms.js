import {
    Template
} from 'meteor/templating';
import {
    Roles
} from 'meteor/alanning:roles';

import {
    psGameTerms
} from '../../../collections/psTerms.js';

import "./addTerms.html";
import "./addTerms.css";

Template.addTerms.onCreated(function () {
    if (!Meteor.userId() || Roles.userIsInRole(Meteor.userId(), ["Student"])) {
        FlowRouter.go('/');
    }
    termsAdded = 0;
});

//events for nav bar
Template.addTerms.events({
    'click #logout': function (event) {
        Meteor.logout(_logout);
    },

    'click #home': function () {
        if (Meteor.userId()) {
            FlowRouter.go('/userHome');
        }
    },
})


//events for addTerms
let termsAdded = 0;
Template.addTerms.events({
    'submit #addTerms': function (event) {
        event.preventDefault();
        let term = event.target.term.value;
        let pos = event.target.pos.value;
        // console.log("Term: " + term + "Part of Speech: " + pos);

        if (term != "" && pos != "") {
            let newTerm = psGameTerms.insert({
                term: term,
                pos: pos
            })
            termsAdded += 1;
            $('#addTerms')[0].reset();
            $("input[type=text]")[0].focus();
            sAlert.success("Success: " + termsAdded + " Terms Added");
            console.log(psGameTerms.find({}).fetch());
        } else {
            sAlert.error("Error: Please Fill In All Text Fields");
        }


    },
    'click #removeTerms': function () {
        let currentUser = Meteor.user();
        if (Roles.userIsInRole(currentUser, ["Admin"]) || Roles.userIsInRole(currentUser, ["Teacher"])) {
            Meteor.call("removeallTerms", {});
            sAlert.success("Success: All Terms Have Been Removed");
        }
    },
    'click #manageTerms': function() {
        let currentUser = Meteor.user();
        if (Roles.userIsInRole(currentUser, ["Admin"]) || Roles.userIsInRole(currentUser, ["Teacher"])) {
            FlowRouter.go('/manageterms');
        }
    }
})

function _logout() {
    FlowRouter.go('/');
}