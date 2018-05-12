$(document).ready(function() {

    // create variables to store topic data
    var topic = [
        "Bugs Bunny",
        "Daffy Duck",
        "Elmer Fudd",
        "Porky Pig",
        "Tweety",
        "Wile E Coyote",
        "Foghorn Leghorn",
        "Yosemite Sam",
        "Pepe Le Pew",
        "Marvin the Martian"
    ];


    // function to create buttons for topic data
    function renderButtons() {
        
        $("#gif-button").empty();
        
        for (var i = 0; i < topic.length; i++) {
            
            var button = $("<button class='topicButton'>");
            button.attr("value", topic[i]);
            button.attr("class", "button-topic");
            button.text(topic[i]);
            $("#gif-button").append(button);
        }; 
    }; 

    // function to make gifs appear
    function displayGif(apiObject, buttonValue) {
    
        $("#gifs-appear-here").empty();

        var numberofgifs = 10;  // number of gifs to appear on page
        
        for (var i = 0; i < numberofgifs; i++) {
            
            var dataStill = apiObject.data[i].images.fixed_height_still.url;   // variable to store still gifs
        
            var dataAnimate = apiObject.data[i].images.fixed_height.url;       // variable to store moving gifs
            
            var img = $("<img src='" + dataStill + "'>");                      // variable to store gif img src
            
            img.attr("alt", buttonValue); 
            img.attr("data-still", dataStill);
            img.attr("data-animate", dataAnimate);
            img.attr("data-status", "still");
            img.attr("class", "gifImg");

            var p = $("<p>");                                               // varible to store and create p tag to display rating of gif
            p.text("Rated: " + apiObject.data[i].rating);

            var div = $("<div>");                                           // variable to store and create div to display 
            div.attr("id", "img" + (i + 1));
            div.append(img);
            div.append(p);
            $("#gifs-appear-here").append(div);
        } 
    }; 

    renderButtons();

    // on click event to display gifs when button is clicked
    $(document).on("click", ".button-topic", function(event) {
        
        var buttonValue = $(this).attr("value");
        $.get( "https://api.giphy.com/v1/gifs/search?api_key=E2Z9FjVrW2LQ1jRz5UQt5Remc7xUJNrJ&q=" + buttonValue + "&limit=10&offset=0&rating=R&lang=en").done(function(response)         
        {
            displayGif(response, buttonValue);
        }); 
    }); 

    // submit button to add new button
    $("#submit").on("click", function(event) {
        
        event.preventDefault();

        var topicName = $("#topic-name").val();
        
        topic.push(topicName);
        
        renderButtons();
    }); 

    // on click event to make gif move when clicked
    $(document).on("click", ".gifImg", function(e) {
        
        var status = $(this).attr("data-status");

        if (status === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-status", "animate");
        } else { 
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-status", "still");
        };
    });

}); 