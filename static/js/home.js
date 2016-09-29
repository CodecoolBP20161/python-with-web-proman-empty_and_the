$(document).ready(function(){
    $("#addbutton").click(function(){
        $(".newForm").fadeIn();
        $("#addbutton").hide();
    });

    $("#cancel").click(function(){
        $(".newForm").hide();
        $("#addbutton").fadeIn();
        $('#title').val('');
        $('#text').val('');
    });

    $("#save").click(function(){
        var save = new_board()
        if (save)
        {
        $(".newForm").hide();
        $("#addbutton").fadeIn();
        $('#title').val('');
        $('#text').val('');
        }
    });
});



var boardDeleteHandler = function()
{
        $(this).parent().parent().hide();
        delete_board(this.value)
}

var Boards = function(title, text, num)
{
    this.title = title
    this.text = text
    this.num = num
}

var new_board = function()
{
    var title = document.getElementById("title").value
    var text = document.getElementById("text").value
    var boards = JSON.parse(localStorage.boards)
    if (title && text)
    {
        if (boards.length == 0)
        {
            var num = 1
        }
        else
        {
            var num = boards[boards.length - 1].num + 1
        }
        var newboard = new Boards(title, text, num)
        save_board(newboard)
        return true
    }
    else
    {
        alert("Fill all!")
        return false
    }
}

var save_board = function(newboard)
{
    var boards = JSON.parse(localStorage.boards)
    boards.push(newboard)
    localStorage.boards = JSON.stringify(boards)
    display_board(newboard)
}

var delete_board = function(num)
{
    var boards = JSON.parse(localStorage.boards)
    for (i=0; i<boards.length; i++)
    {
        if (num == boards[i].num)
        {
            delete boards.splice(i, 1)
            break
        }
    }
    localStorage.boards = JSON.stringify(boards)
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
    buttontag.addEventListener("click", boardDeleteHandler)
    buttontag.type = "button"
    buttontag.className = "delete"
    buttontag.value = board.num
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
