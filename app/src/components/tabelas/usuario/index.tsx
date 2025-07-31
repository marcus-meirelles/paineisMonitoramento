'use client'
import { NivelPermissao } from "@/types/nivelPermissao";
import { Usuario } from "@/types/usuario";
import { redirect } from 'next/navigation';
import { ActionIcon, Button, ButtonGroup, Group, Table } from '@mantine/core';
import { IconMoodEdit, IconUserPlus} from '@tabler/icons-react';

export default function TabelaUsuario({ lista }: { lista: Usuario[] }) {

    const rows = lista?.map((element, key) => (
        <Table.Tr key={key} data-id={element.id}>
            <Table.Td>{element.id}</Table.Td>
            <Table.Td>{element.username}</Table.Td>
            <Table.Td>{element.email}</Table.Td>
            <Table.Td>{element.nivelPermissao ? NivelPermissao[element.nivelPermissao + 1] : 'N/A'}</Table.Td>
            <Table.Td>{<ActionIcon size={30} onClick={event => editarUsuario(event)} title='Editar Usuário'>
                <IconMoodEdit style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>}</Table.Td>
        </Table.Tr>
    ));

    async function editarUsuario(event: any) {
        event.stopPropagation();
        const linha = event.target.closest('tr');
        const idUsuario = linha.dataset.id;
        redirect(`/usuario/${idUsuario}`)
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
                            <Table.Th>Ação</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
                <Group justify="flex-end" mt="md">
                    <Button leftSection={<IconUserPlus size={16} stroke={1.5} />} onClick={event => cadastrarUsuario(event)}>Cadastrar</Button>
                </Group> 

            </div>
        )
    }
    else {
        return (<></>)
    }
}