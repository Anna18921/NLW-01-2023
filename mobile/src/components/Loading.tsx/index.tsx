import { View, ActivityIndicator } from "react-native";

export const Loading = () => {
  return (
    <View
      style={{ flex: 1, justifyContent: "center", alignItems: "center",  backgroundColor: "#09090A" }}
    >
      <ActivityIndicator color="#7c3aed" />
    </View>
  );
};
