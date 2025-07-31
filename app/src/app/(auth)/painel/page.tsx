import React from "react";
import { getSession } from '@/lib/session'
import Template from "@/components/template";
import { SessionPayload } from "@/types/sessionPayload";
import TabelaPainel from "@/components/tabelas/painel";


export default async function pagePainel() {

    const session: SessionPayload = await getSession()

    const response = await fetch("http://127.0.0.1:8000/api/painel/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${session.token}`,
        },

    });

    const result = await response.json()

    return (
        <Template session={session}>
            <TabelaPainel lista={result} />
        </Template>
    )
}