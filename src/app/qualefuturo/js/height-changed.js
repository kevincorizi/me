$.event.special.heightChanged = {
    remove: function () {
        $(this).children("iframe.height-changed").remove();
    },
    add: function () { 
        var elm = $(this);
        var iframe = elm.children("iframe.height-changed");
        if (!iframe.length) {
            iframe = $("<iframe/>").addClass("height-changed").prependTo(this);
        }
        var oldHeight = elm.height();
        function elmResized() {
            var height = elm.height();
            if (oldHeight != height) {
                elm.trigger("heightChanged", [height, oldHeight]);
                oldHeight = height;
            }
        }

        var timer = 0;
        var ielm = iframe[0];
        (ielm.contentWindow || ielm).onresize = function () {
            clearTimeout(timer);
            timer = setTimeout(elmResized, 10);
        };
    }
}