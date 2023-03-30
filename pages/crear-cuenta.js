import React, { useContext, useEffect } from 'react';
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from 'yup';
import authContext from "../context/auth/authContext";
import Alerta from "../components/Alerta";

function CrearCuenta() {
    const AuthContext = useContext(authContext);
    const { registrarUsuario, mensaje } = AuthContext;

    const formik = useFormik({
        initialValues: {
            nombre: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            nombre: Yup.string()
                .required('El nombre es obligatorio'),
            email: Yup.string()
                .email('El email no es válido')
                .required('El email es obligatorio'),
            password: Yup.string()
                .required('La contraseña no puede estar vacía')
                .min(8, "La contraseña debe tener un mínimo de 8 caracteres")
        }),
        onSubmit: valores => {
            registrarUsuario(valores);
        }
    });

    return (
        <Layout>
            <div className={"md:w-4/5 xl:w-3/5 mx-auto mb-32"}>
                <h1 className={"text-4xl font-sans font-bold text-gray-800 text-center my-4"}>Crear cuenta</h1>
                { mensaje && (
                    <Alerta />
                ) }
                <div className={"flex justify-center mt-5"}>
                    <div className={"max-w-lg w-full"}>
                        <form
                            className={"bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"}
                            onSubmit={formik.handleSubmit}
                        >
                            <div className={"mb-4"}>
                                <label
                                    htmlFor={"nombre"}
                                    className={"block text-black text-sm font-bold mb-2"}
                                >
                                    Nombre
                                </label>
                                <input
                                    type={"text"}
                                    id={"nombre"}
                                    name={"nombre"}
                                    placeholder={"Ingrese su nombre"}
                                    className={"shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-lg border-5"}
                                    value={formik.values.nombre}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                { formik.touched.nombre && formik.errors.nombre && (
                                    <div className={"my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4"}>
                                        <p className={"font-bold text-lg"}>Error:</p>
                                        <p className={"font-medium"}>{formik.errors.nombre}</p>
                                    </div>
                                ) }
                            </div>
                            <div className={"mb-4"}>
                                <label
                                    htmlFor={"email"}
                                    className={"block text-black text-sm font-bold mb-2"}
                                >
                                    Email
                                </label>
                                <input
                                    type={"email"}
                                    id={"email"}
                                    name={"email"}
                                    placeholder={"Ingrese su email"}
                                    className={"shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-lg border-5"}
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                { formik.touched.email && formik.errors.email && (
                                    <div className={"my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4"}>
                                        <p className={"font-bold text-lg"}>Error:</p>
                                        <p className={"font-medium"}>{formik.errors.email}</p>
                                    </div>
                                ) }
                            </div>
                            <div className={"mb-4"}>
                                <label
                                    htmlFor={"password"}
                                    className={"block text-black text-sm font-bold mb-2"}
                                >
                                    Contraseña
                                </label>
                                <input
                                    type={"password"}
                                    id={"password"}
                                    name={"password"}
                                    placeholder={"Ingrese su contraseña"}
                                    className={"shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-lg border-5"}
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                { formik.touched.password && formik.errors.password && (
                                    <div className={"my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4"}>
                                        <p className={"font-bold text-lg"}>Error:</p>
                                        <p className={"font-medium"}>{formik.errors.password}</p>
                                    </div>
                                ) }
                            </div>
                            <input
                                type={"submit"}
                                className={"bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold hover:cursor-pointer transition transition-colors"}
                                value={"Crear cuenta"}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default CrearCuenta;