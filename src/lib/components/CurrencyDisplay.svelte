<script lang="ts">
	import { formatCurrency } from '$lib/utils';

	export let cents: number;
	export let currency = 'USD';
	export let locale = 'en-US';
	export let colorized = false;

	$: formatted = formatCurrency(cents, currency, locale);
	$: isNegative = cents < 0;
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
