import { ActivityIndicator, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Logo from "../../components/Logo"
import { Link } from "@react-navigation/native"
import { useState } from "react"
import { login } from "../services/auth.service"
import useAuth from "../../hooks/useAuth"

const Login = () => {
    const { signIn } = useAuth();
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        if (!username || username === "") {
            setError("Please enter username.");
            return;
        }

        if (!password || password === "") {
            setError("Please enter password.");
            return;
        }

        setLoading(true);

        try {
            const response = await login({
                username,
                password
            })
            signIn({ accessToken: response?.data?.access })
        } catch (error) {
            if (error.response && error.response.status && error.response.status === 401) {
                setError(error?.response?.data?.detail)
            } else {
                setError("An error occurred. You cannot login this time.")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <Logo />
            <View style={{ marginVertical: 18 }}>
                <Text style={styles.heroTitle}>Welcome back</Text>
                <Text style={styles.heroSubtitle}>Please enter your details to login</Text>
            </View>
            <View style={{ width: '100%', gap: 16, padding: 12 }}>
                {
                    error &&
                    (
                        <Text
                            style={styles.error}
                        >
                            {error}
                        </Text>
                    )
                }
                <View>
                    <Text style={styles.inputLabel}>Username</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        onChangeText={text => setUsername(text)}
                    />
                </View>
                <View>
                    <Text style={styles.inputLabel}>Password</Text>
                    <TextInput
                        onChangeText={text => setPassword(text)}
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry
                    />
                </View>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: "#000" }]}
                    activeOpacity={0.8}
                    disabled={loading}
                    onPress={handleLogin}
                >
                    {
                        loading ?
                            <ActivityIndicator color={"#fff"} /> :
                            <Text style={[styles.buttonText, { color: "#fff" }]}>Login</Text>
                    }
                </TouchableOpacity>

                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                    <Text style={{ color: "#000" }}>Don't have an account? </Text>
                    <Link screen={"Register"}>Register here</Link>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    },
    input: {
        backgroundColor: "#fff",
        borderColor: "#fff",
        borderWidth: 2,
        borderRadius: 8,
        padding: 12,
        color: "#000"
    },
    inputLabel: {
        color: "#45474B",
        fontSize: 12,
        marginBottom: 8
    },
    heroTitle: {
        color: "#000",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 34
    },
    heroSubtitle: {
        color: "#000",
        fontWeight: "500",
        textAlign: "center",
        fontSize: 12
    },
    button: {
        padding: 12,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        marginTop: 8
    },
    error: {
        color: "#c40303",
        fontSize: 12,
        backgroundColor: "#ffb7b7",
        borderRadius: 8,
        padding: 8,
        textAlign: "center"
    }
})

export default Login