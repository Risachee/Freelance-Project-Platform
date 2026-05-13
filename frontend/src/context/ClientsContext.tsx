import React, { createContext, useContext, useState } from "react";
import type { Client } from '@/types/client';

type ClientContextType = {
    clients: Client[]
    search: string
    setSearch: (value: string) => void
    filteredClients: Client[]
    selectedClient: Client
    setSelectedClient: (value: Client) => void
    addClient: (newClient: Client) => void
    updateClient: (updatedClient: Client) => void
}

const ClientContext = createContext<ClientContextType | undefined>(undefined)

const initialClients: Client[] = [
    {
        id: 1,
        name: 'Алексей Морозов',
        email: 'morozov@example.com',
        phone: '+7 999 123-45-67',
        telegram: '@morozov_dev',
        note: 'Нужен лендинг и форма заявки.',
        projectsCount: 3,
    },
    {
        id: 2,
        name: 'Мария Ковалева',
        email: 'kovaleva@example.com',
        phone: '+7 916 555-22-11',
        telegram: '@maria_k',
        note: 'Предпочитает короткие созвоны по будням.',
        projectsCount: 3,
    },
    {
        id: 3,
        name: 'Илья Соколов',
        email: 'sokolov@example.com',
        phone: '+7 903 777-18-09',
        telegram: '@ilya_sokolov',
        note: 'Проект по редизайну внутреннего кабинета.',
        projectsCount: 3,
    },
    {
        id: 4,
        name: 'ООО Ромашка',
        email: 'info@romashka.ru',
        phone: '+7 495 111-22-33',
        telegram: '@romashka_office',
        note: 'Корпоративный сайт, нужен согласованный стиль.',
        projectsCount: 3,
    },
    {
        id: 5,
        name: 'Екатерина Лебедева',
        email: 'lebedeva@example.com',
        phone: '+7 921 444-90-12',
        telegram: '@lebedeva_cat',
        note: 'Запуск MVP для сервиса бронирования.',
        projectsCount: 3,
    },
]

export const ClientProvider = ({ children }: { children: React.ReactNode }) => {
    const [clients, setClients] = useState<Client[]>(initialClients)
    const [search, setSearch] = useState('');
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);

    const filteredClients = clients.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.note.toLowerCase().includes(search.toLowerCase())
    );

    const addClient = (newClient: Client) => {

        console.log('Client add in DB:', newClient);
    };
    const updateClient = (updatedClient: Client) => {
        setClients((prev) =>
            prev.map((c) => (c.id === updatedClient.id ? updatedClient : c))
        );

        console.log('Client updated in DB:', updatedClient);
    };
    return (
        <ClientContext.Provider
            value={{
                clients,
                search,
                setSearch,
                filteredClients,
                selectedClient,
                setSelectedClient,
                addClient,
                updateClient,
            }}>
            {children}
        </ClientContext.Provider>
    )
}

export const useClients = () => {
    const context = useContext(ClientContext);
    if (!context) {
        throw new Error('useClients must be used within ClientsProvider')
    }
    return context;
}