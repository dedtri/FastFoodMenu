//laver vores globale værdier
let orderList = [];
let filteredOrders = [];
let dagensOptælling = 0;
let getTodaysTotal;

tempSum = localStorage.getItem('TodaysSum');

if (tempSum != null) {
    getTodaysTotal = tempSum;
} else {
    getTodaysTotal = 0;
}

//så vi kan hente værdien fra start siden
tilrådighedsbeløb = localStorage.getItem('userWallet');
//så vi kan hente værdien for ordreNr
ordernummer = localStorage.getItem('savedOrder');


//printer vores shop
renderCategory();   
//printer orderNr
getOrder();

//tilføj til din indkøbskurv
function addItem(event) {
 //laver et foreach loop til print
items.forEach(function (item) {
    //gør klar til samling af valgt varer med sortiment
    const addButton = event.target;
    const idToAdd = addButton.id;
    //kontrollere om det er rigtigt
    if (item.id === idToAdd) {      
        //læg i kurv og opdater
        orderList.push(item);
        item.volume++;
        renderOrders();
    }
}); 
}

//Remove item
function removeItem(event) {
//fjerne varer i et filter array, Det er kundens array
filteredOrders.forEach(function (order) {
    //gør klar til samling af valgt varer med sortiment
    const deleteButton = event.target;
    const idToDelete = deleteButton.id;
    //kontrollere om det er rigtigt
    if (order.id === idToDelete) {
        //fjern og opdater
        order.volume--;
        renderOrders();
    }
});
}

//Opdater kundens kurv
function renderOrders() { 
//refresher kurven
document.getElementById('order-list').innerHTML = '';

//kalder metoden filterOrders
filterOrders(orderList);

//display valgte varer
filteredOrders.forEach(function (filter) {
    //gør klar til udprint
    const element = document.createElement('div');  
    //tilføjere udprint til element
    element.innerText = filter.title + ' - ' + filter.price + ' kr. ' + '-' + ' x' +  filter.volume;

    //laver en deleteknap til valgte varer
    const deleteButton = document.createElement('button');
    //indsætter tekst
    deleteButton.innerText = 'Delete';
    //fortæller hvad knappen skal gører
    deleteButton.onclick = removeItem;
    //overfører id nr til knappen
    deleteButton.id = filter.id;
    //indsætter
    element.appendChild(deleteButton);
    
    //printer listen
    const orderList = document.getElementById('order-list');
    orderList.appendChild(element);    
});
//kalder metode
calculateSum();
}

//fjerner alt som er dupliceret samt tilføjer varer som er valgt.
function filterOrders(list){
//Fjerner de varer som er dupliceret. Dvs. Den viser kun 1 cheeseburger selvom 3 er valgt
filteredOrders = Object.values(list.reduce(function (unique, obj) {
    //hvis varen ikke er valgt
    if (!unique[obj.title]) 
        //tilføj og returner
        unique[obj.title] = obj;
        return unique;
    }, {}));
//henter varer man vælger. Dvs. alt sortiment som ikke bliver valgt bliver frasorteret
filteredOrders = filteredOrders.filter(filter => filter.volume > 0);
}

//udregner det samlede beløb du køber for
function calculateSum() {
//indsætter det samlede beløb i totalsum
totalSum = filteredOrders.reduce((acc, c) => {
    //udregner beløbet
    return acc + (c.price * c.volume)
    //0 er dens start værdi
}, 0);
//gør klar til print
const element = document.createElement('div'); 
element.innerText = 'Total: ' + ' ' + totalSum + ' kr.';
//printer
const totalList = document.getElementById('order-list');
totalList.appendChild(element);  

//gør klar til oprettelse af knap
const confirmButton = document.createElement('button');
//navn på knap
confirmButton.innerText = 'Confirm';
//hvad den skal gøre
confirmButton.onclick = confirmOrder;
element.appendChild(confirmButton);
}

//udprint at sortiment
function renderCategory() {
getTotal();
getWallet();
//refresher siden
document.getElementById('item-list').innerHTML = '';
//går igennem vores sortiment array
this.items.forEach(function (item) {
    //kontrollerer at item er det samme som i soritment
    if (item.category === categorySelect.value) {
        //gør klar til udprint
        const element = document.createElement('div');
        //indsætter tekst
        element.innerText = item.title + ' - ' + item.price + ' kr. ';
        
        //kalder metoden for print af billede
        createImage(element, item.title);
        //laver en knap       
        const addButton = document.createElement('button');
        //fortæller hvad der skal stå
        addButton.innerText = 'Add';
        //hvilken funktion den skal have
        addButton.onclick = addItem;
        //overfører dens id til knap
        addButton.id = item.id;
        //print knap
        element.appendChild(addButton);
        //udprint af sortiment
        const itemList = document.getElementById('item-list');
        itemList.appendChild(element);
    }
});
}

//Laver udprint af billede
function createImage(element, itemName){
    //gør klar til udprint
    let img = document.createElement('img');
    //henter image
    img.src = '/images/' + itemName + '.png';
    //fortæller størrelse for image
    img.style = "width: 60px; height: 50px;";
    //print
    element.appendChild(img);
}

//Laver en anuller ordre
function clearCart() {
    //indlæser hver varer
    items.forEach(function (item) {
    //sætter hver varers volume til 0
    item.volume = 0;
    });
//Sletter objekter i vores arrays
orderList.length = 0;
filteredOrders.length = 0;
//opdater
renderOrders();
}

//Vores ordreNr stiger med 1 når der trykkes på confirm
function confirmOrder() {
    localStorage.setItem("savedSum", totalSum)
    //Optæller ordernummer
    ordernummer++;
    //indsætter stignen i en variable
    const tempNummer = ordernummer;   
    const tempFilteredOrders = filteredOrders;
    localStorage.setItem('savedFilteredOrders', JSON.stringify(tempFilteredOrders));
    //gemmer i local storage
    localStorage.setItem('savedOrder', tempNummer);
    var tempTodaysTotal = parseInt(getTodaysTotal) + totalSum;
    localStorage.setItem('TodaysSum', tempTodaysTotal);

    clearCart();
    getTotal();
    window.location.replace('/end.html');
}

getdate


//Henter kunden beløb for køb af varer.
function getWallet() {
    document.getElementById('wallet').innerText = 'Beløb: ' + tilrådighedsbeløb + ' kr.';
}

//henter kundens ordreNr
function getOrder() {
    document.getElementById('order-nummer').innerText = 'Order Nummer: ' + ordernummer;
}

//henter dagensomsætning
function getTotal() {
    document.getElementById('todays-total').innerText = "Dagensomsætning: " + getTodaysTotal + ' kr.';
}

            


            