import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, useNavigation } from "expo-router";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "@/model/NavigationType";
import Authentication from "@/service/Authentication";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFF5F5',
	},
	logoContainer: {
		alignItems: 'center',
		marginBottom: 30,
	},
	logo: {
		width: 150,
		height: 150,
		resizeMode: 'contain',
	},
	inputContainer: {
		paddingHorizontal: 20,
		width: '100%',
		gap: 15,
	},
	input: {
		backgroundColor: 'white',
		padding: 15,
		borderRadius: 25,
		fontSize: 16,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 3,
		elevation: 3,
	},
	button: {
		backgroundColor: '#FF6B6B',
		paddingVertical: 15,
		borderRadius: 25,
		alignItems: 'center',
		marginTop: 20,
	},
	buttonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold',
	},
	loginLink: {
		marginTop: 20,
		alignItems: 'center',
	},
	loginLinkText: {
		color: '#FF6B6B',
		fontSize: 16,
	}
});

const Signup = () => {
	const insets = useSafeAreaInsets();
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [confirmPassword, setConfirmPassword] = React.useState('');
	const [fullName, setFullName] = React.useState('');

	const handleSignup = async () => {
		try {
			// Call authentication service
			// await Authentication.signUp(email, password);
			// Navigate to home on success
			// router.replace('/home');
		} catch (error) {
			// Handle errors
		}
	};

	return (
		<View style={[styles.container, { paddingTop: insets.top }]}>
			<View style={styles.logoContainer}>
				<Image
					source={require('@/assets/images/baby-logo.png')}
					style={styles.logo}
				/>
				<Text className="text-xl font-semibold text-center mb-2">
					Nestcare
				</Text>
			</View>

			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					placeholder="Full Name"
					value={fullName}
					onChangeText={setFullName}
					autoCapitalize="words"
				/>

				<TextInput
					style={styles.input}
					placeholder="Email"
					value={email}
					onChangeText={setEmail}
					keyboardType="email-address"
					autoCapitalize="none"
				/>

				<TextInput
					style={styles.input}
					placeholder="Password"
					value={password}
					onChangeText={setPassword}
					secureTextEntry
				/>

				<TextInput
					style={styles.input}
					placeholder="Confirm Password"
					value={confirmPassword}
					onChangeText={setConfirmPassword}
					secureTextEntry
				/>

				<TouchableOpacity
					onPress={handleSignup}
					style={styles.button}
				>
					<Text style={styles.buttonText}>Sign Up</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.loginLink}
				// onPress={() => router.push("/Login")}
				>
					<Text style={styles.loginLinkText}>
						Already have an account? Login
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Signup; 