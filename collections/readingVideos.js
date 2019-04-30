export const videos = new Mongo.Collection('readingVideos');

readingVideos = new SimpleSchema({
    source: {
        type: [String],
        label: "Source"
    },
    videoTitle: {
        type: [String],
        label: "Video Title"
    },
    selected: {
        type: [Boolean],
        label: "Selected State"
    }
})