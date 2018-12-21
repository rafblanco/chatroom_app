console.log('chats.js connected.')

$(document).ready(function () {
  var userCurrentlyLoggedIn = "Not Logged In"

  $.ajax("/api/user_data", {
    type: "GET"
  }).then(function (response) {
    // var userNameLoggedIn = $(".user-name").text(response.username);
    // console.log(response.users[0].username);
    userCurrentlyLoggedIn = response.user;
    console.log('User is: ')
    console.log(response.user);
    $(".user-name").text(userCurrentlyLoggedIn);
  });


  function runOnSubmit() {
    event.preventDefault();
    console.log('clicked on submit');

    var userName = userCurrentlyLoggedIn
    var userMessage = $("#m").val();
    var newUserMessage = {
      user: userName,
      message: userMessage
    }
    console.log(newUserMessage);
    $.ajax("/api/chat", {
      type: "POST",
      data: newUserMessage
    })
      .then(function (response) {
        console.log(response)
        console.log("Sent message: ", newUserMessage);
        location.reload();
        $("#messages").scrollTop = $("#messages").scrollHeight - $("#messages").clientHeight;
      })
  }

  // AJAX calls that posts messages
  //clicks button on enter
  $("#m").keydown(function (event) {
    //console.log("enter was pressed"); 
    if (event.keyCode === 13) {
      runOnSubmit();
      //$("#submit").click(); 
    }
  });
  $('#submit').on('click', function () {
    runOnSubmit();
  });

  $('#messages').animate({ scrollTop: document.body.scrollHeight }, "fast");
  function saveEditDelete() {
    $('.edit').click(function () {
      $(this).hide();
      $('.messages').addClass('editable');
      $('.text').attr('contenteditable', 'true');
      $('.save').show();
    });

    $('.save').click(function () {
      $(this).hide();
      $('.messages').removeClass('editable');
      $('.text').removeAttr('contenteditable');
      $('.edit').show();
    });



    // AJAX call that deletes messages
    $(".delete").on("click", function (event) {
      var id = $(this).data("id");

      // Send the DELETE request.
      $.ajax("/api/chat/" + id, {
        type: "DELETE"
      }).then(
        function () {
          console.log("deleted chat", id);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });

    // AJAX calls that updates a message
    $(".save").on("click", function (event) {
      var id = $(this).parent().data("id")
      var updateMsg = $(this).siblings("div").text()

      if (updateMsg === null || undefined || "") {
        alert("Failed to update")

      } else {
        var newMsg = {
          message: updateMsg
        };

        $.ajax("api/chat/" + id, {
          type: "PUT",
          data: newMsg
        }).then(
          function () {
            console.log("update chat", id);
            location.reload();
          }
        );
      }
    });
  }
  function poll() {
    setInterval(function () {
      $.ajax({
        url: "/allmessages", type: "GET", success: function (data) {
          //Setup the next poll recursively
          console.log("IM POLLING")

          console.log("IM POLLING 2")

          $("#messages").replaceWith($(data).find("#messages"))

          var messages = $("#messages")[0];
          saveEditDelete();
          messages.scrollTop = messages.scrollHeight - messages.clientHeight;
        }, error: function (xhr, status, error) {
          console.log(status)
          console.log(error)
        }
      });
    }, 15000);
  };

  poll();
  saveEditDelete(); 
});
  // getMessages();

