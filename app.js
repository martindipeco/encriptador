//para el menu hamburguesa
function myMenu() { //previously myFunction
    var x = document.getElementById("my-nav-bar");
    if (x.className === "nav-bar-resp") {
      x.className += " responsive";
    } else {
      x.className = "nav-bar-resp";
    }
}

//resto de funciones

let numeroMaximo = 26;

const rangoCifrado = 25;

let rangoCifradoInput = document.getElementById("cifrado");

rangoCifradoInput.setAttribute("max", rangoCifrado);
rangoCifradoInput.setAttribute("min", -rangoCifrado);

function convertirARango(numero) {
  // Usa el operador de módulo para obtener el resto de la división entre el número y 51 (25 * 2 + 1)
  // Luego, resta 25 para asegurarte de que el resultado esté en el rango de -25 a 25
  return ((numero % 51) + 51) % 51 - 25;
}


function asignarTextoElemento(elementoID, texto) {
    let elementoHTML = document.getElementById(elementoID);
    //debo usar "value" x q lo estoy asignando a un input. si fuera un contenido normal, sería "elementoHTML.innerHTML = texto;"
    elementoHTML.value = texto;
    return;
}

function enviarMensaje()
{
    //capturar texto
    let texto = document.getElementById("texto-usuario").value;
    //capturar cifra
    let numeroCifrado = parseInt(document.getElementById('cifrado').value);
    //me aseguro que la cifra esté en el rango correcto
    numeroCifrado = numeroCifrado % 26;
    //por las dudas, manejo el caso del cero
    if (numeroCifrado == 0)
    {
        alert("Este número no generará ningún cambio. Elija un número entre 1 y 25");
        return;
    }
    /*
    if (numeroCifrado < 1 || numeroCifrado > 25)
    {
        alert("El número debe estar entre 1 y 25");
        borrar();
        //TODO: borrar solo el numero, no todo el mensaje
        //TODO: trabajar con % para asegurarse numero correcto sin tener que restringir
        //TODO: ver problema con negativos para des encriptar
        return;
    }
    */
    //numeroCifrado = convertirARango(numeroCifrado);
    //aplicar cifra
    let textoCifrado = "";
    let posicionAscii = 0;
    for (i = 0; i < texto.length; i++)
    {
        //TODO: refactorizar, crear una función a la que le paso valores ascii max y min
        //TODO: manejar el caso de las vocales acentuadas, ñ y cedilla, por ejemplo
        //A es 65 y Z es 90
        if (texto.charCodeAt(i) >= 65 && texto.charCodeAt(i)<= 90)
        {
            posicionAscii = texto.charCodeAt(i) + numeroCifrado;
            //si nos pasamos de 90 para la nueva posicion...
            if (posicionAscii > 90)
            {
                posicionAscii = posicionAscii - 26;
            }
            //o si nos fuimos para el otro lado con converiones negativas....
            if (posicionAscii < 65)
            {
                posicionAscii+= 26
            }
            //asigno nuevo caracter de acuerdo a codigo ascii, y lo voy sumando a la cadena
            textoCifrado += String.fromCharCode(posicionAscii);
        }
        //a es 97 y z es 122
        else if (texto.charCodeAt(i) >= 97 && texto.charCodeAt(i) <= 122)
        {
            posicionAscii = texto.charCodeAt(i) + numeroCifrado;
            //si nos pasamos de 122 para la nueva posicion
            if (posicionAscii > 122)
            {
                posicionAscii -= 26;
            }
            //o si nos fuimos para el otro lado con converiones negativas....
            if (posicionAscii < 97)
            {
                posicionAscii+= 26
            }
            //asigno nuevo caracter de acuerdo a codigo ascii, y lo voy sumando a la cadena
            textoCifrado += String.fromCharCode(posicionAscii);
        }
        else
        {
            textoCifrado += texto[i];
        }
    }
    //mostrar resultado en nueva caja
    asignarTextoElemento('texto-cifrado', textoCifrado);
}


function borrar()
{
    document.querySelector('#cifrado').value = '';
    document.querySelector('#texto-usuario').value = '';
    document.querySelector('#texto-cifrado').value = '';
}