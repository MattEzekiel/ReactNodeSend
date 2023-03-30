import React, { useState, useContext } from 'react';
import Layout from "../../components/Layout";
import clienteAxios from "../../config/axios";
import appContext from "../../context/app/appContext";
import Alerta from "../../components/Alerta";

export async function getServerSideProps({params}) {
    const { enlace } = params;
    const resultado = await clienteAxios.get(`/api/enlaces/${enlace}`);

    return {
        props: {
            enlace: resultado.data,
        }
    }
}

export async function getServerSidePaths() {
    const enlaces = await clienteAxios.get('/api/enlaces');

    return {
        paths: enlaces.data.enlaces.map(enlace => ({
            params: { enlace: enlace.url }
        })),
        fallback: false,
    }
}

function Enlace({enlace}) {
    const [tienePassword, setTienePassword] = useState(enlace.password);
    const [password, setPassword] = useState('');

    const AppContext = useContext(appContext);
    const { mostrarAlerta, mensaje_archivo } = AppContext;

    const verificarPassword = async e => {
        e.preventDefault();

        const data = {password}

        try {
            const resultado = await clienteAxios.post(`/api/enlaces/${enlace.enlace}`, data);
            setTienePassword(resultado.data.password);
        } catch(e) {
            console.error(e.response.data.msg);
            mostrarAlerta(e.response.data.msg);
        }
    }

    return(
        <Layout>
            { tienePassword ?
                (
                  <>
                      <h1 className={"text-4xl text-center text-gray-700 mb-4"}>Enlace Protegido</h1>
                      <div className={"w-full max-w-lg mx-auto"}>
                          <form
                              className={"bg-white founded shadow-md px-8 pt-6 pb-4 mb-4"}
                              onSubmit={e => verificarPassword(e)}
                          >
                              { mensaje_archivo && (<Alerta />) }
                              <p className={"mb-3 text-gray-600"}>Este enlace está protegido por una contraseña. <br/> Colocala a continuación</p>
                              <div className={"mb-4"}>
                                  <label
                                      className={"block text-black text-sm font-bold mb-2"}
                                      htmlFor={"password"}
                                  >Contraseña</label>
                                  <input
                                      type={"password"}
                                      name={"password"}
                                      id={"password"}
                                      placeholder={"Ingresa aquí la contraseña"}
                                      className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-lg border-5"}
                                      value={password}
                                      onChange={e => setPassword(e.target.value)}
                                  />
                              </div>
                              <input
                                  type={"submit"}
                                  className={"bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold hover:cursor-pointer transition transition-colors"}
                                  value={"Comprobar"}
                              />
                          </form>
                      </div>
                  </>
                )
                :
                (
                    <>
                        <h1 className={"text-4xl text-center text-gray-700"}>Descarga tu archivo:</h1>
                        <div className={"flex items-center justify-center mt-10"}>
                            <a
                                href={`${process.env.backendURL}/api/archivos/${enlace.archivo}`}
                                className={"bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer"}
                                download
                            >Descargar aquí</a>
                        </div>
                    </>
                )
            }
        </Layout>
    );
}

export default Enlace;