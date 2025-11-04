import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

let MapView: any = null;
let Marker: any = null;
try {
	// Dynamically require to avoid bundler resolving it when not present in Expo Go
	const maps = require('react-native-maps');
	MapView = maps.default || maps.MapView || null;
	Marker = maps.Marker || null;
} catch (_e) {
	MapView = null;
	Marker = null;
}

type MarkerItem = { id: string; latitude: number; longitude: number; title?: string };

export default function SafeMap({
	markers,
	height = 260
}: {
	markers: MarkerItem[];
	height?: number;
}) {
	if (!MapView) {
		return (
			<View style={[styles.fallback, { height }]}> 
				<Text style={styles.fallbackText}>Map unavailable in Expo Go. Install Dev Client to enable map.</Text>
			</View>
		);
	}
	return (
		<MapView
			style={{ height, borderRadius: 12 }}
			initialRegion={{ latitude: 25.2048, longitude: 55.2708, latitudeDelta: 0.2, longitudeDelta: 0.2 }}
		>
			{markers.map((m) => (
				Marker ? <Marker key={m.id} coordinate={{ latitude: m.latitude, longitude: m.longitude }} title={m.title} /> : null
			))}
		</MapView>
	);
}

const styles = StyleSheet.create({
	fallback: { borderRadius: 12, marginHorizontal: 12, backgroundColor: '#12182A', alignItems: 'center', justifyContent: 'center' },
	fallbackText: { color: 'white', opacity: 0.8, padding: 16, textAlign: 'center' }
});
