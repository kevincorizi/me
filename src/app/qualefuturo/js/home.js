(function () {
    $(document).ready(function () {
        var container = $("#grid-container");
        var cells = $(container).find(".grid-container");
        var expandButtons = $(cells).find(".grid-expand-button-desktop");
        var previews = $(cells).find(".grid-preview-container");
        var contents = $(cells).find(".grid-expand-container");

        $(".grid-expand-container").on("show.bs.collapse", function () {
            $(this).parent().addClass("expand");
            $(expandButtons).prop("disabled", true);
        });
        $(".grid-expand-container").on("hidden.bs.collapse", function () {
            $(this).parent().removeClass("expand");
            $(expandButtons).prop("disabled", false);
        });

        // Set heights of the grid cells
        function updateCellHeights() {
            var maxHeight = 0;
            cells.each(function (index, cell) {
                if ($(cell).hasClass("expand")) {
                    // Do not compute height for expanded cells
                    return;
                }
                var variable = "--grid-cell-mobile-height-" + (index + 1);
                var mobileHeight = $(cell).outerHeight();
                var desktopHeight = $(previews[index]).outerHeight();
                document.documentElement.style.setProperty(variable, mobileHeight + "px");
                if (desktopHeight > maxHeight) {
                    maxHeight = desktopHeight;
                }
            });
            document.documentElement.style.setProperty("--grid-cell-max-height", maxHeight + "px");
        }
        updateCellHeights();
        $(window).on("resize", updateCellHeights);

        // The whole preview opens the cell in mobile
        previews.on("click", function () {
            if ($(window).width() < 768) {
                var target = $(this).data("mobile-collapse");
                $(target).collapse("toggle");
            }
        });

        // Grid container should resize with cells
        contents.on("heightChanged", function (event, height, oldHeight) {
            var total = height + $(this).offset().top - $(container).offset().top;
            document.documentElement.style.setProperty("--grid-total-height", total + "px");
        });
    });
})();
