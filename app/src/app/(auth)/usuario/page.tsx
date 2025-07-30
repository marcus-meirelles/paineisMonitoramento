/* 'use client'


import Template from "@/app/components/template";
import { Usuario } from "@/types/usuario";
import { useState, useEffect } from "react";
export default function listarUsuario() {
     const [usuarios, setUsuarios] = useState([])
    useEffect(() => {
        fetch('localhost:8000/api/usuarios')
            .then(res => res.json())
            .then(data => setUsuarios(data.usuarios))
    }, []) 
    return (
        <Template>

            <main>
                <h1>Todos os Usuários</h1>
                {/* <table className="border-separate border-spacing-3 border border-gray-400">
                <caption className="caption-top">
                Todos os Usuários
                </caption>
                <thead>
                <tr>
                <th className="border border-gray-300 dark:border-gray-600">Nome</th>
                <th className="border border-gray-300 dark:border-gray-600">E-mail</th>
                <th className="border border-gray-300 dark:border-gray-600">Ações</th>
                </tr>
                </thead>
                <tbody>
                {
                    usuarios?.map((usuario: Usuario) => (
                        <tr >
                        <td className="border border-gray-300 dark:border-gray-700">{usuario.username}</td>
                        <td className="border border-gray-300 dark:border-gray-700">{usuario.email}</td>
                        <td className="border border-gray-300 dark:border-gray-700">
                        <button >Editar</button><button>Apagar</button>
                        </td>
                        </tr>
                        ))
                        }
                        </tbody>
                        </table> }
            </main>
        </Template>
    )
} */