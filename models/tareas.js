const Tarea = require('./tarea')
class Tareas {
    
    _listado = {};

    constructor(){
        this._listado = {}
    }

    get listadoArr() {
        const listado = Object.values(this._listado)
        return listado
    }

    cargarTareasDeArray(listado = []){
        listado.forEach(tarea => this._listado[tarea.id] = tarea)
    }
    
    crearTarea(desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    } 

    mostrar(listado = Object.values(this._listado)){
        listado.forEach((tarea, i) => {
            const num =  `${i + 1}`;
            (tarea.completadoEn) ? 
                console.log(`${num.brightGreen} ${tarea.desc} :: ${tarea.completadoEn.brightGreen} `)
            :
                console.log(`${num.brightYellow} ${tarea.desc} :: ${'Pendiente'.brightYellow} `)
        })
    }

    toggleCompletadas(ids = []){
        this.listadoArr.forEach(tarea =>{
            if (ids.includes(tarea.id)){ if (!tarea.completadoEn) tarea.completadoEn = new Date().toISOString() } 
            else {if (tarea.completadoEn) tarea.completadoEn = null}
        })
    }

    mostrarPendientesCompletadas (completadas = true){
        let listado = Object.values(this._listado)
        listado = listado.filter((tarea) => !!tarea.completadoEn == completadas)
        this.mostrar(listado)
    }

    borrarTarea(id = ''){
        if (this._listado[id]) delete this._listado[id]
    }

}
module.exports = Tareas