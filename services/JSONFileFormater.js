import fs from 'fs'


export default class JSONFileFormater {
    constructor(filePath)
    {
        this.filePath = filePath
    }

    async write(data)
    {
        const jsonData = JSON.stringify(data, null, 2);
        
        fs.writeFile(this.filePath, jsonData, err => {
            if (err) {
                throw new Error('Error at writing file:', err);
            }
        })
    }

    async read()
    {
        return new Promise((resolve, reject)=>{
            fs.readFile(this.filePath, 'utf-8', (err, data) => {
                if (err) reject('Error at reading file')

                if(data) resolve(JSON.parse(data))
                
                reject('File not found')
            })
        })
    }

    async getLastID()
    {
        return this.read()
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    return data[data.length - 1].id;
                } else {
                    return 0;
                }
            })
            .catch(() => 0);
    }
}