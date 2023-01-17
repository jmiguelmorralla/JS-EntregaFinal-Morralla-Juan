//Variables

const formulario = document.querySelector("#formulario");
const datosCliente = document.querySelector("#datosCliente");
const nombre = document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");
const mail = document.querySelector("#mail");
const iva = document.querySelector("#iva");
const botonCliente = document.querySelector("#botonCliente");
const espacioCliente = document.querySelector("#espacioCliente");
const contenedorProductos = document.querySelector(".contenedor-productos");
const espacioCarrito = document.querySelector("#espacioCarrito");
const totalCarrito = document.querySelector("#totalCarrito");
const divCarrito = document.querySelector("#divCarrito")
const botonVaciarCarrito = document.querySelector("#botonVaciarCarrito");
const precioTotal = document.querySelector("#precioTotal");
const botonesFinal = document.querySelector("#botonesFinal");
let botonCarrito = document.querySelector("#cart");
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

document.addEventListener("DOMContentLoaded", bootstrap);

function bootstrap() {
  agregarEventosCarrito()
  agregarEventosFormulario()
  cargarProductos()
  .then((datos) => {
      mostrarProductos(datos);
    });
  mostrarCarrito();
}

// EVENTOS DEL CARRITO

function agregarEventosCarrito() {
  botonCarrito.addEventListener("click", irACarrito);
  botonVaciarCarrito.addEventListener("click", limpiarCarrito);
  botonConfirmarCompra.addEventListener("click", confirmarCompra);
}

// EVENTOS DEL FORMULARIO

function agregarEventosFormulario() {
  formulario.addEventListener("submit", registrar);

  function registrar(e) {
    e.preventDefault();
    localStorage.setItem("Nombre", nombre.value);
    localStorage.setItem("Apellido", apellido.value);
    localStorage.setItem("Correo", mail.value);
    localStorage.setItem("RI", iva.checked);
  }

  //Función constructora de cliente

  class crearCliente {
    constructor(nombre, apellido, correo, condicionIva) {
      this.nombre = nombre.toUpperCase();
      this.apellido = apellido.toUpperCase();
      this.correo = correo.toLowerCase();
      this.condicionIva = condicionIva;
    }
  }

  //Creación de cliente / Local Storage.

  const cliente1 = new crearCliente(
    localStorage.getItem("Nombre"),
    localStorage.getItem("Apellido"),
    localStorage.getItem("Correo"),
    localStorage.getItem("RI")
  );

  // Mostrar información del cliente / Eventos

  botonCliente.addEventListener("click", function (e) {
    e.preventDefault();

    espacioCliente.innerHTML = `<h4> Sus datos registrados son: </h4> <br> <h6>Nombre: ${localStorage.getItem(
      "Nombre"
    )} <br> Apellido: ${localStorage.getItem(
      "Apellido"
    )} <br> Correo: ${localStorage.getItem(
      "Correo"
    )}<br> <br> <button type="submit" class="btn btn-outline-info" id="botonOcultar">Ocultar datos</button> <br><br>`;

    const botonOcultar = document.querySelector("#botonOcultar");

    botonOcultar.addEventListener("click", function (e) {
      e.preventDefault(e);
      espacioCliente.innerHTML = `Se ocultaron los datos de cliente.<br><br>`;
    });
  });
}

// CARGAR LOS PRODUCTOS DEL .JSON

const cargarProductos = async () => {
  const respuesta = await fetch("../scripts/datos.json");
  const datos = await respuesta.json();
  return datos;
}

// MOSTRAR LOS PRODUCTOS

