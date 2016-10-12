$(document).ready(function(){
    var state = new State(new LocalStorageImp());
    state.runBoardPage();

    // JQery for handling add button click
    $("#addbutton").click(function(){
        $("#addbutton").hide();
        $(".form-group").show();
    });

    $('#add-board').click(function(){
        var inputTitle = $('#input-board-title').val();
        var inputBody = $('#input-board-body').val();
        if (inputTitle && inputBody){
            state.postandshowBoard(inputTitle, inputBody);
            // empty board input field after submit
            resetInputField();
            $(".form-group").show();
            $("#addbutton").hide();
        }
        else {
            alert("Fill all!")
        }
    });

    // reset button event
    $('#reset').on('click', function(){
        resetInputField();
        $(".form-group").hide();
        $("#addbutton").show();

    });


});
