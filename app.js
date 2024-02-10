//muestro bloque index por default
document.getElementById('bloque-index').style.display = 'block';

//para el menu hamburguesa
//función myMenu se activa cuando se hace click en el icono de las barras
//el icono de barras solo es visible cuando la pantalla es pequeña

function myMenu() { 
    //el id my nav bar corresponde al bloque de la barra superior
    var x = document.getElementById("my-nav-bar");
    //siempre por defecto estará cargada la clase nav bar res
    if (x.className === "nav-bar-resp") {
        //le cambio el nombre a la clase para que tome otros css
        x.className += " responsive";
    } else {
        //caso contrario, si ya era responsive, vuelve a normal
        x.className = "nav-bar-resp";
    }    
}


//funcion para el falso SPA / VUE.js
//activa bloques como si fueran links
//repliego responsivo vuelve a replegar el menu si quedó desplegado

function repliegoResponsivo()
{
    var x = document.getElementById("my-nav-bar");

    if (x.className === "nav-bar-resp responsive") {
        //le cambio el nombre a la clase para que tome otros css
        x.className = "nav-bar-resp";
    }
}

//quito activo elimina la propiedad activa en el nav bar
function quitoActive()
{
    // Selecciono todos los <a> del navbar 
    var navLinks = document.querySelectorAll("#my-nav-bar a");

    // itero todos los <a> 
    navLinks.forEach(function(link) {
        // quito el "active" class si es que lo tiene
        if (link.classList.contains('active')) {
         link.classList.remove('active');
        }
    });
}

//convierto en activo el link cliqueado
function agregoActive(id)
{
    var specificLink = document.getElementById(id); 
    specificLink.classList.add('active');
}

function activaBloque(idBloque, idNav)
{
    //repliego el menu responsivo si estaba abierto
    repliegoResponsivo();

    //quita atributo active de la barra de navegacion a todas las secciones que no sean la apropiada
    quitoActive();

    //agrega atributo active a la seccion correspondiente de la barra de navegacion
    agregoActive(idNav);
    
    // Get all the sections
    const sections = document.querySelectorAll('.container__texto');

    // Loop through each section
    sections.forEach(section => {
        // Hide all sections
        section.style.display = 'none';
    });

    // Show the target section
    document.getElementById(idBloque).style.display = 'block';
}

//resto de funciones
//asumo alfabeto norma ASCII de 26 caracteres
//deberìa cambiarlo si pienso incluir caracteres como la Ñ o la Ç
const numeroMaximo = 26;

const rangoCifrado = 25;

let rangoCifradoInput = document.getElementById("cifrado");
//establezco atributos de valor maximo y minimo al numero de cifrado
rangoCifradoInput.setAttribute("max", rangoCifrado);
rangoCifradoInput.setAttribute("min", -rangoCifrado);

//uso esta función para que aparezca el texto cifrado en la segunda caja
function asignarTextoElemento(elementoID, texto) {
    let elementoHTML = document.getElementById(elementoID);
    //debo usar "value" x q lo estoy asignando a un input. si fuera un contenido normal, sería "elementoHTML.innerHTML = texto;"
    elementoHTML.value = texto;
    return;
}

//al apretar botón enviar
function enviarMensaje()
{
    //capturar texto
    let texto = document.getElementById("texto-usuario").value;
    if (texto === "")
    {
        alert("Por favor ingrese algún mensaje");
        return;
    }
    //capturar cifra
    let numeroCifrado = document.getElementById("cifrado").value;
    if (numeroCifrado === "")
    {
        alert("Por favor, ingrese un número");
        return;
    }
    //parseo a int
    numeroCifrado = parseInt(numeroCifrado);
    
    //me aseguro que la cifra esté en el rango correcto
    numeroCifrado = numeroCifrado % 26;
    //por las dudas, manejo el caso del cero
    if (numeroCifrado == 0)
    {
        alert("Este número no generará ningún cambio. Elija un número entre 1 y 25");
        return;
    }

    //comienzo iteración por la frase, aplicando cifra en cada caracter si corresponde 
    let textoCifrado = "";
    let posicionAscii = 0;
    for (i = 0; i < texto.length; i++)
    {
        //mayúscula A es 65 y Z es 90
        //si el caracter está fuera de rango, significa que es un caracter especial, por lo tanto se deja sin encriptar
        //los signos especiales como ? ! , : y etc no se encriptan
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
        //minúscula a es 97 y z es 122
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

function copiarMensaje()
{
    //capturar value de input field
    //usar la api del clipboard
    let textoInput = "";
    textoInput = document.getElementById("texto-cifrado").value;
    navigator.clipboard.writeText(textoInput);
    //mostrar mensaje de éxito
    let mensaje = document.getElementById("copiado");

    //lo hago aparecer cambiando su display en css de "none" a "block"
    mensaje.style.display = "block";
       
    //lo hago desaparecer con setTimeout, que espera una funcion y un tiempo
    setTimeout(function(){
        mensaje.style.display = "none";
    }, 1000);
}