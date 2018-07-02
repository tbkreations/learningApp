FlowRouter.route( '/', {
    name: 'landingPage',
    action: function() {
      
      BlazeLayout.render('landingPage');
    }
  });

FlowRouter.route( '/userHome', {
    name: 'userHome',
    action: function() {
      
      BlazeLayout.render('userHome');
      console.log("login is working");
    }
  });

