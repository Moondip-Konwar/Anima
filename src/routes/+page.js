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
			const title = anime.title?.english || anime.title?.romaji || "Untitled";

			// Banner
			if (anime.bannerImage) {
				const bannerStatus = await runPython("../backend/image_downloader.py", [anime.bannerImage, "../images"]);

				console.log(`Downloaded banner for: ${title}`, bannerStatus);

				if (bannerStatus?.status === "ok" && bannerStatus.file) {
					// Extract just filename from the path
					const filename = bannerStatus.file.split("/").pop();
					anime.bannerImage = filename;
				}
			} else {
				console.warn(`Missing banner for: ${title}`);
			}

			// Cover
			if (anime.coverImage?.extraLarge) {
				const coverStatus = await runPython("../backend/image_downloader.py", [
					anime.coverImage.extraLarge,
					"../images"
				]);

				console.log(`Downloaded cover for: ${title}`, coverStatus);

				if (coverStatus?.status === "ok" && coverStatus.file) {
					const filename = coverStatus.file.split("/").pop();
					anime.coverImage.extraLarge = filename;
				}
			} else {
				console.warn(`Missing cover for: ${title}`);
			}
		}
	}

	return anime_data;
}
