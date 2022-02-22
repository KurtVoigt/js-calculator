//equation class, class for evaluating expressions typed into HTML document
let equation = class{

    //expression will hold an equation to be evaluated as it is being typed in i.e 2*3+5
    constructor(expr){
        this.expression = [];
        this.operators = ["+", "-", "*", "/", "=", "!", "+-", "^"];
    }

    isOperator(toEval){
        return this.operators.includes(toEval);
    }

    lastIsOperand(){
        return this.isOperator(this.expression[this.expression.length-1]);
    }

    //every click of an operator will call this function, appending the 
    appendToExpression(numOrOperator){
        if(numOrOperator === "!"){
            this.expression.push(numOrOperator);
            //placeholder string for factorials as an expression needs two "sides"
            this.expression.push("factorialString");
        }
        else{
            this.expression.push(numOrOperator);
        }
    }

    popFromExpression(){
        this.expression.pop();
    }
    //removes recently evaluated expression
    reformExpression(found){
           
            this.expression.splice(found-2, 2);
        
    }

    power(base, power){
        return Math.pow(base, power);
    }

    mult(a,b){
        return a*b;
    }

    div(a,b){
        return a/b;
    }

    fact(a){
        let ret = 1;
        if(a == 0){return ret;}
        for(a; a>0; a--){
            ret = ret*a;
        }
        return ret;
    }

    add(a, b){
        return a+b;
    }

    subtract(a,b){
        return a-b;
    }

    //evaluates the expression
    /*In order to enforce order of operations the expression string is 
      run through several loops searching for an operator, when one is found
      it is evaluated and the expression is reformed to have the evaluated sub expression into it
      i.e -> 2+3!*7 -> 2+6*7 -> 2+42 -> 44
    */
    evaluate(){

     //factorial
    for(let i = 0; i < this.expression.length; i++){
        if(this.operators[5] === this.expression[i]){
            this.expression[i+1] = this.fact(this.expression[i-1]);
            //will have to put in a dummy when inserting with a !
            this.reformExpression(i+1);
            i=-1;
        }
    }

    //exponents
    for(let i = 0; i < this.expression.length; i++){
        if(this.operators[7] === this.expression[i]){
            this.expression[i+1] = this.power(this.expression[i-1], this.expression[i+1]);
            this.reformExpression(i+1);
            i=-1;
        }
    }
       
        //multiply/divide
        
   for(let i = 0; i < this.expression.length; i++){
        if(this.operators[2] === this.expression[i] || this.operators[3] === this.expression[i]
        || this.operators[5] === this.expression[i]){
            if(this.operators[2] === this.expression[i]){
               this.expression[i+1]= this.mult(this.expression[i-1], this.expression[i+1]);

                this.reformExpression(i+1);
                i=-1;
            }
            else if(this.operators[3] === this.expression[i]){
                this.expression[i+1] = this.div(this.expression[i-1], this.expression[i+1]);

                this.reformExpression(i+1);
                i=-1;
            }
               
            }    

        }
        

    for(let i = 0; i < this.expression.length; i++){
          if(this.operators[0] === this.expression[i] || this.operators[1] === this.expression[i]){
            if(this.operators[0] === this.expression[i]){
                this.expression[i+1] = this.add(this.expression[i-1], this.expression[i+1]);
                   //found.push(i+1);
                this.reformExpression(i+1);
                i=-1;
                 
            }
            else if(this.operators[1] === this.expression[i]){
                this.expression[i+1] = this.subtract(this.expression[i-1], this.expression[i+1]);
                   //found.push(i+1);
                this.reformExpression(i+1);
                i=-1;
            }
            }    

        }
        
        
        return this.expression[0];
    }

}

function checkNewExpression(newEx){
    if(newEx){
        document.querySelector("#expressionShow").innerText = "";
        document.querySelector("#screen").innerText = "";

    }
}


let myEquation = new equation();

let topScreen = document.querySelector("#expressionShow");
let screen = document.querySelector("#screen");
let backspace = document.querySelector("#backspace");
let clear = document.querySelector("#clear");
let exponent = document.querySelector("#exponent");
let factorial = document.querySelector("#factorial");
let division = document.querySelector("#division");
let multiplication = document.querySelector("#multiplication");
let subtraction = document.querySelector("#subtraction");
let addition = document.querySelector("#addition");
let equals = document.querySelector("#equals");
let nine = document.querySelector("#nine");
let eight = document.querySelector("#eight");
let seven = document.querySelector("#seven");
let six = document.querySelector("#six");
let five = document.querySelector("#five");
let four = document.querySelector("#four");
let three = document.querySelector("#three");
let two = document.querySelector("#two");
let one = document.querySelector("#one");
let zero = document.querySelector("#zero");
let negative = document.querySelector("#negative");
let decimal = document.querySelector("#decimal");
let buffer = ""
let newExpression = false;

decimal.onclick = function(){
    screen.innerHTML += ".";
    buffer += ".";
}

