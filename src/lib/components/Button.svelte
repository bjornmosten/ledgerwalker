<script lang="ts">
	export let variant: 'primary' | 'secondary' | 'ghost' = 'primary';
	export let loading = false;
	export let disabled = false;
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let href: string | undefined = undefined;

	const baseClasses =
		'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors focus-ring disabled:opacity-50 disabled:pointer-events-none';

	const variantClasses: Record<typeof variant, string> = {
		primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800',
		secondary:
			'bg-white text-slate-700 border border-slate-300 hover:bg-surface-50 active:bg-surface-100',
		ghost: 'text-slate-600 hover:bg-surface-100 hover:text-slate-900 active:bg-surface-200'
	};
</script>

{#if href && !disabled && !loading}
	<a {href} class="{baseClasses} {variantClasses[variant]}">
		<slot />
	</a>
{:else}
	<button
		{type}
		disabled={disabled || loading}
		class="{baseClasses} {variantClasses[variant]}"
		on:click
	>
		{#if loading}
			<svg
				class="w-4 h-4 animate-spin"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
			>
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
				<path
					class="opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
				/>
			</svg>
		{/if}
		<slot />
	</button>
{/if}
