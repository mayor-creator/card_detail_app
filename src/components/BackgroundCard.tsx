import { Image } from "expo-image";
import {
	Dimensions,
	ImageBackground,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { theme } from "../theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const FIGMA_WIDTH = 375;
const SCALE = SCREEN_WIDTH / FIGMA_WIDTH;

const bgImage = require("../../assets/images/bg-main-mobile.png");
const ftImage = require("../../assets/images/bg-card-front.png");
const btImage = require("../../assets/images/bg-card-back.png");

export const BackgroundImageCard = () => {
	return (
		<View>
			<ImageBackground
				source={bgImage}
				resizeMode="cover"
				style={styles.bgImage}
			>
				<Image source={btImage} style={styles.backCard} />
				<View style={styles.frontCardContainer}>
					<Image source={ftImage} style={styles.frontCard} />
					<Text style={[styles.textColor, styles.cardNumber]}>
						0000 0000 0000 0000
					</Text>
					<Text style={[styles.textColor, styles.cardName]}>
						JANE APPLESSED
					</Text>
					<Text style={[styles.textColor, styles.cardDate]}>00/00</Text>
				</View>
			</ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
	bgImage: {
		width: SCREEN_WIDTH,
		height: 240 * SCALE,
		marginBottom: 120 * SCALE,
	},
	backCard: {
		position: "absolute",
		width: 286 * SCALE,
		height: 157 * SCALE,
		top: 50 * SCALE,
		left: 73 * SCALE,
		zIndex: 1,
	},
	frontCardContainer: {
		position: "absolute",
		width: 285 * SCALE,
		height: 156.21 * SCALE,
		left: 17 * SCALE,
		top: 126 * SCALE,
		zIndex: 2,
	},
	frontCard: {
		width: "100%",
		height: "100%",
	},
	textColor: {
		color: theme.colors.white,
		position: "absolute",
	},
	cardNumber: {
		top: 60 * SCALE,
		left: 20 * SCALE,
		fontSize: theme.typography.fontSize.lg * SCALE,
		fontWeight: "500",
	},
	cardName: {
		bottom: 20 * SCALE,
		left: 20 * SCALE,
		fontSize: theme.typography.fontSize.xs * SCALE,
		fontWeight: "500",
	},
	cardDate: {
		bottom: 20 * SCALE,
		right: 20 * SCALE,
		fontSize: theme.typography.fontSize.xs * SCALE,
		fontWeight: "500",
	},
});
