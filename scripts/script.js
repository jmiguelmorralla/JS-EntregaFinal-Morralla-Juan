/*//Variables
let credito = 30000;
const alicuota = 0.21;
let neto;
let iva;


// Constructor de cliente.

class crearCliente {
    constructor(nombre, apellido, condicionIva) {
        this.nombre = nombre.toUpperCase();
        this.apellido = apellido.toUpperCase();
        this.condicionIva = condicionIva;
    }
}

//Creación de cliente.

const cliente1 = new crearCliente ((prompt("Ingrese su nombre.")), prompt("Ingrese su apellido."), confirm("Si es Responsable Inscripto en IVA, haga click en ACEPTAR, sino en CANCELAR"));


//Muestra por consola de cliente creado.

console.log(cliente1);

//Constructor de productos.

class crearProducto {
    constructor(nombre, marca, origen, material, precio, disponibilidad) {
        this.nombre = nombre;
        this.marca = marca;
        this.origen = origen;
        this.material = material;
        this.precio = precio;
        this.disponibilidad = disponibilidad;

        this.caption = function () {
            console.log(`${(this.nombre)} es un producto de primera calidad. La marca ${this.marca} presta mucha atención a las teminaciones, especialmente cuando el producto es de ${this.material}.`);
        };
    }
}

//Creación de productos.

const balancin = new crearProducto ("Balancin", "Juguetes Olsen", "Argentina", "Madera", 12000, true);
const arcoiris = new crearProducto ("Arcoiris", "Juguetes Olsen", "Argentina", "Madera", 7000, true);
const casita = new crearProducto ("Casita", "Confiture", "Argentina", "Madera", 4500, true);
const rompecabezas = new crearProducto ("Rompecabezas", "Tak Tak","Argentina", "Madera", 3000, false);
const torre = new crearProducto ("Torre de Encastre", "Juguetes Olsen", "Argentina", "Madera", 2900, true);
const luna = new crearProducto ("Luna Equilibrista", "Confiture", "Argentina", "Madera", 5900, true);

//Array de productos.

const productos = [balancin, arcoiris, casita, rompecabezas, torre, luna];
console.log(productos);

//Array carrito (creación vacío).
const carrito = [];
console.log(carrito);

// Funciones
function calcularTotalComprado(creditoInicial, creditoFinal) {
    return creditoInicial - creditoFinal
}

function calcularNeto(baseImponible) {
    return baseImponible / (1 + alicuota)
}

// Condicionales
if (cliente1.condicionIva) {
    alert(`Hola ${cliente1.nombre}. Emitiremos factura tipo A con IVA discriminado. Tu crédito actual es de $${credito}.`)
} else{
    alert(`Hola ${cliente1.nombre}, emitiremos factura tipo B. Tu crédito actual es de $${credito}.`)
} 

while (credito>=4500) {
    let producto = prompt(`¿Qué producto te gustaría comprar? Podés elegir: Balancin ($${balancin.precio}), Arcoiris ($${arcoiris.precio}), Casita ($${casita.precio}), Rompecabezas ($${rompecabezas.precio}), Torre ($${torre.precio}) o Luna ($${luna.precio}). Los precios incluyen IVA. Tu crédito actual es de $${credito}. Podés escribir ESC para terminar.`)
    
    switch (producto) {
        case "Balancin":
            credito -= balancin.precio
            carrito.push(balancin);
            break;
        case "Arcoiris":
            credito -= arcoiris.precio
            carrito.push(arcoiris);
            break;
        case "Casita":
            credito -= casita.precio
            carrito.push(casita);
            break; 
        case "Rompecabezas":
            credito -= rompecabezas.precio 
            carrito.push(rompecabezas);
            break;
        case "Torre":
            credito -= torre.precio
            carrito.push(torre);
            break;
        case "Luna":
            credito -= luna.precio 
            carrito.push(luna);
            break;

        default:
            break;
    }
    
    if (producto == "" || producto == "ESC" || producto == "esc" || producto == "Esc") {
        break;
    }
}


//Método reduce.
let totalComprado = carrito.reduce((acumulado, producto)=>{
    return acumulado + producto.precio

}, 0)


neto = calcularNeto (totalComprado);
iva = totalComprado - neto;

let totalCompradoRedondeado = Math.round(totalComprado);
let netoRedondeado = Math.round(neto);
let ivaRedondeado = Math.round(iva);



//Resumen de compra.
alert(`Usted está comprando ${carrito.length} producto(s) de primera calidad. A continuación se muestra el detalle de sus productos.`)
const resumenCompra = carrito.map((compra)=>compra.nombre)
alert(resumenCompra);

//Mensaje final.
if (cliente1.condicionIva) {
    alert(`El importe total de tu compra es de $${totalCompradoRedondeado}. El neto gravado es $${netoRedondeado}. El IVA es $${ivaRedondeado}. Tu crédito es de $${credito}. Gracias por tu compra.`)
}
else {
    alert(`El importe total de tu compra es $${totalCompradoRedondeado}. Tu crédito es de $${credito}. Gracias por tu compra.`)
}
*/


const formulario = document.querySelector("#formulario");
const nombre = document.querySelector("#nombre");
const mail = document.querySelector("#mail");
const iva = document.querySelector("#iva");

formulario.addEventListener("submit", registrar)

function registrar(e) {
    e.preventDefault();
    localStorage.setItem("Nombre", nombre.value);
    localStorage.setItem("Correo", mail.value);
    localStorage.setItem("RI", iva.value);

}


// DATOS DEL COMPRADOR
// const formulario = document.querySelector("#formulario");
// const nombre = document.querySelector("#nombre");
// const correo = document.querySelector("#mail");

// formulario.addEventListener("submit", validarFormulario);

// function validarFormulario(e) {
//     e.preventDefault();

//     let dato1 = document.createElement("h2")
//     dato1.innerHTML=`${nombre.value}`;
//     document.body.appendChild(dato1);

//     let dato2 = document.createElement("h4")
//     dato2.innerHTML=`${correo.value}`;
//     document.body.appendChild(dato2);
// };






