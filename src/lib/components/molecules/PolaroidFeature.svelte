<script lang="ts">
	export let image: string;
	export let alt: string;
	export let title: string;
	export let text: string;
	export let flip: boolean = false;
</script>

<div class="feature {flip ? 'flip' : ''}">
	<div class="polaroid">
		<img src={image} alt={alt} />
	</div>

	<div class="content">
		<h3>{title}</h3>
		<p>{text}</p>
	</div>
</div>

<style>
	.feature {
		display: flex;
		align-items: center;
		gap: 3rem;
		margin: 5rem 0;
	}

	.feature.flip {
		flex-direction: row-reverse;
	}

	.polaroid {
		background: white;
		padding: 0.75rem;
		border-radius: 0.4rem;
		box-shadow: 0 10px 25px rgba(0,0,0,0.15);
		transform: rotate(-3deg);
		transition: 0.3s ease;
	}

	.feature.flip .polaroid {
		transform: rotate(3deg);
	}

	.polaroid img {
		width: 260px;
		height: auto;
		border-radius: 0.25rem;
		object-fit: cover;
	}

	.content h3 {
		font-size: 1.8rem;
		margin-bottom: 1rem;
		color: var(--accent-dark);
	}

	@media (max-width: 800px) {
		.feature,
		.feature.flip {
			flex-direction: column;
			text-align: center;
		}

		.polaroid img {
			width: 100%;
			max-width: 320px;
		}
	}
</style>
