import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#DC282F" },
        }}
      >
        <Stack.Screen
          name="home"
          options={{ title: "UDNews" }}
          component={Home}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
