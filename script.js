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
})