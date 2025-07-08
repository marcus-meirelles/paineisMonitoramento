import { getAuthToken } from "./get-token";

export async function getUserMeLoader() {

    const authToken = await getAuthToken();
    if (!authToken) return { ok: false, data: null, error: null };

    try {
        const response = await fetch("http://127.0.0.1:8000/api/usuario-logado/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${authToken}`,
            },
        });
        const data = await response.json();
        if (data.error) return { ok: false, data: null, error: data.error };
        return { ok: true, data: data, error: null };
    } catch (error) {
        console.log(error);
        return { ok: false, data: null, error: error };
    }
}