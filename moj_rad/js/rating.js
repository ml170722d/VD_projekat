/**
 * when document loads, injects to every div named "stars" stars.html
 */
$(document).ready(function () {


    waitForEl('div[name$="stars"]', function () {
        $('div[name$="stars"]').each(function () {
            $(this).load("./stars.html");
        });
    });

    waitForEl('div[name$="stars"] .rating', function () {

        /**
         * bounds all labels to the corect input
         */
        let i = 0, j = 0;
        $('div[name$="stars"]').each(function () {
            $(this).find('input').each(function () {
                $(this).attr("name", "rating" + i);
                $(this).attr("id", j);
                $(this).next().attr("for", j++);
            });

            i++;
        });

        /**
         * gets all inputs that are children od element with name stars
         */
        $('div[name$="stars"] input').each(function () {
            $(this).click(function (e) {
                /**
                 * in this function define the behaviour of rating an training
                 * this is refered to input element,                                            <--READ ME
                 * e is referd to (trigger) event
                 */

                 //example
                 console.log(this, e);
            });
        });
    });
});