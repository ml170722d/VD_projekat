function clk_yoga(){
   document.getElementById("btn_col_1").innerHTML="Raja Yoga";
   document.getElementById("col_1").style.backgroundImage = "url('../images/raja_yoga1.jpg')";
   document.getElementById("btn_col_2").innerHTML="Hatha Yoga";
   document.getElementById("col_2").style.backgroundImage = "url('../images/hatha_yoga2.jpg')";
   document.getElementById("btn_col_3").innerHTML="Jnana Yoga";
   document.getElementById("col_3").style.backgroundImage = "url('../images/jnana_yoga1.jpg')";
}
function clk_pilates(){
    document.getElementById("btn_col_1").innerHTML="Classic Pilates";
    document.getElementById("col_1").style.backgroundImage = "url('../images/classic_pilates1.webp')";
    document.getElementById("btn_col_2").innerHTML="Stott Pilates";
    document.getElementById("col_2").style.backgroundImage = "url('../images/stott_pilates1.jpg')";
    document.getElementById("btn_col_3").innerHTML="Reformer Pilates";
    document.getElementById("col_3").style.backgroundImage = "url('../images/reformer_pilates1.jpg')";
}
function clk_core(){
    document.getElementById("btn_col_1").innerHTML="Isometric Core";
    document.getElementById("col_1").style.backgroundImage = "url('../images/isometric_core1.jpg')";
    document.getElementById("btn_col_2").innerHTML="Standing Core";
    document.getElementById("col_2").style.backgroundImage = "url('../images/standing_core1.jpg')";
    document.getElementById("btn_col_3").innerHTML="Dynamic Floor";
    document.getElementById("col_3").style.backgroundImage = "url('../images/dynamic_floor4.jpg')";
}
function clk_cardio(){
    document.getElementById("btn_col_1").innerHTML="Circuit Cardio";
    document.getElementById("col_1").style.backgroundImage = "url('../images/circuit_cardio.jpg')";
    document.getElementById("btn_col_2").innerHTML="HIIT Cardio";
    document.getElementById("col_2").style.backgroundImage = "url('../images/hiit_cardio1.jpg')";
    document.getElementById("btn_col_3").innerHTML="Fartlek";
    document.getElementById("col_3").style.backgroundImage = "url('../images/cardio4.jpg')";
}

function clk_col1(){
    let trening = document.getElementById("btn_col_1").textContent;
    if(trening == "Raja Yoga" || trening == "Classic Pilates" || trening == "Isometric Core" || trening == "Circuit Cardio"){
        iscrtaj(trening);
    }
}
function clk_col2(){
    let trening = document.getElementById("btn_col_2").textContent;
    if(trening == "Hatha Yoga" || trening == "Stott Pilates" || trening == "Standing Core" || trening == "HIIT Cardio"){
        iscrtaj(trening);
    }
}
function clk_col3(){
    let trening = document.getElementById("btn_col_3").textContent;
    if(trening == "Jnana Yoga" || trening == "Reformer Pilates" || trening == "Dynamic Floor" || trening == "Fartlek"){
        iscrtaj(trening);
    }
}

function iscrtaj(trening){
    window.open("../html/tabela_treninga.html","_self");
    localStorage.setItem("tip_treninga", trening);
    
}

function loadTabelaTreninga(){

    var d = new Date();
    var h = d.getHours();
    var day = d.getDay();

    let tren = sessionStorage.getItem("Treninzi");
    let obj_tren = JSON.parse(tren);
    for(let i = 0; i<obj_tren.length; i++){
        if(obj_tren[i].tip == localStorage.getItem("tip_treninga")){

            let polje = document.getElementById(obj_tren[i].lok[0]+","+obj_tren[i].lok[1]);

            if((obj_tren[i].lok[1]==7 && day==0)||obj_tren[i].lok[1]==day){
                var poc = 9+obj_tren[i].lok[0];
                if(poc-h<=0){
                    if(obj_tren[i].br_mesta>0){
                        polje.style.backgroundColor = "green";
                        polje.innerHTML = "<button class='btn btn-outline-light btn-block btn2' disabled onclick='rezervisi("+obj_tren[i].lok[0]+","+obj_tren[i].lok[1]+")' >Rezervisi ("+obj_tren[i].br_mesta+")</button>";
                    }else{
                        polje.style.backgroundColor = "red";
                        polje.innerHTML = "<button class='btn btn-outline-light btn-block btn2' disabled>Rezervisi ("+obj_tren[i].br_mesta+")</button>";
                    }
                    continue;
                }
            }
            
            if(obj_tren[i].br_mesta>0){
                polje.style.backgroundColor = "green";
                polje.innerHTML = "<button class='btn btn-outline-light btn-block btn2' onclick='rezervisi("+obj_tren[i].lok[0]+","+obj_tren[i].lok[1]+")'>Rezervisi ("+obj_tren[i].br_mesta+")</button>";
            }else{
                polje.style.backgroundColor = "red";
                polje.innerHTML = "<button class='btn btn-outline-light btn-block btn2' disabled>Rezervisi ("+obj_tren[i].br_mesta+")</button>";
            }
        }
    }
    document.getElementById("naziv_treninga").innerHTML = localStorage.getItem('tip_treninga');
}

