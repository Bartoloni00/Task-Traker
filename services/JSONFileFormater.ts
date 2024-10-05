import * as fs from 'fs';
import { Task } from '../interfaces/interfaces.js';

export default class JSONFileFormater {
    filePath: string

    constructor(filePath: string)
    {
        this.filePath = filePath
    }

    async write(data: Task[]): Promise<void>
    {
        const jsonData = JSON.stringify(data, null, 2);
        
        fs.writeFile(this.filePath, jsonData, err => {
            if (err) {
                throw new Error('Error at writing file: ' + err.message);
            }
        })
    }

    async read(): Promise<Task[]>
    {
        return new Promise((resolve, reject)=>{
            fs.readFile(this.filePath, 'utf-8', (err, data) => {
                if (err) reject('Error at reading file')

                if(data) resolve(JSON.parse(data))
                
                reject('File not found')
            })
        })
    }

    async getLastID(): Promise<number> {
        try {
          const data = await this.read();
          if (Array.isArray(data) && data.length > 0) {
            return data[data.length - 1].id!; // el operador ! al final de la linea indica que sabemos que esto no retornara null
          } else {
            return 0;
          }
        } catch {
          return 0;
        }
      }
}