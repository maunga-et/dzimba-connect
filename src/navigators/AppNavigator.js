import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Listings from "../screens/listings/Listings";
import MainBottomTabBarNavigator from "./MainBottomTabBarNavigator";
import CreateListing from "../screens/listings/CreateListing";
import ListingDetail from "../screens/listings/ListingDetail";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MainBottomTabBarNavigator"
                component={MainBottomTabBarNavigator}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="CreateListing"
                component={CreateListing}
                options={{
                    title: "Post listing",
                }}
            />
            <Stack.Screen
                name="ListingDetails"
                component={ListingDetail}
                options={{
                    title: "Listing details",
                }}
            />
        </Stack.Navigator>
    )
}

export default AppNavigator;