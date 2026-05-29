<script lang="ts">
	export let title: string | undefined = undefined;
	export let padding = true;
</script>

<div class="bg-white rounded-card shadow-card overflow-hidden">
	{#if title || $$slots.title}
		<div class="px-card pt-card pb-3 border-b border-surface-200">
			{#if $$slots.title}
				<slot name="title" />
			{:else}
				<h3 class="text-base font-semibold text-slate-900">{title}</h3>
			{/if}
		</div>
	{/if}
	<div class={padding ? 'p-card' : ''}>
		<slot />
	</div>
</div>
