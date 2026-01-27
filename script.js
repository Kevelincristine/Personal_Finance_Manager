const btn = document.querySelector("#start-btn");

const Startscreen = document.querySelector(".start-screen");
const App = document.querySelector(".app-hidden");

const nameInput = document.querySelector("#name-input");
const balanceInput = document.querySelector("#initial-balance");

const usernamespan = document.querySelector("#user-name");
const balancespan = document.querySelector("#balance");

btn.addEventListener("click",()=>{
  let name = nameInput.value.trim();
  let balance = balanceInput.value.trim();

  if( name !== "" && balance !== ""){
    localStorage.setItem("userName", name);
    localStorage.setItem("balance",balance);

    usernamespan.textContent = name;
    balancespan.textContent = balance;

    Startscreen.style.display = "none";
    App.style.display = "block";

  } else {
    alert("Please fill in all fields!")
  }
});

window.addEventListener("load",()=>{
    const savedName = localStorage.getItem("userName",);
    const savedbalance = localStorage.getItem("balance");
    if ( savedName && savedbalance){
        document.querySelector(".start-screen").style.display = "none";
        document.querySelector(".app-hidden").style.display = "block";

        document.querySelector("#user-name").textContent = savedName;
        document.querySelector("#balance").textContent = savedbalance;
    }
  renderHistory();
})

const tranValue = document.querySelector("#transaction-value");
const tranType = document.querySelector("#transaction-type");
const tranCategory = document.querySelector("#transaction-category");
const addBtn = document.querySelector("#add-transaction") ;
let updatedBalance;



addBtn.addEventListener("click",()=>{
  const value = tranValue.value;
  const type = tranType.value;
  const category = tranCategory.value;
  if ( value.trim() === "" || type.trim() === "" || category.trim()=== ""){
    alert("type something first");
    return;
  } else {
     const valueNumber = Number(value);
     const currentBalance = Number(localStorage.getItem("balance") || 0);

    if ( type === "income"){
       updatedBalance = currentBalance + valueNumber;
    } else {
      updatedBalance = currentBalance - valueNumber;
    }
    localStorage.setItem("balance", updatedBalance);
    balancespan.textContent = updatedBalance;


   const now = new Date();
   const date = now.toLocaleDateString("pt-BR");
   const time= now.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
   });

   const transactions = JSON.parse(localStorage.getItem("transactions"))  || [];

  const newTransaction = {
    value: valueNumber,
    type,
    category,
    date,
    time
  };
  transactions.push(newTransaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  renderHistory();
  }
  
  });

  function renderHistory(){
    const history = document.querySelector("#history");
    history.innerHTML = "";

    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions.forEach(item => {
      const li = document.createElement("li");
      li.textContent =  `${item.date} ${item.time} | ${item.category} | ${item.type} | $ ${item.value}`;
      history.appendChild(li);
    });
  }
  function calculateBalance(){
      const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
      let balance = 0;

      transactions.forEach(item =>{
        if (item.type === "income"){
          balance += item.value;
        } else {
          balance -= item.value;
        }
      });
       


  }