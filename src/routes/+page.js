import { fetchBasicAnimeData, fetchPaginatedAnimeData } from "../lib/utils/fetch";
import { runPython } from "../lib/utils/python";

export const load = async ({ setHeaders }) => {
	const data = await fetchJson(setHeaders);
	downloadImages(data);
	return { ...data };
};

async function fetchNew(setHeaders) {
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

async function fetchJson(setHeaders) {
	const anime_data = await runPython("../backend/read.py", ["../backend/data/library.json"]);
	setHeaders({
		"cache-control": "public, max-age=172800, stale-while-revalidate=86400"
	});

	return {
		...anime_data
	};
}

async function downloadImages(anime_data) {
	for (const [category_key, category] of Object.entries(anime_data)) {
		console.log(`Category: ${category_key}, Count: ${category.length}`);

		for (const anime of category) {
			if (!anime.bannerImage || !anime.coverImage?.extraLarge) {
				console.warn(`Skipping anime (missing images):`, anime);
				continue;
			}

			const bannerStatus = await runPython("../backend/image_downloader.py", [anime.bannerImage, "../images"]);

			const coverStatus = await runPython("../backend/image_downloader.py", [anime.coverImage.extraLarge, "../images"]);

			console.log(
				`Downloaded for anime: ${anime.title.english || "Untitled"}\n` +
				`  Banner: ${JSON.stringify(bannerStatus)}\n` +
				`  Cover: ${JSON.stringify(coverStatus)}`
			);
		}
	}
}
