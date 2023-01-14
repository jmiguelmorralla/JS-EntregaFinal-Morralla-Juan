//Constructor de productos.

class crearProducto {
    constructor(id, nombre, marca, origen, material, cantidad, precio, disponibilidad) {
        this.id = id;
        this.nombre = nombre;
        this.marca = marca;
        this.origen = origen;
        this.material = material;
        this.cantidad = cantidad;
        this.precio = precio;
        this.disponibilidad = disponibilidad;

        this.caption = function () {
            console.log(`${(this.nombre)} es un producto de primera calidad. La marca ${this.marca} presta mucha atención a las teminaciones, especialmente cuando el producto es de ${this.material}.`);
        };
    }
}

//Creación de productos.

const balancin = new crearProducto ("001", "Balancin", "Juguetes Olsen", "Argentina", "Madera", 1, 12000, true);
const arcoiris = new crearProducto ("002", "Arcoiris", "Juguetes Olsen", "Argentina", "Madera", 1, 7000, true);
const casita = new crearProducto ("003", "Casita", "Confiture", "Argentina", "Madera", 1, 4500, true);
const bloques = new crearProducto ("004", "Bloques", "Tak Tak","Argentina", "Madera", 1, 3000, true);
const torre = new crearProducto ("005", "Torre", "Juguetes Olsen", "Argentina", "Madera", 1, 2900, true);
const luna = new crearProducto ("006", "Luna", "Confiture", "Argentina", "Madera", 1, 5900, true);




const listadoProductos = [balancin, arcoiris, casita, bloques, torre, luna];

