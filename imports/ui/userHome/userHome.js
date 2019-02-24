import {
    Template
} from 'meteor/templating';
import {
    Roles
} from 'meteor/alanning:roles';

import {
    psGameTerms
} from '../../../collections/psTerms.js';

import "./userHome.html";
import "./userHome.css";

Tracker.autorun(function () {
    if (Meteor.user()) {
        Meteor.subscribe('userList');
        Meteor.subscribe('roles');
    }
});

Template.userHome.onCreated(function () {
    if (!Meteor.userId()) {
        FlowRouter.go('/');
    }
});

Template.userHome.events({
    'click #logout': function (event) {
        Meteor.logout(_logout);
    },

    'click #teachermenuButton': function (event) {
        $('.adminPanel').hide();
        $('.bottomNav').hide();
        $('.welcomeUser').hide();
        $('#adminhome').show();
        $('.adminteacherPanel').show();
    },

    'click #studentmenuButton': function (event) {
        $('.adminPanel').hide();
        $('.bottomNav').hide();
        $('.welcomeUser').hide();
        $('#adminhome').show();
        $('.adminstudentAssignments').show();
    },

    'click #adminhome': function (event) {
        FlowRouter.go('/');
    },

    'click #taskOne': function (event) {
        if (Meteor.userId()) {
            FlowRouter.go('/readingassessment');
        } else {
            FlowRouter.go('/');
        }
    },

    'click #taskTwo': function (event) {
        if (Meteor.userId()) {
            FlowRouter.go('/swGame');
        } else {
            FlowRouter.go('/');
        }
    },

    'click #taskThree': function (event) {
        if (Meteor.userId()) {
            FlowRouter.go('/psGame');
        } else {
            FlowRouter.go('/')
        }
    },
    'click #addTerms': function (event) {
        if (Meteor.userId()) {
            FlowRouter.go('/addTerms');
        } else {
            FlowRouter.go('/')
        }
    }
});

function _logout() {
    FlowRouter.go('/');
}

Template.userHome.helpers({
    userInfo: function () {
        var user = Meteor.users.findOne({
            _id: Meteor.userId()
        });

        return user;
    },
});

Template.userHome.helpers({
    users: function () {
        var users = Meteor.users.find({
            _id: {
                $ne: Meteor.userId()
            }
        });

        return users;
    }
});

Template.userHome.helpers({
    userIsAdmin: function () {
        var currentUserId = Meteor.userId();
        return Roles.userIsInRole(currentUserId, ['Admin']);
    }
})

Template.userHome.helpers({
    userIsTeacher: function () {
        var currentUserId = Meteor.userId();
        return Roles.userIsInRole(currentUserId, ['Teacher']);
    }
})

Template.userHome.helpers({
    userIsStudent: function () {
        var currentUserId = Meteor.userId();
        return Roles.userIsInRole(currentUserId, ['Student']);
    },

    //this needs to be fixed still
    oppositeRole: function () {
        let currentRole = Meteor.user().roles;
        if (currentRole == "Teacher") {
            return "Student"
        } else if (currentRole == "Student") {
            return "Teacher"
        }
    }
})

Template.userHome.events({
    'change [name="userRole"]': function (event) {
        event.stopPropagation();

        //Look at later, select value overriding itself
        let newRole = event.target.value;
        let userId = event.target.dataset.id;
        $('select option:selected').attr('disabled', 'disabled').siblings().removeAttr('disabled');
        if (newRole == "Teacher") {
            $('select option:not([disabled])').val(oppositeRole());
            $('select option:not([disabled])').text(oppositeRole());
        } else if (newRole == "Student") {
            $('select option:not([disabled])').val(oppositeRole());
            $('select option:not([disabled])').text(oppositeRole());
        }
        console.log(userId, newRole);
        Meteor.call("changeRole", {
            role: newRole,
            user: userId
        })

        // 'click #confirmChanges', function(event, newRole, userId) {
        //     event.stopPropagation();
        //     console.log("confirm button is working");
        //     Meteor.call("changeRole", {
        //         role: newRole,
        //         user: userId
        //     })
        // }   
    },

    'click #removeuserButton': function (event) {
        let userId = event.target.dataset.id;
        Meteor.call("removeUser", {
            user: userId
        })
    },

    'click #confirmChanges': function (event, newRole, userId) {
        event.stopPropagation();
        window.location.reload();
    }
})