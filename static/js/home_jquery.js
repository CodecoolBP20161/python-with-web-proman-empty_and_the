$(document).ready(function(){
    $("#addbutton").click(function(){
        $(".newForm").fadeIn();
        $("#addbutton").hide();
    });

    $(".delete").click(function(){
        $(this).parent().parent().hide();
        delete_board(this.value)
    });

    $("#cancel").click(function(){
        $(".newForm").hide();
        $("#addbutton").show();
    });

    $(document).mouseup(function (e) {
        var container = $(".newForm");
    });
});
