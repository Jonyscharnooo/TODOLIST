var tareas = [];
document.getElementById("AgregarTarea").addEventListener("click", function() {
    var texto = document.getElementById("texto").value;
    if (texto.trim() !== '') { 
        var nuevaTarea = {texto: texto, completada: false, fechaCreacion: new Date()};
        tareas.push(nuevaTarea); 
        actualizarListaTareas(); 
        document.getElementById("texto").value = ''; 
    } else {
        alert("Por favor, ingresa un texto valido :P"); 
    }
});
function actualizarListaTareas() {
    var lista = document.getElementById("listaTareas");
    lista.innerHTML = ''; 
    for (var i = 0; i < tareas.length; i++) {
        var tarea = tareas[i];
        var tareaHTML = document.createElement("span");
        tareaHTML.textContent = tarea.texto;

        if (tarea.completada) {
			var tareaCompletadaHTML = document.createElement("del");
			tareaCompletadaHTML.style.display = "block";
			tareaCompletadaHTML.appendChild(tareaHTML);
		  
			var fechaTachadoHTML = document.createElement("span");
			fechaTachadoHTML.textContent = ' (Tachado el ' + tarea.fechaTachado.toLocaleString() + ')';
		  
			tareaCompletadaHTML.appendChild(fechaTachadoHTML);
			lista.appendChild(tareaCompletadaHTML);
		  }
		else {
            var tareaPendienteHTML = document.createElement("li");
            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.dataset.indice = i;
            checkbox.checked = tarea.completada;
            tareaPendienteHTML.appendChild(checkbox);
            tareaPendienteHTML.appendChild(tareaHTML);

            var fechaCreacionHTML = document.createElement("span");
            fechaCreacionHTML.textContent = ' (Creada el ' + tarea.fechaCreacion.toLocaleString() + ')';

            tareaPendienteHTML.appendChild(fechaCreacionHTML);
            lista.appendChild(tareaPendienteHTML);
        }
    }
    actualizarEventosCheckbox();
}
function actualizarEstadoTarea(indice, completada) {
    var tarea = tareas[indice];
    tarea.completada = completada; 
    tarea.fechaTachado = completada ? new Date() : null; 
    actualizarListaTareas(); 
}
function actualizarEventosCheckbox() {
    var checkboxes = document.querySelectorAll('#listaTareas input[type="checkbox"]');
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener("change", function() {
            var indice = this.dataset.indice;
            var completada = this.checked;
            actualizarEstadoTarea(indice, completada);
        });
    }
}
document.getElementById("TareaMasRapida").addEventListener("click", function() {
    var tareaMasRapida = tareas.reduce(function(anterior, actual) {
        var tiempoAnterior = anterior.fechaTachado || anterior.fechaCreacion;
        var tiempoActual = actual.fechaTachado || actual.fechaCreacion;
        var tiempoDiferencia = tiempoAnterior - tiempoActual;
        return tiempoDiferencia < 0 ? anterior : actual;
    });
    alert("La tarea más rapida en terminar fue: " + tareaMasRapida.texto);
});
actualizarListaTareas();