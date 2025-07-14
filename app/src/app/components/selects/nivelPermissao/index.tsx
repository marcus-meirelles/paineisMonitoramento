

export default function SelectNivelPermissao({nivel} : {nivel : number}) {
    
    return (
         <select name="nivelPermissao" id="nivelPermissao" className="border border-sky-600 rounded-sm" defaultValue={nivel}>
            <option value="0" > -- </option>
            <option value="3" >Alto</option>
            <option value="2" >Médio</option>
            <option value="1" >Baixo</option>
        </select>
    )
}