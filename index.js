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
    let copAmount = document.getElementById('copInput').value;
    let usdRate = 0.00027; 
    let usdAmount = copAmount * usdRate;
    document.getElementById('usdResult').innerText = `${copAmount} COP = ${usdAmount.toFixed(2)} USD`;
}
function convertToCOP() {
    let usdAmount = document.getElementById('usdInput').value;
    let copRate = 3963.65; 
    let copAmount = usdAmount * copRate;
    document.getElementById('copResult').innerText = `${usdAmount} USD = ${copAmount.toFixed(2)} COP`;
}

///////////////////////

// Paso b: agrege notas iniciales
let notes = [
    { id: 1, title: "sacar la basura", text: "mi mama me va pegar si no lo hago", realizada: false },
    { id: 2, title: "tender la cama ", text: "premio de la navidad", realizada: true }
];
console.log(notes);
// Paso c: variable para el id de la nota
let idGlobal = notes.length > 0 ? notes[notes.length - 1].id : 0;

// Obtener elementos del DOM
let notesContainer = document.getElementById('notesContainer');
let noteTitleInput = document.getElementById('noteTitle');
let noteTextInput = document.getElementById('noteText');
let messageDiv = document.getElementById('message');
let searchTextInput = document.getElementById('searchText');
let filterDoneCheckbox = document.getElementById('filterDone');

// Paso e: Función para pintar las notas en forma de tarjetas
function pintarnotas() {
    notesContainer.innerHTML = '';
    if (notes.length === 0) {
        messageDiv.innerText = "NO HAY NOTAS PARA MOSTRAR";
    } else {
        notes.forEach(note => {
            let noteCard = document.createElement('div');
            noteCard.classList.add('note-card');
            noteCard.innerHTML = `
                <h3>${note.title}</h3>
                <p>${note.text}</p>
                <input type="checkbox" onclick="toggleDone(${note.id})" ${note.realizada ? 'checked' : ''}>
                <button onclick="deleteNote(${note.id})">Borrar nota</button>
            `;
            notesContainer.appendChild(noteCard);
        });
    }
}

// Pintar las notas inicialmente
pintarnotas();

// Paso f: Función para agregar una nueva nota
function addNote(title, text) {
    idGlobal++;
    notes.push({ id: idGlobal, title: title, text: text, realizada: false });
}

// Paso h: Función para guardar la nota desde el formulario
function saveNote() {
    let title = noteTitleInput.value.trim();
   let text = noteTextInput.value.trim();
    if (title !== '' && text !== '') {
        addNote(title, text);
        pintarnotas();
        noteTitleInput.value = '';
        noteTextInput.value = '';
        messageDiv.innerText = '';
    } else {
        messageDiv.innerText = 'Por favor completa todos los campos';
    }
}

// Paso i: Función para borrar una nota
function deleteNote(id) {
    notes = notes.filter(note => note.id !== id);
    pintarnotas();
}

// Paso m: Función para marcar como realizada/no realizada una nota
function toggleDone(id) {
    let noteIndex = notes.findIndex(note => note.id === id);
    if (noteIndex !== -1) {
        notes[noteIndex].realizada = !notes[noteIndex].realizada;
        pintarnotas();
    }
}

// Paso q: Función para filtrar por estado realizada
function filterByDone(array) {
    return array.filter(note => note.realizada);
}

// Paso p: Función para filtrar por texto
function filterByText(array, text) {
    if (!text) return array;
    text = text.trim().toLowerCase();
    return array.filter(note => 
        note.title.toLowerCase().includes(text) || 
        note.text.toLowerCase().includes(text)
    );
}

// Manejar cambios en los filtros
searchTextInput.addEventListener('input', applyFilters);
filterDoneCheckbox.addEventListener('change', applyFilters);

// Paso r: Función para aplicar los filtros
function applyFilters() {
    let filteredNotes = [...notes];
    let searchText = searchTextInput.value.trim();
    let showDoneOnly = filterDoneCheckbox.checked;
    
    filteredNotes = filterByText(filteredNotes, searchText);
    if (showDoneOnly) {
        filteredNotes = filterByDone(filteredNotes);
    }
    
    notes = filteredNotes;
    pintarnotas();
}
