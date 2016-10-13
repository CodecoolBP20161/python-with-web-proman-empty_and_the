// outsource from model.js the different functions

function displayBoard(boardObject) {

    var divBoard = $('<div class="board" id=board_'+ boardObject.id +'></div>');
    // divBoard.append("<p>BOARD</p>");
    divBoard.append("<div class='titleborder'><h2>"+ boardObject.title +" </h2></div>");
    divBoard.append("<p class='board_p'>"+ boardObject.body +" </board_p>");
    var btnDelete = $('<button class="delete">delete</button>')
    var state = new State(new LocalStorageImp());
    btnDelete.on('click', function(){

        state.delandshowBoard(boardObject.id);
        var board = $('#board_'+ boardObject.id)
        board.hide();
    });
    divBoard.append(btnDelete)
    var showCard = $('<button id="cards" class="cards">cards</button>')
    divBoard.append(showCard)
    divBoard.appendTo('#board-container');
    showCard.on('click', function(){
        $(".warning").remove();
        $('#board-container').hide();
        $('#card-container').show();
        $('.formbox').css('height', "400px");
        $('.submitbutton').css("margin-top", "-5px")
        $("#addbutton").hide();
        $(".form-group").show();
        $("#backbutton").show()
        state.runCardPage(boardObject.id);
    });
}


function displayCard(cardObject) {
    var divCard = $('<div class="card" id=card_'+ cardObject.id +" </h2></div>");
    divCard.append("<div class='titleborder'><h2>"+ cardObject.title +" </p>");
    divCard.append("<p class='board_p'>"+ cardObject.body +" </board_p>");
    var btnDelete = $('<button class="delete">delete</button>')
    btnDelete.on('click', function(){
        var state = new State(new LocalStorageImp());

        state.delandshowCard(cardObject.boardId, cardObject.id);
        var card = $('#card_'+ cardObject.id)
        card.hide();
    });
    divCard.append(btnDelete)

    divCard.appendTo('#card-container');
}


function resetInputField(){
    $(':input').val('');
}
