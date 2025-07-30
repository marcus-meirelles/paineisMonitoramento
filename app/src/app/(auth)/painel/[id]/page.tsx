import React from "react";
import { getSession } from '@/lib/session'
import Template from "@/components/template";
import { SessionPayload } from "@/types/sessionPayload";
import { Painel } from "@/types/painel";
import FormEditarPainel from "@/components/forms/painel/editar";

export default async function pagePainelEditar({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session :SessionPayload = await getSession()

    const response = await fetch(`http://127.0.0.1:8000/api/painel/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${session?.token}`,
      },
    })
    
    const painel: Painel = await response.json();

    return (
        <Template session={session}>
            <FormEditarPainel painel={painel} session={session} />
        </Template>
    )
}