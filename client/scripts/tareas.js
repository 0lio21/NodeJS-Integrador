import { completarTarea, borrarTarea } from "./actualizarTarea.js";
/**
 * Obtiene las tareas de la base de datos
 * @returns {Array[Object]} - Un listado de tareas
 */
const obtenerTareas = async () => {
  const respuesta = await fetch('http://localhost:8000/tasks/', {
    method: 'GET'
  })
  const tareas = await respuesta.json()
  console.log(tareas);
  return tareas
}

console.log(obtenerTareas());
/**
 * Completa la lista <ul> con las tareas obtenidas
 */
const renderizarTareas = async () => {
  const tareas = await obtenerTareas();

  // Obtiene el elemento <ul> donde se agregarán las tareas
  let listaTareas = document.getElementById('lista-tareas');

  // Itera sobre cada tarea y crea un elemento <li> para cada una
  tareas.forEach(tarea => {
    let elemento = document.createElement('tr');

    elemento.innerHTML = `<td>${tarea.name}</td> <td>${tarea.description}</td> `;
    let td = document.createElement('td');
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = tarea.completed;
    checkbox.addEventListener('change', () => completarTarea(tarea.id));
    console.log(checkbox);
    let borrarElemento = document.createElement('button');
    borrarElemento.textContent = 'Borrar';
    borrarElemento.addEventListener('click', () => borrarTarea(tarea.id));
    borrarElemento.className = 'btn-danger'
    td.appendChild(checkbox);
    td.appendChild(borrarElemento);
    elemento.appendChild(td);
    listaTareas.appendChild(elemento);
  });
}

renderizarTareas();