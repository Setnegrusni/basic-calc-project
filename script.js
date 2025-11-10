//Variables globales
const myInput = document.querySelector("#disp");
const myDigits = document.querySelectorAll(".digit");
const myActions = document.querySelectorAll(".action");
const myEqual = document.querySelector("#equal");
const myClear = document.querySelector("#clear");
const myBack = document.querySelector("#back");

let myOperation = "";
let myQty = "";
let myQty2 = "";
let myResult = "";

myInput.value = 0; //valor inicial de la calculadora

//Evento para cada botón de operación
myActions.forEach((operation) => {
    operation.addEventListener("click", () => {
        //Si hay una operación pendiente, calcula antes de continuar
        if (myQty !== "" && myQty2 !== "") {
            myInput.value = getResult(myQty, myQty2, myOperation);
            myQty = myInput.value;
            myResult = "";
            myQty2 = "";
        }

        //Si viene de un resultado anterior, lo usa como primer número
        if (myResult !== "") {
            myQty = myResult;
            myQty2 = "";
            myResult = "";
        }

        //Se actualiza el valor de la operación hasta después de usar la seleccionada previamente
        myOperation = operation.textContent;
    });
});

//Evento para cada botón de dígito. Lo agrega al display
myDigits.forEach((digit) => {
    digit.addEventListener("click", () => {
        //Si viene de un resultado, reinicia todo
        if (myResult !== "" && myOperation === "") {
            myQty = "";
            myQty2 = "";
            myResult = "";
        }

        //Si no hay operación, es la primera cantidad
        if (myOperation === "") {
            myQty = myQty + digit.textContent;
            myInput.value = myQty;
        } else { //Si si la hay, es la segunda cantidad
            myQty2 = myQty2 + digit.textContent;
            myInput.value = myQty2;
        }
    });
});

//Evento para mostrar el resultado de la operación especificada
myEqual.addEventListener("click", () => {
    const result = getResult(myQty, myQty2, myOperation);
    myInput.value = result;
    myQty = result;
    myResult = result;
    myQty2 = "";
    myOperation = "";
});

//Evento para reiniciar calculadora al estado inicial
myClear.addEventListener("click", () => {
    myInput.value = 0;
    myQty = "";
    myQty2 = "";
    myOperation = "";
    myResult = "";
});

//Evento para borrar el último caracter de la cantidad en pantalla
myBack.addEventListener("click", () => {
    if (myOperation !== "") {
        myQty2 = myQty2.substring(0, myQty2.length - 1);
        myInput.value = myQty2;
    } else {
        myQty = myQty.substring(0, myQty.length - 1);
        myInput.value = myQty;
    }
});

//Función que calcula el resultado para la operación especificada
function getResult(firstQty, secondQty, operation) {
    firstQty = parseFloat(firstQty);
    secondQty = parseFloat(secondQty);

    switch(operation){
        case "+":
            myResult = firstQty + secondQty; break;
        case "-":
            myResult = firstQty - secondQty; break;
        case "*":
            myResult = firstQty * secondQty; break;
        case "/":
            secondQty == 0 ? myResult = "ERROR" : myResult = firstQty / secondQty; break;
    }

    if (myResult.toString().length > 17) {
        return myResult.toFixed(14);
    } else {
        return myResult
    }
}