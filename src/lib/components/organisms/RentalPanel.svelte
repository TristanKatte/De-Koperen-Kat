<script lang="ts">
	import Accordion from '$lib/components/molecules/Accordion.svelte';
	import BookingForm from '$lib/components/organisms/BookingForm.svelte';

	export let form;
</script>

<div id="tabpanel-afhuren" role="tabpanel" aria-labelledby="tab-afhuren" tabindex="0">
	<section>
		<h2>Proeflokaal afhuren</h2>

		<p>
			Wilt u ons proeflokaal gebruiken voor uw eigen activiteit, evenement, borrel, feest of andere
			gelegenheid? Dat kan! Buiten openingstijden en in de avonduren kan het proeflokaal afgehuurd
			worden voor de gelegenheid die ú in gedachten heeft. Ook is hierbij eventueel een volledig
			verzorgde catering bij te boeken en is de drank af te kopen.
		</p>

		<table>
			<tbody>
				<tr>
					<td>Wat?</td>
					<td>Afhuren Proeflokaal</td>
				</tr>
				<tr>
					<td>Min/Max personen</td>
					<td>10 – 120 personen</td>
				</tr>
				<tr>
					<td>Huur per uur</td>
					<td>Op aanvraag</td>
				</tr>
				<tr>
					<td>Catering</td>
					<td>Op aanvraag</td>
				</tr>
				<tr>
					<td>Afkoop drank</td>
					<td>Op aanvraag</td>
				</tr>
			</tbody>
		</table>
		<p>
			Ook is standaard in het proeflokaal een beamer met scherm van 2 bij 3 meter aanwezig, een
			groot beeldscherm, feestverlichting, geluid, PA en 2 microfoons. Voor meer informatie of om
			een aanvraag te doen kunt u het contactformulier onderaan deze pagina invullen.
		</p>

		<Accordion title="Vraag een offerte aan">
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

	section p {
		max-width: 75ch;
	}

	[role='tabpanel'] {
		padding: 2rem 0;
	}
</style>
