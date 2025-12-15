<script lang="ts">
	import type { BookingFormState } from '$lib/types/form';
	import Accordion from '$lib/components/molecules/Accordion.svelte';
	import BookingForm from '$lib/components/organisms/BookingForm.svelte';

	export let form;
</script>

<div role="tabpanel" id="tab-bezoeken" aria-labelledby="tab-button-bezoeken">
	<section>
		<header>
			<h2>Bezoeken</h2>
			<p>
				Wij heten u graag van harte welkom in ons gezellige, knusse proeflokaal in onze brouwerij.
				Vanaf de bar kunt u onze brouwketels zien staan, een echte unieke ervaring! Tijdens onze
				openingstijden kunt u activiteiten boeken, maar gewoon binnenlopen mag ook altijd. Op de
				donderdagavond hebben wij traditiegetrouw een karaoke-avond, waar de stem wordt getest en de
				keel wordt gesmeerd. Zondag kunt u ook regelmatig bands tegenkomen die bij ons optreden, dus
				houd onze agenda in de gaten. <br />

				Voor de mensen die niet kunnen wachten om in ons proeflokaal langs te komen hebben wij sinds
				kort ook een hele mooie Google Streetview van ons proeflokaal! Deze is hier te vinden!
			</p>
		</header>

		<section>
			<h3>Wat kun je verwachten?</h3>
			<ul>
				<li>Rondleiding door de brouwerij</li>
				<li>Proeverij van onze bieren</li>
				<li>Uitleg over het brouwproces</li>
			</ul>
		</section>

		<Accordion title="Bezoek boeken">
			<BookingForm {form} />
		</Accordion>
	</section>
</div>

<style>
	#tab-bezoeken {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		max-width: 1200px;
		justify-content: center;
		margin: 0 auto;
	}

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
</style>
