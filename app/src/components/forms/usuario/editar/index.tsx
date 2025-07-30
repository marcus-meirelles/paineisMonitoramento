"use client";

import { Usuario } from "@/types/usuario";
import { redirect } from 'next/navigation';
import { Button, Checkbox, Group, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { SessionPayload } from "@/types/sessionPayload";
import { useState, useEffect } from 'react';


export default function FormEditarUsuario({ usuario, session }: { usuario: Usuario, session: SessionPayload }) {

    const [value, setValue] = useState(usuario.nivelPermissao ? usuario.nivelPermissao + '' : '0');

    const [usuarioAdmin, setUsuarioAdmin] = useState<boolean>();

    useEffect(() => {
        setUsuarioAdmin(usuario.username == 'admin' ? true : false)
    },)

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            username: usuario.username,
            email: usuario.email,
            nivelPermissao: usuario.nivelPermissao,
            is_superuser: usuario.is_superuser,
            is_active: usuario.is_active
        },
    });

    async function atualizar(values: {
        username: string;
        email: string;
        nivelPermissao: number;
        is_superuser: boolean;
        is_active: boolean;
    }) {

        const user = {
            "id": usuario.id,
            "username": values.username,
            "password": usuario.password,
            "email": values.email,
            "nivelPermissao": values.nivelPermissao == 0 ? null : values.nivelPermissao,
            "is_superuser": values.is_superuser,
            "is_active": values.is_active
        }

        const token = session.token
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/usuario/${user.id}/`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
                method: "PUT",
                body: JSON.stringify(user)
            },)

        } catch (error) {
            console.log(error)
        }

        redirect(`/usuario/${usuario.id}`)

    }

    return (
        <div className="flex flex-col space-y-4 rounded-md bg-white p-6 shadow-md border border-gray-200 mt-4 w-3/12">
            <h1 className="text-xl font-semibold text-content-emphasis">Editar</h1>
            <form onSubmit={form.onSubmit((values) => { return atualizar(values); })}>
                <TextInput
                    label="Username"
                    placeholder="Username"
                    key={form.key('username')}
                    {...form.getInputProps('username')}
                />
                <TextInput
                    withAsterisk
                    label="E-mail"
                    placeholder="your@email.com"
                    key={form.key('email')}
                    {...form.getInputProps('email')}
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

                <Checkbox
                    mt="md"
                    label="É super usuário?"
                    disabled={usuarioAdmin}
                    key={form.key('is_superuser')}
                    {...form.getInputProps('is_superuser', { type: 'checkbox' })}
                />
                <Checkbox
                    mt="md"
                    label="Está ativo?"
                    key={form.key('is_active')}
                    {...form.getInputProps('is_active', { type: 'checkbox' })}
                />

                <Group justify="flex-end" mt="md">
                    <Button type="submit">Salvar</Button>
                </Group>
            </form>
        </div>
    )
}
