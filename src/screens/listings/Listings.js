import { useEffect, useMemo, useState } from "react";
import {
    View,
    Text,
    TextInput,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ListingCard from "../../components/ListingCard";
import { getListings } from "../services/listings.service";

const Listings = ({ navigation }) => {
    const [search, setSearch] = useState("");
    const [listings, setListings] = useState([]);
    const [activeFilter, setActiveFilter] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchListings();
    }, []);

    const fetchListings = async () => {
        try {
            setLoading(true);
            const response = await getListings();
            setListings(response.data);
        } catch (error) {
            console.log(error);
            setListings([]);
        } finally {
            setLoading(false);
        }
    };

    // ✅ FILTERED DATA (source of truth for UI)
    const filteredListings = useMemo(() => {
        let data = [...listings];

        // 🔍 Search filter
        if (search.trim()) {
            data = data.filter((item) =>
                item.title
                    ?.toLowerCase()
                    .includes(search.toLowerCase())
            );
        }

        // ⚙️ Sorting filters
        if (activeFilter === "price_low_high") {
            data.sort((a, b) => a.price - b.price);
        }

        if (activeFilter === "price_high_low") {
            data.sort((a, b) => b.price - a.price);
        }

        return data;
    }, [listings, search, activeFilter]);

    return (
        <View style={styles.container}>

            {/* 🔍 Search Bar */}
            <View style={styles.searchContainer}>
                <Ionicons name="search-outline" size={18} color="#6B7280" />
                <TextInput
                    placeholder="Search listings..."
                    value={search}
                    onChangeText={setSearch}
                    style={styles.searchInput}
                />
            </View>

            {/* ⚙️ Filters */}
            <View style={styles.filtersContainer}>

                <TouchableOpacity
                    style={[
                        styles.filterChip,
                        activeFilter === "price_low_high" && styles.activeChip,
                    ]}
                    onPress={() =>
                        setActiveFilter(
                            activeFilter === "price_low_high"
                                ? null
                                : "price_low_high"
                        )
                    }
                >
                    <Text
                        style={[
                            styles.filterText,
                            activeFilter === "price_low_high" &&
                            styles.activeText,
                        ]}
                    >
                        Price ↑
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.filterChip,
                        activeFilter === "price_high_low" && styles.activeChip,
                    ]}
                    onPress={() =>
                        setActiveFilter(
                            activeFilter === "price_high_low"
                                ? null
                                : "price_high_low"
                        )
                    }
                >
                    <Text
                        style={[
                            styles.filterText,
                            activeFilter === "price_high_low" &&
                            styles.activeText,
                        ]}
                    >
                        Price ↓
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.filterChip}
                    onPress={() => {
                        setSearch("");
                        setActiveFilter(null);
                    }}
                >
                    <Text style={styles.filterText}>Reset</Text>
                </TouchableOpacity>

            </View>

            {/* 📋 Listings */}
            <FlatList
                data={filteredListings}
                keyExtractor={(item) => item.id?.toString()}
                renderItem={({ item }) => (
                    <ListingCard
                        listing={item}
                        onPress={() =>
                            navigation.navigate("ListingDetails", {
                                id: item.id,
                            })
                        }
                    />
                )}
                contentContainerStyle={{ padding: 16 }}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>
                        {loading ? "Loading..." : "No listings found"}
                    </Text>
                }
            />

            {/* ➕ Floating Button */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate("CreateListing")}
            >
                <Ionicons name="add" size={28} color="#fff" />
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
    },

    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        margin: 16,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 12,
        elevation: 2,
    },

    searchInput: {
        marginLeft: 8,
        flex: 1,
        fontSize: 14,
    },

    filtersContainer: {
        flexDirection: "row",
        paddingHorizontal: 16,
        marginBottom: 8,
        gap: 8,
    },

    filterChip: {
        backgroundColor: "#E5E7EB",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },

    activeChip: {
        backgroundColor: "#000",
    },

    filterText: {
        fontSize: 12,
        color: "#111",
    },

    activeText: {
        color: "#fff",
    },

    emptyText: {
        textAlign: "center",
        marginTop: 40,
        color: "#6B7280",
    },

    fab: {
        position: "absolute",
        bottom: 24,
        right: 24,
        backgroundColor: "#000",
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
    },
});

export default Listings;