
let numbers = document.querySelectorAll('.numbers');
let operators = document.querySelectorAll('.operators');



function buttons(textarray, textarray2, equal) {
  textarray.forEach((text) => {
    let button = document.createElement("button");
    button.innerHTML = text;
    button.style.minWidth = "37px";
    button.style.minHeight = "42px";
    button.style.margin = "5px";
    button.style.marginBottom = "10px";
    button.style.border = "2px solid black";
    button.style.fontWeight = "bold";
    button.style.borderRadius = "2px"; button.style.backgroundColor = "lightcyan";
    button.style.boxShadow = "3px 3px 4px grey"
    button.style.fountSize = "20px";
    button.style.color = "black";
    button.style.textAlign = "center";
    let number = document.querySelector('.numbers');
    number.appendChild(button)

  });

  textarray2.forEach((text) => {
    let button = document.createElement("button");
    button.innerHTML = text;
    button.style.minWidth = "23px";
    button.style.minHeight = "45px";
    button.style.margin = "4.5px";
    button.style.border = "2px solid black";
    button.style.fontWeight = "bold";
    button.style.boxShadow = "3px 3px 4px grey"
    button.style.borderRadius = "2px"; button.style.backgroundColor = "lightcyan";
    button.style.fountSize = "20px";
    button.style.color = "black";
    button.style.textAlign = "center";
    let parent = document.querySelector('.operators');
    parent.appendChild(button)
  })

  let button = document.createElement("button");
  button.innerHTML = equal;
  button.style.minWidth = "50px";
  button.style.minHeight = "40px";
  button.style.margin = "8px";
  button.style.border = "2px solid black";
  button.style.boxShadow = "3px 3px 4px grey"
  button.style.borderRadius = "2px"; button.style.backgroundColor = "lightcyan";
  button.style.fontSize = "30px";
  button.style.color = "black";
  button.style.textAlign = "center";
  parent = document.querySelector('.operators');
  parent.appendChild(button)


}

buttons(["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "Del", "AC"], ["+", "-", "*", "/", "^", "√"], "=");
/*
let pre=''

const combinedElements = [...operators, ...numbers];

console.log(combinedElements);

combinedElements.forEach((element)=>{element.addEventListener("click",(event)=>{
    let target=event.target;
let display=document.querySelector('.calc-display');   display.innerText+=target.innerText;
let content=target.innerText

if(content==="="){
let text=parseInt(display.innerText);
let result=eval(text);
console.log(result)
display.innerText=result; 
}
  
if(content===numbers|| content===operators && pre==='='){
display.innerText=content.innertext;
}
  
if(content==="Del"){
display.innerText=display.innerText.slice(0,-4);
}
pre=content.innerText;
})                                  })
*/
let pre = '';
const combinedElements = [...operators, ...numbers];
const display = document.querySelector('.calc-display');

combinedElements.forEach((element) => {
  element.addEventListener("click", (event) => {
    let target = event.target;
    let content = target.innerText;

    if (content === "="){
/*    
      let  text = 1
    text = parseInt(text)
      
 if (display.innerText.slice(-2)[0] === '^' ) {

 for (let i = 0; i < parseInt(display.innerText.slice(-1)
             ); i++) {
          text *= parseInt(display.innerText.slice(-3));   
}
  display.innerText = text; } 

else if (
  display.innerText.slice(-2)[0] === '√' || 
  display.innerText.slice(-3)[0] === '√' ||
  display.innerText.slice(-4)[0] === '√'
) {
  const lastDigit = parseInt(display.innerText.slice(-1));
  const secondLastDigit = parseInt(display.innerText.slice(-2, -1));
  const thirdLastDigit = parseInt(display.innerText.slice(-3, -1));
  if (display.innerText.slice(-2)[0] === '√') {
    display.innerText = Math.sqrt(lastDigit);
  } else if (display.innerText.slice(-3, -2)[0] === '√') {
    display.innerText = Math.sqrt(secondLastDigit);
  } else if (display.innerText.slice(-4, -3)[0] === '√') {
    display.innerText = Math.sqrt(thirdLastDigit);
  }
} 

   const displayText = display.innerText;

// Check if the square root symbol appears before any digit
let sqrtIndex = displayText.indexOf('√');
if (sqrtIndex !== -1) {

    // If square root symbol is found, select all elements after it
    const elementsAfterSqrt = displayText.substring(sqrtIndex + 1);
content=  Math.sqrt(parseInt(elementsAfterSqrt))  // Now you can do whatever you need with elementsAfterSqrt
    console.log(elementsAfterSqrt);
} else {
    // Square root symbol not found, handle accordingly
    console.log("Square root symbol not found.");
}

if(display.innerText.contains('√')){
let replacedText = displayText.replace(/√\d+/g, content);
 //let text = display.innerText;
   let result =math.evaluate(replacedText);
      console.log(result);
  display.innerText = result;      
}
*/
  if (display.innerText.includes('√')){
  const sqrtIndex = display.innerText.indexOf('√');
  
  // Extract the number after the square root symbol
  const numberAfterSqrt = display.innerText.substring(sqrtIndex + 1);
  
  // Replace the square root symbol with 'sqrt()' and enclose the number in parentheses
  display.innerText = display.innerText.replace('√' + numberAfterSqrt, 'sqrt(' + numberAfterSqrt + ')');
      }

  let text = display.innerText;
   let result = math.evaluate(text);
      console.log(result);
  display.innerText = result;   

}

  else if (content === "Del") {
      display.innerText = display.innerText.slice(0, -1);
    }
    // if any other number is pressed and pre contains "=" 

    else if (display.innerText.slice(-1)[0] === '+' || display.innerText.slice(-1)[0] === '-' || display.innerText.slice(-1)[0] === '*' || display.innerText.slice(-1)[0] === '/') {
      if (content == '+' || content == '-' || content == '*' || content == '/') {
        display.innerText.slice(0, -1)
      } else {
        display.innerText += content;
      }
    }
    else if (content === 'AC') {
      display.innerText = '';
    }
    else {
      if (pre === "=") {
        display.innerText = "";
      }
      display.innerText += content;
    }
    pre = content;
  });

});


//if(current.innerHTML===numbers)previous=current;
//}

/*
numbers.forEach((number)=>{
  number.addEventListener("click",(event)=>{
    let target=event.target;
    let display=document.querySelector('.calc-display');   display.innerHTML+=target.innerHTML; 
current=target.innerHTML;
})
previous=current;
})

let ops='';
operators.forEach((operator)=>{
operator.addEventListener("click",(event)=>{
let target=event.target;
    let display=document.querySelector('.calc-display');   display.innerHTML+=target.innerHTML;
ops=display.innerHTML;
})
})

if(ops==='='){
  console.log(ops)
let calc=calculation(previous,ops,current
                    );
display=document.querySelector('.calc-display');
 display.innerHTML=calc;  

}else{
  let display=document.querySelector('.calc-display');
 display.innerHTML+=ops;
}
*/