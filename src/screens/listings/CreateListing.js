import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import MapView from "react-native-maps";
import { createListing } from "../services/listings.service";

const CreateListing = ({ navigation }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [deposit, setDeposit] = useState("");
    const [amenities, setAmenities] = useState("");
    const [lifestyle, setLifestyle] = useState("");
    const [image, setImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [region, setRegion] = useState({
        latitude: -17.8252,
        longitude: 31.0335,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.7,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleSubmit = async () => {
        if (isSubmitting) return;

        try {
            setIsSubmitting(true);

            const formData = new FormData();

            formData.append("title", title);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("deposit", deposit);

            formData.append("latitude", region.latitude);
            formData.append("longitude", region.longitude);

            formData.append(
                "amenities",
                JSON.stringify(amenities.split(",").map(a => a.trim()))
            );

            formData.append(
                "lifestyle_preferences",
                JSON.stringify(lifestyle.split(",").map(l => l.trim()))
            );

            if (image) {
                formData.append("image", {
                    uri: image,
                    name: "listing.jpg",
                    type: "image/jpeg",
                });
            }

            await createListing(formData);

            navigation.goBack();
        } catch (err) {
            console.log("Create listing error:", err?.response || err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView
                style={styles.container}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                <Text style={styles.label}>Select Location</Text>

                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        initialRegion={region}
                        onRegionChangeComplete={(newRegion) =>
                            setRegion(newRegion)
                        }
                    />
                    <View style={styles.markerFixed}>
                        <Ionicons name="location" size={40} color="red" />
                    </View>
                </View>

                {/* Image Picker */}
                <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                    {image ? (
                        <Image source={{ uri: image }} style={styles.image} />
                    ) : (
                        <>
                            <Ionicons
                                name="image-outline"
                                size={32}
                                color="#6B7280"
                            />
                            <Text style={styles.imageText}>
                                Upload Image
                            </Text>
                        </>
                    )}
                </TouchableOpacity>

                <TextInput
                    placeholder="Title"
                    value={title}
                    onChangeText={setTitle}
                    style={styles.input}
                />

                <TextInput
                    placeholder="Description"
                    value={description}
                    onChangeText={setDescription}
                    style={[styles.input, { height: 100 }]}
                    multiline
                />

                <View style={styles.row}>
                    <TextInput
                        placeholder="Price"
                        value={price}
                        onChangeText={setPrice}
                        keyboardType="numeric"
                        style={[styles.input, styles.half]}
                    />

                    <TextInput
                        placeholder="Deposit"
                        value={deposit}
                        onChangeText={setDeposit}
                        keyboardType="numeric"
                        style={[styles.input, styles.half]}
                    />
                </View>

                <TextInput
                    placeholder="Amenities (WiFi, Parking)"
                    value={amenities}
                    onChangeText={setAmenities}
                    style={styles.input}
                />

                <TextInput
                    placeholder="Lifestyle (Students, Quiet)"
                    value={lifestyle}
                    onChangeText={setLifestyle}
                    style={styles.input}
                />

                <TouchableOpacity
                    style={[
                        styles.button,
                        isSubmitting && { opacity: 0.7 },
                    ]}
                    onPress={handleSubmit}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>
                            Post Listing
                        </Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
        padding: 16,
    },
    label: {
        fontSize: 14,
        marginBottom: 6,
        color: "#111",
    },
    mapContainer: {
        height: 250,
        marginBottom: 16,
        borderRadius: 12,
        overflow: "hidden",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    markerFixed: {
        position: "absolute",
        top: "50%",
        left: "50%",
        marginLeft: -20,
        marginTop: -40,
        zIndex: 10,
    },
    imagePicker: {
        height: 180,
        backgroundColor: "#E5E7EB",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    imageText: {
        marginTop: 8,
        color: "#6B7280",
    },
    input: {
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 10,
        marginBottom: 12,
        fontSize: 14,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    half: {
        width: "48%",
    },
    button: {
        backgroundColor: "#000",
        padding: 14,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10,
        marginBottom: 24,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});

export default CreateListing;