(function () {
    $(document).ready(function () {
        $("a").on("click", function (event) {
            var hash = this.hash;
            if (!hash || !$(hash).offset() || !!this.dataset.toggle) {
                return;
            }
            event.preventDefault();
            $("html, body").animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {
                window.location.hash = hash;
            });
        });
    });
})();