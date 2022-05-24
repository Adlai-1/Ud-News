import { useState } from "react";
import { WebView } from "react-native-webview";
import { ProgressBar } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { Notification } from "./Notifications";

export default function Home() {
  const [load, setload] = useState(false);

  Notification()

  return (
    <>
      {load ? (
        <ProgressBar
          color="white"
          style={{ height: 3, backgroundColor: "black" }}
          indeterminate={true}
        />
      ) : null}
      <WebView
        onLoadStart={() => setload(!load)}
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
