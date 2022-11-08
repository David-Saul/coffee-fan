const contenedor = document.getElementById("contenedor");
const botonAgregar = document.getElementById("botonAgregar");
const botonBorrar = document.getElementById("botonBorrar");

/* Alert de bienvenida */
Swal.fire({
    title: 'Hola!',
    text: 'Bienvenid@ a nuestra tienda de café!',
    imageUrl: 'http://todocafe.es/wp-content/uploads/2020/10/cafe_espresso_expreso-1024x597.jpg',
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: 'Taza de espresso',
});

let carrito = [];

productos.forEach(producto => {
        let productoRender = document.createElement("div");
        productoRender.innerHTML = `
        <div class="card col-md-6 col-lg-6 col-xl-3 mx-auto mt-3 mb-3 p-2">
            <img src="${producto.imagen}" class="card-img-top" alt="">
            <div class="card-body">
                <h4 class="start__title4">${producto.nombre}</h4>
                <p class="card-text">Precio: $ ${producto.precio}</p>
            </div>
            <button class ="" id=${producto.id}>Agregar a Carrito</button>
        </div>
        `;
        contenedor.append(productoRender);
        const botonAgregar = document.getElementById(producto.id);
        botonAgregar.addEventListener("click", () => comprarProducto(producto))
    });


    let comprarProducto = (producto) => {
        let cafeExiste = carrito.find(item => item.id === producto.id);
        if(cafeExiste !== undefined){
            cafeExiste.precio = cafeExiste.precio + producto.precio;
            cafeExiste.cantidad = cafeExiste.cantidad ++; /* Uso del sumador */
        }else{
            carrito.push({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                imagen: producto.imagen,
                cantidad: 1,
            })
        }
        Swal.fire({
            title: "Añadido al carrito",
            icon: "success", 
        })
    localStorage.setItem("carrito", JSON.stringify(carrito));
    }

botonAgregar.addEventListener("click", () => console.log(carrito));


botonBorrar.addEventListener("click", () => {
    if (carrito.length === 0) {
        Swal.fire('El carrito esta vacio!', '', 'warning');
    } else {
        carrito.length = 0;
        carrito.innerText = carrito.length;
        localStorage.removeItem('carrito');
        carrito.innerHTML = '';
        Swal.fire('Vaciaste el carrito', '', 'error');
    }
});

