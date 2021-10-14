import { userclicked } from './homepage.js';

$('.userbox').hide()

let userClick = false
let username


$("#test").click(() => {
    username = $("#userinput").val()

    if (username.split("").length <= 0) {
        $('#usernametext').text('Please enter a username')
    } else {
        $('#headbarbut').text(`Welcome ${username}`)
        $(".loginarea").hide()
        userclicked();


    }


})

