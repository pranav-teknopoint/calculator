darkmode = window.matchMedia("(prefers-color-scheme: dark)").matches;
Array.prototype.operand = function () {
  let solved = this;
  for (let i = 0; i < this.length; i++) {
    if (this[i] === "^") {
      solved[i] = (+this[i - 1]) ** +this[i + 1];
      solved.splice(i - 1, 1);
      solved.splice(i, 1);
    }
  }

  if (solved.includes("^")) {
    for (let i = 0; i < solved.length; i++) {
      if (this[i] === "^") {
        solved[i] = (+this[i - 1]) ** +this[i + 1];
        solved.splice(i - 1, 1);
        solved.splice(i, 1);
      }
    }
  }
  return solved;
};

Array.prototype.divide = function () {
  let solved = this;
  for (let i = 0; i < this.length; i++) {
    if (this[i] === "/") {
      solved[i] = +this[i - 1] / +this[i + 1];
      solved.splice(i - 1, 1);
      solved.splice(i, 1);
    }
  }

  if (solved.includes("/")) {
    for (let i = 0; i < solved.length; i++) {
      if (this[i] === "*") {
        solved[i] = +solved[i - 1] / +solved[i + 1];
        solved.splice(i - 1, 1);
        solved.splice(i, 1);
      }
    }
  }
  return solved;
};

Array.prototype.multiply = function () {
  let solved = this;
  for (let i = 0; i < this.length; i++) {
    if (this[i] === "*") {
      solved[i] = +this[i - 1] * +this[i + 1];
      solved.splice(i - 1, 1);
      solved.splice(i, 1);
    }
  }
  if (solved.includes("*")) {
    for (let i = 0; i < solved.length; i++) {
      if (this[i] === "*") {
        solved[i] = +solved[i - 1] * +solved[i + 1];
        solved.splice(i - 1, 1);
        solved.splice(i, 1);
      }
    }
  }
  return solved;
};

Array.prototype.addition = function () {
  let solved = this;
  for (let i = 0; i < this.length; i++) {
    if (this[i] === "+") {
      solved[i] = +this[i - 1] + +this[i + 1];
      solved.splice(i - 1, 1);
      solved.splice(i, 1);
    }
  }

  if (solved.includes("+")) {
    for (let i = 0; i < solved.length; i++) {
      if (this[i] === "*") {
        solved[i] = +solved[i - 1] + +solved[i + 1];
        solved.splice(i - 1, 1);
        solved.splice(i, 1);
      }
    }
  }
  return solved;
};

Array.prototype.subtract = function () {
  let solved = this;
  for (let i = 0; i < this.length; i++) {
    if (this[i] === "-") {
      solved[i] = +this[i - 1] - +this[i + 1];
      solved.splice(i - 1, 1);
      solved.splice(i, 1);
    }
  }

  if (solved.includes("-")) {
    for (let i = 0; i < solved.length; i++) {
      if (this[i] === "*") {
        solved[i] = +solved[i - 1] - +solved[i + 1];
        solved.splice(i - 1, 1);
        solved.splice(i, 1);
      }
    }
  }
  return solved;
};

Array.prototype.odmas = function () {
  solved = this.operand().divide().multiply().addition().subtract();
  return solved;
};

function bracketsolve(str) {
  extract = str.match(/\((.*?)\)/g).map((str) => str.slice(1, -1));
  newstring = extract.toString();
  arr = newstring.split("");
  joindigits(arr);
  arr.odmas();
  arr.forEach((element, ind) => {
    if (element == ",") {
      arr.splice(ind, 1);
    }
  });

  function replace(str, arr1, arr2) {
    arr1.forEach((element, ind) => {
      str = str.replace("(" + element + ")", "(" + arr2[ind] + ")");
    });
    return str.split(/[()]/).join("");
  }

  return replace(str, extract, arr);
}

