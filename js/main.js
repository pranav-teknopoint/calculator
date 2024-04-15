darkmode = window.matchMedia("(prefers-color-scheme: dark)").matches;
Array.prototype.operand = function () {
  let solved = this;
  for (let i = 0; i < this.length; i++) {
    if (this[i] === "^") {
      solved[i] = (+this[i - 1]) ** +this[i + 1];
      solved.splice(i - 1, 1);
      solved.splice(i, 1);
      i--;
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
      i--;
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
      i--;
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
      i--;
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
      i--;
    }
  }
  return solved;
};

Array.prototype.percentage = function () {
  let solved = this;
  for (let i = 0; i < this.length; i++) {
    if (this[i] === "%") {
      if (isNaN(+this[i + 1])) {
        this[i + 1] = 1;
      }
      solved[i] = (+this[i - 1] / 100) * +this[i + 1];
      solved.splice(i - 1, 1);
      solved.splice(i, 1);
      i--;
    }
  }
  return solved;
};

Array.prototype.sqrt = function () {
  let solved = this;
  for (let i = 0; i < this.length; i++) {
    if (this[i] === "√") {
      solved[i] = Math.sqrt(+this[i + 1]);
      solved.splice(i + 1, 1);
      i--;
    }
  }
  return solved;
};

Array.prototype.odmas = function () {
  solved = this.percentage()
    .sqrt()
    .operand()
    .divide()
    .multiply()
    .addition()
    .subtract();
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
      str = str.replace("(" + element + ")", "*(" + arr2[ind] + ")*");
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
        if (regex.test(arr[ind + 1]) || arr[ind + 1] == ".") {
          arr[ind] = arr[ind] + arr[ind + 1];
          arr.splice(ind + 1, 1);
        }
      } else {
        // if (element == "s" && arr[ind + 1] == "i" && arr[ind + 2] == "n") {
        //   arr[ind] = "sin";
        //   arr.splice(ind + 1, 2);
        // }
        // if (
        //   element == "c" &&
        //   arr[ind + 1] == "o" &&
        //   arr[ind + 2] == "s" &&
        //   arr[ind + 3] !== "e"
        // ) {
        //   arr[ind] = "cos";
        //   arr.splice(ind + 1, 2);
        // }
        // if (element == "t" && arr[ind + 1] == "a" && arr[ind + 2] == "n") {
        //   arr[ind] = "tan";
        //   arr.splice(ind + 1, 2);
        // }
        // if (element == "c" && arr[ind + 1] == "o" && arr[ind + 2] == "t") {
        //   arr[ind] = "cot";
        //   arr.splice(ind + 1, 2);
        // }
        // if (element == "s" && arr[ind + 1] == "e" && arr[ind + 2] == "c") {
        //   arr[ind] = "sec";
        //   arr.splice(ind + 1, 2);
        // }
        // if (
        //   element == "c" &&
        //   arr[ind + 1] == "o" &&
        //   arr[ind + 2] == "s" &&
        //   arr[ind + 3] == "e" &&
        //   arr[ind + 4] == "c"
        // ) {
        //   arr[ind] = "cosec";
        //   arr.splice(ind + 1, 4);
        // }
        if (element == "*") {
          if (!regex.test(arr[ind + 1])) {
            element = arr[ind + 1];
            arr.splice(ind, 1);
          } else if (!regex.test(arr[ind - 1])) {
            element = arr[ind - 1];
            arr.splice(ind, 1);
          }
        }
        if (arr[ind + 1] == "+" || arr[ind + 1] == "-" || arr[ind + 1] == ".") {
          arr[ind + 1] = arr[ind + 1] + arr[ind + 2];
          arr.splice(ind + 2, 1);
        }
        if (element == ".") {
          arr[ind] = arr[ind] + arr[ind + 1];
          arr.splice(ind + 1, 1);
        }
        if (arr[0] == "+" || arr[0] == "-") {
          arr[ind] = arr[ind] + arr[ind + 1];
          arr.splice(ind + 1, 1);
        }
      }
    });
  }
  return arr;
}

