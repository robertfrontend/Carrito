// variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');


// -----listeners-----
cargarEventListeners();

function cargarEventListeners(){
    // Dispara cuando se presiona agregar carrito
    cursos.addEventListener('click', comprarCurso);

    // cuando se eleminica un curso del carrito
    carrito.addEventListener('click', eleminarCurso)

    //vaciar carrito entero
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito)

    // al cargar documento, mostrar localStorage
    document.addEventListener('DOMContentLoaded', leerLocalStorage)
};

// ----funciones----

// funcion que añade el curso al carrito
function comprarCurso(e) {
    e.preventDefault();
    // delegation para agregar-carrito
    if(e.target.classList.contains('agregar-carrito')) {

        const curso = e.target.parentElement.parentElement;
        // enviamos el curso selecionado para tomar sus datos
        leerDatosCursos(curso);
    }
};

// lee los datos del curso
function leerDatosCursos(curso) {

    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    };
    
    insertarCarrito(infoCurso);
};

// muestra el curso seleccionado en el carrito
function insertarCarrito(curso) {

    const row = document.createElement('tr');

    row.innerHTML = ` 
        <td> 
            <img src="${curso.imagen}" >
        </td>
        <td> ${curso.titulo}</td>
        <td> ${curso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
    `;

    listaCursos.appendChild(row);

    guardarCursoLocalStorage(curso);

};

//elimina el curso del carrito en el DOM
function eleminarCurso(e) {
    e.preventDefault();

    let curso,
        cursoId;
    if(e.target.classList.contains('borrar-curso')){
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;
        cursoId = curso.querySelector('a').getAttribute('data-id');
    }
    eliminarCursoLocalStorage(cursoId);

}

//elminia los cursos del carrito en el DOM
function vaciarCarrito() {
    // forma lenta
    // listaCursos.innerHTML = '';
    //forma rapida (recomendada)
    while(listaCursos.firstChild) {
        listaCursos.removeChild(listaCursos.firstChild);
    }

    // vaciar localstorage
    vaciarLocalStorage();

    return false;
}
//almacena curso en el carrito en el localstorage
function guardarCursoLocalStorage(curso){
    let cursos;

    //toma el valor de una arrglo del local storage o vacio
    cursos = obtenerCursosLoscalStorage();
    
    //el curso selecionado se agrega al arreglo
    cursos.push(curso);

        localStorage.setItem('cursos', JSON.stringify(cursos));
}

// verfica que halla elementos en el localStorage
function obtenerCursosLoscalStorage() {
    let cursosLS;

    //comprobamos si hay algo en el localstorage
    if(localStorage.getItem('cursos') === null ){
        cursosLS = [];
    }else {
        cursosLS = JSON.parse(localStorage.getItem('cursos'));
    }
    return cursosLS;
}

// imprime los cursos de local storage en el carrito
function leerLocalStorage(){ 
    let cursosLS;

    cursosLS = obtenerCursosLoscalStorage();

    cursosLS.forEach(function(curso){
        // construir template
        const row = document.createElement('tr');

        row.innerHTML = ` 
            <td> 
                <img src="${curso.imagen}" >
            </td>
            <td> ${curso.titulo}</td>
            <td> ${curso.precio}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
            </td>
        `;
    
        listaCursos.appendChild(row);
    })

}

//elimina el curso por el id en el local storage
function eliminarCursoLocalStorage(curso){
    let cursosLS;
    //obtenemos el arreglo de cursos
    cursosLS = obtenerCursosLoscalStorage();
    // iteramos comparando el id del curso borrado con los del LS
    cursosLS.forEach(function(cursoLS, index){
       if(cursoLS.id === curso) {
           cursosLS.splice(index, 1);
       } 
    });
    // añadimos el arreglo actual al localstorage
    localStorage.setItem('cursos', JSON.stringify(cursosLS))

}

//vaciar local storage
function vaciarLocalStorage() {
    localStorage.clear();
}