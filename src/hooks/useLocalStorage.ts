import { useCallback } from 'react';
import { Theme } from '@/types';

export const useLocalStorage = () => {
    const setLocalStorageValue = useCallback((key: string, value: number | Theme) => {
        if (typeof window === 'undefined') return; // Vérifie si on est côté client
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Failed to set localStorage value:', error);
        }
    }, []);

    const getLocalStorageValue = useCallback((key: string) => {
        if (typeof window === 'undefined') return null; // Vérifie si on est côté client
        try {
            const value = window.localStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        } catch (error) {
            console.error('Failed to get localStorage value:', error);
            return null;
        }
    }, []);

    return { setLocalStorageValue, getLocalStorageValue };
};
