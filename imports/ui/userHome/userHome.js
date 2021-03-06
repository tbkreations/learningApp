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
            sAlert.info('This Feature is Under Construction');
            // FlowRouter.go('/swGame');
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
        if (Roles.userIsInRole(Meteor.userId(), ["Teacher"]) || Roles.userIsInRole(Meteor.userId(), ["Admin"])) {
            FlowRouter.go('/addTerms');
        } else {
            FlowRouter.go('/');
        }
    },
    'click #addVideos': function (event) {
        if (Roles.userIsInRole(Meteor.userId(), ["Teacher"]) || Roles.userIsInRole(Meteor.userId(), ["Admin"])) {
            FlowRouter.go('/addVideos');
        } else {
            FlowRouter.go('/');
        }
    },
    'click #manageVideos': function (event) {
        if (Roles.userIsInRole(Meteor.userId(), ["Teacher"]) || Roles.userIsInRole(Meteor.userId(), ["Admin"])) {
            FlowRouter.go('/addVideos');
        } else {
            FlowRouter.go('/');
        }
    },
    'click #addSightW': function (event) {
        if (Roles.userIsInRole(Meteor.userId(), ["Teacher"]) || Roles.userIsInRole(Meteor.userId(), ["Admin"])) {
            sAlert.info('This Feature is Under Construction');
            // FlowRouter.go('/addVideos');
        } else {
            FlowRouter.go('/');
        }
    },
    'click #manageSW': function (event) {
        if (Roles.userIsInRole(Meteor.userId(), ["Teacher"]) || Roles.userIsInRole(Meteor.userId(), ["Admin"])) {
            sAlert.info('This Feature is Under Construction')
            // FlowRouter.go('/addVideos');
        } else {
            FlowRouter.go('/');
        }
    },
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
    findOtherRoles: function (userId) {

        var user = Meteor.users.findOne({
            _id: userId
        });

        var currentRoles = user.roles;
        var allRoles = Meteor.roles.find({}).fetch();

        var otherRoles = [{
            name: currentRoles[0],
            selected: true
        }];

        for (let i = 0; i < allRoles.length; i++) {
            if (allRoles[i].name != currentRoles[0]) {
                otherRoles.push({
                    name: allRoles[i].name,
                    selected: false
                });
            }
        }
        return {
            otherRoles
        };
    },
})

Template.userHome.events({
    'click #confirmChanges': function (event, newRole, userId) {
        event.stopPropagation();

        var allUsers = Meteor.users.find({
            _id: {
                $ne: Meteor.userId()
            }
        }).fetch();


        console.log(allUsers);

        var userListChanges = [];
        for (let i = 0; i < allUsers.length; i++) {
            console.log(allUsers[i]._id);
            selectedRole = document.querySelector("[data-id=" + CSS.escape(allUsers[i]._id) + "]").value;
            // console.log(selectedRole);
            if (allUsers[i].roles[0] != selectedRole) {
                userListChanges.push({
                    userId: allUsers[i]._id,
                    role: selectedRole,
                });
            }
        }
        console.log(userListChanges);

        Meteor.call("changeRole", userListChanges, function () {
            window.location.reload();
        });

    },

    'click #removeuserButton': function (event) {
        let userId = event.target.dataset.id;
        Meteor.call("removeUser", {
            user: userId
        })
    },
})




// 'change [name="userRole"]': function (event) {
//     event.stopPropagation();
//     console.log(event);
//     //Look at later, select value overriding itself
//     let newRole = event.target.value;
//     let userId = event.target.dataset.id;
//     // let options = event.target.children;

//     // for(let i = 0; i < options.length; i++) {
//     //     if(options[i].value == newRole) {

//     //     }
//     // }

//     // currentUser = Meteor.users.findOne({_id: userId});
//     // console.log(newRole);
//     // console.log(currentUser.roles);
//     // $('select option:selected').attr('disabled', 'disabled').siblings().removeAttr('disabled');
//     // if (currentUser.roles == "Teacher") {
//     //     event.target.value = "Student";
//     //     event.target.text = "Student";
//     //     $('select option:not([disabled])').val("Student");
//     //     $('select option:not([disabled])').text("Student");
//     //     //$('select option:not([disabled])').val(oppositeRole());
//     //     //$('select option:not([disabled])').text(oppositeRole());
//     // } else if (currentUser.roles == "Student") {
//     //     event.target.value = "Teacher";
//     //     event.target.text = "Teacher";
//     //     $('select option:not([disabled])').val("Teacher");
//     //     $('select option:not([disabled])').text("Teacher");
//     //     //$('select option:not([disabled])').val(oppositeRole());
//     //     //$('select option:not([disabled])').text(oppositeRole());
//     // }
//     console.log(userId, newRole);
//     Meteor.call("changeRole", {
//         role: newRole,
//         user: userId
//     })
// },