import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import CrowdLevelBadge from './CrowdLevelBadge';

type Item = { id: string; title: string; crowd: 'low' | 'moderate' | 'busy' };

export default function TrendingCarousel({ items }: { items: Item[] }) {
	return (
		<ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
			{items.map((item) => (
				<View style={styles.card} key={item.id}>
					<Text style={styles.title}>{item.title}</Text>
					<CrowdLevelBadge level={item.crowd} />
				</View>
			))}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: { paddingHorizontal: 12 },
	card: { width: 200, height: 100, backgroundColor: '#12182A', borderRadius: 12, marginRight: 12, padding: 12, justifyContent: 'space-between' },
	title: { color: 'white', fontWeight: '600' }
});
