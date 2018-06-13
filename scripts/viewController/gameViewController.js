var TriviaGameViewController = (function () {
    var me = {};
    var internal = {};

    internal.getView = function (answer) {
        return "<div class=\"container\" style=\"" + "color: #000000;\"\">" +
            "<div class=\"row\">" +
            "<form class=\"form-horizontal\">" +
            "<div class=\"form-group\">" +
            "<label class=\"control-label col-sm-2\" for=\"answer\">Answer:</label>" +
            "<div class=\"col-sm-10\">" +
            "<input type=\"text\" class=\"form-control\" style=\"cursor: default\" id=\"answer\" disabled=\"\" value=\"" + answer + "\">" +
            "</div>" +
            "</div>" +
            "</form>" +
            "</div>" +
            "</div>";
    };

    internal.createContainer = function () {
        var html = "<div id=\"preguntados-cheat\"></div>";
        $('#preguntados').after(html);
    };

    me.create = function () {
        if ($('#preguntados-cheat').length == 0) {
            var html = internal.createContainer();
            $('#preguntados').html(html);
        }
    };

    me.process = function (answer) {
        var html = internal.getView(answer);
        $('#preguntados-cheat').html(html);
    };

    me.destroy = function () {
        if ($('#preguntados-cheat').length != 0) {
            $('#preguntados-cheat').empty();
        }
    };

    return me;
})();