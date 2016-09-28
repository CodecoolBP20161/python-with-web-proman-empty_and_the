$(document).ready(function(){
    $("#addbutton").click(function(){
        $(".newForm").fadeIn();
        $("#addbutton").hide();
    });

    $(document).mouseup(function (e) {
        var container = $(".newForm");

        if (!container.is(e.target) // if the target of the click isn't the container...
            && container.has(e.target).length === 0) // ... nor a descendant of the container
        {
            container.hide();
            $("#addbutton").show();

    };
});
});
