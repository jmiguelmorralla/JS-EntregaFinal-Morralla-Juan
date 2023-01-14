//Variables

const formulario = document.querySelector("#formulario");
const nombre = document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");
const mail = document.querySelector("#mail");
const iva = document.querySelector("#iva");
const botonCliente = document.querySelector("#botonCliente");
const espacioCliente = document.querySelector("#espacioCliente");
const contenedorProductos = document.querySelector(".contenedor-productos");
const espacioCarrito = document.querySelector("#espacioCarrito");
const totalCarrito = document.querySelector("#totalCarrito");
const botonVaciarCarrito = document.querySelector("#botonVaciarCarrito");
const precioTotal = document.querySelector("#precioTotal");
let cart = document.querySelector("#cart");
let carrito = [];

//Storage y Json


const mostrarProductos = () => {
    let productosMostrados = JSON.parse(localStorage.getItem("productos"));

    for (let index = 0; index < productosMostrados.length; index++) {
        const div = document.createElement("div")
        div.className = "col";
        
        div.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h6 id="id">${productosMostrados[index].id}</h6>
                    <h6 id="cantidad">${productosMostrados[index].cantidad}</h6>
                    <h5 class="card-title">${productosMostrados[index].nombre}</h5>
                    <p class="card-text">${productosMostrados[index].precio}</p>
                    <a href="#" class="btn btn-warning">Agregar</a>
                </div>
            </div>`;

        contenedorProductos.append(div);     
    }
}

if (localStorage.getItem("productos")) 
{mostrarProductos();} 
else 
{
    localStorage.setItem("productos", JSON.stringify(listadoProductos));
    mostrarProductos();
}

fetch("../scripts/datos.json")
    .then((resp) => console.log(resp));

// Carrito DOM

cart.addEventListener("click", irACarrito);

function irACarrito () {
    location.hash = "espacioCarrito";
};

const catalogoProducto = document.querySelectorAll(".card");

catalogoProducto.forEach((card) => {
    card.addEventListener("click", (e) => {
        agregarProductoCarrito(e.target.parentElement);
    });
});

function agregarProductoCarrito (producto) {

    // const existe = carrito.some(item => item.id === producto.id);

    // if (existe) {
    //     producto.cantidad++;
    // } else {

    const infoProductoCatalogo = {
        id: producto.querySelector("#id").textContent,
        nombre: producto.querySelector(".card-title").textContent,
        precio: producto.querySelector(".card-text").textContent,
        cantidad: producto.querySelector("#cantidad").textContent,
    };

  
    
    carrito = [...carrito, infoProductoCatalogo];

    mostrarCarrito ();
    }



function mostrarCarrito (){
    
    document.addEventListener("DOMContentLoaded", () => {
        carrito = JSON.parse(localStorage.getItem(carrito)) || [];
        mostrarCarrito();
    });

       
    espacioCarrito.innerHTML = "";

    carrito.forEach((producto) => {
                    
        const fila = document.createElement("div");
        fila.innerHTML =`
        <table class="table">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Producto</th>
                <th scope="col">Id</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Precio Unitario</th>
                <th scope="col">Total</th>
                <th scope="col">Acción</th>
            </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">${carrito.indexOf(producto)+1}</th>
                    <td>${producto.nombre}</td>
                    <td>${producto.id}</td>
                    <td>${producto.cantidad}</td>
                    <td>$${producto.precio}</td>
                    <td>$${producto.cantidad*producto.precio}</td>
                    <td><button class="btn btn-outline-danger" id="eliminarProducto${producto.id}"><img src="img/trash.svg" alt="Eliminar" height="20px"></button></td>
                </tr>
            </tbody>

        </table>`;

    
        espacioCarrito.appendChild(fila);
         
  
        /* ELIMINAR CADA PRODUCTO */
        
        function eliminarProducto () {
        const botonEliminar = document.querySelector("#eliminarProducto" + producto.id);

        botonEliminar.addEventListener("click", () => {
            const item = carrito.find((temp) => (temp.id === producto.id));
            carrito = carrito.filter((temp) => (temp.id !== producto.id));
            
            mostrarCarrito();
        });        
        };

        eliminarProducto();

    });
    
    /* NUMERO EN BOTÓN CARRITO */

    let cant = document.querySelector("#cant");
    cant.innerHTML = carrito.length;
    
    /* TOTALIZADOR */
    precioTotal.textContent = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
    
    localStorage.setItem("carrito", JSON.stringify(carrito));
    
};

botonVaciarCarrito.addEventListener("click", limpiarCarrito);

function limpiarCarrito() {
    carrito.length = [];
    localStorage.removeItem(carrito);
    mostrarCarrito();

};

let carritoJSON = JSON.parse(localStorage.getItem(carrito));

console.log(carritoJSON);



/* REVISAR, NO FUNCIONA

const revisarCarritoVacio = () => {

    if (carritoJSON.length){
        const botonVaciarCarrito = document.createElement("div");
        botonVaciarCarrito.innerHTML = `<button class="btn btn-danger" id="botonVaciarCarrito">Vaciar Carrito</button>`;
        totalCarrito.appendChild(botonVaciarCarrito);
    } 
    else {
        const mensajeVacio = document.createElement("div");
        mensajeVacio.innerHTML =`<h5>Su carrito se encuentra vacío.</h5>`;
        totalCarrito.appendChild(mensajeVacio);
    };
};

revisarCarritoVacio(); 

*/

/*---------------------------------- FORMULARIO------------------------------------*/


//Eventos / Local Storage

formulario.addEventListener("submit", registrar);

function registrar(e) {
    e.preventDefault();
    localStorage.setItem("Nombre", nombre.value);
    localStorage.setItem("Apellido", apellido.value);
    localStorage.setItem("Correo", mail.value);
    localStorage.setItem("RI", iva.checked);
};

//Función constructora de cliente

class crearCliente {
    constructor(nombre, apellido, correo,condicionIva) {
        this.nombre = nombre.toUpperCase();
        this.apellido = apellido.toUpperCase();
        this.correo = correo.toLowerCase();
        this.condicionIva = condicionIva;
    }
}

//Creación de cliente / Local Storage.

const cliente1 = new crearCliente (localStorage.getItem("Nombre"), localStorage.getItem("Apellido"), localStorage.getItem("Correo"), localStorage.getItem("RI"));

// Mostrar información del cliente / Eventos

botonCliente.addEventListener("click", function (e) {
    e.preventDefault();
    
    espacioCliente.innerHTML = `<h4> Sus datos registrados son: </h4> <br> <h6>Nombre: ${localStorage.getItem("Nombre")} <br> Apellido: ${localStorage.getItem("Apellido")} <br> Correo: ${localStorage.getItem("Correo")}<br> <br> <button type="submit" class="btn btn-outline-info" id="botonOcultar">Ocultar datos</button>`;
    
    const botonOcultar = document.querySelector("#botonOcultar");
    
    botonOcultar.addEventListener("click", function (e) {
        e.preventDefault(e);
        espacioCliente.innerHTML = `Se ocultaron los datos de cliente.`;
    });
});











