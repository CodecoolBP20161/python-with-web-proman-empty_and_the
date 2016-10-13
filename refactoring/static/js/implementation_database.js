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


    this.delandshowBoard = function(boardId) {
        $.ajax({
          method: "POST",
          url: "/api/boards/" + boardId
        })
        .done(function(response) {
        });
    }

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
                $(".warning").remove();
                $(".form-group").hide();
                $("#addbuttoncard").show();
            }
            else {
                $(".warning").remove();
                var warnMes = $('<label class="warning">Field is required!</label>');
                $(".control-label").append(warnMes);

            }

        });

        // JQery for handling add button click
        $("#addbuttoncard").click(function(){
            $("#addbuttoncard").hide();
            $(".form-group").show();
        });


        // JQery button hovers
        $('.delete').mouseover(function() {
            $(this).css("background-color", "#4e0c74")
        });

        $('.delete').mouseout(function() {
            $(this).css("background-color", "#6B2593")
        });

        $('.backbutton').mouseover(function() {
            $(this).css("background-color", "#e79600")
        });

        $('.backbutton').mouseout(function() {
            $(this).css("background-color", "orange")
        });

        $('#resetcard').on('click', function(){
            resetInputField()
            $(".warning").remove();
            $(".form-group").hide();
            $("#addbuttoncard").show();

        });

    };
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
    this.delandshowCard = function(boardId, cardId){
        $.ajax({
          method: "POST",
          url: "/api/boards/" + boardId + "/cards/" + cardId,
        })
        .done(function(response) {
        });
    }
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
