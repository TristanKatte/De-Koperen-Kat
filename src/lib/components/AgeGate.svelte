<script lang="ts">
	import { onMount } from 'svelte';

	let isAdult: boolean | null = null;


	onMount(() => {
		const stored = localStorage.getItem('isAdult');
		isAdult = stored === 'true';
	});

	function confirmAge() {
		localStorage.setItem('isAdult', 'true');
		isAdult = true;
	}

	function resetAge() {
		localStorage.removeItem('isAdult');
		isAdult = false;
	}
</script>

{#if isAdult === false}
	<div class="age-gate-backdrop">
		<div class="age-gate">
			<div class="age-gate-content">
				<h2>Ben je 18 jaar of ouder?</h2>
				<button onclick={confirmAge}>Ja, ik ben 18+</button>
				<p>
					We verkopen geen alcoholische producten aan minderjarigen.
					<br />
					<a href="https://www.nix18.nl" target="_blank" rel="noopener noreferrer">
						Lees meer op NIX18.nl
					</a>
				</p>
			</div>
		</div>
	</div>
{/if}

{#if isAdult === true}
	<button class="reset-button" onclick={resetAge}>🔁 Reset leeftijd</button>
{/if}

<style>
	/* Achtergrond blur */
	.age-gate-backdrop {
		position: fixed;
		inset: 0;
		backdrop-filter: blur(10px);
		background: rgba(0, 0, 0, 0.6);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 9998;
	}

	.age-gate {
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	.age-gate-content {
		text-align: center;
		background: white;
		color: black;
		padding: 2rem;
		border-radius: 1rem;
		max-width: 400px;
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
	}

	button {
		margin-top: 1rem;
		background: var(--cta-buttons, #8b0000);
		color: white;
		border: none;
		padding: 0.8rem 1.5rem;
		border-radius: 0.5rem;
		cursor: pointer;
		font-weight: bold;
	}

	button:hover {
		background: var(--highlight-color, #a52a2a);
	}

	p {
		font-size: 0.9rem;
		margin-top: 1rem;
		line-height: 1.4;
	}

	a {
		color: var(--cta-buttons, #8b0000);
		text-decoration: underline;
	}

	.reset-button {
		position: fixed;
		bottom: 1rem;
		right: 1rem;
		background: teal;
		color: white;
		border: 1px solid green;
		border-radius: 0.5rem;
		padding: 0.5rem 1rem;
		cursor: pointer;
		backdrop-filter: blur(5px);
	}
</style>
