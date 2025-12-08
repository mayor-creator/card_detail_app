import { useState } from "react";
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
	const [cardName, setCardName] = useState<string>("");
	const [cardNumber, setCardNumber] = useState<string>("");
	const [month, setMonth] = useState<string>("");
	const [year, setYear] = useState<string>("");
	const [cvcNumber, setCVCNumber] = useState<string>("");
	const [error, setError] = useState(false);

	const handleCardNameChange = (value: string) => {
		setCardName(value);
		if (value.trim() === "") {
			setError(true);
			return;
		}

		const regex = /^[A-Za-z ]*$/;
		const valid = regex.test(value);
		if (!valid) return;

		if (value.length > 25) {
			setError(true);
		} else {
			setError(false);
		}
	};

	const handleCardNumberChange = (value: string) => {
		const digitsOnly = value.replace(/\D/g, "");

		const formattedCardNumber = digitsOnly.replace(/(.{4})/g, "$1").trim();
		setCardNumber(formattedCardNumber);

		if (digitsOnly === "") {
			setError(true);
			return;
		}

		const regex = /^[0-9]*$/;
		const valid = regex.test(digitsOnly);
		if (!valid) return;

		if (digitsOnly.length !== 16) {
			setError(true);
		} else {
			setError(false);
		}
	};

	return (
		<View style={styles.formContainer}>
			<View style={styles.cardHolderContainer}>
				<View style={styles.cardContainer}>
					<Text style={styles.label}>CARDHOLDER NAME</Text>
					<TextInput
						style={[styles.input, error && styles.inputError]}
						placeholder="e.g. Jane Applessed"
						keyboardType="default"
						value={cardName}
						onChangeText={handleCardNameChange}
					/>
					{error && (
						<Text style={styles.errorMessage}>Can't be blank or invalid</Text>
					)}
				</View>

				<View style={styles.cardContainer}>
					<Text style={styles.label}>CARD NUMBER</Text>
					<TextInput
						style={[styles.input, error && styles.inputError]}
						placeholder="e.g. 1234 5678 9123 0000"
						keyboardType="number-pad"
						value={cardNumber}
						onChangeText={handleCardNumberChange}
					/>
					{error && (
						<Text style={styles.errorMessage}>Wrong format, numbers only</Text>
					)}
				</View>

				<View style={styles.expiryCvcContainer}>
					<View style={{ gap: 8 }}>
						<Text style={styles.label}>EXP.DATE (MM/YY)</Text>
						<View style={styles.dateContainer}>
							<TextInput
								placeholder="MM"
								keyboardType="number-pad"
								style={[styles.input, styles.dateInput]}
								value={month}
							/>
							<TextInput
								placeholder="YY"
								keyboardType="number-pad"
								style={[styles.input, styles.dateInput]}
								value={year}
							/>
						</View>
					</View>
					<View style={{ gap: 8 }}>
						<Text style={styles.label}>CVC</Text>
						<TextInput
							placeholder="e.g. 123"
							keyboardType="number-pad"
							style={[styles.input, styles.cvcInput]}
							value={cvcNumber}
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
	errorMessage: {
		color: theme.colors.red400,
		fontFamily: theme.typography.fontFamily.regular,
		fontSize: theme.typography.fontSize.sm,
		fontWeight: "500",
	},
	inputError: {
		borderWidth: 1 * SCALE,
		borderColor: theme.colors.red400,
	},
});
