(function () {
    $(document).ready(function () {
        // Vertically align the central column with the beginning of the quick links
        var qaCenter = $("#qa-center");
        var qaTitle = $("#qa-title-wrapper");
        var qaQuickLinksWrapper = $("#qa-quick-links");
        var qaQuickLinks = $("#qa-quick-links-container");

        function alignToQuickLinks() {
            if ($(document).width() > 1199) {
                // Offset relative to the document
                var offset = qaTitle.offset().top + qaTitle.outerHeight();
                if (qaQuickLinks.offset()) {
                    offset = qaQuickLinks.offset().top;
                }
                // Offset relative to the window
                offset -= $(window).scrollTop();
                offset -= $("header").outerHeight();
                qaCenter.css("padding-top", offset + "px");
            } else {
                qaCenter.css("padding-top", "0px");
            }
            qaCenter.removeClass("invisible");
        }

        // Hide quick links when height is too low
        function hideQuickLinks() {
            if (!!qaQuickLinks.offset()) {
                if ($(document).width() > 1199) {
                    var quickLinkHeight = qaQuickLinks.outerHeight();
                    var quickLinkWrapperHeight = qaQuickLinksWrapper.height();
                    var centeringPadding = ($(window).height() / 2 - quickLinkHeight) / 2;
                    if (quickLinkHeight >= quickLinkWrapperHeight - 40) {
                        qaQuickLinks.addClass("qa-quick-links-hidden");
                    } else {
                        qaQuickLinks.removeClass("qa-quick-links-hidden");
                        qaQuickLinks.css("padding-bottom", centeringPadding);
                    }
                } else {
                    qaQuickLinks.removeClass("qa-quick-links-hidden");
                }
            }
        }

        $(window).on("resize", hideQuickLinks);
        $(window).on("resize", alignToQuickLinks);
        hideQuickLinks();
        alignToQuickLinks();
    });
})();