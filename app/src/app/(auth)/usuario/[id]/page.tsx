
import { Usuario } from "@/types/usuario";
import React from "react";
import { getSession } from '@/lib/session'
import Template from "@/components/template";
import FormEditarUsuario from "@/components/forms/usuario";
import { SessionPayload } from "@/types/sessionPayload";

export default async function pageUsuarioEditar({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session :SessionPayload = await getSession()

    const response = await fetch(`http://127.0.0.1:8000/api/usuario/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${session?.token}`,
      },
    })
    
    const usuario: Usuario = await response.json();

    return (
        <Template session={session}>
            <FormEditarUsuario usuario={usuario} session={session} />
        </Template>
    )
}