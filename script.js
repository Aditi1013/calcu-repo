window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.getElementById("landing").style.display = "none";
    document.getElementById("calculator").classList.remove("hidden");
    document.getElementById("modeToggle").classList.remove("hidden");
  }, 3000);
});

const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
const toggleMode = document.getElementById("toggle-mode");
let dark = false;


function calculateExpression(expr) {
  try {
    expr = expr.replace(/π/g, "Math.PI")
               .replace(/e/g, "Math.E")
               .replace(/log/g, "Math.log10")
               .replace(/ln/g, "Math.log")
               .replace(/%/g, "*0.01")
               .replace(/\^/g, "**");

    
    expr = expr.replace(/√(\d+(\.\d+)?|\([^)]+\)|π|e)/g, (match, g) => `Math.sqrt(${g})`);

    
    if (/[^0-9\+\-\*\/\.\(\)MathsqrtlogPIE% ]/.test(expr)) return "Error";

    return eval(expr);
  } catch {
    return "Error";
  }
}


buttons.forEach(btn => {
  if (btn.id !== "toggle-mode") {
    btn.addEventListener("click", () => {
      const val = btn.textContent;

      if (val === "AC") {
        display.value = "";
      } else if (val === "DEL") {
        display.value = display.value.slice(0, -1);
      } else if (val === "=") {
        display.value = calculateExpression(display.value);
      } else {
        display.value += val;
      }
    });
  }
});


document.addEventListener("keydown", (e) => {
  if (e.key.match(/[0-9+\-*/().%^]/)) {
    display.value += e.key;
  } else if (e.key === "Enter") {
    e.preventDefault();
    display.value = calculateExpression(display.value);
  } else if (e.key === "Backspace") {
    display.value = display.value.slice(0, -1);
  }
});


toggleMode.addEventListener("click", () => {
  dark = !dark;
  document.body.classList.toggle("dark-mode", dark);
});
