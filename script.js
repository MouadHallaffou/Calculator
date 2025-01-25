document.addEventListener("DOMContentLoaded", function () {
    const displayTop = document.getElementById("displayTop");
    const displayBottom = document.getElementById("displayBottom");
    const buttons = document.querySelectorAll("button");

    let currentInput = "";
    let operator = null;
    let previousInput = "";

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const buttonText = button.querySelector("div").textContent.trim();

            if (!isNaN(buttonText) || buttonText === ".") {
                currentInput += buttonText;
                updateDisplay();
            } else if (["+", "-", "×", "÷", "%"].includes(buttonText)) {
                if (currentInput === "") return;
                if (previousInput !== "") calculate();
                operator = buttonText;
                previousInput = currentInput;
                currentInput = "";
                updateDisplay();
            } else if (buttonText === "=") {
                if (currentInput === "" || previousInput === "") return;
                calculate();
                operator = null;
                previousInput = "";
                updateDisplay();
            } else if (buttonText === "C") {
                currentInput = "";
                previousInput = "";
                operator = null;
                updateDisplay();
            }
        });
    });

    function updateDisplay() {
        displayTop.textContent = `${previousInput} ${operator || ""} ${currentInput}`;
        displayBottom.textContent = currentInput || "0";
    }

    function calculate() {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        if (isNaN(prev) || isNaN(current)) return;

        switch (operator) {
            case "+":
                result = prev + current;
                break;
            case "-":
                result = prev - current;
                break;
            case "×":
                result = prev * current;
                break;
            case "÷":
                result = prev / current;
                break;
            case "%":
                result = prev % current;
                break;
            default:
                return;
        }

        currentInput = result.toString();
        previousInput = "";
        operator = null;
    }
});