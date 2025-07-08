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

  console.log(userData)
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

