$(document).ready(function () {
    $(window).resize(function () {
        checkOrientation()
    });

    function checkOrientation() {
        if (window.matchMedia("(orientation: portrait)").matches) {
            $('#rotateDevice').show();
        }
        else {
            $('#rotateDevice').hide();
        }
    }

    checkOrientation();
});