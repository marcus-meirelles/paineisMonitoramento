import { NivelPermissao } from "./nivelPermissao"

export type Usuario = {
    id: number,
    username: string,
    email: string,
    password: string,
    nivelPermissao: NivelPermissao,
    is_superuser: boolean,
    is_active: boolean
}