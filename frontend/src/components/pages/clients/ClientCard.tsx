import { useParams } from 'react-router-dom';
import { useClients } from '@/context/ClientsContext';
import { useProjects } from '@/context/ProjectContext';
import BackPageButton from '@/components/ui/BackPageButton';
import ClientInfo from './ClientInfo';
import ClientProjects from './ClientProjects';

export default function ClientCard() {
  const { id } = useParams();
  const { clients } = useClients();
  const { projects } = useProjects();

  const client = clients.find((item) => String(item.id) === id);

  if (!client) {
    return <div className="p-6 text-slate-500">Клиент не найден</div>;
  }

  const clientProjects = projects.filter(
    (project) => project.clientName === client.name
  );

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 ">
      <BackPageButton />

      <div className="grid my-4 gap-4 md:grid-cols-2">
        <ClientInfo client={client} />
        <ClientProjects client={client} clientProjects={clientProjects}/>
      </div>
    </div>
  );
}