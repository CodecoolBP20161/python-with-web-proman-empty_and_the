// dataBase constructor implementation  (State)
function DataBaseImp(){
    //BOARD
    this.runBoardPage = function() {
        this.getandshowBoard()
    }
    this.getandshowBoard = function() {
        $.ajax({
            method: "GET",
            url: "/api/boards"
        })
        .done(function(response){
            $.each(response.boards, function(i, board){
                displayBoard(board)
            });
        })
    }
    // this.delandshowBoard = function(boardId) {
    //     console.log("delete")
    // }

    this.postandshowBoard = function(inputTitle, inputBody) {
        $.ajax({
          method: "POST",
          url: '/api/boards',
          data: { "title": inputTitle,
                  "body": inputBody
                }
        })
        .done(function(board) {
            displayBoard(board)
        });
    }


    // CARD
    this.runCardPage = function(boardId) {
        this.getandshowCard(boardId);
        $('#add-card').click(function(){
            var inputTitle = $('#input-card-title').val();
            var inputBody = $('#input-card-body').val();
            if (inputTitle && inputBody){
                State().postandshowCard(inputTitle, inputBody, boardId);
                // empty board input field after submit
                resetInputField();
            }
            else {
                alert("Pls fill all!")
            }
        });
    }
    this.getandshowCard = function(boardId){
        $.ajax({
            method: "GET",
            url: "/api/boards/" + boardId + "/cards"
        })
        .done(function(response){
            $.each(response.cards, function(i, card){
                displayCard(card)
            });
        });
    }
    // this.delandshowCard = function(boardId, cardId){
    //
    // }
    this.postandshowCard = function(inputTitle, inputBody, boardId){
        $.ajax({
          method: "POST",
          url: "/api/boards/" + boardId + "/cards",
          data: { "title": inputTitle,
                  "body": inputBody
                }
        })
        .done(function(card) {
            displayCard(card)
        });
    }
};
