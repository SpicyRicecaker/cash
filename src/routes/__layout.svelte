<script lang="ts">
	import ThemePicker from '$lib/theme-picker.svelte';
	import type { Theme } from '$lib/types';
	import { onMount } from 'svelte';
	// Define some color themes here probably
	let selected: string = 'Gruvbox Material Dark';
	const themes: Theme[] = [
		{
			name: 'Gruvbox Material Light',
			blk: '#7c6f64',
			red: '#ea6962',
			grn: '#a9b665',
			yel: '#d8a657',
			blu: '#7daea3',
			mag: '#d3869b',
			cya: '#89b482',
			wht: '#fbf1c7',
			foregroundColor: '#7c6f64',
			backgroundColor: '#fbf1c7'
		},
		{
			name: 'Gruvbox Material Dark',
			blk: '#292828',
			red: '#ea6962',
			grn: '#a9b665',
			yel: '#d8a657',
			blu: '#7daea3',
			mag: '#d3869b',
			cya: '#89b482',
			wht: '#d4be98',
			foregroundColor: '#d4be98',
			backgroundColor: '#292828'
		}
	];

	// function updateThemeOnIndex() {
	// 	root.style.setProperty('--blk', themes[selected].blk);
	// 	root.style.setProperty('--blk', themes[selected].blk);
	// 	root.style.setProperty('--blk', themes[selected].blk);
	// 	root.style.setProperty('--blk', themes[selected].blk);
	// 	root.style.setProperty('--blk', themes[selected].blk);
	// 	root.style.setProperty('--blk', themes[selected].blk);
	// 	root.style.setProperty('--blk', themes[selected].blk);
	// 	root.style.setProperty('--blk', themes[selected].blk);
	// 	root.style.setProperty('--blk', themes[selected].blk);
	// 	root.style.setProperty('--blk', themes[selected].blk);
	// }

	let updateThemeOnIndex = (_: string) => {};

	let root: HTMLElement;
	$: updateThemeOnIndex(selected);
	onMount(() => {
		root = document.documentElement;
		updateThemeOnIndex = (name: string) => {
			console.log('12312313');
			let idx = themes.find((el) => el.name == name);
			if (idx) {
				root.style.setProperty('--blk', idx.blk);
				root.style.setProperty('--red', idx.red);
				root.style.setProperty('--grn', idx.grn);
				root.style.setProperty('--yel', idx.yel);
				root.style.setProperty('--blu', idx.blu);
				root.style.setProperty('--mag', idx.mag);
				root.style.setProperty('--cya', idx.cya);
				root.style.setProperty('--wht', idx.wht);
				root.style.setProperty('--foreground-color', idx.foregroundColor);
				root.style.setProperty('--background-color', idx.backgroundColor);
			}
		};
		updateThemeOnIndex(selected);
	});
</script>

<slot />
<ThemePicker {themes} bind:selected />

<style lang="scss">
	:global(body) {
		// Styling
		margin: 0;
		padding: 0;
		width: 100%;
		height: 100%;

		// Default color
		background-color: #292828;

		// Animations
		transition: 1s;
	}

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
</style>
