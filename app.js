
// const {mostrarMenu, pausa} = require('./helpers/messages')
const { guardarDB, leerDB } = require('./helpers/repositorio');
const {inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, listadoTareasCompletar} = require('./helpers/inquirer')
const Tareas = require('./models/tareas')

const main = async () => {

    let opt = ''
    const tareas = new Tareas();
    const tareasDB = leerDB();
    if (tareasDB) tareas.cargarTareasDeArray(tareasDB)
    
    const options = {
        '1' : async () => {
            const res = await leerInput('Descripción')
            tareas.crearTarea(res)
        },
        '2' :  () => {
            tareas.mostrar()
        },
        '3' :  () => {
            tareas.mostrarPendientesCompletadas(true)
        },
        '4' :  () => {
            tareas.mostrarPendientesCompletadas(false)
        },
        '5' : async () => {
            const ids = await listadoTareasCompletar(tareas.listadoArr)
            tareas.toggleCompletadas(ids)
        },
        '6' : async () => {
            const id = await listadoTareasBorrar(tareas.listadoArr)
            if (id !== 0) {
                const ok = await confirmar(`¿Seguro que quieres eliminar la tarea?`)
                if (ok) tareas.borrarTarea(id)
            }
        },
        '0' : () => {}
    } 
    

    do{
        opt = await inquirerMenu()
        await options[opt]()
        guardarDB(tareas.listadoArr)
        await pausa()
    }while (opt !== 0)



}

main()