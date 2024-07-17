function calcularIMC() {
    let peso = document.getElementById('peso').value;
    let altura = document.getElementById('altura').value / 100;

    if (peso === '' || altura === '') {
        alert('Por favor, complete todos los campos.');
        return;
    }

    let imc = peso / (altura * altura);

    let resultadoIMC = document.getElementById('resultado');
    resultadoIMC.innerHTML = '<h2>Su IMC es: ' + imc.toFixed(2) + '</h2>';
    resultadoIMC.innerHTML += '<p>Clasificación: ' + clasificarIMC(imc) + '</p>';
}

function clasificarIMC(imc) {
    if (imc < 18.5) {
        return 'Bajo peso';
    } else if (imc < 25) {
        return 'Normal';
    } else if (imc < 30) {
        return 'Sobrepeso';
    } else {
        return 'Obesidad';
    }
}
function convertToUSD() {
    let PesoColombiano = document.getElementById('copInput').value;
    let Dolar = 0.00027; 
    let dolarAmericano = PesoColombiano * Dolar;
    document.getElementById('dolarResultado').innerText = `${PesoColombiano} COP = ${dolarAmericano.toFixed(2)} USD`;
}
function convertToCOP() {
    let dolarAmericano = document.getElementById('dolarInput').value;
    let Pesoc = 3963.65; 
    let PesoColombiano = dolarAmericano * Pesoc;
    document.getElementById('copResultado').innerText = `${dolarAmericano} USD = ${PesoColombiano.toFixed(2)} COP`;
}

let notas = [
    { id: 1, titulo: "sacar la basura", texto: "mi mama me va pegar si no lo hago", realizada: false },
    { id: 2, titulo: "tender la cama", texto: "premio de la navidad", realizada: true }
];
console.log(notas);

let idGlobal = notas.length > 0 ? notas[notas.length - 1].id : 0;

let contenedorNotas = document.getElementById('notasc');
let entradaTituloNota = document.getElementById('titulo3');
let entradaTextoNota = document.getElementById('texto3');
let divMensaje = document.getElementById('mensaje');
let entradaTextoBusqueda = document.getElementById('Buscarnotas');
let checkboxFiltrarRealizadas = document.getElementById('tarjetasrealizadas');



function agregarNota(titulo, texto) {
    idGlobal++;
    notas.push({ id: idGlobal, titulo: titulo, texto: texto, realizada: false });
}


function guardarNota() {
    let titulo = entradaTituloNota.value.trim();
    let texto = entradaTextoNota.value.trim();
    if (titulo !== '' && texto !== '') {
        agregarNota(titulo, texto);
        pintarNotas();
        entradaTituloNota.value = '';
        entradaTextoNota.value = '';
        divMensaje.innerText = '';
    } else {
        divMensaje.innerText = 'Por favor completa todos los campos';
    }
}
function pintarNotas() {
    contenedorNotas.innerHTML = '';
    if (notas.length === 0) {
        divMensaje.innerText = "NO HAY NOTAS PARA MOSTRAR";
    } else {
        notas.forEach(nota => {
            let tarjetaNota = document.createElement('div');
            tarjetaNota.classList.add('note-card');
            tarjetaNota.innerHTML = `
                <h3>${nota.titulo}</h3>
                <p>${nota.texto}</p>
                <input type="checkbox" onclick="toggleRealizada(${nota.id})" ${nota.realizada ? 'checked' : ''}>
                <button onclick="borrarNota(${nota.id})">Borrar nota</button>
            `;
            contenedorNotas.appendChild(tarjetaNota);
        });
    }
}

pintarNotas();
function borrarNota(id) {
    notas = notas.filter(nota => nota.id !== id);
    pintarNotas();
}

function toggleRealizada(id) {
    let indiceNota = notas.findIndex(nota => nota.id === id);
    if (indiceNota !== -1) {
        notas[indiceNota].realizada = !notas[indiceNota].realizada;
        pintarNotas();
    }
}

function filtrarPorRealizadas(array) {
    return array.filter(nota => nota.realizada);
}

function filtrarPorTexto(array, texto) {
    if (!texto) return array;
    texto = texto.trim().toLowerCase();
    return array.filter(nota => 
        nota.titulo.toLowerCase().includes(texto) || 
        nota.texto.toLowerCase().includes(texto)
    );
}

entradaTextoBusqueda.addEventListener('input', aplicarFiltros);
checkboxFiltrarRealizadas.addEventListener('change', aplicarFiltros);

function aplicarFiltros() {
    let notasFiltradas = [...notas];
    let textoBusqueda = entradaTextoBusqueda.value.trim();
    let mostrarSoloRealizadas = checkboxFiltrarRealizadas.checked;
    
    notasFiltradas = filtrarPorTexto(notasFiltradas, textoBusqueda);
    if (mostrarSoloRealizadas) {
        notasFiltradas = filtrarPorRealizadas(notasFiltradas);
    }
    
    notas = notasFiltradas;
    pintarNotas();
}