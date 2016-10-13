$(document).ready(function(){
    new State(new LocalStorageImp());
    State().runBoardPage();

    // JQery button hovers
    $('.delete').mouseover(function() {
        $(this).css("background-color", "#4e0c74")
    });

    $('.cards').mouseover(function() {
        $(this).css("background-color", "#00ba70")
    });

    $('.delete').mouseout(function() {
        $(this).css("background-color", "#6B2593")
    });

    $('.cards').mouseout(function() {
        $(this).css("background-color", "#1ed68d")
    });

    // Hide back button
    $('#backbutton').hide();

    // JQery for handling add button click
    $("#addbutton").click(function(){
        $("#addbutton").hide();
        $(".form-group").show();
    });

    $('#add-board').click(function(){
        var inputTitle = $('#input-board-title').val();
        var inputBody = $('#input-board-body').val();
        if (inputTitle && inputBody){
            State().postandshowBoard(inputTitle, inputBody);
            // empty board input field after submit
            resetInputField();
            $(".warning").remove();
            $(".form-group").hide();
            $("#addbutton").show();
        }
        else {
            $(".warning").remove();
            var warnMes = $('<label class="warning">Field is required!</label>');
            $(".control-label").append(warnMes);
        }
    });

    // reset button event
    $('#reset').on('click', function(){
        resetInputField();
        $(".warning").remove();
        $(".form-group").hide();
        $("#addbutton").show();

    });


});
