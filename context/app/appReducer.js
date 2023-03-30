import {
    MOSTRAR_ALERTA,
    LIMPIAR_ALERTA,
    SUBIR_ARCHIVO_EXITO,
    SUBIR_ARCHIVO_ERROR,
    SUBIENDO_ARCHIVO,
    CREAR_ENLACE_EXITO,
    CREAR_ENLACE_ERROR,
    LIMPIAR_STATE,
    AGREGAR_PASSWORD,
    AGREGAR_DESCARGAS,
} from "../../types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {
        case SUBIR_ARCHIVO_ERROR:
        case MOSTRAR_ALERTA:
            return {
                ...state,
                mensaje_archivo: action.payload,
                cargando: null,
            }
        case LIMPIAR_ALERTA:
            return {
                ...state,
                mensaje_archivo: null,
            }
        case SUBIR_ARCHIVO_EXITO:
            return {
                ...state,
                nombre: action.payload.nombre,
                nombre_original: action.payload.nombre_original,
                cargando: null,
            }
        case SUBIENDO_ARCHIVO:
            return {
                ...state,
                cargando: true,
            }
        case CREAR_ENLACE_EXITO:
            return {
                ...state,
                url: action.payload,
            }
        case LIMPIAR_STATE:
            return {
                ...state,
                mensaje_archivo: null,
                nombre: '',
                nombre_original: '',
                cargando: null,
                descargas: 1,
                password: '',
                autor: null,
                url: '',
            }
        case AGREGAR_PASSWORD:
            return {
                ...state,
                password: action.payload,
            }
        case AGREGAR_DESCARGAS:
            return {
                ...state,
                descargas: action.payload,
            }
        default:
            return state;
    }
}