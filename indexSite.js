var tilrådighedsbeløb;
var ordernummer;

//gemmer sådan så man beholder ordrenummeret
var tempOrder = localStorage.getItem('savedOrder');

//laver if statement for hvis det er første gang man laver en ordre eller har gjort det
if (tempOrder != null) {
    ordernummer = tempOrder;
} else {
    ordernummer = 1;
}

//laver en funktion som er whitespace
function containsWhitespace(str) {
    return /\s/.test(str);
}

function TilrådighedsBeløb()
{
    //henter værdien fra input feltet
    tilrådighedsbeløb = document.getElementById('betalingsPenge').value;
    //tjekker om det er et nr.
    if(!isNaN(tilrådighedsbeløb) && !tilrådighedsbeløb == containsWhitespace())
    {
        //gemmer dem i en variable
        var getInput = tilrådighedsbeløb;
        var order = ordernummer;
        //gemmer i local storage
        localStorage.setItem('savedOrder', order);
        localStorage.setItem('userWallet', getInput);
        window.location.replace('/shop.html');
    }
}