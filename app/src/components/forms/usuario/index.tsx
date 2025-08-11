"use client";

import { Usuario } from "@/types/usuario";
import { redirect } from 'next/navigation';
import { Button, Checkbox, Group, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { SessionPayload } from "@/types/sessionPayload";
import { useState, useEffect } from 'react';

export default function FormUsuario({ usuarioEditar, session }: { usuarioEditar?: Usuario, session: SessionPayload }) {

    const [editandoProprioUsuario, setEditadoProprioUsuario] = useState<boolean>(false);

    useEffect(() => {
        setEditadoProprioUsuario((usuarioEditar != undefined && usuarioEditar.id == Number(session.userId)) ? true : false)
    },)

    const [valueNivelPermissao, setValueNivelPermissao] = useState(usuarioEditar?.nivelPermissao ? usuarioEditar.nivelPermissao + '' : '0');

    const [isUsuarioAdminLogado, setIsUsuarioAdminLogado] = useState<boolean>(false);

    useEffect(() => {
        setIsUsuarioAdminLogado(session.username == 'admin' ? true : false)
    },)

    const [usuarioEdicaoAdmin, setUsuarioEdicaoAdmin] = useState<boolean>(false);

    useEffect(() => {
        setUsuarioEdicaoAdmin(usuarioEditar != undefined && usuarioEditar.username == 'admin' ? true : false)
    },)

    const [disableIsSuperUser, setDisableIsSuperUser] = useState<boolean>(false);

    useEffect(() => {

        const desativaCheckBoxIsSuperUser: boolean = (isUsuarioAdminLogado && editandoProprioUsuario) || (usuarioEdicaoAdmin && !isUsuarioAdminLogado)

        setDisableIsSuperUser(desativaCheckBoxIsSuperUser)
    }
        ,)

    console.log(usuarioEdicaoAdmin && !isUsuarioAdminLogado)
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            id: usuarioEditar?.id ? usuarioEditar.id : 0,
            password: usuarioEditar?.password ? usuarioEditar.password : '',
            novoPassword: '',
            username: usuarioEditar?.username ? usuarioEditar.username : '',
            email: usuarioEditar?.email ? usuarioEditar.email : '',
            nivelPermissao: usuarioEditar?.nivelPermissao ? usuarioEditar.nivelPermissao : 0,
            is_superuser: usuarioEditar?.is_superuser ? usuarioEditar.is_superuser : false,
            is_active: usuarioEditar?.is_active ? usuarioEditar.is_active : false
        },
        validate: {
            email: (value) => (/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi.test(value) ? null : 'E-mail invalido!'),
        },
    });

    async function acao(values: {
        id: number,
        password: string,
        novoPassword: string,
        username: string,
        email: string,
        nivelPermissao: number,
        is_superuser: boolean,
        is_active: boolean
    }) {

        const token = session.token
        try {
            let response
            // editando um usuario que não é o próprio
            if (usuarioEditar != undefined && !editandoProprioUsuario) {

                response = await fetch(`http://127.0.0.1:8000/api/usuario/${values.id}/`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${token}`,
                    },
                    method: "PUT",
                    body: JSON.stringify({
                        "username": values.username,
                        "password": values.password,
                        "email": values.email,
                        "nivelPermissao": valueNivelPermissao == '0' ? null : valueNivelPermissao,
                        "is_superuser": values.is_superuser,
                        "is_active": values.is_active
                    })
                },)

                const result: Usuario = await response.json()

                redirect(`/usuario/${result.id}`)
            }
            // editando o próprio usuário
            else if (editandoProprioUsuario) {

                response = await fetch(`http://127.0.0.1:8000/api/usuario/${values.id}/`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${token}`,
                    },
                    method: "PUT",
                    body: JSON.stringify({
                        "username": values.username,
                        "password": values.password,
                        "novoPassword": values.novoPassword,
                        "email": values.email,
                        "nivelPermissao": valueNivelPermissao == '0' ? null : valueNivelPermissao,
                        "is_superuser": values.is_superuser,
                        "is_active": values.is_active
                    })
                },)

                const result: Usuario = await response.json()

                redirect(`/usuario/${result.id}`)

            }
            // cadastrando um novo usuário
            else {

                response = await fetch(`http://127.0.0.1:8000/api/usuario/`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${token}`,
                    },
                    method: "POST",
                    body: JSON.stringify({
                        "id": values.id,
                        "username": values.username,
                        "password": values.password,
                        "email": values.email,
                        "nivelPermissao": valueNivelPermissao == '0' ? null : valueNivelPermissao,
                        "is_superuser": values.is_superuser,
                        "is_active": values.is_active
                    })
                },)

                await response.json()

            }
        } catch (error) {
            console.log(error)
        }

        redirect(`/usuario/`)

    }

    return (
        <div className="flex flex-col space-y-4 rounded-md bg-white p-6 shadow-md border border-gray-200 mt-4 w-3/12">
            <h1 className="text-xl font-semibold text-content-emphasis">Usuário  {usuarioEditar != undefined ? 'Editar' : 'Cadastrar'}</h1>
            <form onSubmit={form.onSubmit((values) => { return acao(values); })}>
                <input
                    type="hidden"
                    key={form.key('id')}
                    {...form.getInputProps('id')}
                />
                <TextInput
                    disabled
                    label="Username"
                    placeholder="Username"
                    key={form.key('username')}
                    {...form.getInputProps('username')}
                />
                <TextInput
                    type="password"
                    hidden={usuarioEditar != undefined ? true : false}
                    label={usuarioEditar != undefined ? '' : 'Senha'}
                    key={form.key('password')}
                    {...form.getInputProps('password')}
                />
                <TextInput
                    type="password"
                    placeholder="Caso queira alterar, digite aqui a sua nova senha"
                    hidden={!editandoProprioUsuario ? true : false}
                    label={!editandoProprioUsuario ? '' : 'Nova Senha'}
                    key={form.key('novoPassword')}
                    {...form.getInputProps('novoPassword')}
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
                    value={valueNivelPermissao}
                    disabled={usuarioEdicaoAdmin}
                    onChange={(_value, option) => { setValueNivelPermissao(option.value) }}
                    data={[{ value: '0', label: '--' },
                    { value: '1', label: 'Baixo' },
                    { value: '2', label: 'Médio' },
                    { value: '3', label: 'Alto' }]}
                />

                <Checkbox
                    mt="md"
                    label="É super usuário?"
                    disabled={disableIsSuperUser}
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

