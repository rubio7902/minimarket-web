// Declaramos un arreglo vacío para almacenar los productos agregados al carrito
const carrito = [];

// Inicializamos el total del carrito en 0
let total = 0;

// Función para agregar un producto al carrito
function agregarAlCarrito(nombre, precio) {
  // Verificamos si el producto ya está en el carrito
  const existe = carrito.find(item => item.nombre === nombre);
  if (existe) {
    alert(`El producto "${nombre}" ya está en el carrito.`);
    return; // Salimos de la función si ya existe
  }

  // Si no existe, lo agregamos al carrito
  carrito.push({ nombre, precio });
  total += precio; // Sumamos el precio al total
  actualizarCarrito(); // Llamamos a la función para mostrar los cambios
}

// Función para eliminar un producto del carrito según su posición (índice)
function eliminarDelCarrito(indice) {
  if (carrito.length === 0) {
    alert("El carrito está vacío. No hay productos para eliminar.");
    return; // Evitamos eliminar si no hay nada
  }

  total -= carrito[indice].precio; // Restamos el precio del producto
  carrito.splice(indice, 1); // Eliminamos el producto del arreglo
  actualizarCarrito(); // Actualizamos la visualización
}

// Función para actualizar visualmente el contenido del carrito
function actualizarCarrito() {
  const lista = document.getElementById("carrito"); // Obtenemos la lista del DOM
  lista.innerHTML = ""; // Limpiamos la lista antes de volver a llenarla

  // Recorremos cada producto en el carrito para mostrarlo
  carrito.forEach((item, index) => {
    const li = document.createElement("li"); // Creamos un nuevo <li>
    li.textContent = `${item.nombre} - $${item.precio}`; // Mostramos nombre y precio

    // Creamos el botón "Eliminar"
    const btn = document.createElement("button");
    btn.textContent = "Eliminar";
    btn.onclick = () => eliminarDelCarrito(index); // Asignamos la acción
    li.appendChild(btn); // Añadimos el botón al <li>
    lista.appendChild(li); // Añadimos el <li> al carrito
  });

  // Mostramos el total actualizado
  document.getElementById("total").textContent = total;
}

// Evento para interceptar el envío del formulario de contacto
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form"); // Seleccionamos el formulario

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Evitamos que se envíe por defecto

    // Obtenemos los valores de los campos
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    // Validación 1: Nombre obligatorio
    if (nombre === "") {
      alert("El nombre no puede estar vacío.");
      return;
    }

    // Validación 2: Correo debe tener formato válido (ya validado por HTML, pero lo reforzamos)
    if (!email.includes("@") || !email.includes(".")) {
      alert("El correo electrónico no tiene un formato válido.");
      return;
    }

    // Validación 3: Teléfono debe tener 9 dígitos (lo reforzamos también)
    if (!/^[0-9]{9}$/.test(telefono)) {
      alert("El número de teléfono debe tener 9 dígitos.");
      return;
    }

    // Validación 4: Mensaje obligatorio
    if (mensaje === "") {
      alert("Debes escribir un mensaje.");
      return;
    }

    // Si todo está bien, mostramos un mensaje de éxito
    alert("Formulario enviado correctamente. ¡Gracias por contactarnos!");

    // Reiniciamos el formulario
    form.reset();
  });
});