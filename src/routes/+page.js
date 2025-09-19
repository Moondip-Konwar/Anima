import { fetchBasicAnimeData, fetchPaginatedAnimeData } from "../lib/utils/fetch";
import { runPython } from "../lib/utils/python.js";

export const load = async ({ setHeaders }) => {
	let data = {};
	if (navigator.onLine) {
		data = await fetchNewUpdate(setHeaders);
	} else {
		data = await runPython("../backend/read.py", ["../backend/data/library.json"], false);
	}
	setHeaders({
		"cache-control": "public, max-age=172800, stale-while-revalidate=86400"
	});
	const updatedData = await downloadImages(data);
	return { ...updatedData };
};

async function fetchNewUpdate() {
	{
		const popularAnime = await fetchBasicAnimeData("POPULARITY_DESC");
		const topRatedAnime = await fetchPaginatedAnimeData("SCORE_DESC", 1);
		const trendingAnime = await fetchPaginatedAnimeData("TRENDING_DESC", 1);
		const favouriteAnime = await fetchPaginatedAnimeData("FAVOURITES_DESC", 1);

		await runPython(
			"../backend/write.py",
			["../backend/data/library.json", { popularAnime, topRatedAnime, trendingAnime, favouriteAnime }],
			false
		);

		return {
			popularAnime,
			trendingAnime,
			topRatedAnime,
			favouriteAnime
		};
	}
}

async function downloadImages(animeData) {
	console.time("Loaded Images");
	const loggingData = {
		exists: {
			cover: [],
			banner: []
		},
		error: {
			cover: [],
			banner: []
		},
		ok: {
			cover: [],
			banner: []
		}
	};
	for (const [_category_key, category] of Object.entries(animeData)) {
		for (const anime of category) {
			const title = anime.title?.english || anime.title?.romaji || "Untitled";

			// Banner
			if (anime.bannerImage) {
				const bannerStatus = await runPython(
					"../backend/image_downloader.py",
					[anime.bannerImage, "../static/images"],
					false
				);

				if ((bannerStatus?.status === "ok" || bannerStatus?.status === "exists") && bannerStatus.file) {
					// Extract just filename from the path
					const filename = bannerStatus.file.split("/").pop();
					anime.bannerImage = "images/" + filename;
					loggingData[bannerStatus?.status]["banner"].push(title);
				}
			} else {
				loggingData["error"]["banner"].push(title);
			}

			// Cover
			if (anime.coverImage?.extraLarge) {
				const coverStatus = await runPython(
					"../backend/image_downloader.py",
					[anime.coverImage.extraLarge, "../static/images"],
					false
				);

				if ((coverStatus?.status === "ok" || coverStatus?.status === "exists") && coverStatus.file) {
					const filename = coverStatus.file.split("/").pop();
					anime.coverImage.extraLarge = "images/" + filename;
					loggingData[coverStatus?.status]["cover"].push(title);
				}
			} else {
				loggingData["error"]["cover"].push(title);
			}
		}
	}

	// Logging
	console.timeEnd("Loaded Images");
	console.log(loggingData);
	return animeData;
}
