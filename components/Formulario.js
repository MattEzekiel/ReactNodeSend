import React, {useContext, useState} from 'react';
import appContext from "../context/app/appContext";

function Formulario() {
    const [mostrarPassword, setMostrarPassword] = useState(false);

    const AppContext = useContext(appContext);
    const { agregarPassword, agregarDescargas } = AppContext;

    return (
        <div className={"w-full mt-20"}>
            <div>
                <label
                    className={"text-lg text-gray-800"}
                    htmlFor={"eliminar"}
                >Eliminar</label>
                <select
                    className={"appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500"}
                    name={"eliminar"}
                    id={"eliminar"}
                    onChange={e => agregarDescargas(parseInt(e.target.value))}
                >
                    <option disabled selected>-- Seleccione --</option>
                    <option value="1">1 Descarga</option>
                    <option value="5">5 Descargas</option>
                    <option value="10">10 Descargas</option>
                    <option value="20">20 Descargas</option>
                    <option value="50">50 Descargas</option>
                </select>
            </div>
            <div className={"mt-4"}>
                <div className={"flex justify-between items-center"}>
                    <label
                        className={"text-lg text-gray-800 mr-2"}
                        htmlFor={"password"}
                    >Proteger con contraseña</label>
                    <input
                        type={"checkbox"}
                        onChange={() => setMostrarPassword(!mostrarPassword)}
                    />
                </div>
                { mostrarPassword && (
                    <input
                        type={"password"}
                        className={"appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500"}
                        onChange={e => agregarPassword(e.target.value)}
                    />
                ) }
            </div>
        </div>
    );
}

export default Formulario;