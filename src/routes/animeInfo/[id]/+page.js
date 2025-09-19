import { fetchAdvAnimeData, fetchAnimeRecommendations } from "../../../lib/utils/fetch";

export const load = async ({ params, setHeaders }) => {
	let data;
	if (navigator.onLine) {
		data = await fetchNewAnimeInfoAndRecommendations(params);
	} else {
		// TODO
		console.error("Offline: Cant load anime info and recommendations");
		return;
	}

	setHeaders({
		"cache-control": "public, max-age=172800, stale-while-revalidate=86400"
	});

	return data;
};

async function fetchNewAnimeInfoAndRecommendations(params) {
	const recommendedAnime = await fetchAnimeRecommendations(params.id);
	const animeInfo = await fetchAdvAnimeData(params.id);

	return {
		animeInfo,
		recommendedAnime
	};
}
