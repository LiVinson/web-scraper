var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var ArticleSchema = new Schema({

  title: {
    type: String,
    required: true,
    unique: true
  },

  link: {
    type: String,
    required: true
  },  

  source: {
    type: String,
    required: true
  },
  
  notes: [
    {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
]
});

var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;