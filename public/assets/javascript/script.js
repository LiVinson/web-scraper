//On home page - GET request for all articles from Article collection
$.getJSON("/articles", function(data) {
    console.log(data);
});

//BELOW - Not Needed as the button is directed to the correct endpoint - determine which is preferred.


//On Click of view full article button, request link to full article for rendering
// $(".full_article").on("click", function(event) {
//     var thisBtn = $(this).attr("id");
//     console.log(thisBtn);
//     $.ajax({
//         method: "GET",
//         url: `/articles/${thisBtn}`
//     }).then(function(data) {
//         console.log(data);
//     })
// })

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
        