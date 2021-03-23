"use strict";

// Querying DOM Elements
var totalBalance = document.getElementById("total-balance");
var totalIncome = document.getElementById("income");
var totalExpenditure = document.getElementById("expenditure");
var form = document.querySelector("form");
var selectOption = document.getElementById("select-type");
var itemName = document.getElementById("name");
var itemAmount = document.getElementById("amount");
var list = document.getElementById("list");
var copy = document.getElementById("copy");

// getting local storage
var localStorageFinance = JSON.parse(localStorage.getItem("financeList"));
var financeList =
  localStorage.getItem("financeList") !== null ? localStorageFinance : [];

// add event listener to the form
form.addEventListener("submit", function (e) {
  e.preventDefault();
  var addData = {
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
  var sortOut = financeList.map(function (data) {
    var category = data.category,
      amount = data.amount;
    return {
      category: category,
      amount: amount,
    };
  }); //   console.log("rendering lists...", sortOut);

  // filter out income
  var initIncome = sortOut
    .filter(function (data) {
      return data.category !== "expense";
    })
    .map(function (datum) {
      return datum.amount;
    });

  // reduce only when array has two elements in it
  var income =
    initIncome.length >= 1
      ? initIncome.reduce(function (total, current) {
          return (total += current);
        })
      : initIncome;

  // filter out expens
  var initExpense = sortOut
    .filter(function (data) {
      return data.category !== "income";
    })
    .map(function (datum) {
      return datum.amount;
    });

  // reduce only when array has two elements in it
  var expense =
    initExpense.length >= 1
      ? initExpense.reduce(function (total, current) {
          return (total += current);
        })
      : initExpense;

  //   figure definitions & calculations
  var initBalance = income - expense;
  var balance = Math.abs(initBalance);
  totalBalance.textContent =
    income < expense ? "-$".concat(balance) : "$".concat(balance);
  totalIncome.textContent = income > 0 ? "$".concat(income) : "$0";
  totalExpenditure.textContent = expense > 0 ? "$".concat(expense) : "$0";
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
  financeList.forEach(function (data) {
    var id = data.id,
      category = data.category,
      name = data.name,
      amount = data.amount;
    var item = document.createElement("li");
    item.classList.add(category === "expense" ? "expenditure" : "income");
    item.innerHTML = '\n            <span class="tag-amount">\n            <span class="tag">'
      .concat(name, '</span>\n            <span class="amount">$')
      .concat(
        amount,
        '</span>\n            </span>\n            <span class="delete-icon" ><i onclick="deleteList('
      )
      .concat(id, ')" class="fas fa-trash-alt fa-3"></i></span>\n          ');
    list.appendChild(item);
    // console.log("populating lists...");
  });
}

// deleting a list
function deleteList(id) {
  var updateList = financeList.filter(function (listItem) {
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
var currYear = new Date().getFullYear();
copy.textContent = currYear;
