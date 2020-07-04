/**
 * injects to every div named "stars" stars.html
 */
function insertStarsToItem(sratContainer){
    $(sratContainer).load("./stars.html", function () {

        bindLabelToInput(sratContainer);

        $(sratContainer).children().each(function () {
            $(this).find('input').each(function () {
                $(this).click(function (e) {

                    leaveMark(this);
                
                });
            });
        });

        let pris = sessionStorage.getItem("Prisustvo");
        let obj_pris = JSON.parse(pris);

        for (let i = 0; i < obj_pris.length; i++) {
            if (obj_pris[i].tip == $(sratContainer).prev().find('h3').text()) {
                $(sratContainer).next().find('span').text(obj_pris[i].pros_ocena);
                break;
            }
        }
    });
}

/**
* gets all inputs that are children od element with name stars
*/
function leaveMark(input, event) {
    console
    let pris = sessionStorage.getItem("Prisustvo");
    let obj_pris = JSON.parse(pris);

    for (let i = 0; i < obj_pris.length; i++) {
        if (obj_pris[i].tip == $(input).parent().parent().prev().find('h3').text()) {
            if (obj_pris[i].status == 1) {
                oceni(obj_pris[i], $(input).attr('value'));
                $(input).parent().parent().next().find('span').text(obj_pris[i].pros_ocena);

            } else {
                $(input).prop('checked', false);
                alert("Niste pisustvovali ovom treningu");

            }
            break;
        }
    }
    sessionStorage.setItem("Prisustvo", JSON.stringify(obj_pris));
}


/**
* bounds all labels to the corect input
*/
var i = 0, j = 0;
function bindLabelToInput(container) {
    $(container).find('input').each(function () {
        $(this).attr("name", "rating" + i);
        $(this).attr("id", j);
        $(this).next().attr("for", j++);
    });
    i++;
}


function oceni(obj, ocena) {
    ocena = parseInt(ocena);
    if (obj.ocena == 0) {
        obj.br_ocena++;
    } else {
        obj.sum_ocena -= obj.ocena;
    }
    obj.ocena = ocena;
    obj.sum_ocena += ocena;
    obj.pros_ocena = parseFloat(obj.sum_ocena / obj.br_ocena);
}