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

var new_board = function()
{
    var title = document.getElementById("title").value
    var text = document.getElementById("text").value
    if (title && text)
    {
        var newboard = new Boards(title, text)
        save_board(newboard)
        $(document).on("click", "#save", function() {
            $(".newForm").hide();
            $("#addbutton").fadeIn();
        });
    }
    else
    {
        alert("Please fill all the fields!")
    }
}

var save_board = function(newboard)
{
    var boards = JSON.parse(localStorage.boards)
    boards.push(newboard)
    localStorage.boards = JSON.stringify(boards)
    display_board(newboard)
}

var display_board = function(board)
{
    var divtag = document.createElement("div");
    divtag.className = "board"
    var div2tag = document.createElement("div");
    div2tag.className = "div2"
    var titletag = document.createElement("h2");
    titletag.className = "boardtitle"
    var buttontag = document.createElement("button");
    buttontag.type = "button"
    buttontag.id = "delete"
    buttontag.onclick = "#"
    var texttag = document.createElement("p");
    texttag.className = "board_p"
    var title = document.createTextNode(board.title);
    var buttontext = document.createTextNode("delete");
    var text = document.createTextNode(board.text);
    divtag.appendChild(div2tag);
    div2tag.appendChild(titletag);
    buttontag.appendChild(buttontext);
    div2tag.appendChild(buttontag);
    divtag.appendChild(texttag);
    titletag.appendChild(title);
    texttag.appendChild(text);
    var element = document.getElementById("div1");
    element.appendChild(divtag);
}

var display_boards = function()
{
    var boards = JSON.parse(localStorage.boards)
    for(i=0; i<boards.length; i++)
    {
        display_board(boards[i])
    }
    // document.getElementById("demo").innerHTML = localStorage.boards;
}
