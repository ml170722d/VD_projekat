let media;

function getMedia() {
    $.ajax({
        url: '../js/media' + '.json',
        dataType: 'json',
        async: false,
        dataType: 'json',
        success: function (data) {
            media = data;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Error: " + errorThrown);
        }
    });

    return media;
}

function setMediaFor(selector, numOfSelectorPerArea, pageFor) {
    waitForEl(selector, function () {
        let i = 1, j = 1, k = 0;
        $('main ' + selector).each(function () {
            $(this).attr('src', mediaJson['training-content-' + pageFor + '-' + j + '-' + selector + '-' + i]);

            (i == 1) ? i = 2 : i = 1;

            if (k == numOfSelectorPerArea - 1) {
                k = 0;
                j++;
            } else {
                k++;
            }
        });
    });
}