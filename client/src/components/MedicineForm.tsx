import React, { useState } from 'react';
import { Medicine } from '../types';
import { X, Trash2 } from 'lucide-react';

interface MedicineFormProps {
  medicine?: Medicine | null;
  onSubmit: (medicine: Medicine) => void;
  onDelete?: (id: string) => void;
  onClose: () => void;
}

export default function MedicineForm({ medicine, onSubmit, onDelete, onClose }: MedicineFormProps) {
  const [formData, setFormData] = useState<Omit<Medicine, 'id'>>({
    name: medicine?.name || '',
    dosage: medicine?.dosage || '',
    pillCount: medicine?.pillCount || 0,
    reason: medicine?.reason || '',
    frequency: medicine?.frequency || '1x',
    notes: medicine?.notes || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: medicine?.id || Date.now().toString(),
      ...formData
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">
          {medicine ? 'Edit Medicine' : 'Add New Medicine'}
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-700 text-gray-400"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Medicine Name
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-cyan-500 focus:ring-cyan-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">
            Dosage
          </label>
          <input
            type="text"
            required
            value={formData.dosage}
            onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-cyan-500 focus:ring-cyan-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">
            Number of Pills
          </label>
          <input
            type="number"
            required
            value={formData.pillCount}
            onChange={(e) => setFormData({ ...formData, pillCount: parseInt(e.target.value) })}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-cyan-500 focus:ring-cyan-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">
            Medical Reason
          </label>
          <input
            type="text"
            required
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-cyan-500 focus:ring-cyan-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">
            Frequency
          </label>
          <select
            value={formData.frequency}
            onChange={(e) => setFormData({ ...formData, frequency: e.target.value as Medicine['frequency'] })}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-cyan-500 focus:ring-cyan-500"
          >
            <option value="1x">Once daily</option>
            <option value="2x">Twice daily</option>
            <option value="3x">Three times daily</option>
            <option value="4x">Four times daily</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">
            Notes
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-cyan-500 focus:ring-cyan-500"
            rows={3}
          />
        </div>
      </div>

      <div className="flex justify-between">
        {onDelete && (
          <button
            type="button"
            onClick={() => onDelete(medicine!.id)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </button>
        )}
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
        >
          {medicine ? 'Update' : 'Add'} Medicine
        </button>
      </div>
    </form>
  );
}