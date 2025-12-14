<script lang="ts">
	import type { BookingFormState } from '$lib/types/form';
	import Accordion from '$lib/components/molecules/Accordion.svelte';
	import BookingForm from '$lib/components/organisms/BookingForm.svelte';

	export let form;
</script>

<div
	role="tabpanel"
	id="tab-bezoeken"
	aria-labelledby="tab-button-bezoeken"
>
	<section>
		<header>
			<h2>Bezoeken</h2>
			<p>
				Kom langs in onze brouwerij en ontdek hoe ons bier wordt gebrouwen.
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
	section {
		padding: 2rem 0;
		max-width: 1200px;
		margin: 0 auto;
	}
	[role='tabpanel'] {
		padding: 2rem 0;
	}
</style>
