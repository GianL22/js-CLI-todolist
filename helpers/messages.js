require('colors')
const readline = require('readline')

const mostrarMenu =  () =>{
    return new Promise((resolve) => {
        console.clear()
        console.log('----------------------------' .brightGreen)
        console.log('      Elija una opción      ' .brightWhite)
        console.log('----------------------------\n'.brightGreen)
    
        console.log(`${'1.'.brightGreen} Crear tarea`)
        console.log(`${'2.'.brightGreen} Mostrar tareas`)
        console.log(`${'3.'.brightGreen} Mostrar tareas completadas`)
        console.log(`${'4.'.brightGreen} Mostrar tareas pendientes`)
        console.log(`${'5.'.brightGreen} Completar tarea`)
        console.log(`${'6.'.brightGreen} Borrar tarea`)
        console.log(`${'0.'.brightGreen} salir \n`)
        
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
    
        rl.question('\n? Selecciona una opción ', (res) => {
            resolve(res)
            rl.close()
        })  
    })

}

const pausa = () => {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
    
        rl.question(`\nPresiona ${'ENTER'.brightGreen} para continuar \n`, (res) => {
            rl.close()
            resolve()
        })  
    })
}


module.exports = {
    mostrarMenu,
    pausa,
}