<script lang="ts">
	export let title: string;
</script>

<details>
	<summary>
		<h3>{title}</h3>
	</summary>

	<div class="accordion-content">
		<slot />
	</div>
</details>

<style>
	details {
		border-bottom: 1px solid var(--text-color-alt);
	}

	summary {
		list-style: none;
		cursor: pointer;
		padding: 1rem 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	summary::-webkit-details-marker {
		display: none;
	}

	summary h3 {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--text-color);
	}

	summary h3:hover {
		text-decoration: underline;
	}

	summary h3:active {
		text-decoration: none;
	}


	summary h3::after {
		content: '►';
		margin-left: 0.5rem;
		transition: transform 0.3s ease;
	}

	details[open] summary h3::after {
		content: '▲';
	}

	.accordion-content {
		overflow: hidden;
		max-height: 0;
		padding-bottom: 1rem;
		transition: max-height 0.4s ease;
	}

	details[open] .accordion-content {
		max-height: 1000px;
	}
</style>
