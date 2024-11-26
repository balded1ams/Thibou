import { useState, useCallback, useContext } from 'react';

import { useLocalStorage } from './useLocalStorage.ts';

import { ThemeContext } from '../context/ThemeContext';
import { theme } from '../utils';
import type { Theme } from '../types';

export const useTheme = () => {
    const { getLocalStorageValue, setLocalStorageValue } = useLocalStorage();

    const [systemTheme, setSystemTheme] = useState<Theme>(() => {
        const localTheme = getLocalStorageValue('theme');
        return localTheme ? localTheme : theme.dark;
    });

    const setTheme = useCallback(
        (value: Theme) => {
            setSystemTheme(value);
            setLocalStorageValue('theme', value);
        },
        [setSystemTheme, setLocalStorageValue]
    );

    return { systemTheme, setTheme };
};

export const useThemeContext = () => {
    return useContext(ThemeContext);
};