import { NavigationContainer } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";
import BootScreen from "../screens/shared/BootScreen";


const RootNavigator = () => {
    const { loading, isAuthenticated } = useAuth();

    if (loading) {
        return <BootScreen />
    }

    return (
        <NavigationContainer>
            {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    )
}

export default RootNavigator;