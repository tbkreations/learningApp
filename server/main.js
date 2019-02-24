import {
  Meteor
} from 'meteor/meteor';
import { psGameTerms } from '../collections/psTerms';

Meteor.startup(() => {
  // code to run on server at startup

  let adminUser = Meteor.users.findOne({
    roles: {
      $in: ["Admin"]
    }
  });

  if (!adminUser) {
    adminUser = Accounts.createUser({
      username: "tbrowniii",
      password: "AjBy52@Rd",
      profile: {
        firstname: "Trae",
        lastname: "Brown",
        email: "trae0714@gmail.com",
      }
    });

    Roles.addUsersToRoles(adminUser, 'Admin');
  }

});

Meteor.methods({
  'newUser': function (username, firstname, lastname, email, password) {
    if (password && password.length < 5) {
      console.log('password validation is working');
      throw new Meteor.Error('password-too-short', 'Use a longer password.');
    }

    student = Accounts.createUser({
      username: username,
      password: password,
      profile: {
        firstname: firstname,
        lastname: lastname,
        email: email,
      }
    })

    Roles.addUsersToRoles(student, 'Student');

  },


});

Accounts.onCreateUser(function (options, user) {

  user.profile = {};
  user.profile.firstname = options.profile.firstname;
  user.profile.lastname = options.profile.lastname;
  Roles.addUsersToRoles(user._id, ['student']);
  return user
  console.log(user)
});

Meteor.publish("userList", function () {

  var user = Meteor.users.findOne({
    _id: this.userId
  });


  if (Roles.userIsInRole(user, ["Admin"])) {
    return Meteor.users.find({}, {
      fields: {
        username: 1,
        email: 1,
        roles: 1
      }
    });
  }

  return;
});

Meteor.methods({
  changeRole( options ) {
    if(Roles.userIsInRole(Meteor.userId(), ["Admin"])) {
      console.log("Change User is Being Called");
      try {
        Roles.setUserRoles( options.user, options.role );
        console.log(options.role);
        console.log(options.user);
      } catch( exception ) {
        console.log(exception);
      }
    } else {
      console.log("Error: Unauthorized User");
    }
    
  },

  removeUser(options) {
    if(Roles.userIsInRole(Meteor.userId(), ["Admin"])) {
      console.log("Remove User is Being Called");
      try {
        Meteor.users.remove( options.user );
        console.log("Success: User Has Been Removed")
      } catch( exception ) {
        console.log(exception);
      }
    } else {
      console.log("Error: Unauthorized User");
    }
  },

  removeTerm(options) {
    if(Roles.userIsInRole(Meteor.userId(), ["Admin"]) || Roles.userIsInRole(Meteor.userId(), ["Teacher"])) {
      console.log("Remove Term is Being Called");
      try {
        psGameTerms.remove( options.term );
        console.log("Success: Term Has Been Removed")
      } catch( exception ) {
        console.log(exception);
      }
    } else {
      console.log("Error: Unauthorized User");
    }
  },

  removeallTerms() {
    if(Roles.userIsInRole(Meteor.userId(), ["Admin"]) || Roles.userIsInRole(Meteor.userId(), ["Teacher"])) {
      console.log("Remove All Terms is Being Called");
      psGameTerms.remove({});
    }
  }
});

Meteor.publish("roles", function () {
  var user = Meteor.users.findOne({
    _id: this.userId
  });

  if (Roles.userIsInRole(user, ["Admin"])) {
    return Meteor.users.find({}, {
      fields: {
        roles: 1
      }
    })
  }
}, )