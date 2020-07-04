var language;

$().ready(function () {
    //load header and set listeners
    $('header').load('./header.html', function () {
        setLanguageListeners();

        translate();
        setCurMaker();
    });
    
    //load footer
    $('footer').load('./footer.html');
});

function setCurMaker() {
    let url = $(location).attr('pathname').split('/');
    let pageName = url[url.length - 1].split('.')[0];

    if (pageName == "treninzi" || pageName == "nutricionista" || pageName == "masaza") {
        $('#' + pageName).parent().prev().addClass("active");
    }

    $('#' + pageName).addClass("active");
}

function setLanguageListeners() {
    //rs click listener
    $('#rs').ready(function () {
        $('#rs').click(function () {
            setLanguage('rs');
            translate();

        });
    })

    //en click listener
    $('#en').ready(function () {
        $("#en").click(function () {
            setLanguage('en');
            translate();
        });
    })
}

function getLanguage() {
    (localStorage.getItem('language') == null) ? setLanguage('rs') : false;
    $.ajax({
        url: '../js/language/' + localStorage.getItem('language') + '.json',
        dataType: 'json',
        async: false,
        dataType: 'json',
        success: function (lang) {
            language = lang;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Error: " + errorThrown);
            //language = (localStorage.getItem('language') == 'rs') ? hardCodeJsonRS : hardCodeJsonEN;
        }
    });
}

//needs to hard coded later as json obj
var hardCodeJsonEN;
var hardCodeJsonRS;

function setLanguage(lang) {
    localStorage.setItem('language', lang);
}

function translateNavBar() {
    let i = 0;
    $('#navbarNavDropdown').find('ul').find('li').find('a').each(function () {
        switch (i++) {
            case 0:
                $(this).text(language.nav_bar_home);
                break;
            case 1:
                $(this).text(language.nav_bar_service_dropdown);
                break;
            case 2:
                $(this).text(language.nav_bar_service_item1);
                break;
            case 3:
                $(this).text(language.nav_bar_service_item2);
                break;
            case 4:
                $(this).text(language.nav_bar_service_item3);
                break;
            case 5:
                $(this).text(language.nav_bar_shedule);
                break;
            case 6:
                $(this).text(language.nav_bar_my_acc);
                break;
            case 7:
                $(this).text(language.nav_bar_about_us);
                break;
            default:
                alert('error');
                break;
        }
    });
}

function translateFooter() {
    let i = 0;
    $('footer').find('p').find('span').each(function () {
        switch (i++) {
            case 0:
                $(this).text(language.credentials_1st);
                break;
            case 1:
                $(this).text(language.credentials_2nd);
                break;
            case 2:
                $(this).text(language.credentials_3rd);
                break;
            case 3:
                $(this).text(language.credentials_4th);
                break;
            default:
                alert('error');
                break;
        }
    })
}

function translate() {
    getLanguage();
    translateNavBar();
    translateFooter();

    //user defined functin
    translatePage(language);
}