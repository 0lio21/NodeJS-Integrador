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