<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ session }) => ({
		props: {
			user: session.user
		}
	});
</script>

<script lang="ts">
	export let user: any;
</script>

<!-- Large part of auth code from https://blog.hyper63.com/sveltekit-authentication/ -->

<div id="main">
	<h1>
		{#if user}
			Good day,
			<span>
				{user}
			</span>
		{:else}
			<h1>Welcome!</h1>
		{/if}
	</h1>

	<div id="strip">
		{#if user}
			<a href="/books">
				<button>Books</button>
			</a>
			<a href="/logout">
				<button>Logout</button>
			</a>
		{:else}
			<a href="/login">
				<button>Login via Github</button>
			</a>
		{/if}
		<div />
	</div>
</div>

<style lang="scss">
	#main {
		// width: 100%;
		// height: 100%;
	}
	h1 {
		margin: 0;
		padding: 1rem;
		& > span {
			font-weight: lighter;
		}
	}
	button {
		border: none;
		text-decoration: none;
		padding: 1rem;
		color: var(--background-color);
		background-color: var(--foreground-color);
	}

	#strip {
		display: flex;
		& > div {
			flex: 1;
			background-color: var(--foreground-color);
		}
		& > a {
			flex: 0;
		}
		gap: 0.5rem;
	}
</style>
