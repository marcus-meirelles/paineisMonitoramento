import { logoutAction } from "@/app/data/actions/auth-actions";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button type="submit">
        Sair
        <LogOut className="w-6 h-6 hover:text-primary" />
      </button>
    </form>
  );
}