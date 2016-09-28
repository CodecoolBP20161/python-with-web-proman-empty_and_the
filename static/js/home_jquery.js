$(document).ready(function(){
    $("#addbutton").click(function(){
        $(".newForm").fadeIn();
        $("#addbutton").hide();
    });


    $(".delete").click(function(){
        $(this).parent().parent().hide();
        delete_board(this.value)
    });


    $(document).mouseup(function (e) {
        var container = $(".newForm");

        if (!container.is(e.target) // if the target of the click isn't the container...
            && container.has(e.target).length === 0) // ... nor a descendant of the container
        {
            container.hide();
            $("#addbutton").fadeIn("fast");

    };
    $("#submitbutton").click(function() {
        $(".newForm").hide();
        $("#addbutton").fadeIn();
    });
});
});
