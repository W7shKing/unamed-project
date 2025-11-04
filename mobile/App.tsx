import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import TrendingScreen from './screens/TrendingScreen';
import FriendsActivityScreen from './screens/FriendsActivityScreen';
import ProfileScreen from './screens/ProfileScreen';
import './i18n';

export type RootStackParamList = {
	Home: undefined;
	Trending: undefined;
	Friends: undefined;
	Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
	const colorScheme = useColorScheme();

	return (
		<NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
			<Stack.Navigator>
				<Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
				<Stack.Screen name="Trending" component={TrendingScreen} options={{ title: 'Trending' }} />
				<Stack.Screen name="Friends" component={FriendsActivityScreen} options={{ title: 'Friends' }} />
				<Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
