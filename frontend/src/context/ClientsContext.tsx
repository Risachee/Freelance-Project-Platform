import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import type { Client } from '@/types/client';
import { clientService } from "@/api/clientService";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

type ClientContextType = {
    clients: Client[];
    search: string;
    setSearch: (value: string) => void;
    filteredClients: Client[];
    addClient: (newClient: Omit<Client, 'id' | 'projectsCount'>) => Promise<Client>;
    updateClient: (updatedClient: Client) => Promise<Client>;
    getClientById: (id: number) => Client | undefined;
    isLoading: boolean;
    deleteClient: (clientToDelete: Client) => Promise<void>;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export const ClientProvider = ({ children }: { children: React.ReactNode }) => {
    const [clients, setClients] = useState<Client[]>([]);
    const [search, setSearch] = useState('');
    const { isAuthenticated } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    
    useEffect(() => {

        if (!isAuthenticated) {
            setIsLoading(false);
            setClients([]);
            return;
        }

        const loadClients = async () => {
            try {
                setIsLoading(true);
                const data = await clientService.getAll();
                setClients(data);
                console.log('Клиенты успешно получены', data.length)
            } catch (error) {
                console.error('Ошибка при загрузке клиентов с бэкенда:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadClients();
    }, [isAuthenticated]);

    const filteredClients = useMemo(() => {
        return clients.filter(c =>
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.note?.toLowerCase().includes(search.toLowerCase())
        );
    }, [clients, search]);

    const getClientById = useCallback((id: number) => {
        return clients.find(c => c.id === id);
    }, [clients]);

    const addClient = useCallback(async (newClient: Omit<Client, 'id' | 'projectsCount'>) => {
        try {
            const created = await clientService.create(newClient);
            setClients((prev) => [...prev, created]);
            console.log('Клиент создан:', created);
            return created;
        } catch (error) {
            console.error('Ошибка при создании клиента:', error);
            throw error;
        }
    }, []);

    const updateClient = useCallback(async (updatedClient: Client) => {
        try {
            const { id, ...data } = updatedClient;
            const refreshed = await clientService.update(id, data);
            setClients((prev) => prev.map((c) => (c.id === id ? refreshed : c)));
            console.log('Клиент обновлён:', refreshed);
            return refreshed;
        } catch (error) {
            console.error('Ошибка при обновлении клиента:', error);
            throw error;
        }
    }, []);

    const deleteClient = useCallback(async (clientToDelete: Client) => {
        try {
            await clientService.delete(clientToDelete.id);

            setClients((prev) => prev.filter((p) => p.id !== clientToDelete.id));
            console.log('Клиент удалён:', clientToDelete);

            navigate('/clients');
        } catch (error) {
            console.error(' Ошибка при удалении клиента:', error);
            throw error;
        }
    }, []);

    const contextValue = useMemo(() => ({
        clients,
        search,
        setSearch,
        filteredClients,
        addClient,
        updateClient,
        getClientById,
        isLoading,
        deleteClient
    }), [
        clients,
        search,
        filteredClients,
        addClient,
        updateClient,
        getClientById,
        isLoading
    ]);

    return (
        <ClientContext.Provider value={contextValue}>
            {children}
        </ClientContext.Provider>
    );
};

export const useClients = () => {
    const context = useContext(ClientContext);
    if (!context) {
        throw new Error('useClients must be used within ClientProvider');
    }
    return context;
};