negative.onclick = function(){
    if(screen.innerText === ""){
        return;
    }

    if(buffer[0] === "-"){
        buffer = buffer.substring(1);
        screen.innerText = screen.innerText.substring(1);
        return;
    }
    buffer = "-" + buffer;
    screen.innerText = "-" + screen.innerText;
    return;
    
}

equals.onclick = function(){
    if(buffer == "" && myEquation.expression[myEquation.expression.length-1] != "factorialString"){
        document.querySelector("#warningDiv").innerText = "Please finish the expression with a digit";
        return;
    }
    document.querySelector("#warningDiv").innerText = "";
    myEquation.appendToExpression(parseFloat(buffer));
    screen.innerText = myEquation.evaluate();
    topScreen.innerText = "";
    newExpression = true;
    buffer = screen.innerText;
    myEquation.expression = [];
}

addition.onclick = function(){
   
    if(buffer == ""){
        myEquation.appendToExpression("+");
        screen.innerHTML = "";
        topScreen.innerHTML += "+"
    }
    else{
        myEquation.appendToExpression(parseFloat(buffer));
        myEquation.appendToExpression("+");
        topScreen.innerHTML+=(buffer+"+");
        screen.innerHTML="";
        buffer="";
        console.log(myEquation.expression);
    }
}

subtraction.onclick = function(){
    if(buffer == ""){
        myEquation.appendToExpression("-");
        screen.innerHTML = "";
        topScreen.innerHTML += "-"
    }
    else{
        myEquation.appendToExpression(parseFloat(buffer));
        myEquation.appendToExpression("-");
        topScreen.innerHTML+=(buffer+"-");
        screen.innerHTML="";
        buffer="";
        console.log(myEquation.expression);
    }
}

multiplication.onclick = function(){
    if(buffer == ""){
        myEquation.appendToExpression("*");
        screen.innerHTML = "";
        topScreen.innerHTML += "*"
    }
    else{
        myEquation.appendToExpression(parseFloat(buffer));
        myEquation.appendToExpression("*");
        topScreen.innerHTML+=(buffer+"*");
        screen.innerHTML="";
        buffer="";
        console.log(myEquation.expression);
    }
}

division.onclick = function(){
    if(buffer == ""){
        myEquation.appendToExpression("/");
        screen.innerHTML = "";
        topScreen.innerHTML += "/"
    }
    else{
        myEquation.appendToExpression(parseFloat(buffer));
        myEquation.appendToExpression("/");
        topScreen.innerHTML+=(buffer+"/");
        screen.innerHTML="";
        buffer="";
        console.log(myEquation.expression);
    }
}

factorial.onclick = function(){
    myEquation.appendToExpression(parseFloat(buffer));
    myEquation.appendToExpression("!");
    topScreen.innerHTML+=(buffer+"!");
    screen.innerHTML="";
    buffer="";
}

exponent.onclick = function(){
    myEquation.appendToExpression(parseFloat(buffer), "");
    myEquation.appendToExpression("^");
    screen.innerHTML += "^";
    buffer = "";
}

clear.onclick = function(){
    if(confirm("Are you sure you want to clear the calculator?")){
        buffer="";
        screen.innerText = "";
        topScreen.innerText = "";
        myEquation.expression = [];
    }
}

//change to a clear as opposed to all clear
backspace.onclick = function(){
    if(screen.innerText === ""){
        topScreen.innerHTML = topScreen.innerHTML.slice(0, -1);
        myEquation.expression.splice(myEquation.expression.length-1, 1);
        return;
    }

    screen.innerHTML = screen.innerHTML.slice(0, -1);
    buffer = buffer.slice(0, -1);
}
zero.onclick = function(){
    if(screen.innerText === "0")
        screen.innerText = "";
    screen.innerHTML += "0";
    buffer += "0";

}

one.onclick = function(){
    if(screen.innerText === "0")
        screen.innerText = "";
    screen.innerHTML += "1";
    buffer += "1";

}

two.onclick = function(){
    if(screen.innerText === "0")
        screen.innerText = "";
    screen.innerHTML += "2";
    buffer += "2";

}

three.onclick = function(){
    if(screen.innerText === "0")
        screen.innerText = "";
    screen.innerHTML += "3";
    buffer += "3";
}

four.onclick = function(){
    if(screen.innerText === "0")
        screen.innerText = "";
    screen.innerHTML += "4";
    buffer += "4";
}

five.onclick = function(){
    if(screen.innerText === "0")
        screen.innerText = "";
    screen.innerHTML += "5";
    buffer += "5";
}

six.onclick = function(){
    if(screen.innerText === "0")
        screen.innerText = "";
    screen.innerHTML += "6";
    buffer += "6";
}

seven.onclick = function(){
    if(screen.innerText === "0")
        screen.innerText = "";
    screen.innerHTML += "7";
    buffer += "7";
}

eight.onclick = function(){
    if(screen.innerText === "0")
        screen.innerText = "";
    screen.innerHTML += "8";
    buffer += "8";
}

nine.onclick = function(){
    if(screen.innerText === "0")
        screen.innerText = "";
    screen.innerHTML += "9";
    buffer += "9";

}
//keyboard support later maybe