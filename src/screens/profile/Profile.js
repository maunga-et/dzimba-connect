import { useEffect, useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    TextInput,
    Alert
} from "react-native";
import useAuth from "../../hooks/useAuth";
import { me, updateMe } from "../services/auth.service";

const Profile = () => {
    const { signOut } = useAuth();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
    });

    const fetchUser = async () => {
        try {
            const res = await me();
            setUser(res.data);

            setForm({
                first_name: res.data.first_name || "",
                last_name: res.data.last_name || "",
                email: res.data.email || "",
            });
        } catch (err) {
            console.log("Fetch user error:", err?.response?.data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const handleUpdate = async () => {
        try {
            setSaving(true);

            const res = await updateMe(form); // PATCH request
            setUser(res.data);

            Alert.alert("Success", "Profile updated successfully");
        } catch (err) {
            console.log("Update error:", err?.response?.data);
            Alert.alert("Error", "Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!user) {
        return (
            <View style={styles.center}>
                <Text>Failed to load profile</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>

            <View style={styles.card}>
                <Text style={styles.label}>Username (readonly)</Text>
                <Text style={styles.value}>{user.username}</Text>

                <Text style={styles.label}>First Name</Text>
                <TextInput
                    style={styles.input}
                    value={form.first_name}
                    onChangeText={(t) =>
                        setForm({ ...form, first_name: t })
                    }
                />

                <Text style={styles.label}>Last Name</Text>
                <TextInput
                    style={styles.input}
                    value={form.last_name}
                    onChangeText={(t) =>
                        setForm({ ...form, last_name: t })
                    }
                />

                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={form.email}
                    onChangeText={(t) =>
                        setForm({ ...form, email: t })
                    }
                    keyboardType="email-address"
                />
            </View>

            <TouchableOpacity
                style={styles.updateButton}
                onPress={handleUpdate}
                disabled={saving}
            >
                <Text style={styles.updateText}>
                    {saving ? "Updating..." : "Update Profile"}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.logoutButton}
                onPress={signOut}
            >
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#F9FAFB",
    },

    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
    },

    card: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 12,
        marginBottom: 20,
    },

    label: {
        fontSize: 12,
        color: "#6B7280",
        marginTop: 10,
    },

    value: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 10,
    },

    input: {
        borderWidth: 1,
        borderColor: "#E5E7EB",
        padding: 10,
        borderRadius: 8,
        marginTop: 4,
    },

    updateButton: {
        backgroundColor: "#2563EB",
        padding: 14,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 10,
    },

    updateText: {
        color: "#fff",
        fontWeight: "bold",
    },

    logoutButton: {
        backgroundColor: "#EF4444",
        padding: 14,
        borderRadius: 10,
        alignItems: "center",
    },

    logoutText: {
        color: "#fff",
        fontWeight: "bold",
    },
});

export default Profile;