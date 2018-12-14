console.log('chats.js connected.')

$(document).ready(function () {


    $('#submit').on('click', function () {
        event.preventDefault();
        console.log('Hello')

      var userMessage = $("#m").val();
      console.log(userMessage)
      var newUserMessage = {
          user: "name",
          message: userMessage
      }
      
        $.ajax("/api/chat",{
        type: "POST",
        data: newUserMessage
      })
        .then(function (response) {
          console.log(response)
          console.log("Sent message: ", newUserMessage);           
          location.reload(); 
        })
    });

    $("#delete").on("click", function(event) {
      var id = $(this).data("id");
  
      // Send the DELETE request.
      $.ajax("/api/chat/" + id, {
        type: "DELETE"
      }).then(
        function() {
          console.log("deleted chat", id);
          // Reload the page to get the updated list
          location.reload();
        }
        );
  });
});
 
 
 
  // function getMessages() {
  //   $('#submit').on('click', function () {
  //     console.log('Hello');

  //     var userMessage = $(this).data("userMessage");
  //     var newSleep = $(this).data("newsleep");

  //     var queryURL = '/'

  //     $.ajax("/api/chat",{
  //       url: queryURL,
  //       method: "PUT"
  //     })
  //       .then(function (response) {
  //         console.log(response)
  //       })
  //   });
  // };

  // getMessages();










