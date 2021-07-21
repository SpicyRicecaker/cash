<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ session }) => ({
		props: {
			user: session.user
		}
	});
</script>

<style>

</style>

<script lang="ts">
	export let user: any;
</script>

<h1>
	<span>
		HELLO
		{#if user}
			{user}
		{/if}
	</span>
</h1>
<!-- Large part of auth code from https://blog.hyper63.com/sveltekit-authentication/ -->
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
