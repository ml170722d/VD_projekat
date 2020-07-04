let media;

function getMedia(selector, numOfSelectorPerArea, pageFor) {
    $.ajax({
        url: '../js/media' + '.json',
        dataType: 'json',
        async: false,
        dataType: 'json',
        success: function (data) {
            media = data;
            setMediaFor(selector, numOfSelectorPerArea, pageFor);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Error: " + errorThrown);
        }
    });

    return media;
}

function setMediaFor(selector, numOfSelectorPerArea, pageFor) {

    if (media == undefined){
        getMedia(selector, numOfSelectorPerArea, pageFor);
    }

    let i = 1, j = 1, k = 0;
    $('main ' + selector).each(function () {
        $(this).attr('src', media['training-content-' + pageFor + '-' + j + '-' + selector + '-' + i]);

        (i == 1) ? i = 2 : i = 1;

        if (k == numOfSelectorPerArea - 1) {
            k = 0;
            j++;
        } else {
            k++;
        }
    });
}