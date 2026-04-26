import { Image, StyleSheet, View } from "react-native"

const Logo = () => {
    return (
        <View style={styles.container}>
            <Image source={require("../../assets/icon.png")} style={styles.image} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        width: 100,
        borderRadius: 50
    },
    image: {
        height: 100,
        width: 100
    }
})

export default Logo