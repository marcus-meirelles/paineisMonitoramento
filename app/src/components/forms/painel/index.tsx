"use client";

import { redirect } from 'next/navigation';
import { Button, Checkbox, Group, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { SessionPayload } from "@/types/sessionPayload";
import { useState, useEffect } from 'react';
import { Painel } from "@/types/painel";


export default function FormPainel({ painelEditar, session }: { painelEditar?: Painel, session: SessionPayload }) {

    const [valueNivelPermissao, setValueNivelPermissao] = useState(painelEditar?.nivelPermissao ? painelEditar.nivelPermissao + '' : '0');

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            id: painelEditar?.id ? painelEditar?.id : 0,
            nome: painelEditar?.nome ? painelEditar?.nome : '',
            descricao: painelEditar?.descricao ? painelEditar?.descricao : '',
            nivelPermissao: painelEditar?.nivelPermissao ? painelEditar?.nivelPermissao : 0,

        },
        validate: {
            nivelPermissao: (value) => (value != 0 ? 'Escolha um nivel de permissão' : null),
        },
    });

    async function acao(values: {
        id: number,
        nome: string,
        descricao: string,
        nivelPermissao: number,
    }) {

        const token = session.token
        try {
            let response

            if (painelEditar) {

                response = await fetch(`http://127.0.0.1:8000/api/painel/${values?.id}/`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${token}`,
                    },
                    method: "PUT",
                    body: JSON.stringify({
                        "id": values.id,
                        "nome": values.nome,
                        "descricao": values.descricao,
                        "nivelPermissao": valueNivelPermissao == '0' ? null : valueNivelPermissao,
                    })
                },)

                const result: Painel = await response.json()

                redirect(`/painel/${result.id}`)
            }
            else {

                response = await fetch(`http://127.0.0.1:8000/api/painel/`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${token}`,
                    },
                    method: "POST",
                    body: JSON.stringify({
                        "nome": values.nome,
                        "descricao": values.descricao,
                        "nivelPermissao": valueNivelPermissao == '0' ? null : valueNivelPermissao,
                    })
                },)

            }

        } catch (error) {
            console.log(error)
        }
        redirect(`/painel`)
    }

    return (
        <div className="flex flex-col space-y-4 rounded-md bg-white p-6 shadow-md border border-gray-200 mt-4 w-3/12">
            <h1 className="text-xl font-semibold text-content-emphasis">Painel {painelEditar != undefined ? 'Editar' : 'Cadastrar'}</h1>
            <form onSubmit={form.onSubmit((values) => { return acao(values); })}>

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
                    label="Descrição"
                    key={form.key('descricao')}
                    {...form.getInputProps('descricao')}
                />
                <Select
                    required
                    label="Nível Permissão"
                    key="nivelPermissao"
                    value={valueNivelPermissao}
                    onChange={(_value, option) => { setValueNivelPermissao(option.value) }}
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
