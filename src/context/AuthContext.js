import { createContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const signIn = async (data) => {
        await SecureStore.setItemAsync("accessToken", data?.accessToken);
        setLoading(false);
        setIsAuthenticated(true);
    }

    const signOut = async () => {
        await SecureStore.deleteItemAsync("accessToken");
        setIsAuthenticated(false);
    }

    useEffect(() => {
        const initialiseApp = async () => {
            const _token = await SecureStore.getItemAsync("accessToken");

            if (_token) {
                setIsAuthenticated(true);
                setLoading(false);
            } else {
                setIsAuthenticated(false);
                setLoading(false);
            }
        }

        initialiseApp();
    }, [])

    return (
        <AuthContext.Provider
            value={{
                signIn,
                loading,
                isAuthenticated,
                signOut
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider