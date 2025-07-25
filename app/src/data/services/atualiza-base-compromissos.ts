import { getSession } from '@/lib/session'


export default async function atualizaDadosBaseCompromissos() {

    const session = await getSession()
    const token = session?.token

    const response = await fetch("http://127.0.0.1:8000/api/baseCompromissos/", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    await response.json(); // Pauses execution until the response body is parsed

}