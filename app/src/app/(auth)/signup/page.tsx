import { RegisterForm } from "../../components/forms/register-form";

export default function SingUpRoute() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <RegisterForm />
    </div>
  );

}