$(document).ready(function(){

    var topics = ["Charmander", "Squirtle", "Bulbasaur", "Pikachu", "Riolu", "Togepi", "Eevee"];

    function displayImg(){

        $("#gifs").empty();

        var input = $(this).attr("data-name");
        var limit = 10;
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&limit=" + limit + "&api_key=EpOitlJeonE08EnAEd65rrO5u5Q9WS55";   

        $.ajax({
            url: queryURL, 
            method: "GET"
        }).then(function(response) {

            for(var i = 0; i < limit; i++) {    

                var displayDiv = $("<div>");
            
                var image = $("<img>");
                //Gets the correct info from giphy api and adds to the img tag
                image.attr("src", response.data[i].images.original_still.url);
                image.attr("data-still", response.data[i].images.original_still.url);
                image.attr("data-animate", response.data[i].images.original.url);
                //Makes gif still
                image.attr("data-state", "still");
                //Gives img tag the gif class for the imageChangeState function
                image.attr("class", "gif");
                displayDiv.append(image);
                
                //Pulls the rating from the gif in the array
                var rating = response.data[i].rating;
                //Adds the rating to the html throught the displayDiv
                var parRating = $("<p>").text("Rating: " + rating);
                displayDiv.append(parRating)
                //Adds displayDiv to html
                $("#gifs").append(displayDiv);
            }
        });
    }

    function renderButtons(){ 
        //Clears the current buttons
        $("#display-buttons").empty();

        for (var i = 0; i < topics.length; i++){

            var newButton = $("<button>") 
            //makes newButton tag defauld
            newButton.attr("class", "btn btn-success");
            //gives correct id for on click
            newButton.attr("id", "input")
            //makes sure data name is the user string in the array
            newButton.attr("data-name", topics[i]);
            //gives the html button the search input string
            newButton.text(topics[i]); 
            //adds the html button
            $("#display-buttons").append(newButton); 
        }
    }

    function imageChangeState() {          
        //function to change from still to animate and visa versa
        var state = $(this).attr("data-state");
        var animateImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");

        if(state == "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
        }

        else if(state == "animate") {
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }   
    }

    $("#submit").on("click", function(){

        //takes user input and creates the buttons in conjunction with renderButtons

        var input = $("#user-input").val().trim();
        if(input !== "") { 
        
        form.reset();
        topics.push(input);      
        renderButtons();
        return false;
        } else {
        renderButtons();
        return false;   
        }
        })
        
        renderButtons();

    $(document).on("click", "#input", displayImg);
    $(document).on("click", ".gif", imageChangeState);
});