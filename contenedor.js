const fs = require ('fs')

class Contenedor {
    constructor (archivo){
        this.archivo = archivo
        this.init()
    }

    static countId = 0
    static lista = []

    init(){
        const archivo = fs.readFileSync(this.archivo)
        Contenedor.lista = JSON.parse(archivo)
        //Contenedor.countId = Contenedor.lista.length
        let max = 0
        Contenedor.lista.forEach((element) => {
            if (element.id > max) max = element.id
        })
        Contenedor.countId = max
        console.log(Contenedor.countId)

    }

    save(object){
        try{
            Contenedor.countId++
            object.id = Contenedor.countId
            Contenedor.lista.push(object)
            let string = JSON.stringify(Contenedor.lista)
            fs.writeFileSync(this.archivo, string)
            console.log(object.id)
            return object
        }
        catch{
            console.log('Hubo un error, no se pudo guardar')
        }   
    }

    async getById(id){
        let todos = await this.getAll()
        let elemento = todos.filter(element => element.id == id)

        if (elemento.length != 0) {
            const resultado = elemento
            return resultado
        } else {
            const resultado = {error:'producto no encontrado'}
            return resultado
        }   
    }

    async getAll(){
        try{
            const contenido = await fs.promises.readFile(this.archivo, 'utf-8')
            const contenidoStr = JSON.parse(contenido)
            return contenidoStr
        }
        catch{
            console.log("Hubo un error, no se puede leer el archivo")
        }
    }

    async updateById(id, obj){
        try{
            const index = Contenedor.lista.findIndex(element => element.id == id)
            obj.id = Contenedor.lista[index].id
            Contenedor.lista[index] = obj
            const nuevaListaJson = JSON.stringify(Contenedor.lista)
            await fs.promises.writeFile(this.archivo, nuevaListaJson)
            return nuevaListaJson
        }
        catch{
            console.log("Hubo un error, no se pudo actualizar elemento por id")
        }
    }

    async deleteById(id){
        try{
            const nuevaLista = Contenedor.lista.filter(element => element.id != id)
            console.log(nuevaLista)
            const nuevaListaJson = JSON.stringify(nuevaLista)
            await fs.promises.writeFile(this.archivo, nuevaListaJson)
            return nuevaListaJson
        }
        catch{
            console.log("Hubo un error, no se pudo eliminar elemento por id")
        }
    }

}



module.exports = Contenedor

