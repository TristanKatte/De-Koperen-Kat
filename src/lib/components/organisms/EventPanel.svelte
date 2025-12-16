<script lang="ts">
</script>

<div id="tabpanel-evenementen" role="tabpanel" aria-labelledby="tab-evenementen" tabindex="0">
	<section class="zigzag-item">
		<div class="text">
			<h2>Evenementen</h2>

			<p>
				Naast alle activiteiten die we regelmatig organiseren in de brouwerij, zijn er ook
				evenementen die door de brouwerij georganiseerd worden of waar wij op aanwezig zijn. Zo
				organiseren wij jaarlijks een feestje om onze verjaardag te vieren, wat inmiddels een
				compleet festival is. Het Zomerbierfestival wordt elk jaar op het terrein van de brouwerij
				gehouden, waarbij we ook bevriende brouwerijen uitnodigen en zorgen voor genoeg te eten. Ook
				treden er verschillende bands op. Een en al gezelligheid en plezier! Daarnaast zie je ons
				regelmatig op bierfestivals staan. Regelmatig wordt de lijst up to date gehouden. Via onze
				evenementenpagina op Facebook of onder het kopje “Agenda” kunnen alle aankomende evenementen
				gevonden worden!
			</p>
		</div>
		<div class="media">
			<figure>
				<img src="./images/brouwerij-feest.jpg" alt="feest bij de brouwerij" />
			</figure>
		</div>
	</section>
</div>

<style>
	section {
		padding: 2rem 0;
		max-width: 1200px;
		margin: 0 auto;
	}

	section p {
		max-width: 75ch;
	}

	[role='tabpanel'] {
		padding: 2rem 0;
	}

		.zigzag-item {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		align-items: center;
		padding: 2rem 0;
		max-width: 1200px;
		margin: 0 auto;
	}

	.text {
		max-width: 80ch;
	}

	figure {
		border-radius: 0.75rem;
	}

	.media {
		width: 100%;
		overflow: hidden;
		
	}

	.media img {
		width: 100%;
		height: auto;
		object-fit: cover;
		transform: scale(1.1);
		transition: transform 1.2s ease;
		border-radius: 0.75rem;
	}

	/* Hover zoom-out effect */
	@media (hover: hover) {
		.media:hover img {
			transform: scale(1);
		}
	}

	/* Mobiel: alles onder elkaar */
	@media (max-width: 768px) {
		.zigzag-item
		 {
			grid-template-columns: 1fr;
			text-align: left;
		}

		.text {
			max-width: 75ch;
			margin: 0 auto;
			padding: 0 2rem 0 2rem;
		}

		section {
			padding: 0 2rem;
		}
	}

	/* Reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.media img {
			transition: none;
			transform: none;
		}
	}
</style>
