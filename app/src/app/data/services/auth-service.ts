import { getSession } from '@/lib/session'

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
    const response = await fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData }),
    });

    const resp = await response.json()

    return {
      'userId': resp.user.id, 'username': resp.user.username, 'token': resp.token, 'nivelPermissao': resp.user.nivelPermissao,
      'expires_at': resp.expires_at, 'isSuperUser' : resp.isSuperUser, 'error': null
    };
  } catch (error) {
    console.error("Login Service Error:", error);
    throw error;
  }
}

export async function logoutUserService() {

  try {
    
    const session = await getSession()
    const token = session.token
    const userId = session.userId

    console.log(userId)

    const response = await fetch(`http://127.0.0.1:8000/api/logout/${userId}` , {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },

    });

    return response.json();
  } catch (error) {
    console.error("Login Service Error:", error);
    throw error;
  }
}

