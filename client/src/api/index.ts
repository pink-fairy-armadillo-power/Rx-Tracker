const API_URL = 'http://localhost:3000/api';

export interface LoginResponse {
  userId: string;
  username: string;
}

export interface Medication {
  userId: string;
  MedicineName: string;
  Dosage: string;
  NumberOfPills: string;
  MedicalReason: string;
  Frequency: string;
  Notes: string;
  id?: string;
}

export const api = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    return response.json();
  },

  signup: async (username: string, password: string): Promise<void> => {
    const response = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create account');
    }
  },

  getMedications: async (userId: string) => {
    const response = await fetch(`${API_URL}/medicines/${userId}`);
    return response.json();
  },

  addMedication: async (userId: string, medication: Omit<Medication, 'id'>) => {
    const response = await fetch(`${API_URL}/medicines/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(medication),
    });
    return response.json();
  },

  updateMedicine: async (
    userId: string,
    medicationId: string,
    medication: Partial<Medication>
  ) => {
    const response = await fetch(
      `${API_URL}/medicines/${userId}/${medicationId}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(medication),
      }
    );
    return response.json();
  },

  deleteMedicine: async (userId: string, medicationId: string) => {
    await fetch(`${API_URL}/medicines/${userId}/${medicationId}`, {
      method: 'DELETE',
    });
  },
};
