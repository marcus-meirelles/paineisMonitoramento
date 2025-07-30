"use client";

import { Usuario } from "@/types/usuario";
import { redirect } from 'next/navigation';
import { Button, Checkbox, Group, Select, TextInput, ComboboxItem } from '@mantine/core';
import { useForm } from '@mantine/form';
import { SessionPayload } from "@/types/sessionPayload";
import { useState, useEffect } from 'react';


export default function FormEditarUsuario({ usuario, session }: { usuario: Usuario, session: SessionPayload }) {

    const [value, setValue] = useState(usuario.nivelPermissao ? usuario.nivelPermissao + '' : '0');

    const [usuarioAdmin, setUsuarioAdmin] = useState<boolean>();

    useEffect(() => {
        setUsuarioAdmin(usuario.username == 'admin' ? true: false)
    }, )

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
        /*         <form action={atualizar} className='grid content-center gap-2 w-150'>
                    <div hidden>
                        <input type="hidden" id='password' name="password" value={usuario.password} />
                    </div>
                    <div hidden>
                        <input type="hidden" id='id' name="id" value={usuario.id} />
                    </div>
                    <div className="grid">
                        <label htmlFor="nome" />Username
                        <input type="text" id='username' className="border border-sky-600 rounded-sm" name="username" defaultValue={usuario.username} />
                    </div>
                    <div className="grid">
                        <label htmlFor="email" />Email
                        <input type="text" id='email' className="border border-sky-600 rounded-sm" name="email" defaultValue={usuario.email} />
                    </div>
                    <div className="grid">
                        <label htmlFor="nivelPermissao" />Nivel Permissão
                        <SelectNivelPermissao nivel={usuario.nivelPermissao} />
                    </div>
        
                    <div className="grid">
                        <label htmlFor="is_superuser" />É super usuario?
                        <input type="checkbox" id='is_superuser' className="border border-sky-600 rounded-sm" name="is_superuser" 
                            disabled={usuario.username == 'admin' ? true : false}
                            defaultChecked={usuario.is_superuser} />
                    </div>
                    <div className="grid">
                        <label htmlFor="is_active" />Está ativo?
                        <input type="checkbox" id='is_active' className="border border-sky-600 rounded-sm" name="is_active" defaultChecked={usuario.is_active} />
                    </div>
                    <div className="grid grid-cols-2 content-between">
                        <div><button className="bg-green-600 p-2 rounded-sm w-24 text-white" type="submit">Salvar</button></div>
                    </div>
                </form> */
        <form onSubmit={form.onSubmit((values) => atualizar(values))}>
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
                <Button type="submit">Submit</Button>
            </Group>
        </form>
    )
}
