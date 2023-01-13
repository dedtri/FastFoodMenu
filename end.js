//henter kvitteringen og putter over i orders
var orders = JSON.parse(localStorage.getItem('savedFilteredOrders'));
var tilrådighedsbeløb = localStorage.getItem('userWallet');
var total = localStorage.getItem('savedSum');

//laver et udprint
printKvittering();

function printKvittering(){
    //vi kopiere orders som er kvitterringen over i en ny variable
    const kvittering = [...orders];

    kvittering.forEach(function(item){
            //gør klar til udprint
            const element = document.createElement('div');
            //indsætter tekst
            element.innerText = item.title + ' x' + item.volume;

            //udprint af sortiment
            const kvitteringList = document.getElementById('kvittering');
            kvitteringList.appendChild(element);       
    })
    //Gør klar til udprint
    const element = document.createElement('div');
    //Indsætter tekst
    element.innerText = 'Pris: ' + total + ' kr. ';
    //Styler tekst
    element.style = "font-weight: bold;";

    printRetur()

    //udprint af total pris
    const kvitteringList = document.getElementById('kvittering');
    kvitteringList.appendChild(element);
}

function printRetur() {
    const element = document.createElement('div');
    element.innerText = 'Penge tilbage: ' + (tilrådighedsbeløb - total) + ' kr.';
    element.style = "font-weight: bold;";

    const kvitteringList = document.getElementById('kvittering');
    kvitteringList.appendChild(element);
}

//henter kundens kvittering
function getOrder() {
    document.getElementById('kvittering').innerText = kvittering;
}

//så vi kan komme tilbage til start
function confirmReceipt(){
    window.location.replace('/index.html');
}

