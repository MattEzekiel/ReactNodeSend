import Head from "next/head";
import Header from "./Header";
function Layout({children}) {
    return (
        <>
            <Head>
                <title>React - NodeSend</title>
            </Head>
            <div className={"bg-gray-100 min-h-screen"}>
                <div className={"container mx-auto"}>
                    <Header />
                    <main className={"pt-20"}>
                        {children}
                    </main>
                </div>
            </div>
            <footer>

            </footer>
        </>
    );
}

export default Layout;