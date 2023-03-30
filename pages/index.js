import Layout from "../components/Layout";
import authContext from "../context/auth/authContext";
import appContext from "../context/app/appContext";
import { useContext, useEffect } from "react";
import Link from "next/link";
import Dropzone from "../components/Dropzone";
import Alerta from "../components/Alerta";

export default function Home() {
    const AuthContext = useContext(authContext);
    const { usuarioAutenticado } = AuthContext;

    const AppContext = useContext(appContext);
    const { mensaje_archivo, url } = AppContext;

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            usuarioAutenticado();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Layout>
            <div className={"md:w-4/5 xl:w-3/5 mx-auto mb-32"}>
                { url ?
                    (
                        <>
                            <p className={"text-center text-2xl mb-10"}><span className={"font-bold text-red-700 text-4xl uppercase"}>El enlace es:</span> <br/> {process.env.frontendURL + '/enlaces/' + url}</p>
                            <button
                                type={"button"}
                                className={"bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase w-full"}
                                onClick={() => navigator.clipboard.writeText(`${process.env.frontendURL}/enlaces/${url}`)}
                            >
                                Copiar enlace
                            </button>
                        </>
                    )
                    :
                    (
                       <>
                           { mensaje_archivo && (<Alerta />) }
                           <div className={"lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10"}>
                               <Dropzone />
                               <div className={"md:flex-1 mb-3 mx-2 mt-16 lg:mt-0"}>
                                   <h1 className={"text-4xl font-sans font-bold text-gray-800 my-4"}>Compartir archivos de forma sencilla y privada</h1>
                                   <p className={"text-lg leading-loose"}>
                                       <span className={"text-red-500 font-bold"}>ReactNodeSend</span> te permite compartir archivos con cifrado de extremo a extremo y un archivo que es eliminado después de ser descargado. Así que puedes mantener lo que compartes en privado y asegurarte de que tus archivos no permanezcan en línea para siempre.
                                   </p>
                                   <Link href={"/crear-cuenta"} className={"text-red-500 font-bold text-lg hover:text-red-600"}>Crea una cuenta para mayores beneficios</Link>
                               </div>
                           </div>
                       </>
                    )
                }
            </div>
        </Layout>
    )
}
