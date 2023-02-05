const fs = require('fs')

const path = './db/data.JSON'

const guardarDB = (data) => {
    fs.writeFileSync(path, JSON.stringify(data))
}

const leerDB = () => {
    if (!fs.existsSync(path)) return ;
    const info = fs.readFileSync(path, {encoding:'utf-8'})
    return JSON.parse(info)
}

module.exports = {
    guardarDB,
    leerDB,
}