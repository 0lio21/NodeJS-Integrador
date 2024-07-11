const TaskModel = require("../models/Task.js");

const taskController = {
  /**
   * Obtiene todas las tareas de la base de datos
   * @route GET /tasks
   * @returns {Array<TaskModel>} 200 - Retorna un array de objetos con las tareas
   * @returns {Error} 500 - Retorna un objeto con el mensaje de error
   */
  getAllTasks: async (req, res) => {
    try {
      const tasks = await TaskModel.findAll();
      return res.status(200).json(tasks);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error al obtener las tareas" });
    }
  },

  /**
   * Obtiene una tarea por su nombre
   * @route GET /tasks/name/:name
   * @returns {TaskModel} 200 - Retorna un objeto con la tarea
   * @returns {Error} 500 - Retorna un objeto con el mensaje de error
   */
  getTaskByName: async (req, res) => {
    try {
      const { name } = req.params;
      const task = await TaskModel.findOne(
        {
          where: {
            name: name
          }
        });
      if (!task) {
        return res.status(404).json({ message: "Tarea no encontrada" });
      }
      return res.status(200).json(task);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error al obtener la tarea" });
    }
  },

  /**
   * Crea una nueva tarea
   * @route POST /tasks
   * @param {TaskModel} req.body - Datos de la nueva tarea
   * @returns {TaskModel} 200 - Retorna un objeto con la tarea creada
   * @returns {Error} 500 - Retorna un objeto con el mensaje de error
   */
  createTask: async (req, res) => {
    try {
      const { name, description } = req.body;
      const newTask = await TaskModel.create({ name, description });
      return res.status(201).json(newTask);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error al crear la tarea" });
    }
  },

  /**
   * Actualiza una tarea
   * @route PUT /tasks/:id
   * @param {TaskModel} req.body - Datos de la tarea a actualizar
   * @returns {TaskModel} 200 - Retorna un objeto con la tarea actualizada
   * @returns {Error} 500 - Retorna un objeto con el mensaje de error
   */
  updateTask: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      const task = await TaskModel.findByPk(id);
      if (!task) {
        return res.status(404).json({ message: "Tarea no encontrada" });
      }
      task.name = name;
      task.description = description;
      await task.save();
      return res.status(200).json(task);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error al actualizar la tarea" });
    }
  },

  /**
   * Actualiza el estado 'completed' de una tarea a true / false respectivamente
   * @param {TaskModel} req.query - El id de la tarea a actualizar 
   * @returns {TaskModel} 200 - Retorna un objeto con la tarea actualizada
   * @returns {Error} 500 - Retorna un objeto con el mensaje de error 
   */
  completeTask: async (req, res) => {
    try {
      const { id } = req.params;
      const task = await TaskModel.findByPk(id);
      if (!task) {
        return res.status(404).json({ message: "Tarea no encontrada" });
      }
      task.completed = !task.completed;
      await task.save();
      return res.status(200).json(task);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error al actualizar la tarea" });
    }
  },

  /**
   * Elimina una tarea
   * @route DELETE /tasks/:id
   * @returns {TaskModel} 200 - Retorna un objeto con la tarea eliminada
   * @returns {Error} 500 - Retorna un objeto con el mensaje de error
   */
  deleteTask: async (req, res) => {
    try {
      const { id } = req.params;
      const task = await TaskModel.findByPk(id);
      if (!task) {
        return res.status(404).json({ message: "Tarea no encontrada" });
      }
      await task.destroy();
      return res.status(200).json({ message: "Tarea eliminada" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error al eliminar la tarea" });
    }
  }
};

module.exports = taskController;
