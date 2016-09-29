$(document).ready(function(){
    display_cards()
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
        var save = new_card()
        if (save)
        {
        $(".newForm").hide();
        $("#addbutton").fadeIn();
        $('#title').val('');
        $('#text').val('');
        }
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
        delete_card(this.value)
}

var Cards = function(title, text, id)
{
    this.title = title
    this.text = text
    this.id = id
}

card1= new Cards("dasasd", "asdasdasd", 1)
card2= new Cards("dasasd", "asdasdasd", 2)
card3= new Cards("dasasd", "asdasdasd", 3)

var get_current_board = function(boards)
{
    var board_id = window.location.pathname.split("/")[2]
    for (i=0; i<boards.length+1; i++)
    {
        if (boards[i].id == board_id)
        {
        var current_board = boards[i];
        return current_board;
        }
    }
}

var new_card = function()
{
    var title = document.getElementById("title").value
    var text = document.getElementById("text").value
    var boards = JSON.parse(localStorage.boards)
    var current_board = get_current_board(boards)
    var cards = current_board.cards
    if (title && text)
    {
        if (current_board.cards.length == 0)
        {
            var id = 1
        }
        else
        {
            var id = boards[current_board.cards.length - 1].id + 1
        }
        var newcard = new Cards(title, text, id)
        save_card(newcard)
        return true
    }
    else
    {
        alert("Fill all!")
        return false
    }
}


var save_card = function(newcard)
{
    var boards = JSON.parse(localStorage.boards)
    var current_board = get_current_board(boards)
    var cards = current_board.cards
    cards.push(newcard)
    localStorage.boards = JSON.stringify(boards)
    display_card(newcard)
}

var delete_card = function(id)
{
    var boards = JSON.parse(localStorage.boards)
    var current_board = get_current_board(boards)
    var cards = current_board.cards
    for (i=0; i<cards.length; i++)
    {
        if (id == cards[i].id)
        {
            delete cards.splice(i, 1)
            break
        }
    }
    localStorage.boards = JSON.stringify(boards)
}

var display_card = function(card)
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
    buttontag.value = card.id
    var buttontag2 = document.createElement("button");
    buttontag2.addEventListener("click", redirectToCards);
    buttontag2.type = "button"
    buttontag2.className = "cards"
    buttontag2.value = card.id
    var texttag = document.createElement("p");
    texttag.className = "board_p"
    var title = document.createTextNode(card.title);
    var buttontext = document.createTextNode("delete");
    var buttontext2 = document.createTextNode("cards");
    var text = document.createTextNode(card.text);
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

var display_cards = function()
{
    var boards = JSON.parse(localStorage.boards)
    var current_board = get_current_board(boards)
    var cards = current_board.cards
    for(i=0; i<cards.length; i++)
    {
        display_card(cards[i])
    }
    // document.getElementById("demo").innerHTML = localStorage.boards;
}

// var test = function()
// {
//     var board_id = window.location.pathname.split("/")[2]
//     var a = JSON.parse(localStorage.boards)
//     a[0].cards.push(card1)
//     a[0].cards.push(card2)
//     a[0].cards.push(card3)
//     localStorage.boards = JSON.stringify(a)
//     var b = JSON.parse(localStorage.boards)
//     console.log(b[0].cards[1])
// }
