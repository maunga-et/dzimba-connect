import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ListingCard = ({ listing, onPress, onFavourite }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>

            {/* Image */}
            <View style={styles.imageContainer}>
                <Image source={{ uri: listing.image }} style={styles.image} />

                {/* Favourite Icon */}
                <TouchableOpacity style={styles.favButton} onPress={onFavourite}>
                    <Ionicons name="heart-outline" size={20} color="black" />
                </TouchableOpacity>
            </View>

            {/* Content */}
            <View style={styles.content}>

                {/* Price */}
                <Text style={styles.price}>
                    ${listing.price} <Text style={styles.deposit}>+ ${listing.deposit} deposit</Text>
                </Text>

                {/* Title */}
                <Text style={styles.title} numberOfLines={1}>
                    {listing.title}
                </Text>

                {/* Amenities */}
                <View style={styles.amenities}>
                    {listing.amenities?.slice(0, 3).map((item, index) => (
                        <Text key={index} style={styles.amenity}>
                            {item}
                        </Text>
                    ))}
                </View>

            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        marginBottom: 16,
        overflow: "hidden",
        elevation: 3, // Android shadow
    },

    imageContainer: {
        position: "relative",
    },

    image: {
        width: "100%",
        height: 180,
    },

    favButton: {
        position: "absolute",
        top: 10,
        right: 10,
        backgroundColor: "#fff",
        padding: 6,
        borderRadius: 20,
        elevation: 2,
    },

    content: {
        padding: 12,
    },

    price: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
    },

    deposit: {
        fontSize: 12,
        color: "#6B7280",
    },

    title: {
        fontSize: 14,
        marginTop: 4,
        color: "#111",
    },

    amenities: {
        flexDirection: "row",
        marginTop: 8,
        flexWrap: "wrap",
    },

    amenity: {
        fontSize: 11,
        color: "#6B7280",
        marginRight: 8,
        backgroundColor: "#F3F4F6",
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
    },
});

export default ListingCard;