
import { Usuario } from "@/types/usuario";
import React from "react";
import { getSession } from '@/lib/session'
import Template from "@/components/template";
import FormEditarUsuario from "@/components/forms/usuario/editar";




export default async function pageEditar({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const token = (await getSession())?.token

    const response = await fetch(`http://127.0.0.1:8000/api/usuario/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
      },
    })
    
    const usuario: Usuario = await response.json();

    return (
        <Template>
            <FormEditarUsuario usuario={usuario} />
        </Template>
    )
}