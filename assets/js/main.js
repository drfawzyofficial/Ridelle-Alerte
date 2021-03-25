/**********************************************************************************************
GLOBAL PROPERTIES
**********************************************************************************************/

/**
*  Dummy console for IE, to avoid crashes.
*/
if (typeof console != "object") {
    var console = {};
    console.log = function (text) { }
    console.warn = function (text) { };
    console.error = function (text) { };
    console.info = function (text) { };
}

var format = "",
    isMobile = false,
    exLink,
    slide = false,
    logoMobileSrc = $('#logo-mobile').attr('src');

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    isMobile = true;
}
if (window.innerWidth < 769) {
    format = "mobile";
}

/**********************************************************************************************
END GLOBAL PROPERTIES
**********************************************************************************************/

/* == DOM ready == */

$(document).ready(function () {
    if ($(".embed-poster").length) {
        var poster = $(this);
        $(".embed-poster").on('click', function (e) {
            $(this).removeClass("active");
            console.log($(this).next(".video-embed").addClass("wow"));
            var url = $(this).next(".video-embed").attr("src");
            var newLink = url + "&autoplay=1";
            $(this).next(".video-embed").attr("src", newLink);
            e.preventDefault();
        });
    }

    $("#form").on('submit', function (e) {

        e.preventDefault();
        var $form = $(this),
            errEmpty = $form.data("mssg"),
            errInvalid = $("#email").data("invalid"),
            err = errEmpty;

        console.log("on submit");

        if ($("#captcha").val() == "") {

            if ($("#name").val() == "") {
                $("#name").css("outline", "red 2px dotted").on("change", function () {
                    $(this).css("outline", "none");
                    $("#errMss").html("");
                });
                $("#errMss").html(err);
            } else if ($("#business").val() == "") {
                $("#business").css("outline", "red 2px dotted").on("change", function () {
                    $(this).css("outline", "none");
                    $("#errMss").html("");
                });
                $("#errMss").html(err);
            } else if ($("#phone").val() == "") {
                $("#phone").css("outline", "red 2px dotted").on("change", function () {
                    $(this).css("outline", "none");
                    $("#errMss").html("");
                });
                $("#errMss").html(err);
            } else if ($("#email").val() == "") {
                $("#email").css("outline", "red 2px dotted").on("change", function () {
                    $(this).css("outline", "none");
                    $("#errMss").html("");
                });
                $("#errMss").html(err);
            } else if (!echeck($("#email").val())) {
                $("#email").css("outline", "red 2px dotted").on("change", function () {
                    $(this).css("outline", "none");
                    $("#errMss").html("");
                });
                err = errInvalid;
                $("#errMss").html(err);
            } else if ($("#numTrucks option:selected").val() == "null") {
                $("#numTrucks").css("outline", "red 2px dotted").on("change", function () {
                    $(this).css("outline", "none");
                    $("#errMss").html("");
                });
                $("#errMss").html(err);
            } else {
                submitForm($form);
            }
        }


    });

});

function submitForm($form) {

    var url = "/umbraco/surface/api/contact";
        datastring = $form.serialize(),
        formId = $form.attr("id");

    console.log(datastring);

    $.ajax({
        method: "POST",
        dataType: "json",
        url: url,
        data: datastring,
        success: function (response) {

            console.log(response);

            if (response.IsSuccess) {

                $form.hide();
                $("#contact-thanks").show();

            } else {
                $("#errMss").html(response.Result);

            }
        },
        error: function (xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
            $("#errMss").html($form.data("ajfail"));
        }
    })
}

function echeck(str) {
    var emailRegEx = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-\.])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (str.match(emailRegEx)) {
        return true;
    } else {
        return false;
    }
}