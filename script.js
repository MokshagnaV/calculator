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
let a,b, oper;
/* -------------------------------clear & del functions----------------------------------*/
const result = document.querySelector(".result");
const expression = document.querySelector(".expression");


const clear = document.querySelector(".clear");
clear.addEventListener("click", () => {
    result.textContent = "";
    expression.textContent = "";
    [a, b, oper] = [undefined, undefined, undefined];
});
const del = document.querySelector(".del");
del.addEventListener("click", () => {
    let deleted = result.textContent
                    .split("")
                    .slice(0, result.textContent.length - 1)
                    .join("");
    result.textContent = deleted;
});

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
    result.textContent = number + num;
}

const operators = document.querySelectorAll(".operator");
operators.forEach((operator) => {
    operator.addEventListener("click", (e) => {
        const op = e.target.textContent;
        console.log(op)
        operatorEvent(op);
    })
})
const operatorEvent = (op) =>{
    const num = result.textContent;
    result.textContent = "";
    if(!a){
        a = num
        oper = op
    }
    else{
        b = num
    }
    if(b){
        result.textContent = operate(op, a, b);
    }
    console.log(a,b);
}
const eq = document.querySelector(".equals");
eq.addEventListener("click", (e) => {
    if(!b){
        if(result.textContent !== ""){
            b = result.textContent;
        }else{
            return;
        }
    }
    const temp = e.target.textContent;
    console.log(a,b,oper);
    a = operate(oper, a, b);
    result.textContent = a;
})

window.addEventListener("keydown", (e) => {
    if(e.key in [...numbers].map((x)=>x.textContent)){
        numberEvent(e.key);
    }
    else if(e.key in [...operators].map((x)=>x.textContent)){
        console.log("egijlagjligjea");
    }
    else if(e.key === "Backspace")
        
    console.log(e.key)
        // console.log([...operators].map((x)=>x.textContent));
})
