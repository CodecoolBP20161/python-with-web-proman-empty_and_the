$(document).ready(function(){
    display_boards()
    $("#addbutton").click(function(){
        $(".newForm").fadeIn();
        $("#addbutton").hide();
    });

    $("#home").click(function(){
        window.location.href = '/'
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

    $("#home").hover(function(){
        $(this).css("color", "orange");
    }, function(){
        $(this).css("color", "white");
    });

    $(".cards").hover(function(){
        $(this).css("background-color", "#05a565");
    }, function(){
        $(this).css("background-color", "#1ed68d");
    });

    $(".delete").hover(function(){
        $(this).css("background-color", "#401658");
    }, function(){
        $(this).css("background-color", "#6B2593");
    });

});

var redirectToCards = function() {
    window.location.href = '/cards/'+ this.value;
};


var boardDeleteHandler = function()
{
        $(this).parent().parent().hide();
        delete_board(this.value)
}

var Boards = function(title, text, id, cards)
{
    this.title = title
    this.text = text
    this.id = id
    this.cards = cards
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
            var id = 1
        }
        else
        {
            var id = boards[boards.length - 1].id + 1
        }
        var newboard = new Boards(title, text, id, cards = [])
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

var delete_board = function(id)
{
    var boards = JSON.parse(localStorage.boards)
    for (i=0; i<boards.length; i++)
    {
        if (id == boards[i].id)
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
    buttontag.value = board.id
    var buttontag2 = document.createElement("button");
    buttontag2.addEventListener("click", redirectToCards);
    buttontag2.type = "button"
    buttontag2.className = "cards"
    buttontag2.value = board.id
    var texttag = document.createElement("p");
    texttag.className = "board_p"
    var title = document.createTextNode(board.title);
    var buttontext = document.createTextNode("delete");
    var buttontext2 = document.createTextNode("cards");
    var text = document.createTextNode(board.text);
    divtag.appendChild(div2tag);
    div2tag.appendChild(titletag);
    buttontag.appendChild(buttontext);
    buttontag2.appendChild(buttontext2);
    div2tag.appendChild(buttontag);
    div2tag.appendChild(buttontag2);
    divtag.appendChild(texttag);
    titletag.appendChild(title);
    texttag.appendChild(text);
    var element = document.getElementById("div1");
    element.appendChild(divtag);
}

var display_boards = function()
{
    if (!localStorage.boards) {
        var empty_list = [];
        localStorage.boards = JSON.stringify(empty_list);
    }
    var boards = JSON.parse(localStorage.boards)
    for(i=0; i<boards.length; i++)
    {
        display_board(boards[i])
    }
}
