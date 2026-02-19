const Plus_Number = document.querySelector("#plus");
const Minus_Number = document.querySelector("#minuc");
const Balance_User = document.querySelector("#balance"); 
const Amount = document.querySelector("#amount");
const Categories = document.querySelector("#categories");

const All_expenses_Create = document.querySelector("#CreateAll_expenses")
const All_income_Create = document.querySelector("#CreateAll_income")

const All_expenses = document.querySelector("#All_expenses")
const All_income = document.querySelector("#All_income")

let Balance = 0;
let History = [];

Plus_Number.addEventListener("click", function(){
if(Amount.value > 0) {
Balance = Balance + Number(Amount.value);
Balance_User.textContent = Balance
const now = new Date();
History.push({
  type: "plus",
  amount: Number(Amount.value),
  category: Categories.value,
  time: now
});
}; });

Minus_Number.addEventListener("click" , function(){
if(Amount.value > 0){
Balance = Balance - Number(Amount.value);
Balance_User.textContent = Balance
const now = new Date();
History.push({
  type: "minus",
  amount: Number(Amount.value),
  category: Categories.value,
  time: now
});
}; });


All_expenses.addEventListener("click" , function(){
All_expenses_Create.innerHTML = "";

History.forEach(item => {
if(item.type === "plus"){
const div = document.createElement("div");
div.textContent =  `Дохід | ${item.amount} грн | ${item.category}`;
All_expenses_Create.append(div);
};
});
});

All_income.addEventListener("click" , function(){
All_income_Create.innerHTML = "";

  History.forEach(item => {
  if(item.type === "minus"){
  const div = document.createElement("div");
  div.textContent =  `Розхід | ${item.amount} грн | ${item.category}`;
  CreateAll_income.append(div);
  }
});
});
 
// 
// сохранить в localStorage
// сделать фильтр по дате  
// UX сделать более удобным 
// 
