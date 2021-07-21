<script lang="ts">
	import Theme from '$lib/theme.svelte';
	// Define some color themes here probably
</script>

<slot />
<Theme/>

<style lang="scss">
	:global(:root) {
		--blk: #7c6f64;
		--red: #ea6962;
		--grn: #a9b665;
		--yel: #d8a657;
		--blu: #7daea3;
		--mag: #d3869b;
		--cya: #89b482;
		--wht: #fbf1c7;
		--foreground-color: #7c6f64;
		--background-color: #fbf1c7;
	}

	// :global(*) {
	// 	// Styling
	// 	margin: 0;
	// 	padding: 0;
	// 	width: 100%;
	// 	height: 100%;

	// 	// Default color
	// 	background-color: #292828;
	// 	display: none;

	// 	// Animations
	// 	transition: 1s;
	// }

	// :global(span) {
	// 	cursor: pointer;
	// 	color: blue;
	// 	text-decoration: underline;
	// }

	// $pallettes: (
	// 	// Only blk & wht are verified
	// 	gruvbox-material-light:
	// 		(
	// 			blk: #fbf1c7,
	// 			rde: #ea6962,
	// 			grn: #a9b665,
	// 			yel: #d8a657,
	// 			blu: #7daea3,
	// 			mag: #d3869b,
	// 			cya: #89b482,
	// 			wht: #7c6f64
	// 		),
	// 	gruvbox-material-dark: (
	// 		blk: #292828,
	// 		rde: #ea6962,
	// 		grn: #a9b665,
	// 		yel: #d8a657,
	// 		blu: #7daea3,
	// 		mag: #d3869b,
	// 		cya: #89b482,
	// 		wht: #d4be98
	// 	),
	// 	solarized-light: (
	// 		blk: #fdf6e3,
	// 		rde: #dc322f,
	// 		grn: #859900,
	// 		yel: #b58900,
	// 		blu: #268bd2,
	// 		mag: #d33682,
	// 		cya: #2aa198,
	// 		wht: #657b83
	// 	),
	// 	solarized-dark: (
	// 		blk: #839496,
	// 		rde: #ea6962,
	// 		grn: #a9b665,
	// 		yel: #d8a657,
	// 		blu: #7daea3,
	// 		mag: #d3869b,
	// 		cya: #89b482,
	// 		wht: #002b36
	// 	)
	// );

	#pallette {
		background-color: var(--blk);
		color: var(--wht);
	}
</style>
