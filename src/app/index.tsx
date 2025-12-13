import {
	SpaceGrotesk_400Regular,
	SpaceGrotesk_500Medium,
	useFonts,
} from "@expo-google-fonts/space-grotesk";
import { StatusBar } from "expo-status-bar";
import {
	Keyboard,
	StyleSheet,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { BackgroundImageCard } from "../components/BackgroundCard";
import { CreditCardForm } from "../components/CreditCardForm";
import { theme } from "../theme";

export default function Index() {
	const [fontsLoaded] = useFonts({
		SpaceGrotesk_400Regular,
		SpaceGrotesk_500Medium,
	});

	if (!fontsLoaded) return null;

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.container}>
				<StatusBar style="light" />
				<BackgroundImageCard />
				<CreditCardForm />
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colors.white,
	},
});
