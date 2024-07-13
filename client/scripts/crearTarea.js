document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formulario");
  
    formulario.addEventListener("submit", async (event) => {
      
      
      const name = formulario.elements["name"].value;
      const description = formulario.elements["description"].value;
  
      const task = {
        name: name,
        description: description,
      };

      console.log("Creando tarea:", task);
  
      try {
        const response = await fetch("http://127.0.0.1:8000/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(task),
        });
  
        if (response.ok) {
          console.log("Tarea registrada exitosamente");
        } else {
          console.error("Error al enviar la tarea");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });
  });
  