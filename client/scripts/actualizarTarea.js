export const completarTarea = async (id) => {
    console.log(`Completando tarea con id: ${id}`);
    await fetch(`http://localhost:8000/tasks/${id}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
}

export const borrarTarea = async (id) => {
    console.log(`Borrando tarea con id: ${id}`);
    await fetch(`http://localhost:8000/tasks/${id}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        }
    )
}

export const actualizarTarea = (id) => {

    let tarea = document.getElementById(`${id}`);
    let editor = document.createElement('tr');
    let tds = tarea.getElementsByTagName('td');
    let tareaObjeto;
    if (tds.length >= 3) { // Asegurarse de que hay al menos 3 <td>
        tareaObjeto = {
            id: tds[0].innerText.trim(),
            nombre: tds[1].innerText.trim(),
            descripcion: tds[2].innerText.trim()
        };
        console.log(tareaObjeto);
    }
    tarea.style.display = 'none';
    let posicionId = document.createElement('td');
    let inputID = document.createElement('p');
    inputID.textContent = tareaObjeto.id;
    console.log(inputID.value);
    posicionId.appendChild(inputID);
    editor.appendChild(posicionId);

    let posicionNombre = document.createElement('td');
    let nombreInput = document.createElement('input');
    nombreInput.type = 'text';
    nombreInput.value = tareaObjeto.nombre;
    console.log(nombreInput.value);
    posicionNombre.appendChild(nombreInput);
    editor.appendChild(posicionNombre);

    let posicionDescripcion = document.createElement('td');
    let descripcionInput = document.createElement('input');
    descripcionInput.type = 'text';
    descripcionInput.value = tareaObjeto.descripcion;
    console.log(descripcionInput.value);
    posicionDescripcion.appendChild(descripcionInput);
    editor.appendChild(posicionDescripcion);

    let completadoInput = document.createElement('td');
    let botonCompletado = document.createElement('button');
    botonCompletado.textContent = 'Completar';
    botonCompletado.addEventListener('click', () => actualizarTareaEnBD(tareaObjeto.id, nombreInput.value, descripcionInput.value));
    botonCompletado.classList.add('btn-completado');
    completadoInput.appendChild(botonCompletado);
    editor.appendChild(completadoInput);
    tarea.parentNode.insertBefore(editor, tarea);


    const actualizarTareaEnBD = async (id, name, description) => {
        console.log(`Actualizando tarea con id: ${id}`);
        console.log(id , name , description);
        await fetch(`http://localhost:8000/tasks/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, description })
            }
        )
    }
}