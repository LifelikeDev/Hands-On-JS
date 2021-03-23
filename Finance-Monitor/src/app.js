// Querying DOM Elements
const totalBalance = document.getElementById("total-balance");
const totalIncome = document.getElementById("income");
const totalExpenditure = document.getElementById("expenditure");
const form = document.querySelector("form");
const selectOption = document.getElementById("select-type");
const itemName = document.getElementById("name");
const itemAmount = document.getElementById("amount");
const list = document.getElementById("list");
const copy = document.getElementById("copy");

// getting local storage
const localStorageFinance = JSON.parse(localStorage.getItem("financeList"));

let financeList =
  localStorage.getItem("financeList") !== null ? localStorageFinance : [];

// add event listener to the form
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const addData = {
    id: new Date().getTime(),
    category: selectOption.value,
    name: itemName.value,
    amount: parseInt(itemAmount.value),
  };

  if (itemName.value === "" || !itemAmount.value) {
    alert("Please enter required values");
  } else {
    financeList.push(addData);
    valuesUpdate();
    updateLocalStorage();
    // populateLists();
  }

  itemName.value = "";
  itemAmount.value = "";
});

// grab values from data
function valuesUpdate() {
  const sortOut = financeList.map((data) => {
    const { category, amount } = data;

    return { category, amount };
  });

  //   console.log("rendering lists...", sortOut);

  // filter out income
  const initIncome = sortOut
    .filter((data) => data.category !== "expense")
    .map((datum) => datum.amount);

  // reduce only when array has two elements in it
  const income =
    initIncome.length >= 1
      ? initIncome.reduce((total, current) => (total += current))
      : initIncome;

  // filter out expense
  const initExpense = sortOut
    .filter((data) => data.category !== "income")
    .map((datum) => datum.amount);

  // reduce only when array has two elements in it
  const expense =
    initExpense.length >= 1
      ? initExpense.reduce((total, current) => (total += current))
      : initExpense;

  //   figure definitions & calculations
  const initBalance = income - expense;
  const balance = Math.abs(initBalance);

  totalBalance.textContent = income < expense ? `-$${balance}` : `$${balance}`;
  totalIncome.textContent = income > 0 ? `$${income}` : "$0";
  totalExpenditure.textContent = expense > 0 ? `$${expense}` : "$0";

  // console.log(income, expense);

  if (initBalance < 0) {
    totalBalance.style.color = "rgb(255, 0, 0)";
  } else {
    totalBalance.style.color = "rgb(0, 0, 255)";
  }

  populateLists();

  // console.log("updating values...");
}

valuesUpdate();

// populate lists
function populateLists() {
  // set list to empty each time
  list.innerHTML = "";

  //   loop through array and create list item
  financeList.forEach((data) => {
    const { id, category, name, amount } = data;
    const item = document.createElement("li");
    item.classList.add(category === "expense" ? "expenditure" : "income");
    item.innerHTML = `
            <span class="tag-amount">
            <span class="tag">${name}</span>
            <span class="amount">$${amount}</span>
            </span>
            <span class="delete-icon" ><i onclick="deleteList(${id})" class="fas fa-trash-alt fa-3"></i></span>
          `;
    list.appendChild(item);

    // console.log("populating lists...");
  });
}

// deleting a list
function deleteList(id) {
  const updateList = financeList.filter((listItem) => {
    // console.log("filtering item", listItem.id);
    return listItem.id !== id;
  });

  financeList = updateList;
  console.log(updateList);

  updateLocalStorage();
  valuesUpdate();
  populateLists();
}

// implementing local storage
function updateLocalStorage() {
  localStorage.setItem("financeList", JSON.stringify(financeList));
}

// updating copyright year
let currYear = new Date().getFullYear();
copy.textContent = currYear;

// console.log(currYear);
