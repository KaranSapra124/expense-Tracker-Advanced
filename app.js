const expName = document.getElementById("expName");
const expAmount = document.getElementById("expAmount");
const btn = document.getElementById("btn");
const expBox = document.getElementById("expBox");
const expArr = [];

// CRUD

// CREATE
btn.addEventListener("click", function () {
  const expObj = {
    expName: expName.value,
    expAmount: expAmount.value,
  };

  if (localStorage.getItem("expArr")) {
    const parsedArr = JSON.parse(localStorage.getItem("expArr"));
    parsedArr.push(expObj);
    localStorage.setItem("expArr", JSON.stringify(parsedArr));
    displayExpense(parsedArr);
  } else {
    expArr.push(expObj);
    localStorage.setItem("expArr", JSON.stringify(expArr));
    displayExpense(expArr);
  }
  //   expArr.push(expObj);
});

// READ
function displayExpense(arr) {
  expBox.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    expBox.innerHTML += `
    <div>
    Expense Name:<span class="font-bold">${arr[i].expName}</span>
    <br>
    Expense Amount:<span class="font-bold">${arr[i].expAmount}</span>
    <i class="fa-solid fa-pen-to-square" onclick=update(${i})></i>
    <i class="fa-solid fa-trash" onclick=Delete(${i})></i>
    </div>
    `;
  }

  expName.value = "";
  expAmount.value = "";
}
window.addEventListener("load", function () {
  if (localStorage.getItem("expArr")) {
    const parsedArr = JSON.parse(localStorage.getItem("expArr"));
    displayExpense(parsedArr);
  } else {
    expBox.innerHTML = "Add some expenses , spend something , dont be a miser!";
  }
});

// UPDATE
function update(i) {
  let updatedExpName = prompt("Enter the updated name...", expArr[i].expName);
  let updatedExpAmount = prompt(
    "Enter the updated amount...",
    expArr[i].expAmount
  );
  const newObj = {
    expName: updatedExpName,
    expAmount: updatedExpAmount,
  };
  expArr.splice(i, 1, newObj);
  displayExpense(expArr);
}

// DELETE
function Delete(i) {
  expArr.splice(i, 1);
  displayExpense(expArr);
}
