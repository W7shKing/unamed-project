import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FriendsActivityScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Friends Activity</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0B0F1A' },
	text: { color: 'white' }
});
