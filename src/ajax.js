let usersearch = $("#searchinput").val()
export const settings = {
    "async": true,
    "crossDomain": true,
    "url": `https://genius.p.rapidapi.com/search?q=${usersearch}`,
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "genius.p.rapidapi.com",
        "x-rapidapi-key": "8b76f3434fmsh55d4860519d2e21p1617f0jsna779e07a8d2f"
    }
};


