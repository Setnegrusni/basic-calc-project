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

myInput.value = 0;//valor inicial de la calculadora

//Evento para cada botón de operación
myActions.forEach((operation) => {
    operation.addEventListener("click", () => {
        if (myQty !== "" && myQty2 !== "") {
            myInput.value = getResult(myQty, myQty2, myOperation);
            myQty = myInput.value;
            myQty2 = "";
        }

        //Se actualiza el valor de la operación hasta después de usar la seleccionada previamente
        myOperation = operation.textContent;
    });
});

//Evento para cada botón de dígito. Lo agrega al display
myDigits.forEach((digit) => {
    digit.addEventListener("click", () => {
        if (myOperation === "") {
            myQty = myQty + digit.textContent;
            myInput.value = myQty;
        }

        if (myOperation !== "") {
            myQty2 = myQty2 + digit.textContent;
            myInput.value = myQty2;
        }
    });
});

//Evento para mostrar el resultado de la operación especificada
myEqual.addEventListener("click", () => {
    myInput.value = getResult(myQty, myQty2, myOperation);
    myQty = myInput.value;
    myQty2 = "";
})

//
myClear.addEventListener("click", () => {
    myInput.value = 0;
    myQty = "";
    myQty2 = "";
    myOperation = "";
});

myBack.addEventListener("click", () => {
    if (myOperation !== "") {
        myQty2 = myQty2.substring(0, myQty2.length - 1)
        myInput.value = myQty2;
    } else {
        myQty = myQty.substring(0, myQty.length - 1)
        myInput.value = myQty;
    }
});

//Función que calcula el resultado para la operación especificada
function getResult(firstQty, secondQty, operation) {
    firstQty = parseInt(firstQty);
    secondQty = parseInt(secondQty);

    switch(operation){
        case "+":
            return firstQty + secondQty;
        case "-":
            return firstQty - secondQty;
        case "*":
            return firstQty * secondQty;
        case "/":
            return firstQty / secondQty;
    }
}