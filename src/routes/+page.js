import { fetchBasicAnimeData, fetchPaginatedAnimeData } from "../lib/utils/fetch";
import { runPython } from "../lib/utils/python";

export const load = async ({ setHeaders }) => {
	const data = await fetch_json(setHeaders);
	return { ...data };
};

async function fetch_new(setHeaders) {
	{
		const popularAnime = await fetchBasicAnimeData("POPULARITY_DESC");
		const topRatedAnime = await fetchPaginatedAnimeData("SCORE_DESC", 1);
		const trendingAnime = await fetchPaginatedAnimeData("TRENDING_DESC", 1);
		const favouriteAnime = await fetchPaginatedAnimeData("FAVOURITES_DESC", 1);

		setHeaders({
			"cache-control": "public, max-age=172800, stale-while-revalidate=86400"
		});

		return {
			popularAnime,
			trendingAnime,
			topRatedAnime,
			favouriteAnime
		};
	}
}

async function fetch_json(setHeaders) {
	const anime_data = await runPython("../backend/read.py", ["../backend/data/library.json"]);
	setHeaders({
		"cache-control": "public, max-age=172800, stale-while-revalidate=86400"
	});

	return {
		...anime_data
	};
}
