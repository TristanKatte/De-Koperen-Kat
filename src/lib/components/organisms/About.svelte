<script>
	import Button from '../atoms/Button.svelte';
</script>

<!-- About -->
<section class="about-section" aria-labelledby="about-title">
	<div class="content">
		<h2 id="about-title">Over Stadsbrouwerij De Koperen Kat</h2>

		<h3>Wie zijn we?</h3>
		<p>
			Wij zijn De Koperen Kat. Een Eigentijdse, Eigenwijze, oudste Stadsbrouwerij sinds 2011 in het
			mooie Delft. We zijn een authentieke ‘Craft Brewery’ met de focus op kwaliteitsbieren.
		</p>

		<h3>Wat doen we?</h3>
		<p>
			We maken op eigen wijze, volgens eigen receptuur kwaliteitsbieren. We hebben maar liefst 18
			soorten, waarvan de herfstbock zelfs is uitgeroepen tot Lekkerste van Nederland!
		</p>

		<h3>Waarom doen we het?</h3>
		<p>
			We willen de oude historie van Delft als grootste bierbrouwstad van Europa weer nieuw leven
			inblazen. In de 16de eeuw waren er meer dan 250, maar na de sluiting van de laatste in 1922
			geen meer.
		</p>

		<h3>Waar doen we het?</h3>
		<p>
			We zitten in een groot pand aan de Schieweg, de vroegere Kabelfabriek. Dit karakteristieke
			pand is aan de voorkant omgebouwd tot brouwerij met proeflokaal.
		</p>

		<Button href="/about" label="Lees meer over ons" />
	</div>
</section>

<style>
	/* About-sectie */
	.about-section {
		padding: 4rem 2rem;
		background-color: var(--accent-light);
		color: var(--text-color);
	}
	.about-section .content {
		max-width: 800px; /* leesbare breedte */
		width: 100%;
		height: 100vh;
		margin: 0 auto;
	}

	.about-section h2,
	.about-section h3,
	.about-section p {
		margin-bottom: 1rem;
		text-align: left;
	}

	.about-section p {
		font-size: 1.125rem;
		line-height: 1.6;
		color: var(--text-color);
	}
</style>
