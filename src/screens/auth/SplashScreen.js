import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Logo from "../../components/Logo"
import { useNavigation } from "@react-navigation/native"

const SplashScreen = () => {
    const navigation = useNavigation();

    const handleLogin = () => {
        navigation.navigate("Login");
    }

    const handleRegister = () => {
        navigation.navigate("Register");
    }

    return (
        <ImageBackground
            source={require("../../../assets/splash.png")}
            resizeMethod="contain"
            style={styles.image}
        >
            <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 16 }}>
                <Logo />
                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                    <Text style={[styles.logoText, { color: "#fff" }]}>Dzimba</Text>
                    <Text
                        style={
                            [
                                styles.logoText,
                                {
                                    backgroundColor: "#fff",
                                    color: "#000",
                                    borderRadius: 8,
                                    paddingHorizontal: 8
                                }
                            ]
                        }
                    >
                        Connect
                    </Text>
                </View>
            </View>

            <View style={{ width: '100%', gap: 12, marginBottom: 18 }}>
                <View style={{ marginBottom: 44 }}>
                    <Text style={styles.heroText}>Find your perfect student home</Text>
                    <Text style={styles.heroTextSubtitle}>Browse verified rooms near your campus</Text>
                </View>
                <TouchableOpacity style={[styles.button, { backgroundColor: "#fff" }]} activeOpacity={0.8} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: "#000" }]} activeOpacity={0.8} onPress={handleRegister}>
                    <Text style={[styles.buttonText, { color: "#fff" }]}>Register</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 12,
        paddingTop: 140,
        paddingBottom: 24
    },
    button: {
        padding: 12,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8
    },
    buttonText: {
        fontSize: 18
    },
    heroText: {
        fontWeight: "bold",
        fontSize: 24,
        textAlign: "center",
        color: "#fff",
    },
    heroTextSubtitle: {
        fontWeight: "light",
        fontSize: 18,
        textAlign: "center",
        color: "#fff",
        opacity: 0.8
    },
    logoText: {
        fontSize: 24,
        fontWeight: "bold"
    }
})

export default SplashScreen