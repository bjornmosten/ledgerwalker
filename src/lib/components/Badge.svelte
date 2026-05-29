<script lang="ts">
	export let variant: 'success' | 'warning' | 'danger' | 'neutral' = 'neutral';

	const variantClasses: Record<typeof variant, string> = {
		success: 'bg-green-100 text-green-800',
		warning: 'bg-amber-100 text-amber-800',
		danger: 'bg-red-100 text-red-800',
		neutral: 'bg-slate-100 text-slate-700'
	};
</script>

<span
	class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {variantClasses[variant]}"
>
	<slot />
</span>
