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
			backgroundColor: '#fbf1c7',
			backdrop: '#292828'
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
			backgroundColor: '#292828',
			backdrop: '#292828'
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
			backgroundColor: '#fdf6e3',
			backdrop: '#657b83'
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
			backgroundColor: '#839496',
			backdrop: '#839496'
		}
	];

	let updateThemeOnIndex = (_: string) => {};

	let root: HTMLElement;
	$: updateThemeOnIndex(selected);
	onMount(() => {
		root = document.documentElement;
		selected = localStorage.getItem('theme') || 'Gruvbox Material Dark';
		updateThemeOnIndex = (name: string) => {
			let theme = themes.find((el) => el.name == name);
			if (theme) {
				root.style.setProperty('--blk', theme.blk);
				root.style.setProperty('--red', theme.red);
				root.style.setProperty('--grn', theme.grn);
				root.style.setProperty('--yel', theme.yel);
				root.style.setProperty('--blu', theme.blu);
				root.style.setProperty('--mag', theme.mag);
				root.style.setProperty('--cya', theme.cya);
				root.style.setProperty('--wht', theme.wht);
				root.style.setProperty('--foreground-color', theme.foregroundColor);
				root.style.setProperty('--background-color', theme.backgroundColor);
				root.style.setProperty('--backdrop', theme.backdrop);
				// Set local storage
				localStorage.setItem('theme', name);
			}
		};
		updateThemeOnIndex(selected);
	});
</script>

<slot />
<ThemePicker {themes} bind:selected />

<style lang="scss">
	:global(html) {
		margin: 0;
		width: 100%;
		height: 100%;
	}
	:global(body) {
		// Styling
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		width: 100%;
		height: 100%;

		// Default color
		font-family: Helvetica, sans-serif;
		background-color: var(--background-color);
		color: var(--foreground-color);

		// Animations
		transition: 1s;
	}
	:global(#svelte) {
		width: 100%;
		height: 100%;

		// display: grid;
		// grid-template-rows: minmax(0, 1fr) auto;
	}
</style>
