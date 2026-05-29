<script lang="ts">
	import type { Snippet } from 'svelte';

	const {
		title = undefined,
		padding = true,
		titleSnippet = undefined,
		children
	}: {
		title?: string | undefined;
		padding?: boolean;
		titleSnippet?: Snippet;
		children?: Snippet;
	} = $props();
</script>

<div class="bg-white rounded-card shadow-card overflow-hidden">
	{#if title || titleSnippet}
		<div class="px-card pt-card pb-3 border-b border-surface-200">
			{#if titleSnippet}
				{@render titleSnippet()}
			{:else}
				<h3 class="text-base font-semibold text-slate-900">{title}</h3>
			{/if}
		</div>
	{/if}
	<div class={padding ? 'p-card' : ''}>
		{@render children?.()}
	</div>
</div>
