let expensesEl = document.getElementById('expense-el');
let amountEl = document.getElementById('amount-el');
let submitEl = document.getElementById('submit-el');
let clearEl = document.getElementById('clear-el');
let outputEl = document.getElementById('output-el');
let errorEl = document.getElementById('error-el');
let mainElementsEl = document.getElementById('mainElement-el');
let submittedEl = document.getElementById('submitted-el');
let listItems = document.getElementById('listItems-el');
let expenseItemsEl = document.getElementById('expenseslistItem-el')
let amountItemsEl = document.getElementById('amountListItem-el')

let expenses = [
    { section: "expense", items: []},
    { section: "amount", items: []}
]

console.log(expensesEl);
console.log(amountEl);
console.log(expensesEl.value);
console.log(amountEl.value);


let leadsFromLocalStorage = JSON.parse(localStorage.getItem("expenses"))

if (leadsFromLocalStorage) {
        expensesEl = localStorage.getItem("expenses")
        renderLeads()
    } else {
        console.log("Nothing was spotted in Storage!")
}

function pushToSection(sectionName, dataToPush) {
    const targetSection = expenses.find(item => item.section === sectionName);

    //Truthy and falsy values:
    
    if (targetSection) {
        targetSection.items.push(dataToPush)
    } else {
        console.log("Sorry, ${targetSection} is undefined!")
    }
}

function proceed() {
        pushToSection("expense", {name: expensesEl.value})
        pushToSection("amount", {amount: amountEl.value})
        expensesEl.value = "";
        amountEl.value = "";
        submittedEl.textContent = "Successfully Submitted!"
        // console.log(expenses)
        renderLeads()
}

submitEl.addEventListener('click', function() {
    if (expensesEl.value && amountEl.value) {
        proceed()
        localStorage.setItem("expenses", JSON.stringify(expenses))
        
    } else {
        errorEl.textContent = "ERROR: Please write something in both fields"
        console.log("ERROR: Please Write Something In Both Fields")
    }
});

clearEl.addEventListener("dblclick", function() {
    expenses = [
        { section: "expenses", items: [] },
        { section: "amount", items: [] }
    ]
    localStorage.clear();
    expenseItemsEl.innerHTML = ""
    amountItemsEl.innerHTML = ""
    renderLeads()
})

function renderLeads() {
    let listItems = "";
    let amountItems = "";

    for (let i = 0; i < expenses.items; i++) {
            listItems += 
            `
                <li>
                    ${expenses[0].items[i].name}
                </li>
            `
            amountItems += 
            `
                <li>
                    ${expenses[1].items[i].amount}
                </li>
            `
    }
    expenseItemsEl.innerHTML = listItems;
    amountItemsEl.innerHTML = amountItems;
}
