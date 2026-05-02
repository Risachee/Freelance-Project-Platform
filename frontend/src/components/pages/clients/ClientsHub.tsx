import { Mail, Phone, Briefcase, Send } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import AddClientDialog from './AddClientsDialog';
import SectionHeader from '../SectionHeader';
import { useClients } from '@/context/ClientsContext';
import { Link } from 'react-router-dom';

export default function ClientsHub() {
    const { search, setSearch, filteredClients, } = useClients();
    return (
        <div>
            <SectionHeader
                title="Клиенты"
                searchPlaceholder="Поиск клиентов..."
                search={search}
                setSearch={setSearch}
                action={<AddClientDialog/>}
            />

            <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden p-3">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent">
                            <TableHead>Клиент</TableHead>
                            <TableHead>Комментарий</TableHead>
                            <TableHead>Контакты</TableHead>
                            <TableHead className="text-right">Активных проектов</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredClients.map((client) => (
                            <TableRow key={client.id}>
                                <TableCell className="font-medium text-zinc-900">
                                    <Link
                                        to={`/clients/${client.id}`}
                                        className="text-indigo-600 hover:text-indigo-800 hover:underline"
                                    >
                                        {client.name}
                                    </Link>
                                </TableCell>
                                <TableCell className="text-zinc-500">{client.note}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col text-sm text-zinc-600 gap-1">
                                        <span className="flex items-center gap-2"><Mail size={14} /> {client.email}</span>
                                        <span className="flex items-center gap-2"><Phone size={14} /> {client.phone}</span>
                                        <span className="flex items-center gap-2"><Send size={14} /> {client.telegram}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right font-medium">
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700">
                                        <Briefcase size={14} />
                                        {client.projectsCount}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

        </div>
    )
}