import {
    Template
} from 'meteor/templating';
import {
    Roles
} from 'meteor/alanning:roles';

import {
    videos
} from '../../../collections/readingVideos.js';

import "./addVideos.html";
import "./addVideos.css";

Template.addVideos.onCreated(function () {
    if (!Meteor.userId() || Roles.userIsInRole(Meteor.userId(), ["Student"])) {
        FlowRouter.go('/');
    }
    videosAdded = 0;
});

//events for nav bar
Template.addVideos.events({
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
let videosAdded = 0;
Template.addVideos.events({
    'submit #addVideos': function (event) {
        event.preventDefault();
        let url = event.target.videoSource.value;
        let title = event.target.videoTitle.value;

        function getId(videoURL) {
            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            var match = videoURL.match(regExp);
        
            if (match && match[2].length == 11) {
                return match[2];
            } else {
                return 'error';
            }
        }
        let videoId = getId(url);
        let source = 'https://www.youtube.com/embed/' + videoId + '?cc_load_policy=1';
        console.log(source);

        if (source != "" && title != "") {
            let newVideo = videos.insert({
                source: source,
                videoTitle: title,
                selected: false
            })
            videosAdded += 1;
            $('#addVideos')[0].reset();
            $("input[type=text]")[0].focus();
            sAlert.success("Success: " + videosAdded + " Videos Added");
            console.log(videos.find({}).fetch());
        } else {
            sAlert.error("Error: Please Fill In All Text Fields");
        }


    },
    'click #removeVideos': function () {
        let currentUser = Meteor.user();
        if (Roles.userIsInRole(currentUser, ["Admin"]) || Roles.userIsInRole(currentUser, ["Teacher"])) {
            Meteor.call("removeallVideos", {});
            sAlert.success("Success: All Videos Have Been Removed");
        }
    },
    'click #manageVideos': function() {
        let currentUser = Meteor.user();
        if (Roles.userIsInRole(currentUser, ["Admin"]) || Roles.userIsInRole(currentUser, ["Teacher"])) {
            FlowRouter.go('/managevideos');
        }
    }
})

function _logout() {
    FlowRouter.go('/');
}