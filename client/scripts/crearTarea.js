document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formulario");
  
    formulario.addEventListener("submit", async (event) => {
      event.preventDefault();
      
      const name = formulario.elements["name"].value;
      const description = formulario.elements["description"].value;
  
      const task = {
        name: name,
        description: description,
      };
  
      try {
        const response = await fetch("http://10.0.14.235:3000/tasks", {
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
  