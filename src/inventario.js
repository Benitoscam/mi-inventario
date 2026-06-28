// 1.  Estructura base

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// ARRAY DE OBJETOS - Estructura principal del inventario
// Cada producto es un objeto con: id, nombre, precio, stock

let inventario = [
  { id: 1, nombre: "Laptop Gamer", precio: 1200, stock: 15 },
  { id: 2, nombre: "Mouse Inalambrico", precio: 35.99, stock: 45 },
  { id: 3, nombre: "Teclado Mecanico", precio: 89.99, stock: 30 },
];

let siguienteId = 4;

// Agregar nuevo producto
function agregarProducto() {
  rl.question("\n Nombre del producto: ", (nombre) => {
    if (!nombre.trim()) {
      console.log("Error: El nombre no puede estar vacío");
      mostrarMenu();
      preguntarOpcion();
      return;
    }

    rl.question("\n Precio del producto: ", (precio) => {
      const precioNum = parseFloat(precio);
      if (isNaN(precioNum) || precioNum < 0) {
        console.log("Error: Precio debe ser un número mayor a 0");
        mostrarMenu();
        preguntarOpcion();
        return;
      }

      rl.question("\n Stock disponible: ", (stock) => {
        const stockNum = parseInt(stock);
        if (isNaN(stockNum) || stockNum <= 0) {
          console.log(
            "Error: Stock invalido, debe ser un número mayor o igual a 0",
          );
          mostrarMenu();
          preguntarOpcion();
          return;
        }

        // Usamos push() para agregar al final del array
        const nuevoProducto = {
          id: siguienteId++,
          nombre: nombre.trim(),
          precio: precioNum,
          stock: stockNum,
        };

        inventario.push(nuevoProducto);
        console.log(
          `\n Producto ${nombre} agregado con id: ${nuevoProducto.id}`,
        );
        mostrarMenu();
        preguntarOpcion();
      });
    });
  });
}

// Mostrar la lista de lo productos registrados
function listarProductos() {
  if (inventario.length === 0) {
    console.log(
      "\n El inventario esta vacío. Agregar productos usando la opción 1.",
    );
    mostrarMenu();
    preguntarOpcion();
    return;
  }

  console.log("\n LISTA DE PRODUCTOS");
  console.log("==========================================");

  // Usamos el foreach para recorrer el inventario
  inventario.forEach((producto) => {
    console.log(`   ID: ${producto.id}`);
    console.log(`   NOMBRE: ${producto.nombre}`);
    console.log(`   PRECIO: ${producto.precio}`);
    console.log(`   STOCK: ${producto.stock}`);
    console.log("==========================================");
  });

  // Mostrar resumen con map
  const nombres = inventario.map((p) => p.nombre);
  console.log(`\n Pruductos: ${nombres.join(" - ")}`);

  mostrarMenu();
  preguntarOpcion();
}

// Buscar producto por su nombre
function buscarProducto() {
  rl.question("\n Ingrese el nombre del producto: ", (terminoBusqueda) => {
    // Usamos filter para encontrar coincidencias
    const resultados = inventario.filter((producto) =>
      producto.nombre
        .toLowerCase()
        .includes(terminoBusqueda.trim().toLowerCase()),
    );

    if (resultados.length > 0) {
      console.log(`\n         Productos encontrados:  ${resultados.length}`);
      console.log("\n==========================================");
      resultados.forEach((producto) => {
        console.log(` ID: ${producto.id}`);
        console.log(` NOMBRE: ${producto.nombre}`);
        console.log(` PRECIO: ${producto.precio}`);
        console.log(` STOCK: ${producto.stock}`);
        console.log("\n==========================================");
      });
    } else {
      console.log("\n   🚨  No se encontraron coincidencias.");
    }
    // Si la propiedad filter encuentra o no una conciencia preguntara al usuario si quiere hacer otra búsqueda o no
    rl.question("\n Quieres buscar otro producto?  Y/N ", (respuesta) => {
      if (respuesta.toLocaleLowerCase() === "y") {
        buscarProducto();
      } else {
        mostrarMenu();
        preguntarOpcion();
      }
    });
  });
}

// Menú vidual para que puede elegir usuario
function mostrarMenu() {
  console.log("\n==========================================");
  console.log("|            GESTOR DE INVENTARIO        |");
  console.log("==========================================");
  console.log("1. Agregar producto");
  console.log("2. Listar producto");
  console.log("3. Buscar producto");
  console.log("4. Calcular valor total del producto");
  console.log("5. Eliminar producto");
  console.log("6. SALIR");
  console.log("==========================================");
}

// Controlar que el usuario ingrese el dato correcto que muestra en el menu
function preguntarOpcion() {
  rl.question("\n Elige una opción (1-6): ", (opcion) => {
    if (opcion === "6") {
      console.log(
        "\n ¡Hasta luego!, gracias por usar el gestor de inventario. \n",
      );
      rl.close();
      return;
    }
    // console.log(`\n Has seleccionado la opcion ${opcion}`);
    // console.log("Luego implementamos el switch para las demás funciones");
    switch (opcion) {
      case "1":
        agregarProducto();
        break;
      case "2":
        listarProductos();
        break;
      case "3":
        buscarProducto();
        break;
      default:
        console.log("\n Opción no valida o no implementada aún");
        mostrarMenu();
        preguntarOpcion();
    }
  });
}

// Mensaje de bienvenida al sistema de gestión de inventarios
function iniciarGestor() {
  console.log("\n ¡Bienvenido al gestor de inventario!");
  console.log(`Inventario actual: ${inventario.length} productos`);

  mostrarMenu();
  preguntarOpcion();
}

iniciarGestor();
