import { UserData } from "@/types/disc";

const STORAGE_KEY = 'perfeita_sintonia_user';

export const saveUserData = (data: UserData): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const getUserData = (): UserData | null => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
};

export const clearUserData = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

export const updateUserData = (updates: Partial<UserData>): void => {
  const current = getUserData();
  if (current) {
    saveUserData({ ...current, ...updates });
  }
};
