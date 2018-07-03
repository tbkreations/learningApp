import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup

  
  var adminUser = Meteor.users.findOne({
    roles: {
      $in: ["admin"]
    }
  });

  if(!adminUser) {
    adminUser = Accounts.createUser({
          username: "tbrowniii",
          password: "tLbrownIII@0212",
      profile: {
          firstname: "Trae",
          lastname: "Brown",
      }
    });

    Roles.addUsersToRoles(adminUser, 'admin');
  }

});

Meteor.methods({
  newUser: function(username, firstname, lastname, email, password) {
    if (password.length < 5) {
      throw new Meteor.Error('password-too-short', 'Use a longer password.');
    }

    student = Accounts.createUser({
    	username: username,
      	email: email,
        password: password,
      profile: {
        firstname: firstname,
      	lastname: lastname,
      }
    })


}
});