function rezervisi(ii,jj){
    let tren = sessionStorage.getItem("Treninzi");
    let obj_tren = JSON.parse(tren);
    for(let i = 0; i<obj_tren.length; i++){
        if(obj_tren[i].tip == localStorage.getItem("tip_treninga")){
            if(obj_tren[i].lok[0]==ii && obj_tren[i].lok[1]==jj){
                if(!obj_tren[i].status){
                    let br = obj_tren[i].br_mesta-1;
                    obj_tren[i].br_mesta = br;
                    obj_tren[i].status = 1;
                    sessionStorage.setItem("Treninzi",JSON.stringify(obj_tren));
                    alert("Uspesno ste rezervisali termin");
                }else{
                    alert("Vec ste rezervisali ovaj termin");
                }
                loadTabelaTreninga()
                break;
            }
        }
    }
}

function moj_nalog(){
    var rezervisani_treninzi = [];
    let tren = sessionStorage.getItem("Treninzi");
    let obj_tren = JSON.parse(tren);
    for(let i = 1; i<=7; i++){
        for(let j=1; j<=10; j++){
            for(let z = 0; z<obj_tren.length; z++){
                if(obj_tren[z].lok[0]==j && obj_tren[z].lok[1]==i && obj_tren[z].status){
                    rezervisani_treninzi.push({tip : obj_tren[z].tip, vreme : localStorage.getItem(j+","+0), dan : localStorage.getItem(0+","+i), id_tren : z});
                    break;
                }
            }
        }
    }
    sessionStorage.setItem("RezervisaniTreninzi",JSON.stringify(rezervisani_treninzi));
}


function loadMojNalog(){
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var day = d.getDay();
    let tren = sessionStorage.getItem("Treninzi");
    let obj_tren = JSON.parse(tren);
    let rez_tren = sessionStorage.getItem("RezervisaniTreninzi");
    let obj_rez_tren = JSON.parse(rez_tren);
    var table = document.createElement('table');
    for (let i = 0; i < obj_rez_tren.length; i++){
        if(obj_tren[obj_rez_tren[i].id_tren].status){
            var tr = document.createElement('tr');   

            var td1 = document.createElement('td');
            var td2 = document.createElement('td');
            var td3 = document.createElement('td');
            var td4 = document.createElement('td');

            var poc = parseInt(obj_rez_tren[i].vreme.substr(0,2));
            var kraj = obj_rez_tren[i].vreme.substr(2,5);

            var text1 = document.createTextNode(obj_rez_tren[i].dan);
            var text2 = document.createTextNode(poc+":00"+kraj+":00");
            var text3 = document.createTextNode(obj_rez_tren[i].tip);

            var btn = document.createElement("button");
            btn.className = "btn btn-outline-danger btn-block";
            btn.innerHTML = "Otkazi"; 
            btn.onclick = function() {otkazi_trening(obj_rez_tren[i].id_tren)};


            //text2 = poc+":00"+kraj+":00";

            td1.appendChild(text1);
            td2.appendChild(text2);
            td3.appendChild(text3);
            td4.appendChild(btn);

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);

            let dan;
            if(obj_rez_tren[i].dan=="Pon"){
                dan=1;
            }
            if(obj_rez_tren[i].dan=="Uto"){
                dan=2;
            }
            if(obj_rez_tren[i].dan=="Sre"){
                dan=3;
            }
            if(obj_rez_tren[i].dan=="Cet"){
                dan=4;
            }
            if(obj_rez_tren[i].dan=="Pet"){
                dan=5;
            }
            if(obj_rez_tren[i].dan=="Sub"){
                dan=6;
            }
            if(obj_rez_tren[i].dan=="Ned"){
                dan=0;
            }
            if(dan==day){
                if(poc-h==1){
                    if(m>=30){
                        btn.disabled=true;
                    }
                }
            }
            tr.appendChild(td4);

            table.appendChild(tr);
        }
    }
    document.getElementById("rezervisani_treninzi").appendChild(table);
    //document.body.appendChild(table);
}

function otkazi_trening(id){
    let tren = sessionStorage.getItem("Treninzi");
    let obj_tren = JSON.parse(tren);

    let rez_tren = sessionStorage.getItem("RezervisaniTreninzi");
    let obj_rez_tren = JSON.parse(rez_tren);

    for(let i=0; i<obj_rez_tren.length; i++){
        if(obj_rez_tren[i].id_tren==id){
            sessionStorage.removeItem(obj_rez_tren[i]);
            break;
        }
    }
    obj_tren[id].status = 0;
    let br = obj_tren[id].br_mesta+1;
    obj_tren[id].br_mesta = br;
    sessionStorage.setItem("Treninzi",JSON.stringify(obj_tren));
    alert("Uspesno ste otkazali trening");
    //oceni("Jnana Yoga",5);
    window.open("../html/moj_nalog.html", "_self");
}