function loadListItems(callback){
    $('main li').each(function () {
        $(this).load('./listItem.html', function () {

            insertStarsToItem($(this).find('div[name$="stars"]'));

            let i = 0;
            $('.item form').each(function () {
                $(this).find('textarea').attr("name", "txta_" + i);
                $(this).find('input').attr("name", "txta_" + i);
                i++;

                $(this).find('input').click(function (e) {
                    let id = $(this).attr("name").split("_")[1];
                    let commnetText = $('textarea[name$="' + $(this).attr("name") + '"]').val();
                    if (commnetText == "") return;
                    $('textarea[name$="' + $(this).attr("name") + '"]').val("");

                    let comment = $('<label></label>').text(commnetText);
                    $(comment).addClass("col-sm-12");
                    $("#comment-container-" + id).append(comment);


                });
            });

            i = 0;
            $('.comment-container').each(function () {
                $(this).attr("id", "comment-container-" + i++);
            });

            setMediaFor('iframe', 2, 'yoga');
            setMediaFor('img', 2, 'yoga');

            callback(this);
            
        });
    });
    
}