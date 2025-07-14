import Footer from "./footer";
import Header from "./header";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header/>
                <main className="">
                    {children}
                </main>
            <Footer/>
        </>
    );
}