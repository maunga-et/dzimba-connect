import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Listings from "../screens/listings/Listings";
import ListingsMap from "../screens/listings/ListingsMap";
import FavouriteListings from "../screens/listings/FavouriteListings";
import { Ionicons } from "@expo/vector-icons";
import Profile from "../screens/profile/Profile";

const Tab = createBottomTabNavigator();

const MainBottomTabBarNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "#9CA3AF", // muted gray
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Listings}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="ListingsMap"
        component={ListingsMap}
        options={{
          title: "Map",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "map" : "map-outline"}
              size={size}
              color={color}
            />
          ),
          headerShown: false
        }}
      />

      <Tab.Screen
        name="FavouriteListings"
        component={FavouriteListings}
        options={{
          title: "Favourites",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "heart" : "heart-outline"}
              size={size}
              color={color}
            />
          ),

        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault(); // 🚫 stops tab switch
          },
        })}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainBottomTabBarNavigator;