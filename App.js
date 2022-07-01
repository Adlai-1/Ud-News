import { useState } from "react";
import { WebView } from "react-native-webview";
import { ProgressBar, Appbar } from "react-native-paper";
import { Notification } from "./Functions/Notifications";
import { StatusBar } from "expo-status-bar";
import adjust from "./Functions/TextSize";

export default function App() {
  const [load, setload] = useState(true);

  Notification();

  return (
    <>
      <Appbar style={{ height: adjust(80), backgroundColor: "black" }}>
        <Appbar.Content style={{ marginTop: adjust(40) }} title="UD-News" />
      </Appbar>
      {load ? (
        <ProgressBar
          color="white"
          style={{ height: 3, backgroundColor: "black" }}
          indeterminate={true}
        />
      ) : null}
      <WebView
        onLoadEnd={() => setload(!load)}
        onError={(err) => alert(err)}
        pullToRefreshEnabled={true}
        originWhitelist={["https://*"]}
        allowsBackForwardNavigationGestures={true}
        source={{ uri: "https://udnews.org" }}
      />
      <StatusBar style="light" />
    </>
  );
}
