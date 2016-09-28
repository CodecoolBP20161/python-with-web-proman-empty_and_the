$(document).ready(function(){
    $("#addbutton").click(function(){
        $(".newForm").fadeIn();
        $("#addbutton").hide();
    });

    $("#cancel").click(function(){
        $(".newForm").hide();
        $("#addbutton").show();
    });

    $(document).mouseup(function (e) {
        var container = $(".newForm");

    });
    $("#save").click(function() {
        $(".newForm").hide();
        $("#addbutton").fadeIn();
    });
});
