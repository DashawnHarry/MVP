let settings = {
    "async": true,
    "crossDomain": true,
    "url": `https://genius.p.rapidapi.com/search?q=Nas`,
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "genius.p.rapidapi.com",
        "x-rapidapi-key": "8b76f3434fmsh55d4860519d2e21p1617f0jsna779e07a8d2f"
    }
};
let usersearch = $("#searchinput").val()
let userurls = []
let usertitles = []
let username


const homepageCreation = (data) => {
    $('<div class=userbox>Your Saves</div>').prependTo('.usersaveboxhold')
    username = $('#headbarbut').text()

    for (let index = 0; index < data['response']['hits'].length; index++) {
        let songimage = data['response']['hits'][index]['result']['song_art_image_url']
        let songTitle = data['response']['hits'][index]['result']['full_title']
        let artistName = data['response']['hits'][index]['result']['primary_artist']['name']
        let artisturl = data['response']['hits'][index]['result']['primary_artist']['url']
        $(".searchview").prepend(`<div id=imgblk${index} class=imageblock${index}>`)



        $(`.imageblock${index}`).prepend(`<img id=image${index} src=${songimage} width=125 height=125>`)
        $(`.imageblock${index}`).append(`<p id=songtitle${index}>${songTitle}</p>`)
        $(`.imageblock${index}`).append(`<a href=${artisturl}>${artistName}</a>`)

        $(`#imgblk${index}`).click(() => {



            userurls.push($(`#image${index}`).attr('src'))

            usertitles.push($(`#songtitle${index}`).text())

            $('.userbox').show()

            $(`.imageblock${index}`).prependTo(`.userbox`)



            console.log($.get('/', (data) => { console.log(data) }));
        })

        console.log(index)
    }
    console.log(songimage);
    console.log(songTitle);
    console.log(artistName);
    console.log(artisturl);

}




export const userclicked = () => {
    $(".searchhold").append('<input type=text id=searchinput>')
    $(".searchhold").append('<button id=searchbutton>Search</button>')
    $.ajax(settings).then((result) => {
        homepageCreation(result)
        console.log(result['response']['hits'])

    }).catch((err) => {

        console.log("error getting data");

    });



    $('#searchbutton').click(() => {
        $('.searchview').empty()
        usersearch = $("#searchinput").val()
        settings.url = `https://genius.p.rapidapi.com/search?q=${usersearch}`
        $.ajax(settings).then((result) => {
            homepageCreation(result)
            console.log(result['response']['hits'])
        }).catch((err) => {

            console.log("error getting data");

        });
        console.log(usersearch);

        console.log(settings.url);
    })





}

// const userReload = () => {
    //     $('.searchview').empty()
    //     $.ajax(settings).then((result) => {
//         homepageCreation(result)
//         console.log(result)

//     }).catch((err) => {

//         console.log("error getting data");

//     });


//     $('#searchbutton').click(() => {
//         $('.searchview').empty()
//         usersearch = $("#searchinput").val()
//         userReload()
//         console.log(usersearch);

//     })
// }