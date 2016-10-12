$(document).ready(function(){
    var state = new State(new LocalStorageImp());
    state.runBoardPage();

    $('#add-board').click(function(){
        var inputTitle = $('#input-board-title').val();
        var inputBody = $('#input-board-body').val();
        if (inputTitle && inputBody){
            state.postandshowBoard(inputTitle, inputBody);
            // empty board input field after submit
            resetInputField();
        }
        else {
            alert("Fill all!")
        }
    });

    // reset button event
    $('.reset').on('click', function(){
        resetInputField();
    });


});
