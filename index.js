let expensesEl = document.getElementById("expense-el");
let amountEl = document.getElementById("amount-el");
let submitEl = document.getElementById("submit-el");
let clearEl = document.getElementById("clear-el");
let outputEl = document.getElementById("output-el");
let errorEl = document.getElementById("error-el");
let mainElementsEl = document.getElementById("mainElement-el");
let submittedEl = document.getElementById("submitted-el");
let listItems = document.getElementById("listItems-el");
let expenseItemsEl = document.getElementById("expenseslistItem-el");
let amountItemsEl = document.getElementById("amountListItem-el");

let expenses = [
  { section: "expense", items: [] },
  { section: "amount", items: [] },
];

console.log(expensesEl);
console.log(amountEl);
console.log(expensesEl.value);
console.log(amountEl.value);

let leadsFromLocalStorage = JSON.parse(localStorage.getItem("expenses"));

if (leadsFromLocalStorage) {
  expenses = leadsFromLocalStorage;
  renderLeads();
} else {
  console.log("Nothings in storage!");
}

function pushToSection(sectionName, dataToPush) {
  const targetSection = expenses.find((item) => item.section === sectionName);

  //Truthy and falsy values:

  if (targetSection) {
    targetSection.items.push(dataToPush);
  } else {
    console.log("Sorry, ${targetSection} is undefined!");
  }
}

function proceed() {
  pushToSection("expense", { name: expensesEl.value });
  pushToSection("amount", { amount: amountEl.value });
  localStorage.setItem("expenses", JSON.stringify(expenses));
  submittedEl.textContent = "Successfully Submitted!";
  renderLeads();
}

amountEl.addEventListener("input", () => {
  let value = amountEl.value;
  if (value.length == 0) return;

  const regex = /^\d+$/;
  const isValid = regex.test(value);

  if (!isValid) {
    alert("Only numbers allowed!");
    amountEl.value = value.slice(0, value.length - 1);
  }
});

expensesEl.addEventListener("input", () => {
  let value = expensesEl.value;
  const regex = A - Za - z;
  const isValid = regex.test(value);

  if (!isValid) {
    alert("Only letters allowed!");
    expensesEl.value = value.slice(0, value.length - 1);
  }
});

submitEl.addEventListener("click", function () {
  if (expensesEl.value && amountEl.value) {
    proceed();
    expensesEl.value = "";
    amountEl.value = "";
    localStorage.setItem("expenses", JSON.stringify(expenses));
    console.log("IF RAN");
    renderLeads();
  } else {
    console.log("ELSE RAN");
    errorEl.textContent = "ERROR: Please write something in both fields";
  }
});

clearEl.addEventListener("dblclick", function () {
  expenses = [
    { section: "expense", items: [] },
    { section: "amount", items: [] },
  ];
  localStorage.clear();
  expenseItemsEl.innerHTML = "";
  amountItemsEl.innerHTML = "";
  renderLeads();
});

function renderLeads() {
  let listItems = "";
  let amountItems = "";
  console.log(expenses);
  console.log(expenses[0].items);
  console.log(expenses[1].items);
  for (let i = 0; i < expenses[0].items.length; i++) {
    listItems += `
                <li>
                  <a href = ${expenses[0].items[i].name} target = _blank>
                    ${expenses[0].items[i].name}
                  </a>
                </li>
            `;
    amountItems += `
                <li>
                  <a href = ${expenses[1].items[i].amount} target = _blank>
                    $ ${expenses[1].items[i].amount}
                  </a>
                </li>
            `;
  }
  expenseItemsEl.innerHTML = listItems;
  amountItemsEl.innerHTML = amountItems;
}
