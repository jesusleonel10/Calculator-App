// Asignamos variables al input donde muestra los valores (numeros y operadores)
const input = document.getElementById("input")
const number = document.querySelectorAll(".numbers div")
const operator = document.querySelectorAll(".operators div")
const result = document.getElementById("result")
const clear = document.getElementById("reset")
const deleted = document.getElementById("delete")
const lengthInput = input.innerHTML.length
let resultShow = false

///--------- Eventos al presionar los numeros ------------///

const maxLengthInput = (str) => {
    let lengthStr = str.length
    lengthStr > 13 ? input.style.fontSize = "1.5rem" : input.style.fontSize = "2.5rem"
}


//Asignamos el evento click a cada boton (numeros)
for (let i=0; i < number.length; i++) {
    number[i].addEventListener("click", function(e) {
        
        //Guardamos la cadena actual y el ultimo caracter
        let currentString = input.innerHTML
        let lastChar = currentString[currentString.length - 1]
        maxLengthInput(currentString)
        //Si no se muestra el resultado seguimos agregando a la cadena
        if (resultShow === false) {
            input.innerHTML += e.target.innerHTML
        //Si el resultado se muestra y se presiona algun operador seguimos agregando a la cadena para la siguiente operacion
        } else if (resultShow === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
            resultShow = false
            input.innerHTML += e.target.innerHTML
        //Si se muestra el resultado y se presiona algun numero, 
        //borramos el resultado actual para realizar una nueva operacion
        } else if (resultShow === true) {
            resultShow = false
            input.innerHTML = "";
            input.innerHTML += e.target.innerHTML 
        }
    })
}

///--------- Eventos al presionar los operadores ------------///


//Asignamos el evento click a cada boton (operadores)
for (let i= 0; i < operator.length; i++) {
    operator[i].addEventListener("click", function(e) {
    //Guardamos la cadena actual y el ultimo caracter
    let currentString = input.innerHTML
    let lastChar = currentString[currentString.length - 1]
    maxLengthInput(currentString)
    //Si ultimo caracter es un operador lo reemplazamos por el que se hizo clic
    if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
        let newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML
        input.innerHTML = newString
    //Si el primer caracter es un operador no haga nada
    } else if (currentString.length === 0) {
        alert("Ingrese un numero primero")

    } else {
    //De lo contrario solomante agregue el operador a la cadena
        input.innerHTML += e.target.innerHTML
    }
    })
}

///--------- Eventos al presionar igual ------------///


//Evento clic para boton de igual
result.addEventListener("click", function() {
    //String de la operacion
    let inputString = input.innerHTML
    //Creamos un array con los numeros de la operacion
    let numbers = inputString.split(/\+|\-|\×|\÷|\=/g)
    //Creamos un array con los operadores de la operacion, 
    //remplezamas los numeros y puntos por un caracter vacio y luego lo pasamos a array
    let operators = inputString.replace(/[0-9]|\./g, "").split("")

    ///--------- Operaciones ------------///


    let divide = operators.indexOf("÷") //Indice del operador dividir
    //Repita mientras el operador dividir exista
    while (divide != -1) {
        //Tomamos el primer y segundo numero y lo reemplazamos por el resultado de la division
        numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1])
        //Quitamos el operador del array
        operators.splice(divide, 1)
        //divide seria -1 termina el ciclo
        divide = operators.indexOf("÷")
    }

    let multiply = operators.indexOf("×")
    while (multiply != -1) {
        numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);  
        operators.splice(multiply, 1);  
        multiply = operators.indexOf("×");  
    }

    let subtract = operators.indexOf("-")
    while (subtract != -1) {  
        numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);  
        operators.splice(subtract, 1);  
        subtract = operators.indexOf("-");  
       }  

    let add = operators.indexOf("+")
    while (add != -1) {
        numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]))
        operators.splice(add, 1);  
        add = operators.indexOf("+");
    }

    //Mostramos el resultado con el primer valor del array
    input.innerHTML = numbers[0]
    maxLengthInput(inputString)
    resultShow = true
})

//Borrar ultimo valor
deleted.addEventListener("click", function() {
    //String de la operacion
    let inputStr = input.innerHTML
    let lastStr = inputStr[inputStr.length - 1]

    inputStr = inputStr.substring(0, inputStr.length - 1)
    input.innerHTML = inputStr
})

