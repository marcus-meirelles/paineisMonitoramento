import { getSession } from '@/lib/session'
import {LoginUserProps} from "@/types/loginUserProps"
import {RegisterUserProps}  from "@/types/registerUserProps"

export async function registerUserService(userData: RegisterUserProps) {

  try {
    const response = await fetch("http://127.0.0.1:8000/api/usuario/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if(!response.ok){
      return {error: true,
              statsus: response.status}
    }
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
      body: JSON.stringify(userData),
    });

    if(!response.ok){
      return {error: true,}
    }
    
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
    const token = session?.token
    const userId = session?.userId

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

