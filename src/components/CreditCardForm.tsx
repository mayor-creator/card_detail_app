import { Image } from "expo-image";
import { useState } from "react";
import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
import { theme } from "../theme";
import Button from "./Button";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const FIGMA_WIDTH = 375;
const SCALE = SCREEN_WIDTH / FIGMA_WIDTH;

const iconComplete = require("../../assets/images/icon-complete.svg");

export const CreditCardForm = () => {
	const [cardName, setCardName] = useState<string>("");
	const [cardNumber, setCardNumber] = useState<string>("");
	const [month, setMonth] = useState<string>("");
	const [year, setYear] = useState<string>("");
	const [cvcNumber, setCVCNumber] = useState<string>("");
	const [error, setError] = useState({
		name: false,
		number: false,
		monthError: false,
		yearError: false,
		cvcError: false,
	});
	const [modal, setModal] = useState<boolean>(false);

	const handleCardNameChange = (value: string) => {
		setCardName(value);
		if (value.trim() === "") {
			setError((prev) => ({ ...prev, name: true }));
			return;
		}

		const regex = /^[A-Za-z ]*$/;
		const valid = regex.test(value);
		if (!valid) return;

		if (value.length > 25) {
			setError((prev) => ({ ...prev, name: true }));
		} else {
			setError((prev) => ({ ...prev, name: false }));
		}
	};

	const handleCardNumberChange = (value: string) => {
		const digitsOnly = value.replace(/\D/g, "");

		const formattedCardNumber = digitsOnly.replace(/(.{4})/g, "$1 ").trim();
		setCardNumber(formattedCardNumber);

		if (digitsOnly === "") {
			setError((prev) => ({ ...prev, number: true }));
			return;
		}

		const regex = /^[0-9]*$/;
		const valid = regex.test(digitsOnly);
		if (!valid) return;

		if (digitsOnly.length !== 16) {
			setError((prev) => ({ ...prev, number: true }));
		} else {
			setError((prev) => ({ ...prev, number: false }));
		}
	};

	const handleMonthExpireChange = (value: string) => {
		value = value.replace(/\D/g, "");

		if (value.length > 2) return;
		setMonth(value);

		const num = Number(value);
		if (!value || num < 1 || num > 12) {
			setError((prev) => ({ ...prev, monthError: true }));
		} else {
			setError((prev) => ({ ...prev, monthError: false }));
		}
	};

	const handleYearExpireChange = (value: string) => {
		value = value.replace(/\D/g, "");

		if (value.length > 2) return;
		setYear(value);

		const currentYear = Number(new Date().getFullYear().toString().slice(-2));
		const num = Number(value);

		if (!value || num < currentYear) {
			setError((prev) => ({ ...prev, yearError: true }));
		} else {
			setError((prev) => ({ ...prev, yearError: false }));
		}
	};

	const handleCvcChange = (value: string) => {
		value = value.replace(/\D/g, "");

		if (value.length > 3) return;
		setCVCNumber(value);

		const num = Number(value);
		if (!value || num < 3) {
			setError((prev) => ({ ...prev, cvcError: true }));
		} else {
			setError((prev) => ({ ...prev, cvcError: false }));
		}
	};

	const handleFormReset = () => {
		setCardName("");
		setCardNumber("");
		setMonth("");
		setYear("");
		setCVCNumber("");
		setError({
			name: false,
			number: false,
			monthError: false,
			yearError: false,
			cvcError: false,
		});
		setModal(false);
	};

	return (
		<View style={styles.formContainer}>
			<View style={styles.cardHolderContainer}>
				<View style={styles.cardContainer}>
					<Text style={styles.label}>CARDHOLDER NAME</Text>
					<TextInput
						style={[styles.input, error.name && styles.inputError]}
						placeholder="e.g. Jane Applessed"
						keyboardType="default"
						value={cardName}
						onChangeText={handleCardNameChange}
					/>
					{error.name && (
						<Text style={styles.errorMessage}>Can't be blank or invalid</Text>
					)}
				</View>

				<View style={styles.cardContainer}>
					<Text style={styles.label}>CARD NUMBER</Text>
					<TextInput
						style={[styles.input, error.number && styles.inputError]}
						placeholder="e.g. 1234 5678 9123 0000"
						keyboardType="number-pad"
						value={cardNumber}
						onChangeText={handleCardNumberChange}
					/>
					{error.number && (
						<Text style={styles.errorMessage}>Wrong format, numbers only</Text>
					)}
				</View>

				<View style={styles.expiryCvcContainer}>
					<View style={{ gap: 8 }}>
						<Text style={styles.label}>EXP.DATE (MM/YY)</Text>
						<View style={styles.dateContainer}>
							<View>
								<TextInput
									placeholder="MM"
									keyboardType="number-pad"
									style={[
										styles.input,
										styles.dateInput,
										error.monthError && styles.inputError,
									]}
									value={month}
									onChangeText={handleMonthExpireChange}
								/>
								{error.monthError && (
									<Text style={styles.errorMessage}>Can't be blank</Text>
								)}
							</View>
							<View>
								<TextInput
									placeholder="YY"
									keyboardType="number-pad"
									style={[
										styles.input,
										styles.dateInput,
										error.yearError && styles.inputError,
									]}
									value={year}
									onChangeText={handleYearExpireChange}
								/>
								{error.yearError && (
									<Text style={styles.errorMessage}>Can't be blank</Text>
								)}
							</View>
						</View>
					</View>
					<View style={{ gap: 8 }}>
						<Text style={styles.label}>CVC</Text>
						<TextInput
							placeholder="e.g. 123"
							keyboardType="number-pad"
							style={[
								styles.input,
								styles.cvcInput,
								error.cvcError && styles.inputError,
							]}
							value={cvcNumber}
							onChangeText={handleCvcChange}
						/>
						{error.cvcError && (
							<Text style={styles.errorMessage}>Can't be blank</Text>
						)}
					</View>
				</View>
				<Button label="Confirm" onPress={() => setModal(true)}></Button>
			</View>

			{/*create a modal */}
			{modal && (
				<View style={styles.backdrop}>
					<View style={styles.modalContainer}>
						<Image source={iconComplete} style={styles.modalImage} />
						<Text style={styles.modalTitle}>THANK YOU!</Text>
						<Text style={styles.modalDescription}>
							We've added your credit details
						</Text>
						<Button label="Continue" onPress={handleFormReset}></Button>
					</View>
				</View>
			)}
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
	backdrop: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: 10,
		backgroundColor: theme.colors.white,
		justifyContent: "center",
		alignItems: "center",
	},
	modalContainer: {
		alignItems: "center",
		justifyContent: "center",
		paddingLeft: 24 * SCALE,
		paddingRight: 24 * SCALE,
		gap: 32 * SCALE,
	},
	modalImage: {
		width: 80 * SCALE,
		height: 80 * SCALE,
	},
	modalTitle: {
		color: theme.colors.purple950,
		fontFamily: theme.typography.fontFamily.regular,
		fontSize: theme.typography.fontSize.xxl,
		fontWeight: "500",
	},
	modalDescription: {
		color: theme.colors.gray950,
		fontFamily: theme.typography.fontFamily.regular,
		fontSize: theme.typography.fontSize.lg,
		fontWeight: "500",
	},
});
