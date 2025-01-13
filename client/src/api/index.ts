const API_URL = 'http://localhost:3000/api';

export interface LoginResponse {
  userId: string;
  username: string;
}

export const api = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    
    if (!response.ok) {
      throw new Error('Invalid credentials');
    }
    
    return response.json();
  },

  signup: async (username: string, password: string): Promise<void> => {
    const response = await fetch(`${API_URL}/users/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create account');
    }
  },

  getMedicines: async (userId: string) => {
    const response = await fetch(`${API_URL}/medicines/${userId}`);
    return response.json();
  },

  addMedicine: async (userId: string, medicine: Omit<Medicine, 'id'>) => {
    const response = await fetch(`${API_URL}/medicines/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(medicine)
    });
    return response.json();
  },

  updateMedicine: async (userId: string, medicineId: string, medicine: Partial<Medicine>) => {
    const response = await fetch(`${API_URL}/medicines/${userId}/${medicineId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(medicine)
    });
    return response.json();
  },

  deleteMedicine: async (userId: string, medicineId: string) => {
    await fetch(`${API_URL}/medicines/${userId}/${medicineId}`, {
      method: 'DELETE'
    });
  }
};