//Limpiamos el input
clear.addEventListener("click", function() {  
    input.innerHTML = "";  
})



/* Button Toggle */

const buttons = document.getElementsByClassName("button");
const arr = [...buttons];

arr.forEach((element, index) => {
  element.addEventListener("click", () => {
    element.style.opacity = "1";

    const body = document.getElementsByTagName("body")[0]

    const header = document.getElementsByTagName("header")[0]
    const bgToggle = document.getElementsByClassName("tri-state-toggle")[0]
    const buttonToggle = document.querySelectorAll(".button-theme")

    const bgButtons = document.getElementsByClassName("buttons")[0]
    const input = document.getElementsByClassName("input")[0]
    const operationButtons = document.querySelectorAll(".operation-button")
    const resetDel = document.querySelectorAll(".reset-delete")
    const equal = document.getElementsByClassName("equal")[0]


    if(index === 0){
        body.className = ""
        body.classList.add("body-bg-dark")

        header.className = ""
        header.classList.add("header-text-dark")

        bgToggle.classList.remove("bg-toggle-light", "bg-toggle-uva")
        bgToggle.classList.add("bg-toggle-dark")

        buttonToggle.forEach(function(item) {
            item.classList.remove("button-toggle-light", "button-toggle-uva")
            item.classList.add("button-toggle-dark")
        })


        bgButtons.classList.remove("buttons-bg-light", "buttons-bg-uva")
        bgButtons.classList.add("buttons-bg-dark")

        input.classList.remove("input-light", "input-uva")
        input.classList.add("input-dark")

        operationButtons.forEach(function(item) {
            item.classList.remove("num-operators-light", "num-operators-uva")
            item.classList.add("num-operators-dark")
        })

        resetDel.forEach(function(item) {
            item.classList.remove("reset-del-light", "reset-del-uva")
            item.classList.add("reset-del-dark")
        })

        equal.classList.remove("equal-light", "equal-uva")
        equal.classList.add("equal-dark")


    } else if (index === 1) {
        body.className = ""
        body.classList.add("body-bg-light")

        header.className = ""
        header.classList.add("header-text-light")

        bgToggle.classList.remove("bg-toggle-dark", "bg-toggle-uva")
        bgToggle.classList.add("bg-toggle-light")

        buttonToggle.forEach(function(item) {
            item.classList.remove("button-toggle-dark", "button-toggle-uva")
            item.classList.add("button-toggle-light")
        })

        bgButtons.classList.remove("buttons-bg-dark", "buttons-bg-uva")
        bgButtons.classList.add("buttons-bg-light")

        input.classList.remove("input-dark", "input-uva")
        input.classList.add("input-light")

        operationButtons.forEach(function(elem) {
            elem.classList.remove("num-operators-dark", "num-operators-uva")
            elem.classList.add("num-operators-light")
        })

        resetDel.forEach(function(item) {
            item.classList.remove("reset-del-dark", "reset-del-uva")
            item.classList.add("reset-del-light")
        })

        equal.classList.remove("equal-dark", "equal-uva")
        equal.classList.add("equal-light")

    } else {
        body.className = ""
        body.classList.add("body-bg-uva")

        header.className = ""
        header.classList.add("header-text-uva")

        bgToggle.classList.remove("bg-toggle-light", "bg-toggle-dark")
        bgToggle.classList.add("bg-toggle-uva")

        buttonToggle.forEach(function(item) {
            item.classList.remove("button-toggle-light", "button-toggle-dark")
            item.classList.add("button-toggle-uva")
        })

        bgButtons.classList.remove("buttons-bg-light", "buttons-bg-uva")
        bgButtons.classList.add("buttons-bg-uva")
        
        input.classList.remove("input-dark", "input-light")
        input.classList.add("input-uva")

        operationButtons.forEach(function(elem) {
            elem.classList.remove("num-operators-dark", "num-operators-light")
            elem.classList.add("num-operators-uva")
        })

        resetDel.forEach(function(item) {
            item.classList.remove("reset-del-dark", "reset-del-light")
            item.classList.add("reset-del-uva")
        })

        equal.classList.remove("equal-dark", "equal-light")
        equal.classList.add("equal-uva")
    }

    arr
      .filter(function (item) {
        return item != element;
      })
      .forEach((item) => {
        item.style.opacity = "0";
      });
  });
});



