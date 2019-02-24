export const psGameTerms = new Mongo.Collection('psTerms');

psTerms = new SimpleSchema({
    term: {
        type: [String],
        label: "Term"
    },
    pos: {
        type: [String],
        label: "Part Of Speech"
    }
})