console.log('chats.js connected.')

$(document).ready(function () {

    function getMessages() {
        $('#submit').on('click', function () {
            console.log('Hello');
            var queryURL = '/'

            $.ajax({
                url: queryURL,
                method: "GET"
            })
                .then(function (response) {
                    console.log(response)
                })
        });
    };

    getMessages();












}); // jQuery Done