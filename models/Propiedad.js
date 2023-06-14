import { DataTypes } from "sequelize";
import db from '../config/db.js'

const Propiedad = db.define('propiedades', {
    id: {
        type: DataTypes.UUID,
        defaulValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    titulo: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT("long"),
        allowNull: false
    },
    habitaciones: {
        type: DataTypes.INTEGER(),
        allowNull: false
    },
    wc: {
        type: DataTypes.INTEGER(),
        allowNull: false
    },
    garaje: {
        type: DataTypes.INTEGER(),
        allowNull: false
    },
    calle: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    lat: {
        type: DataTypes.STRING(),
        allowNull: false
    },
    lng: {
        type: DataTypes.STRING(),
        allowNull: false
    },
    imagen: {
        type: DataTypes.STRING(),
        allowNull: false
    },
    publicado: {
        type: DataTypes.BOOLEAN(),
        allowNull: false,
        defaulValue: false
    }

})

export default Propiedad;