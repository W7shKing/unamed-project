import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CrowdLevelBadge({ level }: { level: 'low' | 'moderate' | 'busy' }) {
	const bg = level === 'low' ? '#2ECC71' : level === 'moderate' ? '#F1C40F' : '#E74C3C';
	return (
		<View style={[styles.badge, { backgroundColor: bg }]}> 
			<Text style={styles.text}>{level}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	badge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
	text: { color: 'black', fontWeight: '700', textTransform: 'capitalize' }
});
