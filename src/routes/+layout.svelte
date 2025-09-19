<script>
	import Header from "../lib/components/Header.svelte";
	import Footer from "../lib/components/Footer.svelte";
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
</script>

<div class="root">
	<Header />
	{@render children?.()}
	<Footer />
</div>

<style>
	.root {
		width: 100%;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		gap: 2rem;
		background-color: #0f0f11;
	}
</style>
