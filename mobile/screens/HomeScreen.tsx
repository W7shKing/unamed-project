import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useTranslation } from 'react-i18next';
import { fetchDubaiPOIs } from '../services/overpass';
import { getUnsplashPhotoForPlace } from '../services/unsplash';
import { getCrowdLevel } from '../services/crowd';
import TrendingCarousel from '../components/TrendingCarousel';
import CrowdLevelBadge from '../components/CrowdLevelBadge';

interface PlaceItem {
	id: string;
	title: string;
	lat: number;
	lon: number;
	photoUrl?: string;
	crowd: 'low' | 'moderate' | 'busy';
}

export default function HomeScreen() {
	const { t, i18n } = useTranslation();
	const [query, setQuery] = useState('');
	const [loading, setLoading] = useState(false);
	const [places, setPlaces] = useState<PlaceItem[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		setLoading(true);
		fetchDubaiPOIs('amenity~"(restaurant|cafe|bar)"')
			.then(async (elements) => {
				const withMeta: PlaceItem[] = await Promise.all(
					elements.map(async (e) => {
						const title = e.tags?.name || t('unknown_place');
						const photoUrl = await getUnsplashPhotoForPlace(title);
						return {
							id: `${e.id}`,
							title,
							lat: e.lat,
							lon: e.lon,
							photoUrl,
							crowd: getCrowdLevel({ hour: new Date().getHours(), category: e.tags?.amenity || 'poi' })
						};
					})
				);
				setPlaces(withMeta);
			})
			.catch((err) => setError(err?.message || 'Error'))
			.finally(() => setLoading(false));
	}, [i18n.language]);

	const filtered = useMemo(() => {
		if (!query) return places;
		return places.filter((p) => p.title.toLowerCase().includes(query.toLowerCase()));
	}, [places, query]);

	return (
		<View style={styles.container}>
			<View style={styles.searchBar}>
				<TextInput
					placeholder={t('search_placeholder')}
					value={query}
					onChangeText={setQuery}
					style={styles.input}
				/>
				<TouchableOpacity onPress={() => setQuery('')}>
					<Text style={styles.clear}>{t('clear')}</Text>
				</TouchableOpacity>
			</View>

			<MapView
				style={styles.map}
				initialRegion={{
					latitude: 25.2048,
					longitude: 55.2708,
					latitudeDelta: 0.2,
					longitudeDelta: 0.2,
				}}
			>
				{filtered.slice(0, 40).map((p) => (
					<Marker key={p.id} coordinate={{ latitude: p.lat, longitude: p.lon }} title={p.title} />
				))}
			</MapView>

			<View style={styles.sectionHeader}>
				<Text style={styles.sectionTitle}>{t('trending_now')}</Text>
				<TouchableOpacity>
					<Text style={styles.link}>{t('see_all')}</Text>
				</TouchableOpacity>
			</View>

			{loading && <ActivityIndicator style={{ margin: 12 }} />}
			{error && <Text style={styles.error}>{error}</Text>}

			<TrendingCarousel items={filtered.slice(0, 10)} />

			<FlatList
				data={filtered.slice(0, 20)}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<View style={styles.listItem}>
						<View style={{ flex: 1 }}>
							<Text style={styles.place}>{item.title}</Text>
							<CrowdLevelBadge level={item.crowd} />
						</View>
						{item.photoUrl ? <View style={styles.thumb} /> : null}
					</View>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#0B0F1A' },
	searchBar: { flexDirection: 'row', padding: 12, gap: 8, alignItems: 'center', backgroundColor: '#0B0F1A' },
	input: { flex: 1, backgroundColor: '#12182A', color: 'white', padding: 10, borderRadius: 10 },
	clear: { color: '#8EA6FF', paddingHorizontal: 8 },
	map: { height: 260, borderRadius: 12, marginHorizontal: 12 },
	sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 12, paddingVertical: 10 },
	sectionTitle: { color: 'white', fontSize: 18, fontWeight: '600' },
	link: { color: '#8EA6FF' },
	error: { color: '#FF6B6B', paddingHorizontal: 12 },
	listItem: { flexDirection: 'row', paddingHorizontal: 12, paddingVertical: 10, alignItems: 'center', gap: 12 },
	place: { color: 'white', fontSize: 16, fontWeight: '500' },
	thumb: { width: 56, height: 56, backgroundColor: '#1C2541', borderRadius: 8 }
});
