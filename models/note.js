var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var NoteSchema = new Schema({
    username: {
        type:String,
        default:"Guest User"
    },
    title: {
        type: String,
    },

    text: {
        type: String,
        required: true
    }
});

// This creates our model from the above schema, using mongoose's model method
var Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;