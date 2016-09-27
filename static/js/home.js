var Boards = function(title, text)
{
    this.title = title
    this.text = text
}

var board1 = new Boards("title1", "text1")
var board2 = new Boards("title2", "text2")
var board3 = new Boards("title3", "text3")
var a = [board1, board2, board3]
localStorage.boards = JSON.stringify(a)

var test = function()
{
    var b = JSON.parse(localStorage.boards)
    for(i=0; i<b.length; i++)
    {
        var divtag = document.createElement("div");
        divtag.className = "board"
        var titletag = document.createElement("h1");
        var texttag = document.createElement("p");
        var title = document.createTextNode(b[i].title);
        var text = document.createTextNode(b[i].text);
        divtag.appendChild(titletag);
        divtag.appendChild(texttag);
        titletag.appendChild(title);
        texttag.appendChild(text);
        var element = document.getElementById("div1");
        element.appendChild(divtag);
    }
    // document.getElementById("demo").innerHTML = localStorage.boards;
}
