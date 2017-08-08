$(function() {
  Buttons(topics, "searchButton", "#celeBut")
   console.log("page loaded")
})
  
var topics = ["Jay Baruchel", "Gal Gadot", "Carrie Fisher", "Mark Hamill"];

function Buttons(topics, classToAdd, areaToAddTo){
  $(areaToAddTo).empty();
    for (var i = 0; i < topics.length; i++) {
      var t = $("<button>");
       t.addClass(classToAdd);
       t.attr("data-type", topics[i]);
       t.text(topics[i]);
          $(areaToAddTo).append(t);
  }
}

  $(document).on("click", ".searchButton", function() {
      var type = $(this).data("type");
        console.log(type);
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +type+ "&api_key=4ac1f46312d5450d8b7de3cfa916d543&limit=16";
        
        $.ajax({
         url:queryURL,
         method:"GET"
    }).done(function(response){
      var results = response.data;
        console.log(response);
        for (var i = 0; i < response.data.length; i++) {
          var gifDiv = $("<div class='celebSearch'>");
            var rating = response.data[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var celImg = $("<img>");
            celImg.attr("src", results[i].images.fixed_height.url);
            celImg.addClass("searchImage")

            gifDiv.prepend(p);
            gifDiv.prepend(celImg);

            $("#searches").prepend(gifDiv);
        }

    })
  
  }); 

  $("#addedSearch").on("click", function() {
      var addedCeleb = $("input").val();
      topics.push(addedCeleb);
      Buttons(topics, "searchButton", "#celeBut");
      return false
  });









