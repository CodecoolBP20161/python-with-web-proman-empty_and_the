var Boards = function(title, text)
{
    this.title = title
    this.text = text
}

var board1 = new Boards("title1", "text1")
var board2 = new Boards("title2", "text2")
var board3 = new Boards("title3", "text3")
var board4 = new Boards("title2", "text2")
var board5 = new Boards("title3", "text3")
var boards = [board1, board2, board3, board4, board5]
localStorage.boards = JSON.stringify(boards)

var save = function(title, text)
{
    var newboard = new Boards(title, text)
    var boards = JSON.parse(localStorage.boards)
    boards.push(newboard)
    localStorage.boards = JSON.stringify(boards)
}

var test = function()
{
    var boards = JSON.parse(localStorage.boards)
    for(i=0; i<boards.length; i++)
    {
        var divtag = document.createElement("div");
        divtag.className = "board"
        var titletag = document.createElement("h1");
        var texttag = document.createElement("p");
        var title = document.createTextNode(boards[i].title);
        var text = document.createTextNode(boards[i].text);
        divtag.appendChild(titletag);
        divtag.appendChild(texttag);
        titletag.appendChild(title);
        texttag.appendChild(text);
        var element = document.getElementById("div1");
        element.appendChild(divtag);
    }
    // document.getElementById("demo").innerHTML = localStorage.boards;
}
