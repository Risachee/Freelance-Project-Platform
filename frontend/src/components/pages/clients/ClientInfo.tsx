import { Mail, Phone, Send } from 'lucide-react';
import type { Client } from '@/types/client';
import EditButton from '@/components/ui/EditButton';
import Field from '@/components/ui/Field';
import { useEditableForm } from '@/hooks/useEditableForm';
import { useClients } from '@/context/ClientsContext';


const ClientInfo = ({ client }: { client: Client }) => {
  const { updateClient } = useClients(); 

  const {
    isEditing,
    setIsEditing,
    formData,
    handleChange,
    handleSave,
    handleReset,
  } = useEditableForm<Client>(client, updateClient);

  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
      <div className="flex items-start justify-between gap-4 my-3">
        {isEditing ? (
          <Field
            editing
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-xl text-xl font-semibold text-black-900"
          />
        ) : (
          <h2 className="text-2xl font-semibold text-indigo-600">{client.name}</h2>
        )}

        {!isEditing ? (
          <EditButton onClick={() => setIsEditing(true)} />
        ) : (
          <div className="flex gap-2 mt-2">
            <button
              type="button"
              onClick={handleSave}
              className="rounded-full bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700 hover:bg-emerald-100"
            >
              Сохранить
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="rounded-full bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-200"
            >
              Отмена
            </button>
          </div>
        )}
      </div>

      <p className="my-3 text-xs font-medium uppercase tracking-wide text-slate-500">
        Контакты
      </p>

      <div className="space-y-2 text-sm text-slate-700">
        <Field
          editing={isEditing}
          name="email"
          value={formData.email}
          onChange={handleChange}
          icon={<Mail size={14} className="text-slate-400" />}
          className="flex items-center gap-2"
        />
        <Field
          editing={isEditing}
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          icon={<Phone size={14} className="text-slate-400" />}
          className="flex items-center gap-2"
        />
        <Field
          editing={isEditing}
          name="telegram"
          value={formData.telegram}
          onChange={handleChange}
          icon={<Send size={14} className="text-slate-400" />}
          className="flex items-center gap-2"
        />
      </div>

      <p className="mt-6 text-xs font-medium uppercase tracking-wide text-slate-500">
        Комментарий
      </p>

      <Field
        editing={isEditing}
        name="note"
        value={formData.note}
        onChange={handleChange}
        as="textarea"
        className="mt-2"
      />
    </div>
  );
};

export default ClientInfo;