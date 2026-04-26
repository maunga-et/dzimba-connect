import { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    ActivityIndicator,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { getListingById } from "../services/listings.service";

const ListingDetail = ({ route }) => {
    const { id } = route.params;

    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchListing();
    }, []);

    const fetchListing = async () => {
        try {
            const res = await getListingById(id);
            setListing(res.data);
        } catch (err) {
            console.log("Fetch listing error:", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }

    if (!listing) {
        return (
            <View style={styles.center}>
                <Text>Listing not found</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>

            {/* Image */}
            <Image
                source={{ uri: listing.image }}
                style={styles.image}
            />

            {/* Title + Price */}
            <View style={styles.header}>
                <Text style={styles.title}>{listing.title}</Text>
                <Text style={styles.price}>
                    ${listing.price} / month
                </Text>
                <Text style={styles.deposit}>
                    Deposit: ${listing.deposit}
                </Text>
            </View>

            {/* Description */}
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>
                {listing.description}
            </Text>

            {/* Map */}
            <Text style={styles.sectionTitle}>Location</Text>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: listing.latitude,
                    longitude: listing.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: listing.latitude,
                        longitude: listing.longitude,
                    }}
                />
            </MapView>

            {/* Amenities */}
            <Text style={styles.sectionTitle}>Amenities</Text>
            <View style={styles.badgeContainer}>
                {listing.amenities?.map((item, index) => (
                    <View key={index} style={styles.badge}>
                        <Ionicons name="checkmark-circle" size={14} color="#16a34a" />
                        <Text style={styles.badgeText}>{item}</Text>
                    </View>
                ))}
            </View>

            {/* Lifestyle */}
            <Text style={styles.sectionTitle}>Lifestyle</Text>
            <View style={styles.badgeContainer}>
                {listing.lifestyle_preferences?.map((item, index) => (
                    <View key={index} style={styles.badge}>
                        <Ionicons name="person" size={14} color="#2563eb" />
                        <Text style={styles.badgeText}>{item}</Text>
                    </View>
                ))}
            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    image: {
        width: "100%",
        height: 250,
    },

    header: {
        padding: 16,
    },

    title: {
        fontSize: 22,
        fontWeight: "bold",
    },

    price: {
        fontSize: 18,
        marginTop: 6,
        color: "#16a34a",
        fontWeight: "600",
    },

    deposit: {
        marginTop: 4,
        color: "#6b7280",
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginTop: 16,
        marginBottom: 8,
        paddingHorizontal: 16,
    },

    description: {
        paddingHorizontal: 16,
        color: "#374151",
        lineHeight: 20,
    },

    map: {
        height: 200,
        marginHorizontal: 16,
        borderRadius: 12,
    },

    badgeContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        paddingHorizontal: 16,
        gap: 8,
    },

    badge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f3f4f6",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
        marginBottom: 8,
    },

    badgeText: {
        marginLeft: 4,
        fontSize: 12,
        color: "#111827",
    },
});

export default ListingDetail;