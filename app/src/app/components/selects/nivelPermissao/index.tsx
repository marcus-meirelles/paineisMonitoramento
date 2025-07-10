import { NivelPermissao } from "@/types/nivelPermissao";


export default async function SelectSetor({ key_nivel_atual }: {key_nivel_atual?: number}) {
    
    const setores: NivelPermissao[] = await fetch(`http://localhost:8000/niveisPermissao.json`)
        .then(res => res.json())
        .then(data => data.results)

    return (
        <select name="nivelPermissao" id="nivelPermissao" className="border border-sky-600 rounded-sm" defaultValue={key_nivel_atual}>
            {setores.map((nivelPermissao: NivelPermissao) => (
                <option key={nivelPermissao.key.toString()} value={nivelPermissao.key.toString()}>{nivelPermissao.value}</option>
            ))}
        </select>
    )
}