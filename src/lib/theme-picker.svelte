<script lang="ts">
	import type { Theme } from '$lib/types';
	export let selected: string;
	export let themes: Theme[];
</script>

<div id="theme-circle">
	<select name="theme" id="theme" bind:value={selected}>
		{#each themes as theme}
			<option value={theme.name}>{theme.name}</option>
		{/each}
	</select>
	<span>
		{#each Array(6) as _}
			<span>&nbsp;</span>
		{/each}
	</span>
</div>

<style lang="scss">
	// #pallette {
	// 	background-color: var(--blk);
	// 	color: var(--wht);
	// }
	#theme-circle {
		display: flex;
		// text-align: center;
		& > #theme {
			// Style
			border-radius: 0;
			border: 0;
			padding: 0.2rem;
			appearance: none;
			// Animation
			transition: 1s;
			// Font
			font-size: 1rem;
		}
		& > span {
			flex: 1;
			display: flex;
			& > * {
				flex: 1;
			}
		}
	}

	#theme-circle {
		& > span {
			:nth-child(1) {
				background-color: var(--red);
			}
			:nth-child(2) {
				background-color: var(--grn);
			}
			:nth-child(3) {
				background-color: var(--yel);
			}
			:nth-child(4) {
				background-color: var(--blu);
			}
			:nth-child(5) {
				background-color: var(--mag);
			}
			:nth-child(6) {
				background-color: var(--cya);
			}
		}
	}
</style>
