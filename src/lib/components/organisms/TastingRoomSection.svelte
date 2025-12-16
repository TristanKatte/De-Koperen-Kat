<script lang="ts">
	import BookingForm from '$lib/components/organisms/BookingForm.svelte';

	// Initieel form object
	let form = {
		values: {
			name: '',
			email: '',
			date: '',
			people: 1,
			notes: ''
		},
		error: {
			name: null,
			email: null,
			date: null,
			people: null,
			notes: null
		},
		success: false
	};
</script>

<section class="tastingroom-overview">
	<h1>Het proeflokaal</h1>
	<div class="bezoeken">
		<h2>Bezoek ons proeflokaal</h2>
		<p>
			U bent van harte welkom om tijdens de openingstijden van het proeflokaal de sfeer te komen
			proeven in onze authentieke brouwerij. Van donderdag tot en met zondag zorgen wij voor
			heerlijke ambachtelijke bieren, een hap voor bij de borrel en genoeg gezelligheid.
		</p>
	</div>

	<div class="afhuren">
		<h2>Proeflokaal afhuren</h2>
		<p>
			Ook kunt u het proeflokaal afhuren voor feesten, partijen, borrels of andere activiteiten. In
			ons knusse proeflokaal kunt u gebruik maken van alle aanwezige apparatuur en zijn veel opties
			mogelijk.
		</p>
	</div>

	<div class="evenementen">
		<h2>Evenementen</h2>
		<p>
			Naast alle activiteiten die we regelmatig organiseren in de brouwerij, zijn er ook evenementen
			die door de brouwerij georganiseerd worden of waar wij op aanwezig zijn. Zo organiseren wij
			jaarlijks een feestje om onze verjaardag te vieren, wat inmiddels een compleet festival is.
		</p>
	</div>

	
</section>

<style>
	.tastingroom-overview {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	.tastingroom-overview p {
		margin-bottom: 2rem;
		max-width: 75ch;
	}

	/* Responsive voor mobiel */
	@media (max-width: 700px) {
	}
</style>
