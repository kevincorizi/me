(function () {
    $(document).ready(function () {
        function setupValidation(patterns) {
            $.validator.addMethod("pattern", function (value, element, pattern) {
                return this.optional(element) || pattern.test(value);
            }, "Invalid pattern");
            $("form#book-form").validate({
                rules: {
                    nome: {
                        required: true,
                        pattern: patterns.nome ? new RegExp(patterns.nome) : /.*/
                    },
                    email: {
                        required: true,
                        pattern: patterns.email ? new RegExp(patterns.email) : /.*/
                    },
                    "privacy-ricezione": {
                        required: true
                    },
                    "privacy-newsletter": {
                        required: false
                    }
                },
                highlight: function (element) {
                    if ($(element).is(":checkbox")) {
                        $(element).parent().addClass("error");
                    } else {
                        $(element).addClass("error");
                    }
                },
                unhighlight: function (element) {
                    if ($(element).is(":checkbox")) {
                        $(element).parent().removeClass("error");
                    } else {
                        $(element).removeClass("error");
                    }
                },
                errorPlacement: function (error, element) { },
                submitHandler: function (form) {
                    $("#form-container").removeClass("error");
                    $("#form-error .text-error").removeClass("d-block");
                    $.ajax({
                        url: "https://admin.qualefuturo.visionarydays.com/api/download-book",
                        type: "POST",
                        data: $(form).serialize(),
                        success: function (response) {
                            $("#form-container").addClass("success");
                        },
                        error: function (response) {
                            $("#form-container").addClass("error");
                            var error = "generic-error";
                            if (!!response.responseJSON && !!response.responseJSON.messages) {
                                var messages = response.responseJSON.messages;
                                if (messages.email === "duplicato") {
                                    error = "duplicate-email-error";
                                }
                            }
                            $("#" + error).addClass("d-block");
                        }
                    })
                }
            });
        }

        $.ajax({
            url: "https://admin.qualefuturo.visionarydays.com/api/doc/regex",
            type: "GET",
            success: function (response) {
                setupValidation(response);
            },
            error: function () {
                setupValidation({});
            }
        });
    });
})();