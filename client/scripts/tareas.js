/**
 * Obtiene las tareas de la base de datos
 * @returns {Array[Object]} - Un listado de tareas
 */
const obtenerTareas = async () => {
  const respuesta = await fetch('http://localhost:8000/tasks/', {
    method: 'GET'
  })
  const tareas = await respuesta.json()

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
    let elemento = document.createElement('li');
    elemento.innerHTML = `${tarea.name}: ${tarea.description} Completado: ${tarea.completed}`;
    listaTareas.appendChild(elemento);
  });
}

renderizarTareas();