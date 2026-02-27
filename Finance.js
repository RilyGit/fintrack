const addIncomeBtn = document.querySelector("#plus");
const addExpenseBtn = document.querySelector("#minuc");
const balanceDisplay = document.querySelector("#balance"); 
const amountInput = document.querySelector("#amount");
const categorySelect = document.querySelector("#categories");

const incomeContainer = document.querySelector("#CreateAll_income")
const expensesContainer = document.querySelector("#CreateAll_expenses")

let balance = 0;
let history = [];

function computation(type) {
const amount = Number(amountInput.value);
if (!amount || amount <= 0) return;

  if (type === "plus") {
  balance += amount;
  } else if (type === "minus") {
  balance -= amount;
};

balanceDisplay.textContent = balance;

    const now = new Date();
    history.push({
        type: type,
        amountInput: amount,
        category: categorySelect.value,
        time: now
    });
amountInput.value = '';

localStorage.setItem("historyKey", JSON.stringify(history));
}
function listOfHistory(){
  incomeContainer.innerHTML = "";
 expensesContainer.innerHTML = "";
history.forEach(item => {
  const div = document.createElement("div"); 
  if (item.type === "plus") {
    div.textContent = `Дохід | ${item.amountInput} грн | ${item.category}`;
    incomeContainer.append(div); 
  } else {
    div.textContent = `Розхід | ${item.amountInput} грн | ${item.category}`;
    expensesContainer.append(div); 
  }
});
};
function updateBalance(){
balance = 0;
history.forEach( item => {
if (item.type === "plus") {
balance += item.amountInput;
} else {
balance -= item.amountInput;
}
});
balanceDisplay.textContent = balance;
}

addIncomeBtn.addEventListener("click", function(){
computation("plus")
listOfHistory();
}); 

addExpenseBtn.addEventListener("click" , function(){
computation("minus")
listOfHistory()
}); 

const savedHistory = localStorage.getItem("historyKey");
if (savedHistory) {
history = JSON.parse(savedHistory);
listOfHistory();
updateBalance();
};


 
// 
// добавлять новые категории 
// добавить кнопку для удаление инфы с массива 
// сделать фильтр по дате  
// UX сделать более удобным 
// push уведомления
// 
