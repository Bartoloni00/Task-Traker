import JSONFileFormater from '../services/JSONFileFormater.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Convertir la URL del archivo actual a un directorio y filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Usar __dirname para construir la ruta al archivo JSON
const JSONFile = new JSONFileFormater(path.join(__dirname, '../tasks.json'));


export default class TaskModel
{
    /**
     * Agregar una tarea
     * @param {String} description 
     * @returns {Number} id
     */
    static async add(description)
    {
        const newData = await this.#dataFormater({
            description: description
        })

        return JSONFile.read()
            .then(async data => {
                await JSONFile.write([...data,{...newData}])
                return {
                    message: `Task added successfully (ID: ${newData.id})`,
                    task: {...newData}
                }
            })
            .catch(async err => {
                await JSONFile.write([{...newData}])
                return {
                    message: `Task added successfully (ID: ${newData.id})`,
                    task: {...newData}
                }
            })
    }

    /**
     * Actualizar la descripcion de una tarea
     * @param {Number} id 
     * @param {String} newDescription 
     */
    static async update(id, newDescription)
    {
        const data = await JSONFile.read()

        let message = 'Task not found'

        for (let i = 0; i < data.length; i++) {
            if (data[i].id == id) {
                data[i].description = newDescription
                message = 'Task updated'
            }
        }
        
        JSONFile.write(data)
        return message   
    }

    /**
     * Eliminar una tarea
     * @param {Number} id 
     */
    static async delete(id)
    {
        const data = await JSONFile.read()

        let message = 'Task not found'
        let dataFormated = []

        for (let i = 0; i < data.length; i++) {
            if (data[i].id != id) {
                dataFormated.push(data[i])
            } else {
                message = 'Task deleted'
            }
        }
        
        JSONFile.write(dataFormated)
        return message
    }

    /**
     * Cambiar el estado de una tarea
     * @param {Number} id 
     * @param {String} newStatus 
     */
    static async changeStatus(id, newStatus)
    {
        const data = await JSONFile.read()

        let message = 'Task not found'

        for (let i = 0; i < data.length; i++) {
            if (data[i].id == id) {
                data[i].status = newStatus
                message = 'Task state updated'
            }
        }
        
        JSONFile.write(data)
        return message  
    }

    /**
     * Lista todas las tareas que tenemos registradas
     * @param {string} arg Se puede filtrar por el estado de la tarea: done | todo | in-progress
     */
    static async list(filter = 'all')
    {
        const data = await JSONFile.read()

        if(filter == 'all' || !filter) return data

        let message = `Tasks with (STATE: ${filter}) NOT FOUND`
        let dataFiltered = []

        for (let i = 0; i < data.length; i++) {
            if (data[i].status == filter) {
                dataFiltered.push(data[i])
                message = null
            }
        }
        
        return message ?? dataFiltered
    }

    static async #dataFormater({id, description, status = 'todo'}){
        if (!id) {
             id = await JSONFile.getLastID()
                .then(lastId => id = lastId + 1)
        }
        return {
            id: id,
            description: description,
            status: status
        }
    }
}