
import { Usuario } from "@/types/usuario";
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation';
import SelectNivelPermissao from "@/components/selects/selectNivelPermissao";

export default function FormEditarUsuario({ usuario }: { usuario: Usuario }) {

    async function atualizar(formData: FormData) {

        'use server'

        let is_superuser = formData.get('is_superuser') == 'on' ? true : false

        if(usuario.username == 'admin'){
            is_superuser = true
        }

        const user = {
            "id": formData.get('id'),
            "username": formData.get('username'),
            "password": formData.get('password'),
            "email": formData.get('email'),
            "nivelPermissao": formData.get('nivelPermissao') == '0' ? null : formData.get('nivelPermissao'),
            "is_superuser": is_superuser,
            "is_active": formData.get('is_active') == 'on' ? true : false
        }

        const token = (await getSession())?.token
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
        <form action={atualizar} className='grid content-center gap-2 w-150'>
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
            {/*         <div className="grid">
              <label htmlFor="password"/>Nova senha
              <input type="password" id='nova_password' className="border border-sky-600 rounded-sm" name="nova_password"/>
        </div>
        <div className="grid">
              <label htmlFor="password"/>Confirme a Nova senha
              <input type="password" id='confirma_password' className="border border-sky-600 rounded-sm" name="confirma_password"/>
        </div> */}
            <div className="grid grid-cols-2 content-between">
                <div><button className="bg-green-600 p-2 rounded-sm w-24 text-white" type="submit">Salvar</button></div>
            </div>
        </form>
    )
}
