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
let carrito = [];
let cart = document.querySelector("#cart");

//Storage y Json

let mostrarProductos = () => {
    let productosMostrados = JSON.parse(localStorage.getItem("productos"));

    for (let index = 0; index < productosMostrados.length; index++) {
        const div = document.createElement("div")
        div.className = "col";
        
        div.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h6 id="id">Id: ${productosMostrados[index].id}</h6>
                    <h5 class="card-title">${productosMostrados[index].nombre}</h5>
                    <p class="card-text">$${productosMostrados[index].precio}</p>
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
    const infoProductoCatalogo = {
        id: producto.querySelector("#id").textContent,
        nombre: producto.querySelector(".card-title").textContent,
        precio: producto.querySelector(".card-text").textContent,
    }
    
    carrito = [...carrito, infoProductoCatalogo];
    mostrarCarrito ();
}

function mostrarCarrito (){
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
                <td>x</td>
                <td>${producto.precio}</td>
                <th scope="col">x*${producto.precio}</th>
                <td><button class="btn btn-outline-danger botonEliminar" id="eliminarProducto"><img src="img/trash.svg" alt="Eliminar" height="20px"></button></td>
            </tr>
        </tbody>

    </table>`;

    
    espacioCarrito.appendChild(fila);
    

    });

    let cant = document.querySelector("#cant");
    cant.innerHTML = carrito.length;

    const botonEliminar = document.querySelector(".botonEliminar");
    botonEliminar.addEventListener("click", eliminarProductoCarrito);
    
    function eliminarProductoCarrito (productoID) {
        const item = carrito.find ((producto) => producto.id === productoID);
        const indice = carrito.indexOf(item);
        carrito.splice (indice, 1);
    }
    console.log(carrito)
};


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
    })
});

