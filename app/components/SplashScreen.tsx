import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import Animated, {
	useAnimatedStyle,
	withSpring,
	useSharedValue,
	withSequence,
	withDelay
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
	const router = useRouter();
	const scale = useSharedValue(0);
	const opacity = useSharedValue(1);

	useEffect(() => {
		scale.value = withSequence(
			withSpring(1, { damping: 10 }),
			withDelay(1000, withSpring(0.9, { damping: 10 }))
		);

		// Navigate to main screen after animation
		const timeout = setTimeout(() => {
			opacity.value = withSpring(0);
			setTimeout(() => router.replace('/(tabs)'), 500);
		}, 2000);

		return () => clearTimeout(timeout);
	}, []);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: scale.value }],
		opacity: opacity.value,
	}));

	return (
		<View style={styles.container}>
			<Animated.View style={[styles.logoContainer, animatedStyle]}>
				<Image
					source={require('../../assets/images/baby-logo.png')}
					style={styles.logo}
					resizeMode="contain"
				/>
			</Animated.View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFF5F5',
		alignItems: 'center',
		justifyContent: 'center',
	},
	logoContainer: {
		width: width * 0.5,
		height: width * 0.5,
	},
	logo: {
		width: '100%',
		height: '100%',
	},
}); 