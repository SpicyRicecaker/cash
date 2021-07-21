<script lang="ts">
	import ThemePicker from '$lib/theme-picker.svelte';
	import type { Theme } from '$lib/types';
	import { onMount } from 'svelte';
	// Define some color themes here probably
	let selected: string;
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
		},
		{
			name: 'Solarized Light',
			blk: '#657b83',
			red: '#dc322f',
			grn: '#859900',
			yel: '#b58900',
			blu: '#268bd2',
			mag: '#d33682',
			cya: '#2aa198',
			wht: '#fdf6e3',
			foregroundColor: '#657b83',
			backgroundColor: '#fdf6e3'
		},
		{
			name: 'Solarized Dark',
			blk: '#839496',
			red: '#ea6962',
			grn: '#a9b665',
			yel: '#d8a657',
			blu: '#7daea3',
			mag: '#d3869b',
			cya: '#89b482',
			wht: '#002b36',
			foregroundColor: '#002b36',
			backgroundColor: '#839496'
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
		selected = localStorage.getItem('theme') || 'Gruvbox Material Dark';
		updateThemeOnIndex = (name: string) => {
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
				// Set local storage
				localStorage.setItem('theme', name);
			}
		};
		updateThemeOnIndex(selected);
	});
</script>

<main>
	<slot />
	<div>
		<ThemePicker {themes} bind:selected />
	</div>
</main>

<style lang="scss">
	:global(body) {
		// Styling
		margin: 0;
		padding: 0;
		width: 100%;
		height: 100%;

		// Default color
		font-family: Helvetica, sans-serif;
		background-color: var(--background-color);
		color: var(--foreground-color);

		// Animations
		transition: 1s;
	}

	div {
		position: absolute;
		bottom: 0;
		width: 100%;
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
