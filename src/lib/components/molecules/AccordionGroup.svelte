<script lang="ts">
	import Accordion from './Accordion.svelte';
	import BookingForm from '$lib/components/organisms/BookingForm.svelte';
	export let form;
</script>

<div class="accordion-stack">
	<!-- Boekingsformulier -->

	<!-- Overige items -->
	<Accordion title="Rondleidingen">
		<p>
			Gedurende openingstijden kan ook bij de Koperen Kat een rondleiding worden gedaan. Een
			rondgang door de brouwerij met uitleg over het proces, samen met een heerlijk biertje. Ook
			raden wij hierbij de proeverij aan, om een complete Delftse bierervaring te krijgen!
		</p>
		<table>
			<tbody>
				<tr>
					<td>Wat?</td>
					<td>Rondleiding</td>
				</tr>
				<tr>
					<td>Min/Max personen</td>
					<td>4 – 40 personen</td>
				</tr>
				<tr>
					<td>Duur</td>
					<td>15 minuten</td>
				</tr>
				<tr>
					<td>Max. Aantal bieren</td>
					<td>1 bier</td>
				</tr>
				<tr>
					<td>Kosten</td>
					<td>€9,75</td>
				</tr>
			</tbody>
		</table>
		<p>
			Mocht u geïnteresseerd zijn in de proeverij plus rondleiding, dan kunt u deze voordelig erbij
			boeken voor maar 18,75 euro. Alle aanvragen kunnen u via het reserveringsformulier onderaan de
			pagina verzenden, of als u het al helemaal zeker weet kunt u via het boekingsformulier
			hieronder direct reserveren en wordt uw reservering automatisch verwerkt. Afwijkende wensen of
			proeverijen buiten openingstijden kunnen in overleg ook gepland worden.
		</p>
	</Accordion>

	<Accordion title="Proeverijen">
		<p>
			Een proeverij bij De Koperen Kat is een echte must. Een echte Delftse ontdekkingstocht tussen
			verschillende eigen bieren waar u een uur lang kan genieten van vier van de ambachtelijk
			gebrouwen echte Delftse bieren. Hierbij krijgt u ook uitleg over de smaak van de bieren en de
			herkomst van de naam. Dit alles vergezeld met een echte Delftse bitterballen.
		</p>
		<table>
			<tbody>
				<tr>
					<td>Wat?</td>
					<td>Proeverij</td>
				</tr>
				<tr>
					<td>Min/Max personen</td>
					<td>1 – 40 personen</td>
				</tr>
				<tr>
					<td>Duur</td>
					<td>1 uur</td>
				</tr>
				<tr>
					<td>Max. Aantal bieren</td>
					<td>4 bieren</td>
				</tr>
				<tr>
					<td>Kosten</td>
					<td>€19,50</td>
				</tr>
			</tbody>
		</table>
		<p>
			Mocht u geïnteresseerd zijn in de proeverij plus rondleiding, dan kunt u deze voordelig erbij
			boeken voor maar 9 euro. Alle aanvragen kunt u via het reserveringsformulier onderaan de
			pagina verzenden, of als u het al helemaal zeker weet kunt u via het boekingsformulier
			hieronder direct reserveren en wordt uw reservering automatisch verwerkt. Afwijkende wensen of
			proeverijen buiten openingstijden kunnen in overleg ook gepland worden.
		</p>
	</Accordion>

	<Accordion title="Workshops">
		<p>
			Een workshop bestaat uit een demonstratie van een deel van het brouwproces (een heel proces
			duurt ca. 10 uur) gecombineerd met uitleg van dit proces. Ook krijgt u informatie over Delft
			als bierbrouwstad en worden natuurlijk ook bieren geproefd en zorgen wij voor hapjes.
			Workshops met een live brouwdemonstratie kunnen alleen worden ingepland van maandag t/m
			donderdag tussen 09:00 en 13:00 uur. Op de overige dagen worden de brouwdemonstraties gegeven
			d.m.v. foto’s en/of filmmateriaal in combinatie met een rondleiding door de brouwlocatie.
		</p>
		<table>
			<tbody>
				<tr>
					<td>Wat?</td>
					<td>Workshop</td>
				</tr>
				<tr>
					<td>Min/Max personen</td>
					<td>4 – 75 personen</td>
				</tr>
				<tr>
					<td>Duur</td>
					<td>2 uur</td>
				</tr>
				<tr>
					<td>Max. Aantal bieren</td>
					<td>Onbeperkt gedurende de tijd</td>
				</tr>
				<tr>
					<td>Kosten</td>
					<td>€32,50 p.p.</td>
				</tr>
			</tbody>
		</table>
		<p>
			Mocht u geïnteresseerd zijn in de workshop plus rondleiding, dan kunt u een aanvraag sturen
			via het reserveringsformulier onderaan de pagina. Afwijkende wensen kunnen in overleg ook
			gepland worden.
		</p>
	</Accordion>

	<Accordion title="Arrangementen">
		<p>
			De Koperen Kat verzorgt arrangementen van een workshop (min. 8 pers.) of proeverij in de
			brouwerij (min. 4) , in combinatie met een rondleiding of rondvaart door Delft met gids,
			desgewenst afgesloten met een geheel verzorgde BBQ- of ander buffet in de brouwerij of een
			all-inclusive diner in een van onze bevriende & gezellige restaurants in het centrum van
			Delft. Deze arrangementen doen wij in overleg met u en kunnen volledig naar eigen smaak en
			inzicht ingevuld worden. Informeer naar alle mogelijkheden via het reserveringsformulier
			onderaan deze pagina.
		</p>
	</Accordion>

	<Accordion title="Reserveren">
		<BookingForm {form} />
	</Accordion>
</div>

<style>
	.accordion-stack {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
		margin: 0 auto;
		padding: 2rem 1rem;
		background-color: var(--background-color);
		color: var(--text-color);
	}

	table {
		width: 100%;
		border-collapse: collapse;
		margin-top: 0.5rem;
	}

	td {
		border-bottom: 1px solid #ccc;
		padding: 0.5rem 1rem;
		text-align: left;
	}
</style>
