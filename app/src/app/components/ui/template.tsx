import Footer from "./footer";
import Header from "./header";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
    <div className="flex flex-col h-screen justify-between">
            <Header/>
            <main className="h-screen">
                {children}
            </main>
            <Footer/>
        </div>
    );
}