import './main.html';
import './main.css';

import '../imports/ui/landingPage/landingPage.js';
import '../imports/ui/userHome/userHome.js';
import '../imports/ui/userHome/addTerms.js';
import '../imports/ui/userHome/addVideos.js';
import '../imports/ui/userHome/manageVideos.js';
import '../imports/ui/userHome/manageTerms.js';
import '../imports/ui/signUp/signUp.js';
import '../imports/ui/psGame/partofspeechGame.js';
import '../imports/ui/readingAssessment/readingAssessment.js';
import '../imports/ui/swGame/sightwordGame.js';


BlazeLayout.setRoot('body');

sAlert.config({
    effect: '',
    position: 'top-right',
    timeout: 5000,
    html: false,
    onRouteClose: true,
    stack: true,
    // or you can pass an object:
    // stack: {
    //     spacing: 10 // in px
    //     limit: 3 // when fourth alert appears all previous ones are cleared
    // }
    offset: 0, // in px - will be added to first alert (bottom or top - depends of the position in config)
    beep: false,
    // examples:
    // beep: '/beep.mp3'  // or you can pass an object:
    // beep: {
    //     info: '/beep-info.mp3',
    //     error: '/beep-error.mp3',
    //     success: '/beep-success.mp3',
    //     warning: '/beep-warning.mp3'
    // }
    onClose: _.noop //
    // examples:
    // onClose: function() {
    //     /* Code here will be executed once the alert closes. */
    // }
});