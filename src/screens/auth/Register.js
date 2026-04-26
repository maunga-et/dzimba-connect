import { ActivityIndicator, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Logo from "../../components/Logo"
import { Link } from "@react-navigation/native"
import { useState } from "react"
import { login, register } from "../services/auth.service"
import useAuth from "../../hooks/useAuth"

const Register = () => {
    const { signIn } = useAuth();
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleRegister = async () => {
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
            const response = await register({
                username,
                password
            })

            const _login = await login({
                username,
                password
            })

            signIn({accessToken: _login?.data?.access})
        } catch (error) {
            if (error.response && error.response.status && error.response.status === 400) {
                setError(error?.response?.data?.username)
            } else {
                setError("An error occurred. You cannot register this time.")
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
                <Text style={styles.heroTitle}>Welcome to DzimbaConnect</Text>
                <Text style={styles.heroSubtitle}>Please enter your details to register</Text>
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
                    onPress={handleRegister}
                >
                    {
                        loading ?
                            <ActivityIndicator color={"#fff"} /> :
                            <Text style={[styles.buttonText, { color: "#fff" }]}>Register</Text>
                    }
                </TouchableOpacity>

                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                    <Text style={{ color: "#000" }}>Already have an account? </Text>
                    <Link screen={"Login"}>Login</Link>
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

export default Register