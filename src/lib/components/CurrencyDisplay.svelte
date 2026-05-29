<script lang="ts">
	import { formatCurrency } from '$lib/utils';

	const {
		cents,
		currency = 'USD',
		locale = 'en-US',
		colorized = false
	}: {
		cents: number;
		currency?: string;
		locale?: string;
		colorized?: boolean;
	} = $props();

	const formatted = $derived(formatCurrency(cents, currency, locale));
	const isNegative = $derived(cents < 0);
</script>

<span
	class="font-mono tabular-nums {colorized
		? isNegative
			? 'text-red-600'
			: 'text-green-600'
		: ''}"
>
	{formatted}
</span>