function mostrarProductos(datos) {
  datos.forEach((productosMostrados) => {
    const div = document.createElement("div");
    div.className = "col";

    div.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h6 id="id">${productosMostrados.id}</h6>
                    <h6 id="cantidad">${productosMostrados.cantidad}</h6>
                    <img class="fluid imagenCatalogo" src="${productosMostrados.img}">
                    <h5 class="card-title">${productosMostrados.nombre}</h5>
                    <p class="card-text">$${productosMostrados.precio}</p>
                    <button class="btn btn-agregar btn-warning" id="${productosMostrados.id}">Agregar</button>
                </div>
            </div>`;

    contenedorProductos.append(div);

    
  });

  const botonAgregarProducto = document.querySelectorAll(".btn-agregar");

  botonAgregarProducto.forEach(btn => btn.addEventListener("click", (e) => {
  agregarProductoCarrito(e.target.id, datos);
  irACarrito();
  Toastify({
    text: "Agregaste un hermoso producto a tu carrito.",
    duration: 3000,
    destination: "../pages/pagos.html",
    newWindow: true,
    close: true,
    gravity: "bottom",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, #fc8803, #fc3d03)",
    },
    onClick: function () {},
  }).showToast();
  }))
}

// IR AL CARRITO

function irACarrito() {
  location.hash = "espacioCarrito";
}

// AGREGAR LOS PRODUCTOS AL CARRITO

function agregarProductoCarrito(id, producto) {

  const productoAgregar = producto.find(p => p.id === id);
 
  const existe = carrito.some(item => item.id === id);
  
  if (existe) {
    const prod = carrito.map (prod => {
      if (prod.id === id) {
        prod.cantidad ++
      }
    })
  } else {
    carrito = [...carrito, productoAgregar];
    
  };

  mostrarCarrito();
}

// ELIMINAR CADA PRODUCTO DEL CARRITO

function eliminarProducto(producto) {
  const item = carrito.find(temp => temp.id === producto.id);
  carrito = carrito.filter(temp => temp.id !== producto.id);
  mostrarCarrito();
}

// MOSTRAR CARRITO - ACTUALIZAR EL CARRITO

function mostrarCarrito() {
  espacioCarrito.innerHTML = "";

  const tablaProductos = document.createElement("table");
  tablaProductos.className = "table"
  espacioCarrito.appendChild(tablaProductos);

  const header = document.createElement("thead");
  header.innerHTML = `
            <tr>
                <th scope="col">#</th>
                <th scope="col">Producto</th>
                <th scope="col">Id</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Precio Unitario</th>
                <th scope="col">Total</th>
                <th scope="col">Acción</th>
            </tr>`
  tablaProductos.appendChild(header);

  const body = document.createElement("tbody");
  tablaProductos.appendChild(body);
  
  carrito.forEach((producto) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
          <th scope="row">${carrito.indexOf(producto) + 1}</th>
          <td>${producto.nombre}</td>
          <td>${producto.id}</td>
          <td>${producto.cantidad}</td>
          <td>$${producto.precio}</td>
          <td>$${producto.cantidad * producto.precio}</td>
          <td><button class="btn btn-outline-danger" id="eliminarProducto${
            producto.id
          }"><img src="img/trash.svg" alt="Eliminar" height="20px"></button></td>
    `;

    body.appendChild(fila);

    /* ELIMINAR CADA PRODUCTO */

    const botonEliminar = document.querySelector(
      "#eliminarProducto" + producto.id
    );

    botonEliminar.addEventListener("click", () => {
      eliminarProducto(producto);
    });
  });

  /* NUMERO EN BOTÓN CARRITO */

  let cant = document.querySelector("#cant");

  cant.textContent = carrito.reduce(
    (acc, prod) => acc + prod.cantidad,
    0
  );

  cant.innerHTML = cant.textContent;

  /* TOTALIZADOR */
  precioTotal.textContent = carrito.reduce(
    (acc, prod) => acc + prod.cantidad * prod.precio,
    0
  );

  localStorage.setItem("carrito", JSON.stringify(carrito));

  if (carrito.length === 0) {
    datosCliente.style.display="block";
    formulario.style.display="block";
    divCarrito.style.display="none";

  } else {
    datosCliente.style.display="none";
    formulario.style.display="none";
    divCarrito.style.display="block";
  }
}

// VACIAR CARRITO 

function limpiarCarrito() {
  swal({
    title: "¿Estás segur@?",
    text: "Eliminarás todos los elementos del carrito.",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      swal("Tu carrito está vacío.", {
        icon: "success",
      });
      carrito.length = [];
      localStorage.removeItem(carrito);
      mostrarCarrito();
    } else {
      swal("Tus productos siguen en el carrito.");
    }
  });
}

// CONFIRMAR COMPRA

function confirmarCompra() {
  swal({
    title: "¿Estás segur@?",
    text: "Estás a punto de confirmar tu compra.",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willBuy) => {
    if (willBuy) {
      swal("Esperá mientras te redirigimos al sitio de envíos y pagos.", {
        icon: "success",
        buttons: false,
      });
      

      setTimeout(() => {
        location.href = "../pages/pagos.html";
      }, 3500);
    } else {
      swal("Podés seguir agregando productos a tu carrito.");
    }
  });
}


