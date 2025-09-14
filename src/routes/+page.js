import { fetchBasicAnimeData, fetchPaginatedAnimeData } from "../lib/utils/fetch";

import { invoke } from "@tauri-apps/api/core";
export const load = async ({ setHeaders }) => {
	const popularAnime = await fetchBasicAnimeData("POPULARITY_DESC");
	const topRatedAnime = await fetchPaginatedAnimeData("SCORE_DESC", 1);
	const trendingAnime = await fetchPaginatedAnimeData("TRENDING_DESC", 1);
	const favouriteAnime = await fetchPaginatedAnimeData("FAVOURITES_DESC", 1);

	setHeaders({
		"cache-control": "public, max-age=172800, stale-while-revalidate=86400"
	});

	async function call_python_script() {
		const result = await invoke("run_python", {
			script: "backend/test.py",
			args: ["arg1", JSON.stringify({ apple: "banana", aa: 12312 })]
		});
		console.log("Python said:", result); // [Log] Python said: – "['arg1', '{\"apple\":\"banana\",\"aa\":12312}']" (+page.js, line 19)
	}

	call_python_script();
	console.log("Called python script");

	return {
		popularAnime,
		trendingAnime,
		topRatedAnime,
		favouriteAnime
	};
};
