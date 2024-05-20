import { useState } from "react";
import './App.css';
import { FiDelete } from "react-icons/fi";
import { MdSwitchLeft } from "react-icons/md";


function App() {
  const [answer, setAnswer] = useState ("");
  const [expression, setExpression] = useState ("");
  const et = expression.trim();

  const isOperator = (symbol: string) => { 
  return /[*/+-]/.test(symbol);
  }
    // Type event as React.KeyboardEvent<HTMLElement>
    const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
      if(event.key === "9"){ 
        return buttonPress
    };
    };
  
  const buttonPress = (symbol: string) => { 
    if (symbol === "clear") { //if Clear 
      setAnswer("");
      setExpression("0");
    } else if (symbol === "negative") { //if negative
      if (answer === "") return;
      setAnswer(answer.toString().charAt(0) === "-" ? answer.slice(1) : "-" + answer); 
    } else if (symbol === "percent") { // if %
      if (answer === "") return;
      setAnswer((parseFloat(answer) / 100).toString());  
    } else if (isOperator(symbol)) { // if Operator
      setExpression(et + " " + symbol + " ");
    } else if (symbol === "="){  // if =
      calculate();
    } else if (symbol === "0") { // if 0
      if (expression.charAt(0) !== "0") { 
        setExpression(expression + symbol);
      }
    } else if (symbol === ".") { // if .
      //split by operators and get last number
      const lastNumber = expression.split(/[-+/*]/g).pop();
      if (!lastNumber) return;
      console.log("lastNumber :>> ", lastNumber)
      //if last number already has decimal, don't add another
      if (lastNumber?.includes(".")) return; 
      setExpression(expression + symbol);
    } else {   // if 0
      if (expression.charAt(0) === "0") { 
        setExpression(expression.slice(1) + symbol)
      } else {
        setExpression(expression + symbol);
      }
    }
  };

  const calculate = () => { 
    // if last char is an operator, do nothing
    if (isOperator(et.charAt(et.length - 1))) return; 
    // clean the expression so that two operators in a row uses the last operator
    // 5 * - + 5 = 10
    const parts = et.split(" ");
    const newParts = [];
      // go through parts backwards
    for (let i = parts.length - 1; i >=0; i--){
      if (["*","/","+"].includes(parts[i]) && isOperator(parts[i - 1])) {
        newParts.unshift(parts[i]);
        let j = 0;
        let k = i - 1;
        while (isOperator(parts[k])) {
          k--;
          j++;
        }
        i -+ j;
      } else { 
        newParts.unshift(parts[i]);
      }
    }
    const newExpression = newParts.join(" ");
    if (isOperator(newExpression.charAt(0))) { 
      setAnswer(eval(answer + newExpression) as string);
    } else { 
      setAnswer(eval(newExpression) as string);
    }
    setExpression("");

  };

  return (
    <>
    <div className="container">
        <h1>POCO F3 Calculator</h1>
      <div className="calculator">
        <div id="calculator">
          <div id="display" style={{textAlign: "right"}}>
            <div id="answer">{answer}</div>
            <div id="expression">{expression}</div>
          </div>
          <div className="button">
            <button id='clear' onClick={() => buttonPress("clear")} className="red-orange">C</button>
            <button id='delete' onClick={() => buttonPress("delete")} className="red-orange"><FiDelete /></button>
            <button id='percentage' onClick={() => buttonPress("%")} className="red-orange">%</button>
            <button id='divide' onClick={() => buttonPress("/")} className="red-orange">/</button>
            <button id='seven' onClick={() => buttonPress("7")} className="light-gray">7</button>
            <button id='eight' onClick={() => buttonPress("8")} className="light-gray">8</button>
            <button id='nine' onClick={() => buttonPress("9")} className="light-gray">9</button>
            <button id='multiply' onClick={() => buttonPress("*")} className="red-orange">*</button>
            <button id='four' onClick={() => buttonPress("4")} className="light-gray">4</button>
            <button id='five' onClick={() => buttonPress("5")} className="light-gray">5</button>
            <button id='six' 
              onKeyDown={onKeyDown}
              onClick={() => buttonPress("6")} className="light-gray">6</button>
            <button id='subtract' onClick={() => buttonPress("-")} className="red-orange">-</button>
            <button id='one' onClick={() => buttonPress("1")} className="light-gray">1</button>
            <button id='two' onClick={() => buttonPress("2")} className="light-gray">2</button>
            <button id='three' onClick={() => buttonPress("3")} className="light-gray">3</button>
            <button id='add' onClick={() => buttonPress("+")} className="red-orange">+</button>
            <button id='switch' onClick={() => buttonPress("switch")} className="red-orange"><MdSwitchLeft /></button>
            <button id='zero' onClick={() => buttonPress("0")} className="light-gray">0</button>
            <button id='decimal' onClick={() => buttonPress(".")} className="light-gray">.</button>
            <button id='equals' onClick={() => buttonPress("=")} className="red-orange">=</button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default App
