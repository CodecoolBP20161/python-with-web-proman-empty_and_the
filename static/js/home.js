var Boards = function(title, text, num)
{
    this.title = title
    this.text = text
    this.num = num
}

var board1 = new Boards("title1", "text1", 1)
var board2 = new Boards("title2", "text2", 2)
var board3 = new Boards("title3", "text3", 3)
var board4 = new Boards("title2", "text2", 4)
var board5 = new Boards("title3", "text3", 5)
var boards = [board1, board2, board3, board4, board5]
localStorage.boards = JSON.stringify(boards)

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
    $(".delete").click(function(){
        $(this).parent().parent().hide();
        delete_board(this.value)
    });
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
