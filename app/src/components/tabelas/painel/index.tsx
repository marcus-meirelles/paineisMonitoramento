'use client'
import { NivelPermissao } from "@/types/nivelPermissao";
import { redirect } from 'next/navigation';
import { ActionIcon, Button, Group, Modal, Table } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import { Painel } from "@/types/painel";
import { IconBrowserPlus, IconTrash, IconCaretLeftFilled} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useState } from "react";
import { SessionPayload } from "@/types/sessionPayload";

export default function TabelaPainel({ lista, session }: { lista: Painel[], session: SessionPayload }) {

    const [opened, { open, close }] = useDisclosure(false);

    const [value, setValue] = useState('');

    const rows = lista?.map((element, key) => (
        <Table.Tr key={element.id} data-id={element.id}>
            <Table.Td>{element.id}</Table.Td>
            <Table.Td>{element.nome}</Table.Td>
            <Table.Td>{element.descricao}</Table.Td>
            <Table.Td>{NivelPermissao[element.nivelPermissao + 1]}</Table.Td>
            <Table.Td className="flex gap-1">
                <ActionIcon size={30} onClick={event => editarPainel(event)} title='Editar Painel'>
                    <IconEdit style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
                <ActionIcon size={30} onClick={event => abrirModal(event)} title='Deletar Painel'>
                    <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon></Table.Td>
        </Table.Tr>
    ));

    function abrirModal(event: any) {
        event.stopPropagation();
        const linha = event.target.closest('tr');
        const idUsuario = linha.dataset.id;
        setValue(idUsuario)
        open()
    }


    async function editarPainel(event: any) {
        event.stopPropagation();
        const linha = event.target.closest('tr');
        const id = linha.dataset.id;
        redirect(`/painel/${id}`)
    }

    async function cadastrarPainel(event: any) {
        event.stopPropagation();
        redirect("/painel/cadastrar")
    }

    async function deletarPainel() {

        const token = session.token


        const response = await fetch(`http://127.0.0.1:8000/api/painel/${value}/`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
            method: "DELETE",
        },)

        close()

        redirect(`/painel/`)
    }

    if (lista != undefined) {

        return (
            <div>
                <Table striped highlightOnHover withTableBorder withColumnBorders >
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>ID</Table.Th>
                            <Table.Th>Nome</Table.Th>
                            <Table.Th>Descrição</Table.Th>
                            <Table.Th>Nível Permissão</Table.Th>
                            <Table.Th>Ações</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
                <Group justify="flex-end" mt="md">
  
                    <Button leftSection={<IconBrowserPlus size={16} stroke={1.5} />} onClick={event => cadastrarPainel(event)}>Cadastrar</Button>
                </Group>

                <input type="text" hidden defaultValue={value} />
                <Modal opened={opened} onClose={close} title="Você deseja deletar o painel?">
                    <Group mt="lg" justify="flex-end">
                        <Button onClick={close} variant="default">
                            Cancelar
                        </Button>
                        <Button onClick={() => deletarPainel()} color="red">
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