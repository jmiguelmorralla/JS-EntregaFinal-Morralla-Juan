//Variables

const formulario = document.querySelector("#formulario");
const nombre = document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");
const mail = document.querySelector("#mail");
const iva = document.querySelector("#iva");

const botonCliente = document.querySelector("#botonCliente");
const espacioCliente = document.querySelector("#espacioCliente");

const listaDeProductos = document.querySelector(".contenedor-productos");

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

//Storage y Json

let mostrarProductos = () => {
    let productosMostrados = JSON.parse(localStorage.getItem("productos"));

    for (let index = 0; index < productosMostrados.length; index++) {
        const div = document.createElement("div")
        div.className = "col";
        
        div.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${productosMostrados[index].nombre}</h5>
                    <p class="card-text">${productosMostrados[index].precio}.</p>
                    <a href="#" class="btn btn-warning">Agregar</a>
                </div>
            </div>`;

        listaDeProductos.append(div);     
    }
}


if (localStorage.getItem("productos")) 
{mostrarProductos();} 
else 
{
    localStorage.setItem("productos", JSON.stringify(listadoProductos));
    mostrarProductos();
}
