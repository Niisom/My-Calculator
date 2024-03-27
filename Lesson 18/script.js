window.addEventListener("DOMContentLoaded", function () {
  const displayAnswer = document.querySelector(".displayAnswer");
  const displayString = document.querySelector(".displayString");
  const clearBtn = document.querySelector("#clear");
  const equalsBtn = document.querySelector("#equals");
  const delBtn = document.querySelector("#del");
  const numBtns = document.querySelectorAll(".num");
  const operationBtns = document.querySelectorAll(".operation");

  console.log(clearBtn)

  let currentOperand = "";
  let previousOperand = "";
  let operation = "";
  function clear() {
    currentOperand = "";
    previousOperand = "";
    operation = "";
  }
  function deleteNumber() {
    currentOperand = currentOperand.toString().slice(0, -1);
  }
  function appendNumber(number) {
    if (number === "." && currentOperand.includes(".")) return;
    currentOperand += number;
  }
  function chooseOperation(op) {
    if (currentOperand === "") return;
    if (previousOperand !== "") {
      compute();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = "";
  }
  function compute() {
    let result;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
      case "+":
        result = prev + current;
        break;
      case "-":
        result = prev - current;
        break;
      case "*":
        result = prev * current;
        break;
      case "/":
        result = prev / current;
        break;
      default:
        return;
    }
    currentOperand = result;
    previousOperand = "";
    operation = "";
  }
  function updateDisplay() {
    displayAnswer.textContent = currentOperand;
    if (operation != null) {
      displayString.textContent = `${previousOperand} ${operation}`;
    }
  }
  numBtns.forEach(function (numBtn) {
    numBtn.addEventListener("click", function () {
      appendNumber(numBtn.id);
      updateDisplay();
    });
  });
  operationBtns.forEach(function(operationBtn){
    operationBtn.addEventListener('click',function(){
      chooseOperation(operationBtn.id)
      updateDisplay();
    })
  })
  equalsBtn.addEventListener("click", function () {
    compute();
    updateDisplay();
  });
  clearBtn.addEventListener("click", function () {
    clear();
    updateDisplay();
  });
  delBtn.addEventListener("click", function () {
    deleteNumber();
    updateDisplay();
  });

});