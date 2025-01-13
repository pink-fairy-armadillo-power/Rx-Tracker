import React from 'react';
import { Medicine } from '../types';
import { Pill } from 'lucide-react';

interface MedicineListProps {
  medicines: Medicine[];
  onSelect: (medicine: Medicine) => void;
}

export default function MedicineList({ medicines, onSelect }: MedicineListProps) {
  return (
    <div className="space-y-4">
      {medicines.map((medicine) => (
        <div
          key={medicine.id}
          onClick={() => onSelect(medicine)}
          className="bg-gray-800 rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition-colors"
        >
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-cyan-500 bg-opacity-20 rounded-full">
              <Pill className="h-6 w-6 text-cyan-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-white">{medicine.name}</h3>
              <p className="text-gray-400">{medicine.dosage}, {medicine.frequency} daily</p>
            </div>
          </div>
        </div>
      ))}
      
      {medicines.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-400">No medicines added yet</p>
        </div>
      )}
    </div>
  );
}