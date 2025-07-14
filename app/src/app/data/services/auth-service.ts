import { getAuthToken } from "./get-token";

interface RegisterUserProps {
  username: string;
  password: string;
  email: string;
}

interface LoginUserProps {
  username: string;
  password: string;
}

export async function registerUserService(userData: RegisterUserProps) {

  try {
    const response = await fetch("http://127.0.0.1:8000/api/usuarios/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData }),
    });

    return response.json();
  } catch (error) {
    console.error("Registration Service Error:", error);
  }
}

export async function loginUserService(userData: LoginUserProps) {

  try {
    const response = await fetch("http://127.0.0.1:8000/api/signin/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData }),
    });

    return response.json();
  } catch (error) {
    console.error("Login Service Error:", error);
    throw error;
  }
}

export async function logoutUserService() {

  const authToken = await getAuthToken();

  try {
    const response = await fetch("http://127.0.0.1:8000/api/logout/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${authToken}`,
      },
      
    });

    return response.json();
  } catch (error) {
    console.error("Login Service Error:", error);
    throw error;
  }
}

