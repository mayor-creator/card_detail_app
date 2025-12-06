import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { BackgroundImageCard } from "../components/BackgroundCard";
import { theme } from "../theme";

export default function Index() {
	const [fontsLoaded] = useFonts({
		SpaceGrotesk: require("../../assets/fonts/SpaceGrotesk-VariableFont_wght.ttf"),
	});

	if (!fontsLoaded) return null;

	return (
		<View style={styles.container}>
			<StatusBar style="light" />
			<BackgroundImageCard />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colors.white,
	},
	text: {
		fontFamily: theme.typography.fontFamily.regular,
	},
});
