import {
    Template
} from 'meteor/templating';
import {
    Roles
} from 'meteor/alanning:roles';

import {
    videos
} from '../../../collections/readingVideos.js';

import "./manageVideos.html";
import "./manageVideos.css";

Template.manageVideos.onCreated(function () {
    if (!Meteor.userId() || Roles.userIsInRole(Meteor.userId(), ["Student"])) {
        FlowRouter.go('/');
    }

    // var radios = document.getElementsByName('displayedVideo');
    // var val = localStorage.getItem('displayedVideo');
    // for(var i=0;i<radios.length;i++){
    //   if(radios[i].value == val){
    //     radios[i].checked = true;
    //   }
    // }

    console.log(videos.find({}).fetch());
});

//events for nav bar
Template.manageVideos.events({
    'click #logout': function (event) {
        Meteor.logout(_logout);
    },

    'click #home': function () {
        if (Meteor.userId()) {
            FlowRouter.go('/userHome');
        }
    },
    'click #removevideoButton': function (event) {
        let videoId = event.target.dataset.id;
        Meteor.call("removeVideo", {
            video: videoId
        })
    },
    'change input:radio[name="displayedVideo"]': function (event) {
        videoId = event.target.dataset.id;
        Meteor.call("updateSelection");
        // localStorage.setItem('displayedVideo', $(this).val());
        videos.update(videoId, {
            $set: {
                selected: true
            }
        });
        selectedVideo = videos.findOne(videoId, {
            fields: {
                selected: true,
                source: 1,
                videoTitle: 1
            }
        });

        console.log('The selected video source is: ' + selectedVideo.source);
        console.log('The selected video title is: ' + selectedVideo.videoTitle);
        console.log('The selected video state is: ' + selectedVideo.selected);
    }
})

//page helpers
Template.manageVideos.helpers({
    videos: function () {
        let video = videos.find({});
        return video;
    }
});

Template.registerHelper('selectedSource', function () {
    console.log(selectedVideo.source);
    return selectedVideo.source;
});

Template.registerHelper('selectedTitle', function () {
    console.log(selectedVideo.videoTitle);
    return selectedVideo.videoTitle;
});