import React, { useReducer } from "react";
import appContext from "./appContext";
import appReducer from "./appReducer";
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
import clienteAxios from "../../config/axios";

const AppState = ({children}) => {
    const initialState = {
        mensaje_archivo: null,
        nombre: '',
        nombre_original: '',
        cargando: null,
        descargas: 1,
        password: '',
        autor: null,
        url: '',
    }

    const [state, dispatch] = useReducer(appReducer, initialState);

    const mostrarAlerta = msg => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: msg,
        });

        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA,
            })
        },5000)
    }

    const subirArchivo = async (data, nombreArchivo) => {
        dispatch({
            type: SUBIENDO_ARCHIVO,
        });

        try {
            const resultado = await clienteAxios.post('/api/archivos', data);
            // console.log(resultado.data);

            dispatch({
                type: SUBIR_ARCHIVO_EXITO,
                payload: {
                    nombre: resultado.data['archivo'],
                    nombre_original: nombreArchivo,
                },
            });
        } catch(e) {
            console.error(e);
            dispatch({
                type: SUBIR_ARCHIVO_ERROR,
                payload: e.response.data.msg,
            });
        }

        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA,
            })
        }, 5000);
    }

    const crearEnlace = async () => {
        const data = {
            nombre: state.nombre,
            nombre_original: state.nombre_original,
            descargas: state.descargas,
            password: state.password,
            autor: state.autor,
        }

        try {
            const resultado = await clienteAxios.post('/api/enlaces', data);
            dispatch({
                type: CREAR_ENLACE_EXITO,
                payload: resultado.data.msg
            });
        } catch(e) {
            console.error(e)
        }
    }

    const limpiarState = () => {
        dispatch({
            type: LIMPIAR_STATE
        })
    }

    const agregarPassword = password => {
        console.log(password);
        dispatch({
            type: AGREGAR_PASSWORD,
            payload: password,
        })
    }

    const agregarDescargas = descargas => {
        dispatch({
            type: AGREGAR_DESCARGAS,
            payload: descargas,
        })
    }

    return (
        <appContext.Provider
            value={{
                mensaje_archivo: state.mensaje_archivo,
                nombre: state.nombre,
                nombre_original: state.nombre_original,
                cargando: state.cargando,
                descargas: state.descargas,
                password: state.password,
                autor: state.autor,
                url: state.url,
                mostrarAlerta,
                subirArchivo,
                crearEnlace,
                limpiarState,
                agregarPassword,
                agregarDescargas,
            }}
        >
            {children}
        </appContext.Provider>
    )
}

export default AppState;