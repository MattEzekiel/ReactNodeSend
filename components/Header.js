import React, { useContext, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import authContext from "../context/auth/authContext";
import appContext from "../context/app/appContext";
import { useRouter } from "next/router";

function Header() {
    const router = useRouter();

    const AuthContext = useContext(authContext);
    const { usuarioAutenticado, usuario, cerrarSession } = AuthContext;

    const AppContext = useContext(appContext);
    const { limpiarState } = AppContext;

    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const redireccionar = () => {
        router.push('/');
        limpiarState();
    }

    return (
        <header className={"py-8 flex flex-col md:flex-row item-center justify-between"}>
            <Image onClick={() => redireccionar()} width={200} height={100} className={"w-64 mb-8 md:mb-0 cursor-pointer"} src={"/logo.svg"} alt={"Logo"} priority/>
            <div className={"flex flex-row flex-wrap gap-3"}>
                { usuario ?
                    (
                        <div className={"flex gap-5 items-center"}>
                            <p>Hola {usuario.nombre}</p>
                            <button
                                type={"button"}
                                className={"bg-black px-5 py-3 rounded-lg text-white font-bold uppercase"}
                                onClick={() => cerrarSession()}
                            >Cerrar Sesión</button>
                        </div>
                    )
                    :
                    (
                     <>
                         <Link
                             href={"/login"}
                             className={"bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase"}
                         >
                             Iniciar Sesión
                         </Link>
                         <Link
                             href={"/crear-cuenta"}
                             className={"bg-black px-5 py-3 rounded-lg text-white font-bold uppercase"}
                         >
                             Crear Cuenta
                         </Link>
                     </>
                    )
                }
            </div>
        </header>
    );
}

export default Header;