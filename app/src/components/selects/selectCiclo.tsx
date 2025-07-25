import { useState } from 'react';


export default function SelectCiclo() {

    const [selectedCiclo, setSelectedOption] = useState('');

    return (
        <>
        <select
            value={selectedCiclo}
            onChange={e => setSelectedOption(e.target.value)}>
            <option value="0"> -- </option>
            <option value="1">Cem dias</option>
            <option value="2">Duzentos dias</option>
            <option value="3">Trezentos Dias</option>
            <option value="4">Seisentos Dias</option>
            <option value="5">Setecentos e Trinta Dias</option>
            <option value="6">Previsao Final</option>
        </select>
        </>
    );
}
