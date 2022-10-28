let arrayAnimali = ['🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐰', '🐯', '🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐯', '🐰'];
//libreria per icone
//https://html-css-js.com/html/character-codes/
document.body.onload = startGame();
var tempo; //interval
var cronometro = document.querySelector(".timer");
var trova = document.getElementsByClassName("find");
var modal = document.getElementById("modal");
var bottone = document.getElementsByClassName("button");

// mi serviranno alcune variabili 1. interval 2. una agganciata alla classe find 
// 3. una agganciata al'id modal 4. una agganciata alla classe timer


//una funzione che serve a mescolare in modo random gli elementi dell'array che viene passato 
// (l'array contiene le icone degli animali)
function shuffle(a) {
    var currentIndex = a.length;
    var temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = a[currentIndex];
        a[currentIndex] = a[randomIndex];
        a[randomIndex] = temporaryValue;
    }
    return a;
}
// una funzione che rimuove la classe active e chiama la funzione startGame()

///////////////////mioinizio///////////////////////////////

function giocancora() {
    modal.classList.remove("active");
    startGame();
}
//////////////////miofine//////////////////////////////////    

// la funzione startGame che pulisce il timer, dichiara un array vuoto, mescola casualmente l'array degli animali
// (var arrayShuffle = shuffle(arrayAnimali);), aggancia il contenitore con id griglia, 
// pulisce tutti gli elementi che eventualmente contiene
// poi fa ciclo per creare i 24 div child -> aggiunge la class e l'elemento dell'array in base all'indice progressivo
// chiama la funzione timer e associa a tutti gli elementi (div) di classe icon l'evento click e le due funzioni definit sotto
//////////////////////////////mioinizio/////////////////////////////////////


function startGame() {
    var arrayShuffle = shuffle(arrayAnimali);
    clearInterval(tempo);
    arrayComparison = [];
    var lista = document.getElementById('griglia');
    while (lista.hasChildNodes()) {
        lista.removeChild(lista.firstChild);
    }
    for (var i = 0; i < 24; i++) {
        var contenitore = document.createElement('div');
        var emoji = document.createElement('div');
        emoji.className = 'icon';
        document.getElementById('griglia')
            .appendChild(contenitore).appendChild(emoji);
        emoji.innerHTML = arrayShuffle[i];
    }

    orologio();
    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];
    for (var i = 0; i < icons.length; i++) {
        icons[i].addEventListener("click", displayIcon);
        icons[i].addEventListener("click", apri);
    }
}


/////////////////////////////miofine//////////////////////////////////////


function displayIcon() {
    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];

    /*
    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];
    è uguale a 
    var icons = document.getElementsByClassName("icon");
    //var icons = [...icon];
    è un operatore che serve per passare un array come argomento:
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax 
    https://www.tutorialspoint.com/es6/es6_operators.htm (cerca spread nella pagina)
    */

    //mette/toglie la classe show
    this.classList.toggle("show");
    //aggiunge l'oggetto su cui ha cliccato all'array del confronto
    arrayComparison.push(this);

    var len = arrayComparison.length;
    //se nel confronto ci sono due elementi
    if (len === 2) {
        //se sono uguali aggiunge la classe find
        //if (arrayComparison[0].innerHTML === arrayComparison[1].innerHTML) {
        //    arrayComparison[0].classList.add("find", "disabled");
        //    arrayComparison[1].classList.add("find", "disabled");
        //    arrayComparison = [];
        if (arrayComparison[0].innerHTML === arrayComparison[1].innerHTML) {
            arrayComparison.forEach(function (elemento) {
                elemento.classList.add("find", "disabled");
            });
            arrayComparison = [];

        } else {
            //altrimenti (ha sbagliato) aggiunge solo la classe disabled
            icons.forEach(function (item) {
                item.classList.add('disabled');
            });
            // con il timeout rimuove  la classe show per nasconderli
            setTimeout(function () {
                //arrayComparison[0].classList.remove("show");
                //arrayComparison[1].classList.remove("show");
                arrayComparison.forEach(function (elemento) {
                    elemento.classList.remove("show");
                });
                icons.forEach(function (item) {
                    item.classList.remove('disabled');
                    for (var i = 0; i < trova.length; i++) {
                        trova[i].classList.add("disabled");
                    }
                });
                arrayComparison = [];
            }, 700);
        }
    }
}

//una funzione che viene mostrata alla fine quando sono tutte le risposte esatte


function apri() {
    if (trova.length == 24) {
        clearInterval(tempo);
        modal.classList.add("active");
        document.getElementById("tempoTrascorso").innerHTML = cronometro.innerHTML;
        chiudi();
    }
}

function chiudi() {
    
    bottone.addEventListener("click", function () {
        modal.classList.remove("active");
        startGame();
    });
}



// una funzione che calcola il tempo e aggiorna il contenitore sotto

//////////////////////////////mioinizio/////////////////////////////////////

function orologio() {

    var h = 0;
    var min = 0;
    var sec = 0;

    tempo = setInterval(function () {
        cronometro.innerHTML = `Tempo trascorso: ${min} min ${sec} sec`;
        sec++;
        if (sec == 60) {
            min++;
            sec = 0;
        }
        if (min == 60) {
            h++,
            min = 0;
        }
    }, 1000);

};


/////////////////////////////miofine//////////////////////////////////////

