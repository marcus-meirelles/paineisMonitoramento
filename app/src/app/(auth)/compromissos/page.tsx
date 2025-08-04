import PreencheDashboard from "@/data/services/preenche-base-compromissos";


export default function pageCompromissos() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <PreencheDashboard />
    </div>
  );
}