// DOM //
let main = document.querySelector("#main");
let addUserBtn = document.querySelector("#add-user");
let doubleBtn = document.querySelector("#double");
let showMilBtn = document.querySelector("#show-millionaires");
let sortBtn = document.querySelector("#sort");
let calculateWealthBtn = document.querySelector("#calculate-wealth");
let personDetail = document.querySelector("#personDetail");
let data = [];
// Adds new object to data array //
function addData(obj) {
    data.push(obj);
    console.log(data);
}
// async - await //
// API - Fetch function //
async function getRandomUser() {
    const response = await fetch("https://randomuser.me/api");
    const data = await response.json();
    const user = data.results[0];
    let newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 10000),
    };
    addData(newUser);
    UpdateDOM();
}
getRandomUser();
getRandomUser();
getRandomUser();
// format money //
function formatMoney(number) {
    return "$" + number.toFixed(2);
}
// Default Parameter //
function UpdateDOM(providedData = data) {
    main.innerHTML = `<h2><strong>Person</strong>Wealth</h2>`;
    // forEach //
    providedData.forEach((item) => {
        let element = document.createElement("div");
        element.classList.add("person");
        element.innerHTML = `<h4>${item.name}</h4> ${formatMoney(item.money)}`;
        main.append(element);
    });
}

function doubleMoney() {
    data = data.map(function(item) {
        return {...item, money: item.money * 2 };
    });
    UpdateDOM();
}

function sort() {
    data.sort((a, b) => b.money - a.money);
    UpdateDOM();
}

function calcMil() {
    data = data.filter(function(item) {
        return item.money >= 1000000
    })
    UpdateDOM();
}

function calculateWealth() {
    let wealth = data.reduce(function(acc, item) {
        return acc += item.money;

    }, 0)
    let wealthElement = document.createElement('div');
    wealthElement.innerHTML = `<h1>${formatMoney(wealth)}</h1>`;
    main.append(wealthElement);

}



addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sort);
calculateWealthBtn.addEventListener('click', calculateWealth);
showMilBtn.addEventListener('click', calcMil);