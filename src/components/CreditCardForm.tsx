import {
	Alert,
	Dimensions,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import { theme } from "../theme";
import Button from "./Button";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const FIGMA_WIDTH = 375;
const SCALE = SCREEN_WIDTH / FIGMA_WIDTH;

export const CreditCardForm = () => {
	return (
		<View style={styles.formContainer}>
			<View style={styles.cardHolderContainer}>
				<View style={styles.cardContainer}>
					<Text style={styles.label}>CARDHOLDER NAME</Text>
					<TextInput
						style={styles.input}
						placeholder="e.g. Jane Applessed"
						keyboardType="default"
					/>
				</View>
				<View style={styles.cardContainer}>
					<Text style={styles.label}>CARD NUMBER</Text>
					<TextInput
						style={styles.input}
						placeholder="e.g. 1234 5678 9123 0000"
						keyboardType="number-pad"
					/>
				</View>
				<View style={styles.expiryCvcContainer}>
					<View style={{ gap: 8 }}>
						<Text style={styles.label}>EXP.DATE (MM/YY)</Text>
						<View style={styles.dateContainer}>
							<TextInput
								placeholder="MM"
								keyboardType="number-pad"
								style={[styles.input, styles.dateInput]}
							/>
							<TextInput
								placeholder="YY"
								keyboardType="number-pad"
								style={[styles.input, styles.dateInput]}
							/>
						</View>
					</View>
					<View style={{ gap: 8 }}>
						<Text style={styles.label}>CVC</Text>
						<TextInput
							placeholder="e.g. 123"
							keyboardType="number-pad"
							style={[styles.input, styles.cvcInput]}
						/>
					</View>
				</View>
				<Button label="Confirm" onPress={() => Alert.alert("Press")}></Button>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	formContainer: {
		paddingLeft: 24 * SCALE,
		paddingRight: 24 * SCALE,
		gap: 24 * SCALE,
	},
	cardHolderContainer: {
		gap: 24 * SCALE,
	},
	cardContainer: {
		gap: 8 * SCALE,
	},
	label: {
		color: theme.colors.purple950,
		fontFamily: theme.typography.fontFamily.regular,
		fontSize: theme.typography.fontSize.sm,
		fontWeight: "500",
	},
	input: {
		color: theme.colors.purple950,
		backgroundColor: theme.colors.white,
		borderRadius: 8 * SCALE,
		borderWidth: 1 * SCALE,
		borderColor: theme.colors.gray200,
		fontFamily: theme.typography.fontFamily.regular,
		fontSize: theme.typography.fontSize.lg,
		fontWeight: "500",
		width: 327 * SCALE,
		height: 45 * SCALE,
		paddingHorizontal: 16 * SCALE,
		paddingVertical: 8 * SCALE,
	},
	expiryCvcContainer: {
		flexDirection: "row",
		gap: 24 * SCALE,
	},
	dateContainer: {
		flexDirection: "row",
		gap: 8 * SCALE,
	},
	dateInput: {
		width: 80 * SCALE,
	},
	cvcInput: {
		width: 135 * SCALE,
	},
});
