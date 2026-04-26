import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { getListings } from "../services/listings.service";

const ListingsMap = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);

    const initialRegion = {
        latitude: -17.8252,
        longitude: 31.0335,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
    };

    useEffect(() => {
        fetchListings();
    }, []);

    const fetchListings = async () => {
        try {
            const res = await getListings();
            setListings(res.data);
        } catch (err) {
            console.log("Fetch listings error:", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#000" />
                <Text>Loading map...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MapView style={styles.map} initialRegion={initialRegion}>

                {listings.map((listing) => (
                    <Marker
                        key={listing.id}
                        coordinate={{
                            latitude: listing.latitude,
                            longitude: listing.longitude,
                        }}

                        // ✅ IMPORTANT: prevents visual clipping issues
                        anchor={{ x: 0.5, y: 1 }}
                    >
                        {/* 💰 Custom Pin */}
                        <View style={styles.pin}>
                            <Text style={styles.pinText}>
                                ${listing.price}
                            </Text>
                        </View>

                        {/* 📍 Callout */}
                        <Callout tooltip>
                            <View style={styles.callout}>
                                <Text style={styles.title}>
                                    {listing.title}
                                </Text>

                                <Text style={styles.price}>
                                    ${listing.price} / month
                                </Text>

                                <Text style={styles.deposit}>
                                    Deposit: ${listing.deposit}
                                </Text>

                                <Text style={styles.meta}>
                                    {listing.availability_status}
                                </Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}

            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    map: {
        width: "100%",
        height: "100%",
    },

    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    // 🔥 FIXED PIN (no clipping)
    pin: {
        backgroundColor: "#000",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,

        // important for visibility
        minWidth: 60,
        alignItems: "center",
        justifyContent: "center",

        // shadow for better visibility
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },

    pinText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "600",
    },

    callout: {
        width: 170,
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
    },

    title: {
        fontWeight: "bold",
        fontSize: 14,
    },

    price: {
        marginTop: 4,
        color: "#16a34a",
        fontWeight: "600",
    },

    deposit: {
        marginTop: 2,
        fontSize: 12,
        color: "#6b7280",
    },

    meta: {
        marginTop: 6,
        fontSize: 11,
        color: "#9ca3af",
        textTransform: "capitalize",
    },
});

export default ListingsMap;