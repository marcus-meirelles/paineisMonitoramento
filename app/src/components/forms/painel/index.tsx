"use client";

import { redirect } from 'next/navigation';
import { Button, Checkbox, Group, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { SessionPayload } from "@/types/sessionPayload";
import { useState, useEffect } from 'react';
import { Painel } from "@/types/painel";


export default function FormPainel({ painel, session }: { painel?: Painel, session: SessionPayload }) {

    const [value, setValue] = useState(painel?.nivelPermissao ? painel.nivelPermissao + '' : '0');

    const [usuarioAdmin, setUsuarioAdmin] = useState<boolean>();

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            id: painel?.id ? painel?.id : 0,
            nome: painel?.nome ? painel?.nome : '',
            descricao: painel?.descricao ? painel?.descricao : '',
            nivelPermissao: painel?.nivelPermissao ? painel?.nivelPermissao : 0,

        },
    });

    async function atualizar(values: {
        id: number,
        nome: string,
        descricao: string,
        nivelPermissao: number,
    }) {

        const token = session.token
        try {
            let response

            if(painel != undefined){

                response = await fetch(`http://127.0.0.1:8000/api/painel/${painel?.id}/`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${token}`,
                    },
                    method: "PUT",
                    body: JSON.stringify(values)
                },)

                 const result: Painel = await response.json()

                 redirect(`/painel/${result.id}`)
            }
            else{
                response = await fetch(`http://127.0.0.1:8000/api/painel/`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${token}`,
                    },
                    method: "POST",
                    body: JSON.stringify(values)
                },)

            }

        } catch (error) {
            console.log(error)
        }

        
        redirect(`/painel`)

    }

    return (
        <div className="flex flex-col space-y-4 rounded-md bg-white p-6 shadow-md border border-gray-200 mt-4 w-3/12">
            <h1 className="text-xl font-semibold text-content-emphasis">Painel {painel != undefined ? 'Editar' : 'Cadastrar'}</h1>
            <form onSubmit={form.onSubmit((values) => { return atualizar(values); })}>

                <input
                    type="hidden"
                    key={form.key('id')}
                    {...form.getInputProps('id')}
                />
                <TextInput
                    label="Nome"
                    key={form.key('nome')}
                    {...form.getInputProps('nome')}
                />
                <TextInput
                    withAsterisk
                    label="Descrição"
                    key={form.key('descricao')}
                    {...form.getInputProps('descricao')}
                />
                <Select
                    label="Nível Permissão"
                    value={value}
                    onChange={(_value, option) => { setValue(option.value) }}
                    data={[{ value: '0', label: '--' },
                    { value: '1', label: 'Baixo' },
                    { value: '2', label: 'Médio' },
                    { value: '3', label: 'Alto' }]}
                />
                <Group justify="flex-end" mt="md">
                    <Button type="submit">Salvar</Button>
                </Group>
            </form>
        </div>
    )
}