function joindigits(arr) {
  var regex = new RegExp(/([0-9])/);
  for (let i = 0; i < arr.length; i++) {
    arr.forEach(function (element, ind) {
      if (regex.test(element)) {
        if (regex.test(arr[ind + 1])) {
          arr[ind] = arr[ind] + arr[ind + 1];
          arr.splice(ind + 1, 1);
        }
      }
    });
  }
  arr.forEach(function (element, ind) {
    if (!regex.test(element)) {
      if (arr[ind + 1] == "+" || arr[ind + 1] == "-") {
        arr[ind + 1] = arr[ind + 1] + arr[ind + 2];
        arr.splice(ind + 2, 1);
      }
    }
  });
  return arr;
}

function calculator(str) {
  nospace = str.replace(/\s+/g, "");
  if (nospace.split("").includes("(")) {
    newstr = bracketsolve(nospace);
  } else {
    newstr = nospace;
  }
  solve = joindigits(newstr.split(""));
  for (let i = 0; i <= solve.length; i++) {
    if (solve.length != 1) {
      solve.odmas();
    }
  }
  return +solve;
}

document.getElementById("one").addEventListener("click", function () {
  document.getElementById("inputtext").value += "1";
});
document.getElementById("two").addEventListener("click", function () {
  document.getElementById("inputtext").value += "2";
});
document.getElementById("three").addEventListener("click", function () {
  document.getElementById("inputtext").value += "3";
});
document.getElementById("four").addEventListener("click", function () {
  document.getElementById("inputtext").value += "4";
});
document.getElementById("five").addEventListener("click", function () {
  document.getElementById("inputtext").value += "5";
});
document.getElementById("six").addEventListener("click", function () {
  document.getElementById("inputtext").value += "6";
});
document.getElementById("seven").addEventListener("click", function () {
  document.getElementById("inputtext").value += "7";
});
document.getElementById("eight").addEventListener("click", function () {
  document.getElementById("inputtext").value += "8";
});
document.getElementById("nine").addEventListener("click", function () {
  document.getElementById("inputtext").value += "9";
});
document.getElementById("zero").addEventListener("click", function () {
  document.getElementById("inputtext").value += "0";
});
document.getElementById("plus").addEventListener("click", function () {
  document.getElementById("inputtext").value += "+";
});
document.getElementById("subtract").addEventListener("click", function () {
  document.getElementById("inputtext").value += "-";
});
document.getElementById("multiply").addEventListener("click", function () {
  document.getElementById("inputtext").value += "*";
});
document.getElementById("divide").addEventListener("click", function () {
  document.getElementById("inputtext").value += "/";
});
document.getElementById("operand").addEventListener("click", function () {
    document.getElementById("inputtext").value += "^";
  });
document.getElementById("backspace").addEventListener("click", function () {
  document.getElementById("inputtext").value = document
    .getElementById("inputtext")
    .value.substring(0, document.getElementById("inputtext").value.length - 1);
});
document.getElementById("clear").addEventListener("click", function () {
  document.getElementById("inputtext").value = "";
});

document.getElementById("inputtext").addEventListener("keydown", function (e) {
  if (
    isNaN(e.key) &&
    e.key !== "Backspace" &&
    e.key !== "(" &&
    e.key !== ")" &&
    e.key !== "^" &&
    e.key !== "/" &&
    e.key !== "*" &&
    e.key !== "+" &&
    e.key !== "-"
  ) {
    e.preventDefault();
  }
});

document.getElementById("calculate").addEventListener("click", function () {
  document.getElementById("inputtext").value = calculator(
    document.getElementById("inputtext").value
  );
});

document.body.addEventListener("keydown", function (e) {
  if (e.key == "Enter") {
    document.getElementById("inputtext").value = calculator(
      document.getElementById("inputtext").value
    );
  }
});

if (!darkmode) {
  document.getElementById("inputtext").classList.toggle("light");
  document.querySelector(".container").classList.toggle("light");
  document.body.classList.toggle("light");
}

document.body.addEventListener("keydown", function (e) {
  if (e.key == "d") {
    document.getElementById("inputtext").classList.toggle("light");
    document.querySelector(".container").classList.toggle("light");
    document.body.classList.toggle("light");
  }
});
document.getElementById("darkmode").addEventListener("click", function () {
    document.getElementById("inputtext").classList.toggle("light");
    document.querySelector(".container").classList.toggle("light");
    document.body.classList.toggle("light");
});
