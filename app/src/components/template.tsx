import { SessionPayload } from "@/types/sessionPayload";
import Footer from "./ui/Footer";
import Header from "./ui/Header";
import MenuEsquerdo from "./ui/MenuEsquerdo";
import { Grid, GridCol } from '@mantine/core';

export default function Template({ children, session }: { children: React.ReactNode, session: SessionPayload }) {
    return (
        <div className="h-screen">
            <Header session={session} />
            
                <Grid columns={20}>
                    <GridCol span={2}>
                        <MenuEsquerdo session={session} />
                    </GridCol>
                    <GridCol span={18}>
                        <main className="h-185">
                            {children}
                        </main>
                    </GridCol>
                </Grid>
                <Footer />
        </div >
    );
}