// function trignometry(arr) {
//   let ans = "0";
//   arr.forEach(function (e, i) {
//     if (e == "sin") {
//       if (arr[i + 1] == "0") {
//         ans = "0";
//       } else if (arr[i + 1] == "30") {
//         ans = "1/2";
//       } else if (arr[i + 1] == "45") {
//         ans = "1/√2";
//       } else if (arr[i + 1] == "60") {
//         ans = "√3/2";
//       } else if (arr[i + 1] == "90") {
//         ans = "1";
//       } else if (!isNaN(arr[i + 1])) {
//         ans = Math.sin(+arr[i + 1]);
//       }
//     }
//     if (e == "cos") {
//       if (arr[i + 1] == "0") {
//         ans = "1";
//       } else if (arr[i + 1] == "30") {
//         ans = "√3/2";
//       } else if (arr[i + 1] == "45") {
//         ans = "1/√2";
//       } else if (arr[i + 1] == "60") {
//         ans = "1/2";
//       } else if (arr[i + 1] == "90") {
//         ans = "0";
//       } else if (!isNaN(arr[i + 1])) {
//         ans = Math.cos(+arr[i + 1]);
//       }
//     }
//     if (e == "tan") {
//       if (arr[i + 1] == "0") {
//         ans = "0";
//       } else if (arr[i + 1] == "30") {
//         ans = "1/√3";
//       } else if (arr[i + 1] == "45") {
//         ans = "1";
//       } else if (arr[i + 1] == "60") {
//         ans = "√3";
//       } else if (arr[i + 1] == "90") {
//         ans = "Infinity";
//       } else if (!isNaN(arr[i + 1])) {
//         ans = Math.tan(+arr[i + 1]);
//       }
//     }
//     if (e == "cot") {
//       if (arr[i + 1] == "0") {
//         ans = "Infinity";
//       } else if (arr[i + 1] == "30") {
//         ans = "√3";
//       } else if (arr[i + 1] == "45") {
//         ans = "1";
//       } else if (arr[i + 1] == "60") {
//         ans = "1/√3";
//       } else if (arr[i + 1] == "90") {
//         ans = "0";
//       } else if (!isNaN(arr[i + 1])) {
//         ans = 1 / Math.tan(+arr[i + 1]);
//       }
//     }
//     if (e == "sec") {
//       if (arr[i + 1] == "0") {
//         ans = "1";
//       } else if (arr[i + 1] == "30") {
//         ans = "2/√3";
//       } else if (arr[i + 1] == "45") {
//         ans = "	√2";
//       } else if (arr[i + 1] == "60") {
//         ans = "2";
//       } else if (arr[i + 1] == "90") {
//         ans = "infinity";
//       } else if (!isNaN(arr[i + 1])) {
//         ans = 1 / Math.cos(+arr[i + 1]);
//       }
//     }
//     if (e == "cosec") {
//       if (arr[i + 1] == "0") {
//         ans = "Infinity";
//       } else if (arr[i + 1] == "30") {
//         ans = "2";
//       } else if (arr[i + 1] == "45") {
//         ans = "	√2";
//       } else if (arr[i + 1] == "60") {
//         ans = "2/√3";
//       } else if (arr[i + 1] == "90") {
//         ans = "1";
//       } else if (!isNaN(arr[i + 1])) {
//         ans = 1 / Math.sin(+arr[i + 1]);
//       }
//     }
//   });
//   if (isNaN(ans)) {
//     return ans.split("");
//   } else {
//     return ans;
//   }
// }

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
  if (isNaN(+solve)) {
    return "Error";
  } else {
    return +solve;
  }
}

window.onload = function () {
  document.getElementById("inputtext").focus();
};

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
document.getElementById("point").addEventListener("click", function () {
  document.getElementById("inputtext").value += ".";
});
document.getElementById("percentage").addEventListener("click", function () {
  document.getElementById("inputtext").value += "%";
});
document.getElementById("brackets").addEventListener("click", function () {
  if (document.getElementById("inputtext").value.split("").includes("(")) {
    document.getElementById("inputtext").value += ")";
  } else {
    document.getElementById("inputtext").value += "(";
  }
});
document.getElementById("backspace").addEventListener("click", function () {
  document.getElementById("inputtext").value = document
    .getElementById("inputtext")
    .value.substring(0, document.getElementById("inputtext").value.length - 1);
});
document.getElementById("clear").addEventListener("click", function () {
  document.getElementById("inputtext").value = "";
});
document.body.addEventListener("keydown", function (e) {
  if (e.key == "Delete") {
    document.getElementById("inputtext").value = "";
  }
});

document.getElementById("inputtext").addEventListener("keydown", function (e) {
  const KeysRegex =
    /^[0-9()+\-\/*^%.\.,]|Backspace|ArrowLeft|ArrowRight$/;
  if (!KeysRegex.test(e.key)) {
    e.preventDefault();
  }
});


document.getElementById("calculate").addEventListener("click", function () {
  input = document.getElementById("inputtext").value;
  document.getElementById("inputtext").value = calculator(
    document.getElementById("inputtext").value
  );
  solved = document.getElementById("inputtext").value;
  document.getElementById("history_head").innerHTML = `<h2>History</h2>`;
  document.getElementById("history_data").innerHTML += `
        <p class="history_input">${input}</p>
        <p class="history_solved">${solved}</p>
        `;
  document.getElementById("clearhistory").innerHTML = `
        <div id="clear_history">
        <p>Clear</p>
        </div>`;
  document
    .getElementById("clear_history")
    .addEventListener("click", function () {
      document.getElementById("history").innerHTML = `
      <div id="history_head"></div>
          <div id="clearhistory"></div>
      </div> `;
    });
});

document.body.addEventListener("keydown", function (e) {
  if (e.key == "Enter") {
    input = document.getElementById("inputtext").value;
    document.getElementById("inputtext").value = calculator(
      document.getElementById("inputtext").value
    );
    solved = document.getElementById("inputtext").value;
    document.getElementById("history_data").innerHTML += `
        <p class="history_input">${input}</p>
        <p class="history_solved">${solved}</p>
        `;
    document.getElementById("clearhistory").innerHTML = `
        <div id="clear_history">
        <p>Clear</p>
        </div>`;
    document
      .getElementById("clear_history")
      .addEventListener("click", function () {
        document.getElementById("history_data").innerHTML = ``;
      });
  }
});

document.getElementById("showhistory").addEventListener("click", function () {
  if (document.getElementById("history").classList.contains("show")) {
    document.getElementById("history").classList.remove("show");
    document.getElementById("showhistory").innerHTML = `<p>Show History</p>`;
  } else {
    document.getElementById("history").classList.add("show");
    document.getElementById("showhistory").innerHTML = `<p>Hide History</p>`;
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
