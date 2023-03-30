import React, { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    LIMPIAR_ALERTA,
    LOGIN_ERROR,
    LOGIN_EXITOSO,
    USUARIO_AUTENTICADO,
    CERRAR_SESION,
} from "../../types";
import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/tokenAuth";

const AuthState = ({children}) => {
    const initialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('token') : '',
        autenticado: null,
        usuario: null,
        mensaje: null,
    }

    const [state, dispatch] = useReducer(authReducer, initialState);

    const registrarUsuario = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/usuarios', datos);
            /**
             * @typedef {Object} Respuesta
             * @property {string} msg - Mensaje de respuesta
             */
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data.msg
            });
        } catch(e) {
            console.error(e.response.data.msg);
            dispatch({
                type: REGISTRO_ERROR,
                payload: e.response.data.msg
            });
        }

        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA,
            })
        }, 5000);
    }

    const iniciarSesion = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/auth', datos);

            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data.token,
            });

        } catch(e) {
            console.error(e.response);
            dispatch({
                type: LOGIN_ERROR,
                payload: e.response.data.msg,
            });
        }

        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA,
            })
        }, 5000);
    }

    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            tokenAuth(token);
        }

        try {
            const respuesta = await clienteAxios.get('/api/auth');
            if (respuesta.data.usuario) {
                dispatch({
                    type: USUARIO_AUTENTICADO,
                    payload: respuesta.data.usuario,
                });
            }
        } catch (e) {
            console.error(e.response);
            dispatch({
                type: LOGIN_ERROR,
                payload: e.response.data.msg,
            });
        }
    }

    const cerrarSession = () => {
        dispatch({
            type: CERRAR_SESION,
        })
    }

    return (
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                registrarUsuario,
                usuarioAutenticado,
                iniciarSesion,
                cerrarSession,
            }}
        >
            {children}
        </authContext.Provider>
    )
}

export default AuthState;