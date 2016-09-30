// JQuery to load after HTML page is ready
$(document).ready(function(){
    // Examine if we are on the boards page or not
    if (window.location.pathname == "/"){
        displayBoards()
        var boards_bool = true
    }
    else {
        displayCards()
        headerWriter()
        var boards_bool = false
    }

    // JQery for handling save button click
    $("#save").click(function(){
        if (boards_bool){
            var save = newBoard()
        }
        else{
            var save = newCard()
        }
        if (save)
        {
        $(".newForm").hide();
        $("#addbutton").fadeIn();
        $('#title').val('');
        $('#text').val('');
        }
    });

    // JQery for handling add button click
    $("#addbutton").click(function(){
        $(".newForm").fadeIn();
        $("#addbutton").hide();
    });

    // JQery for handling header click
    $("#home").click(function(){
        window.location.href = '/'
    });

    // JQery for handling cancel button click
    $("#cancel").click(function(){
        $(".newForm").hide();
        $("#addbutton").fadeIn();
        $('#title').val('');
        $('#text').val('');
    });

});

// JQuery for change header color
var homeHover = function(color){
    return function(){
        $(this).css("color", color)
    }
}

// JQuery for change card button color
var cardHover = function(color){
    return function(){
        $(this).css("background-color", color);
    }
}

// JQuery for change delete button color
var deleteHover = function(color){
    return function(){
        $(this).css("background-color", color)
    }
}

// JQuery for hiding board
var boardDeleteHandler = function(){
        $(this).parent().parent().hide();
        deleteBoard(this.value)
}

// JQuery for hiding card
var cardDeleteHandler = function(){
        $(this).parent().parent().hide();
        deleteCard(this.value)
}

// Redirecting to cards page
var redirectToCards = function(){
    window.location.href = '/boards/'+ this.value;
};

// State pattern implementation
var State = function(imp){
    this.implementation = imp
    this.changeImp = function(newImp){
        this.implementation = newImp
    }
    this.get_board_list = function(){
        var boards = this.implementation.get_board_list()
        return boards
    }
    this.save_board_list = function(boards){
        this.implementation.save_board_list(boards)
    }
}

// Data call and save from localStorage
var LocalStorageImp = function(){
    this.get_board_list = function(){
    var boards = JSON.parse(localStorage.boards);
    return boards
    }
    this.save_board_list = function(boards){
    localStorage.boards = JSON.stringify(boards);
    }
}

// Global reach of state object
var state = new State(new LocalStorageImp());

// Boards constructor
var Boards = function(title, text, id, cards){
    this.title = title
    this.text = text
    this.id = id
    this.cards = cards
    // Saving board to localStorage
    this.saveBoard = function(){
        var boards = state.get_board_list();
        boards.push(this);
        state.save_board_list(boards);
        displayBoard(this);
    }
}

// Cards constructor
var Cards = function(title, text, id){
    this.title = title
    this.text = text
    this.id = id
    // Saving card to localStorage
    this.saveCard = function(){
        var boards = state.get_board_list();
        var current_board = getCurrentBoard(boards)
        var cards = current_board.cards
        cards.push(this)
        state.save_board_list(boards);
        displayCard(this)
    }
}

// Creating new board from input data, returns false if user didn't fill all the fields
var newBoard = function(){
    var title = document.getElementById("title").value
    var text = document.getElementById("text").value
    var boards = state.get_board_list();
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
        newboard.saveBoard()
        return true
    }
    else
    {
        alert("Fill all!")
        return false
    }
}

// Delete board from localStorage
var deleteBoard = function(id){
    var boards = state.get_board_list();
    for (i=0; i<boards.length; i++)
    {
        if (id == boards[i].id)
        {
            delete boards.splice(i, 1)
            break
        }
    }
    state.save_board_list(boards);
}

// Insert HTML code for given board to home.html
var displayBoard = function(board){
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
    buttontag.addEventListener("mouseover", deleteHover("#401658"))
    buttontag.addEventListener("mouseout", deleteHover("#6B2593"))
    var buttontag2 = document.createElement("button");
    buttontag2.addEventListener("click", redirectToCards);
    buttontag2.type = "button"
    buttontag2.className = "cards"
    buttontag2.value = board.id
    buttontag2.addEventListener("mouseover", cardHover("#05a565"))
    buttontag2.addEventListener("mouseout", cardHover("#1ed68d"))
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

// Displaying all boards from localStorage
var displayBoards = function(){
    if (!localStorage.boards) {
        var empty_list = [];
        localStorage.boards = JSON.stringify(empty_list);
    }
    var boards = state.get_board_list();
    for(i=0; i<boards.length; i++)
    {
        displayBoard(boards[i])
    }
}

// Creating unique header including board's title for cards page
var headerWriter = function(){
    var boards = state.get_board_list();
    var current_board = getCurrentBoard(boards);
    var element = document.getElementById("header");
    var title = document.getElementById("home");
    title.addEventListener("mouseover", homeHover("orange"))
    title.addEventListener("mouseout", homeHover("white"))
    var header = document.createTextNode(' Board: ' + current_board.title);
    element.appendChild(header)
}

// Returning needed board from localStorage
var getCurrentBoard = function(boards){
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

// Creating new card from input data, returns false if user didn't fill all the fields
var newCard = function(){
    var title = document.getElementById("title").value
    var text = document.getElementById("text").value
    var boards = state.get_board_list();
    var current_board = getCurrentBoard(boards)
    var cards = current_board.cards
    if (title && text)
    {
        if (current_board.cards.length == 0)
        {
            var id = 1
        }
        else
        {
            var id = cards[current_board.cards.length - 1].id + 1
        }
        var newcard = new Cards(title, text, id)
        newcard.saveCard()
        return true
    }
    else
    {
        alert("Fill all!")
        return false
    }
}

// Delete card from localStorage
var deleteCard = function(id){
    var boards = state.get_board_list();
    var current_board = getCurrentBoard(boards)
    var cards = current_board.cards
    for (i=0; i<cards.length; i++)
    {
        if (id == cards[i].id)
        {
            delete cards.splice(i, 1)
            break
        }
    }
    state.save_board_list(boards);
}

// Insert HTML code for given card to home.html
var displayCard = function(card){
    var divtag = document.createElement("div");
    divtag.className = "card"
    var div2tag = document.createElement("div");
    div2tag.className = "div2"
    var titletag = document.createElement("h2");
    titletag.className = "cardtitle"
    var buttontag = document.createElement("button");
    buttontag.addEventListener("click", cardDeleteHandler)
    buttontag.type = "button"
    buttontag.className = "delete"
    buttontag.value = card.id
    buttontag.addEventListener("mouseover", deleteHover("#401658"))
    buttontag.addEventListener("mouseout", deleteHover("#6B2593"))
    var texttag = document.createElement("p");
    texttag.className = "card_p"
    var title = document.createTextNode(card.title);
    var buttontext = document.createTextNode("delete");
    var text = document.createTextNode(card.text);
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

// Displaying all cards from localStorage
var displayCards = function(){
    var boards = state.get_board_list();
    var current_board = getCurrentBoard(boards)
    var cards = current_board.cards
    for(i=0; i<cards.length; i++)
    {
        displayCard(cards[i])
    }
}
