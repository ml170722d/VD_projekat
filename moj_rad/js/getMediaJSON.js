let media;

function getMedia(callback) {
    $.ajax({
        url: '../js/media' + '.json',
        dataType: 'json',
        async: false,
        dataType: 'json',
        success: function (data) {
            media = data;
            callback();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Error: " + errorThrown);
        }
    });

    return media;
}

function setMediaFor(parent) {

    if (media == undefined) {
        getMedia(function () {
            setLinks(parent);
        });
    } else {
        setLinks(parent);
    }

}

let link = 1;
function setLinks(parent) {
    let num = 1;
    let url = $(location).attr('pathname').split('/');
    let pageName = url[url.length - 1].split('.')[0];
    let pageFor = pageName;

    num = 1;
    //console.log(num);
    $(parent).find('iframe').each(function () {
        $(this).attr('src', media['training-content-' + pageFor + '-' + link + '-iframe-' + num]);
        num = num % 2 + 1;
    });

    num = 1;
    //console.log(num);
    $(parent).find('img').each(function () {
        $(this).attr('src', media['training-content-' + pageFor + '-' + link + '-img-' + num]);
        num = num % 2 + 1;
    });
    link++;
}