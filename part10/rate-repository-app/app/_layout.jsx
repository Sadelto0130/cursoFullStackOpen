import { Stack } from "expo-router";
import AppBar from "../src/components/AppBar";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        header: () => <AppBar />,
      }}
    />
  );
}
