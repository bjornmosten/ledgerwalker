<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';

	const navLinks = [
		{ href: '/dashboard', label: 'Dashboard' },
		{ href: '/accounts', label: 'Accounts' },
		{ href: '/transactions', label: 'Transactions' },
		{ href: '/budgets', label: 'Budgets' },
		{ href: '/settings', label: 'Settings' }
	];
</script>

<div class="flex flex-col min-h-screen">
	<!-- Top Navigation Bar -->
	<header class="sticky top-0 z-50 bg-white border-b border-surface-200 shadow-sm">
		<nav class="container-app flex items-center justify-between h-[var(--nav-height)]">
			<!-- Logo -->
			<a href="/" class="flex items-center gap-2 font-bold text-xl text-primary-600 shrink-0">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="w-7 h-7"
				>
					<path
						d="M2.273 5.625A4.483 4.483 0 0 1 5.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 3H5.25a3 3 0 0 0-2.977 2.625ZM2.273 8.625A4.483 4.483 0 0 1 5.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 6H5.25a3 3 0 0 0-2.977 2.625ZM5.25 9a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3H15a.75.75 0 0 0-.75.75 2.25 2.25 0 0 1-4.5 0A.75.75 0 0 0 9 9H5.25Z"
					/>
				</svg>
				<span>ledgerwalker</span>
			</a>

			<!-- Nav Links -->
			<ul class="hidden md:flex items-center gap-1">
				{#each navLinks as link}
					<li>
						<a
							href={link.href}
							class="px-3 py-2 rounded-md text-sm font-medium transition-colors focus-ring
								{$page.url.pathname.startsWith(link.href)
								? 'bg-primary-50 text-primary-700'
								: 'text-slate-600 hover:bg-surface-100 hover:text-slate-900'}"
						>
							{link.label}
						</a>
					</li>
				{/each}
			</ul>

			<!-- Mobile menu button -->
			<button
				type="button"
				class="md:hidden p-2 rounded-md text-slate-600 hover:bg-surface-100 focus-ring"
				aria-label="Open menu"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
					/>
				</svg>
			</button>
		</nav>
	</header>

	<!-- Main Content -->
	<main class="flex-1">
		<slot />
	</main>

	<!-- Sticky Footer -->
	<footer class="bg-white border-t border-surface-200 sticky bottom-0 z-40">
		<div
			class="container-app flex items-center justify-between h-[var(--footer-height)] text-sm text-slate-500"
		>
			<span>&copy; {new Date().getFullYear()} ledgerwalker</span>
			<span>Your finances, clearly.</span>
		</div>
	</footer>
</div>
