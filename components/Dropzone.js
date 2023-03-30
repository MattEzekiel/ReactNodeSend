import React, { useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import appContext from "../context/app/appContext";
import authContext from "../context/auth/authContext";
import Formulario from "./Formulario";

function Dropzone() {
    const AppContext = useContext(appContext);
    const { mostrarAlerta, subirArchivo, crearEnlace, cargando } = AppContext;

    const AuthContext = useContext(authContext);
    const { usuario, autenticado } = AuthContext;

    const onDropRejected = () => {
        mostrarAlerta('No se pudo subir el  archivo. Sobre pasa el límite de 1MB, crea una cuenta para subir archivos más pesados.');
    }

    const onDropAccepted = useCallback(async (acceptedFiles) => {
        const formData = new FormData();
        formData.append('archivo', acceptedFiles[0]);
        
        subirArchivo(formData, acceptedFiles[0].path);
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({onDropAccepted, onDropRejected, maxSize: 1000000});

    const archivos = acceptedFiles.map( (archivo, index) => (
        // eslint-disable-next-line react/jsx-key
        <li
            key={index}
            className={"bg-white flex-1 py-3 px-4 mb-4 shadow-lg rounded"}>
            <p className={"font-bold text-xl"}>{archivo['path']}</p>
            <p className={"text-sm text-gray-500"}>{(Number(archivo['size']) / Math.pow(1024,2)).toFixed(2)} MB</p>
        </li>
    ) );

    return (
        <div className={"md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4"}>
            { acceptedFiles.length > 0 ?
                (
                    <div className={"mt-10 w-full"}>
                        <h2 className={"text-2xl font-bold text-center mb-4"}>Archivos:</h2>
                        <ul>
                            { archivos }
                        </ul>
                        { autenticado ?
                            (
                                <Formulario />
                            )
                            :
                            null
                        }
                        { cargando ?
                            (
                                <p className={"my-10 text-center text-gray-600"}>Subiendo archivo...</p>
                            )
                            :
                            (
                                <button
                                    type={"button"}
                                    className={"bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"}
                                    onClick={() => crearEnlace()}
                                >
                                    Crear Enlace
                                </button>
                            )
                        }
                    </div>
                )
                :
                (
                    <div {...getRootProps({ className: 'dropzone w-full py-32' })}>
                        <input
                            className={"h-100"}
                            { ...getInputProps() }
                        />
                        { isDragActive ?
                            (
                                <p className={"text-2xl text-center text-gray-600"}>Suelta aquí el archivo</p>
                            )
                            :
                            (
                                <div className={"text-center"}>
                                    <p className={"text-2xl text-center text-gray-600"}>Selecciona un archivo y arrastralo aquí</p>
                                    <button
                                        type={"button"}
                                        className={"bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"}
                                    >Selecciona archivos para subir</button>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </div>
    );
}

export default Dropzone;