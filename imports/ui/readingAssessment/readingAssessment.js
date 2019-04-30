import {
    Template
} from 'meteor/templating';

import {
    videos
} from '../../../collections/readingVideos.js';

import {
    Roles
} from 'meteor/alanning:roles';

import {
    selectedSource
} from "../userHome/manageVideos.js";

import {
    selectedTitle
} from "../userHome/manageVideos.js";

import "./readingAssessment.html";
import "./readingAssessment.css";

Template.readingAssessment.onCreated(function () {
    if (!Meteor.userId()) {
        FlowRouter.go('/');
    }

    console.log(videos.find({}).fetch());
});

Template.readingAssessment.events({
    'click #home': function () {
        if (Meteor.userId()) {
            FlowRouter.go('/userHome');
        } else {
            FlowRouter.go('/')
        }
    },
    'click #logout': function (event) {
        Meteor.logout(_logout);
    }
});

Template.readingAssessment.helpers({
    // selectedSource: function() {
    //     Meteor.call("updateSelection");
    //     selectedVideo = videos.findOne({}, {
    //         fields: {
    //             selected: true,
    //             source: 1,
    //             videoTitle: 1
    //         }
    //     });
    //     return selectedVideo.source;
    // },
    // selectedTitle: function() {
    //     Meteor.call("updateSelection");
    //     selectedVideo = videos.findOne({}, {
    //         fields: {
    //             selected: true,
    //             source: 1,
    //             videoTitle: 1
    //         }
    //     });
    //     return selectedVideo.videoTitle;
    // }
})

function _logout() {
    FlowRouter.go('/');
}