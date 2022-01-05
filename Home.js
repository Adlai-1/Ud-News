import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

export default function Home() {
  return (
    <WebView source={{ uri: "https://udnews.org" }} style={styles.container}>
      <StatusBar style="light" />
    </WebView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
