import { useState } from "react";
import { WebView } from "react-native-webview";
import { ProgressBar } from "react-native-paper";

export default function Home() {
  const [load, setload] = useState(false);
  return (
    <>
      {load ? (
        <ProgressBar
          color="white"
          style={{ height: 3, backgroundColor: "red" }}
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
    </>
  );
}
