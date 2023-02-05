const inquirer = require('inquirer')
require('colors')

const choices =[
    {
        name  : `${'1.'.brightGreen} Crear tarea`,
        value : 1
    },
    {
        name  : `${'2.'.brightGreen} Mostrar tareas`,
        value : 2
    },
    {
        name  : `${'3.'.brightGreen} Mostrar tareas completadas`,
        value : 3
    },
    {
        name  : `${'4.'.brightGreen} Mostrar tareas pendientes`,
        value : 4
    },
    {
        name  : `${'5.'.brightGreen} Completar tarea(s)`,
        value : 5
    },
    {
        name  : `${'6.'.brightGreen} Borrar tarea`,
        value : 6 
    },
    {
        name : `${'0.'.brightGreen} Salir`,
        value : 0
    }
]

const opts = [
    {
        type : 'list',
        name : 'opt',
        message : 'Selecciona una opción',
        choices,
    }
]

const inquirerMenu = async () => {
    console.clear()
    console.log('----------------------------' .brightGreen)
    console.log('      Elija una opción      ' .brightWhite)
    console.log('----------------------------\n'.brightGreen)
    const {opt} = await inquirer.prompt(opts)
    return opt;
}

const continuar = [
    {
        type : 'input',
        name : 'enter',
        message : `Dale al ${'ENTER'.brightGreen} para continuar`
    }
]

const pausa = async () => {

    console.log('\n')
    await inquirer.prompt(continuar)     
}

const leerInput = async (message) => {

    const pregunta = [
        {
            type : 'input',
            name : 'desc',
            message,
            validate(value){
                return (value.length !== 0) || 'Necesito una descripción'
            }
        }
    ]

    const {desc} = await inquirer.prompt(pregunta)
    return desc
}


const listadoTareasBorrar = async (listadoArr = []) => {
    
    const choices = listadoArr.map(({desc, id}, i) => {

        const iColor = `${i + 1}.`.green; 

        return {
            name : `${iColor} ${desc}`,
            value : id
        }
    })
    
    choices.push({name : `${'0.'.green} Salir`, value : 0})

    const pregunta = [
        {
            type : 'list',
            name : 'itemDelete',
            message : 'Elige una tarea para borrar',
            choices
        }
    ]
    const {itemDelete} =  await inquirer.prompt(pregunta)
    return itemDelete;
}


const listadoTareasCompletar = async (listadoArr = []) => {
    
    const choices = listadoArr.map(({desc, id, completadoEn}, i) => {

        const iColor = `${i + 1}.`.green; 

        return {
            name : `${iColor} ${desc}`,
            value : id,
            checked : (!!completadoEn)
        }
    })
    const pregunta = [
        {
            type : 'checkbox',
            name : 'itemsCompleted',
            message : 'Elige las tareas completadas',
            choices
        }
    ]
    const {itemsCompleted} =  await inquirer.prompt(pregunta)
    return itemsCompleted
}

const confirmar = async (message) => {
    const pregunta = [
        {
            type : 'confirm',
            name : 'confirmar',
            message,
        }
    ]
    const {confirmar} = await inquirer.prompt(pregunta)
    return confirmar
}


module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    listadoTareasCompletar,
    confirmar,
}