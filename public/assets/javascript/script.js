//On home page,
$.getJSON("/articles", function(data) {
    console.log(data);
});


    //On click of article:
        //GET body of article 
        //Show comment box w/ article title
        //Display any associated comments

    //On click of submit (comments):
        //Capture values and save
        //POST reqeust (send comments)
        //Display comments on the screen (optimistic UI)

    //(While clicked on article) - On click of delete comment
        //DELETE - comment that was clicked on (Optimistic UI - hide?)
        //Refresh the articles page (to show comment was removed)

    //On click of Scrape
        //GET - New articles from reddit, function(response) {

            //Redirect to home page (which displays all articles)
        //}
        