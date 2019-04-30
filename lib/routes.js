FlowRouter.route('/', {
  name: 'landingPage',
  action: function () {

    BlazeLayout.render('main', { content: 'landingPage' });
  }
});

FlowRouter.route('/signUp', {
  name: 'signUp',
  action: function () {

    BlazeLayout.render('main', { content: 'signUp' });
  }
});

FlowRouter.route('/userHome', {
  name: 'userHome',
  action: function () {

    BlazeLayout.render('main', { content: 'userHome' });
  }
});

FlowRouter.route('/readingassessment', {
  name: 'readingAssessment',
  action: function () {

    BlazeLayout.render('main', { content: 'readingAssessment' });
  }
});

FlowRouter.route('/swGame', {
  name: 'sightwordGame',
  action: function () {

    BlazeLayout.render('main', { content: 'sightwordGame' });
  }
});

FlowRouter.route('/psGame', {
  name: 'partofspeechGame',
  action: function () {

    BlazeLayout.render('main', { content: 'partofspeechGame' });
  }
});

FlowRouter.route('/addterms', {
  name: 'addterms',
  action: function () {

    BlazeLayout.render('main', { content: 'addTerms' });
  }
});

FlowRouter.route('/manageterms', {
  name: 'manageterms',
  action: function () {

    BlazeLayout.render('main', { content: 'manageTerms' });
  }
});

FlowRouter.route('/addVideos', {
  name: 'addVideos',
  action: function () {

    BlazeLayout.render('main', { content: 'addVideos' });
  }
});

FlowRouter.route('/managevideos', {
  name: 'managevideos',
  action: function () {

    BlazeLayout.render('main', { content: 'manageVideos' });
  }
});