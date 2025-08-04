'use client'
import { NivelPermissao } from "@/types/nivelPermissao";
import { Usuario } from "@/types/usuario";
import { redirect } from 'next/navigation';
import { ActionIcon, Button, Group, Table, Modal } from '@mantine/core';
import { IconMoodEdit, IconUserPlus, IconTrash } from '@tabler/icons-react';
import { SessionPayload } from "@/types/sessionPayload";
import { useDisclosure } from '@mantine/hooks';
import { useState } from "react";


export default function TabelaUsuario({ lista, session }: { lista: Usuario[], session: SessionPayload }) {

    const [opened, { open, close }] = useDisclosure(false);

    const [value, setValue] = useState('');


    const rows = lista?.map((element, key) => (
        <Table.Tr key={key} data-id={element.id}>
            <Table.Td>{element.id}</Table.Td>
            <Table.Td>{element.username}</Table.Td>
            <Table.Td>{element.email}</Table.Td>
            <Table.Td>{element.nivelPermissao ? NivelPermissao[element.nivelPermissao + 1] : 'N/A'}</Table.Td>
            <Table.Td className="flex gap-1">
                <ActionIcon size={30} onClick={event => editarUsuario(event)} title='Editar Usuário'>
                    <IconMoodEdit style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
                <ActionIcon size={30} onClick={event => abrirModal(event)} title='Deletar Usuário'>
                    <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
            </Table.Td>
        </Table.Tr>
    ));

    
    function abrirModal(event: any){
        event.stopPropagation();
        const linha = event.target.closest('tr');
        const idUsuario = linha.dataset.id;
        setValue(idUsuario)
        open()
    }


    async function editarUsuario(event: any) {
        event.stopPropagation();
        const linha = event.target.closest('tr');
        const idUsuario = linha.dataset.id;
        redirect(`/usuario/${idUsuario}`)
    }

    async function deletarUsuario() {

        const token = session.token


         const response = await fetch(`http://127.0.0.1:8000/api/usuario/${value}/`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
            method: "DELETE",
        },)

        close()

        redirect(`/usuario/`) 
    }

    async function cadastrarUsuario(event: any) {
        event.stopPropagation();
        redirect("/usuario/cadastrar")
    }

    if (lista != undefined) {

        return (
            <div>
                <Table striped highlightOnHover withTableBorder withColumnBorders>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>ID</Table.Th>
                            <Table.Th>Username</Table.Th>
                            <Table.Th>E-mail</Table.Th>
                            <Table.Th>Nível Permissão</Table.Th>
                            <Table.Th>Ações</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
                <Group justify="flex-end" mt="md">
                    <Button leftSection={<IconUserPlus size={16} stroke={1.5} />} onClick={event => cadastrarUsuario(event)}>Cadastrar</Button>
                </Group>
                
                <input type="text" hidden defaultValue={value} />
                <Modal opened={opened} onClose={close} title="Você deseja deletar o usuário?">
                    <Group mt="lg" justify="flex-end">
                        <Button onClick={close} variant="default">
                            Cancelar
                        </Button>
                        <Button onClick={() => deletarUsuario()} color="red">
                            Delete
                        </Button>
                    </Group>
                </Modal>
            </div>
        )
    }
    else {
        return (<></>)
    }
}