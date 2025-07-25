import { SessionPayload } from "@/types/sessionPayload";
import Footer from "./ui/Footer";
import Header from "./ui/Header";
import MenuEsquerdo from "./ui/MenuEsquerdo";

export default function Template({ children, session }: { children: React.ReactNode, session:SessionPayload }) {

    return (
        <div className="h-screen">
            <Header />
            <div className="flex-row justify-between" >
                <MenuEsquerdo />
                <main className="h-screen">
                    {children}
                </main>
                <Footer />
            </div>
        </div>
    );
}