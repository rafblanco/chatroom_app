console.log('chats.js connected.')

$(document).ready(function () {
  // Run Modal 
  // $.ajax("/allusers", {
  //   type: "GET"
  // }).then(function (response) {
  //   for (var i = 0; i < response.users.length; i++) {
  //     // console.log(i)
  //     var eachUser = response.users[i].user_name;
  //     console.log(eachUser)
  //     var newDiv = $('<button type="button" class="col btn btn-primary user-chosen"></button>');
  //     // <button type="button" data-id="Rafael" class="col btn btn-primary user">Rafael</button>
  //     newDiv.attr('data-id', eachUser)
  //     newDiv.text(eachUser)
  //     // console.log(newDiv)
  //     $('#all-users').append(newDiv)
  //   }

  //   changeUser();
  // });

  // var runModal = 'run';
  // console.log('initial: ' + runModal);

  // $(window).on('load', function () {
  //   console.log('Connected to Webpage.')
  //   if (runModal === 'run') {
  //     $('#myModal').modal('show');
  //     runModal = "don't run";
  //     console.log('current: ' + runModal)
  //   }
  // });



  // var changeUser = function () {
  //   $('.user-chosen').on('click', function () {
  //     var chosenUser = $(this).data('id');
  //     console.log(chosenUser)
  //     $("log-out").data(chosenUser);

  //     // $.ajax("/api/chat", {
  //     //   type: "POST"
  //     // }).then(function (response) {
  //     //   console.log(response);
  //     //   location.reload()
  //     // });

  //     changeLoginName();
  //   });
  // }
  // var changeLoginName = function () {
  //   $('.user-chosen').on('click', function () {
  //     var chosenUser = $(this).data('id');
  //     console.log(chosenUser)

  //     $('#logged-in').html(chosenUser);

  //     // $.ajax("/api/chat", {
  //     //   type: "POST"
  //     // }). then(function(response){
  //     //   console.log(response);
  //     //   location.reload()
  //     // });
  //   })
  // };

  // $('#submit').keypress(function (e) {

  //   var code = e.keyCode || e.which;
  //   if (code == 13) { //Enter keycode
  //     console.log("Pressed ENTER")
  //   }
  // });

  $.get("/api/user_data").then(function (data) {
    //Move the username class in index to a better spot 
    $(".user-name").text(data.username);
  });

  $('#messages').animate({ scrollTop: document.body.scrollHeight }, "fast");

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

  // AJAX calls that posts messages
  $('#submit').on('click', function () {
    event.preventDefault();

    var userName = $(".user-name").val()
    var userMessage = $("#m").val();

    var newUserMessage = {
      user: userName,
      message: userMessage
    }

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
  });

  function poll() {
    setInterval(function () {
      $.ajax({
        url: "http://localhost:8080/allmessages", type: "GET", success: function (data) {
          //Setup the next poll recursively
          console.log("IM POLLING")

          console.log("IM POLLING 2")
          
          $("#messages").replaceWith($(data).find("#messages"))

          var messages = $("#messages")[0];
          messages.scrollTop = messages.scrollHeight - messages.clientHeight;
        }, error: function (xhr,status, error) {
          console.log(status)
          console.log(error)
        }
      });
    }, 8000);
  };

  poll();
});
  // getMessages();
