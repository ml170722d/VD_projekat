class PDF {
    constructor() {
        this.pdf = new jsPDF;
        this.i = 20;
    }

    writeLine(line) {
        this.pdf.text(20, this.i, line);
        this.i += 10;
    }

    save(name) {
        this.pdf.save(name);
    }

}

function validate(json) {

    if (json.phone.length < 10 || json.phone.length > 13) {
        return (false);
    }

    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(json.email))) {
        return (false);
    }

    return (true);
}

function formToJSON(){
    return json = {
        name: $('#name').val(),
        surname: $('#surname').val(),
        email: $('#email').val(),
        phone: $('#phone').val(),
        date: $('#date').val()
    };

}