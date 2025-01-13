import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Settings, LogOut, Plus } from 'lucide-react';
import { Medicine } from '../types';
import MedicineForm from './MedicineForm';
import MedicineList from './MedicineList';

export default function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [medicines, setMedicines] = useState<Medicine[]>(() => {
    const saved = localStorage.getItem('medicines');
    return saved ? JSON.parse(saved) : [];
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const username = location.state?.username || 'User';

  useEffect(() => {
    localStorage.setItem('medicines', JSON.stringify(medicines));
  }, [medicines]);

  const handleAddMedicine = (medicine: Medicine) => {
    setMedicines([...medicines, { ...medicine, id: Date.now().toString() }]);
    setIsFormOpen(false);
  };

  const handleUpdateMedicine = (updatedMedicine: Medicine) => {
    setMedicines(medicines.map(med => 
      med.id === updatedMedicine.id ? updatedMedicine : med
    ));
    setSelectedMedicine(null);
  };

  const handleDeleteMedicine = (id: string) => {
    setMedicines(medicines.filter(med => med.id !== id));
    setSelectedMedicine(null);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">Welcome, {username}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsFormOpen(true)}
                className="p-2 rounded-full hover:bg-gray-700 text-cyan-500"
              >
                <Plus className="h-6 w-6" />
              </button>
              <div className="relative">
                <button
                  onClick={() => navigate('/')}
                  className="p-2 rounded-full hover:bg-gray-700 text-gray-400"
                >
                  <LogOut className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="text-cyan-500 text-xl font-semibold">
            {format(new Date(), 'EEEE, MMMM d')}
          </div>
          <div className="text-gray-400">
            {format(new Date(), 'h:mm a')}
          </div>
        </div>

        <MedicineList
          medicines={medicines}
          onSelect={setSelectedMedicine}
        />

        {(isFormOpen || selectedMedicine) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
              <MedicineForm
                medicine={selectedMedicine}
                onSubmit={selectedMedicine ? handleUpdateMedicine : handleAddMedicine}
                onDelete={selectedMedicine ? handleDeleteMedicine : undefined}
                onClose={() => {
                  setIsFormOpen(false);
                  setSelectedMedicine(null);
                }}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}