//On home page - GET request for all articles from Article collection
$.getJSON("/", function(data) {
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


$("#add-note-btn").on("click", function(event) {
    // event.preventDefault();

    var username = $("#username").val().trim();
    var title = $("#note-title").val().trim();
    var text = $("#note-text").val().trim();
    //Determine front end validation
    var comment = {
        username,
        title,
        text
    }
    //Add optimistic UI
    var id = $(this).attr("data-id");

    $.ajax({
        method: "POST",
        url: `/api/articles/${id}`,
        data: comment
    }).then(function(data) {
        console.log(data);
        location.reload();
    })

});

$(".delete-note").on("click", function(event) {
    console.log("delete clicked");
    // event.preventDefault();
    var noteId = $(this).attr("data-id");
    console.log(noteId)
    $(this).parents('div.comment-div').hide();


    $.ajax({
        method: "DELETE",
        url: `/api/note/${noteId}`
    }).then(function(data) {
        console.log("comment deleted")
    })
});

//On click of Scrape button: 
$("#scrape-btn").on("click", function(event) {
    
    console.log("scrape button!")
    //Display "scraping reddit message"
    $.ajax({
        method: "GET",
        url: `/api/scrape`,
 
    }).then(function(data) {
        console.log(data);
        location.reload("/");
    })

})

        