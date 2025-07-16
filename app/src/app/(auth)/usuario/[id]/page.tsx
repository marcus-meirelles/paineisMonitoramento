import FormEditarUsuario from "@/app/components/forms/usuario/editar";
import { Usuario } from "@/types/usuario";
import React from "react";
import { getAuthToken } from "../../../data/services/get-token";


export default async function pageEditar({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const authToken = await getAuthToken();

    const response = await fetch(`http://localhost:8000/api/usuario/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${authToken}`,
      },
    })
    
    const usuario: Usuario = await response.json();

    return (
        <main>
            <FormEditarUsuario usuario={usuario} />
        </main>
    )
}