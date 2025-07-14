import SelectNivelPermissao from "@/app/components/selects/nivelPermissao";
import { Usuario } from "@/types/usuario";


function FormEditarUsuario({usuario}: {usuario: Usuario}) {
    async function atualizar(formData: FormData) {
            'use server'
            try {
                const response = await fetch(`http://localhost:8000/api/usuario`, {
                    method: "POST",
                    body: formData
                })
    
            } catch (error) {
                console.log(error)
            }
        }

    return (
    <form action={atualizar} className='grid content-center gap-2 w-150'>
        <div className="grid">
          <label htmlFor="nome"/>Username
          <input type="text" id='username' className="border border-sky-600 rounded-sm" name="nome" defaultValue={usuario.username}/>
        </div>
        <div className="grid">
          <label htmlFor="email"/>Email
          <input type="text" id='email' className="border border-sky-600 rounded-sm" name="email" defaultValue={usuario.email}/>
        </div>
         <div className="grid">
          <label htmlFor="nivelPermissao"/>Nivel Permissão
          <SelectNivelPermissao nivel={usuario.nivelPermissao}/>
        </div> 
        <div className="grid">
              <label htmlFor="password"/>Nova senha
              <input type="password" id='nova_password' className="border border-sky-600 rounded-sm" name="nova_password"/>
        </div>
        <div className="grid">
              <label htmlFor="password"/>Confirme a Nova senha
              <input type="password" id='confirma_password' className="border border-sky-600 rounded-sm" name="confirma_password"/>
        </div>
        <div className="grid grid-cols-2 content-between">
            <div><button className="bg-green-600 p-2 rounded-sm w-24 text-white" type="submit">Salvar</button></div>
        </div>
    </form>
    )
}

export default FormEditarUsuario;