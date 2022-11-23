/* --------------------------------required functions------------------------------------*/
const add = (a, b) => Number(a) + Number(b);
const sub = (a, b) => Number(a) - Number(b);
const mul = (a, b) => Number(a) * Number(b);
const div = (a, b) => Number(a) / Number(b);

const operate = (op, a, b) => {
    switch(op){
        case '+' : return add(a, b);
        case '-' : return sub(a, b);
        case '*' : return mul(a, b);
        case '/' : return div(a, b);
    }
}
let a,b, gOper, op;
/* -------------------------------clear & del functions----------------------------------*/
const result = document.querySelector(".result");
const expression = document.querySelector(".expression");


const clear = document.querySelector(".clear");
clear.addEventListener("click", () => {
    result.textContent = "";
    expression.textContent = "";
    [a, b, gOper] = [undefined, undefined, undefined];
});
const del = document.querySelector(".del");
del.addEventListener("click", () => {
    delOp();
});

const delOp = () => {
    let deleted = result.textContent
                    .split("")
                    .slice(0, result.textContent.length - 1)
                    .join("");
    result.textContent = deleted;
}
/* -----------------------------------numbers & operators ------------------------------------*/
const numbers = document.querySelectorAll(".number");
numbers.forEach((number) => {
    number.addEventListener("click", (e) => {
        const num = e.target.textContent;
        numberEvent(num);
    })
})
const numberEvent = (num) =>{
    const number = result.textContent
    if(number.length >= 9){
        return;
    }
    result.textContent = number + num;
}

const operators = document.querySelectorAll(".operator");
operators.forEach((operator) => {
    operator.addEventListener("click", (e) => {
        op = e.target.textContent;
        operatorEvent(op);
    })
})
const operatorEvent = (op) =>{
    const num = result.textContent;
    if(expression.textContent === "" && result.textContent === ""){
        return
    }
    else if(expression.textContent !== "" && result.textContent === ""){
        gOper  = op;
        expression.textContent = `${expression.textContent.slice(0, expression.textContent.length - 2)} ${op}`;
        return;
    }
    else if(expression.textContent === "" && result.textContent !== ""){
        expression.textContent = num + ` ${op}`;
        a = num;
        gOper = op;
        result.textContent = "";
    }
    else{
        b = result.textContent;
        a = operate(gOper, a, b);
        gOper = op
        b = undefined;
        expression.textContent = a + ` ${op}`;
        result.textContent = "";

    }
}
const eq = document.querySelector(".equals");
eq.addEventListener("click", (e) => {
    eqOp();
})
const eqOp = () =>{
    if(result.textContent !== ""){
        b = result.textContent;
    }else{
        result.textContent = expression.textContent.slice(0, expression.textContent.length - 2);
        expression.textContent = "";
        return;
    }
    a = operate(gOper, a, b);
    result.textContent = a;
    expression.textContent = "";
}

/*--------------------------------  Keyboard Functions ---------------------------------*/
window.addEventListener("keydown", (e) => {
    if(e.key in [...numbers].map((x)=>x.textContent)){
        numberEvent(e.key);
    }
    else if([...operators].map((x) => x.textContent).includes(e.key)){
        operatorEvent(e.key);
    }
    else if(e.key === "Backspace" || e.key == "Delete"){
        delOp();
    }
    else if(e.key === "=" || e.key === "Enter"){
        eqOp()
    }
    console.log(e.key);
})
