import { exit } from 'node:process';
import categorias from "./categorias.js";
import precios from './precios.js';
import usuarios from './usuarios.js';
import db from "../config/db.js";
import { Categoria, Precio, Usuario } from "../models/index.js"

const importarDatos = async () => {
    try {
        //Autenticar en bbdd
        await db.authenticate()
        //Generar las columnas
        await db.sync()
        //Insertamos datos
        //Ambos inician al mismo tiempo ya que no dependen el uno del otro
        await Promise.all([
            Categoria.bulkCreate(categorias),
            Precio.bulkCreate(precios),
            Usuario.bulkCreate(usuarios)
        ])
        console.log('Datos importados correctamente')
        //El código exit 0 o sin número es porque finaliza la ejecución con éxito
        exit()
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

const eliminarDatos = async () => {
    try {
        await db.sync({ force: true })
        //otra forma de eliminar los datos es
        //await Promise.all([
        //Categoria.destroy({ where: {}, truncate: true }),
        //Precio.destroy({ where: {}, truncate: true })
        // ])
        console.log('Datos eliminados correctamente');
        exit()
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
//La posición del array hace referencia a los argumentos del package.json de la linea 14 : "db:importar":"node ./seed/seeder.js -i"
if (process.argv[2] === "-i") {
    importarDatos();
}
if (process.argv[2] === "-e") {
    eliminarDatos();
}