import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { theme } from "../theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const FIGMA_WIDTH = 375;
const SCALE = SCREEN_WIDTH / FIGMA_WIDTH;

type Props = {
	label: string;
	onPress: () => void;
	disabled?: boolean;
};

export default function Button({ label, onPress, disabled = false }: Props) {
	return (
		<View
			style={[
				styles.buttonContainer,
				disabled && { backgroundColor: theme.colors.gray400 },
			]}
		>
			<Pressable style={styles.button} onPress={onPress} disabled={disabled}>
				<Text style={styles.buttonLabel}>{label}</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	buttonContainer: {
		backgroundColor: theme.colors.purple950,
		borderRadius: 8 * SCALE,
		width: 327 * SCALE,
		height: 53 * SCALE,
		padding: 3 * SCALE,
	},
	button: {
		width: "100%",
		height: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
	buttonLabel: {
		color: theme.colors.white,
		fontFamily: theme.typography.fontFamily.regular,
		fontSize: theme.typography.fontSize.lg,
		fontWeight: "500",
	},
});
