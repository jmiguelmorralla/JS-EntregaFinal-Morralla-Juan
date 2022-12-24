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
const torre = new crearProducto ("Torre", "Juguetes Olsen", "Argentina", "Madera", 2900, true);
const luna = new crearProducto ("Luna", "Confiture", "Argentina", "Madera", 5900, true);

const listadoProductos = [balancin, arcoiris, casita, rompecabezas, torre, luna];