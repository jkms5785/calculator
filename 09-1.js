const num = document.querySelectorAll(".js-num"),
    ftn = document.querySelectorAll(".js-ftn"),
    result = document.querySelector("#js-result"),
    reset = document.querySelector("#js-reset");

let i = 0;
let defaultNum_1 = false;
let calculating = false;
let calc = "";
let SUM = "";
let compareNum = "";
let saveNum = "";
let generateFormula = false;

function resetNum() {
    result.innerHTML = "0";
    defaultNum_1 = false;
    calculating = false;
    value = 0;
    calc = "";
}

function calculateNum() {
    SUM = eval(calc); 
    result.innerHTML = SUM;
    calc = "";
}

function saveValue(c) {
    if(!saveNum){
        saveNum = c;
    }
}

function makeCalcFormula(a) {
    if (calc === "") {
        calc += result.innerHTML; 
    }
    saveValue(calc);  
    let length = calc.length;
    if (calc[length - 1] === "+" || calc[length - 1] === "-" || calc[length - 1] === "*" || calc[length - 1] === "/") {
        // console.log("The expression is wrong");
    } else {
        calc += a;
    }
}

function makeCalcNum(a) {
    calc += a;
    if (saveNum === result.innerHTML) {
        console.log(calc)
        calculateNum();
    }
}

function formula(e) {
    if (generateFormula === true) {
        let currentFormula = e.target.innerHTML; 
        if (currentFormula !== "=") { // +, -, *
            calculating = true;
            makeCalcFormula(currentFormula); 
        } else {
            if (result.innerHTML === "0" || calc === "") {
                calc = "";
            } else {
                defaultNum_1 = false;
                calculating = false;
                calculateNum();
            }
        }
    }
}

function makeNum(e) {
    generateFormula = true;
    let currentNum = e.target.innerHTML; 
    if (!defaultNum_1) { // 초기값 
        if (currentNum === "0") { 
            result.innerHTML = "0"; 
        } else { // 0 이 아니면 
            result.innerHTML = ""; 
            result.innerHTML += currentNum; 
            defaultNum_1 = true; 
            makeCalcNum(currentNum);
        }
    } else {
        if (!calculating) { // 계산중이 아닐때
            result.innerHTML += currentNum;
            makeCalcNum(currentNum);
        } else { // 계산중일 때
            if (currentNum === "0") {
                result.innerHTML = "0";
                makeCalcNum(currentNum);
            } else {
                result.innerHTML = "";
                result.innerHTML += currentNum;
                calculating = false;
                makeCalcNum(currentNum);
            }
        }
    }
}

function init() {
    for (i = 0; i < num.length; i++) {
        num[i].addEventListener("click", makeNum);
    }

    for (i = 0; i < ftn.length; i++) {
        ftn[i].addEventListener("click", formula);
    }

    reset.addEventListener("click", resetNum);
}

init();