<script lang="ts">
	import Accordion from '$lib/components/molecules/Accordion.svelte';
	import BookingForm from '$lib/components/organisms/BookingForm.svelte';

	export let form;
</script>

<div id="tabpanel-afhuren" role="tabpanel" aria-labelledby="tab-afhuren" tabindex="0">
<section class="zigzag-item">
  <!-- LINKS -->
  <div class="zigzag-text">
    <h2>Proeflokaal afhuren</h2>

    <p>
      Wilt u ons proeflokaal gebruiken voor uw eigen activiteit, evenement, borrel, feest of
      andere gelegenheid? Dat kan!
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
      Ook is standaard in het proeflokaal een beamer met scherm van 2 bij 3 meter aanwezig,
      een groot beeldscherm, feestverlichting, geluid, PA en 2 microfoons.
    </p>
  </div>

  <!-- RECHTS -->
  <div class="zigzag-media">
    <figure>
      <img src="./images/bar-gloed-1.jpg" 
           alt="glas op de bar"
           width="600"
           height="600" />
    </figure>
  </div>
</section>


	<section>
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

	td {
		font-weight: 400;
    padding: 0.5rem 1rem 0.5rem 0;
    border-bottom: 1px solid #ccc;
	}

.zigzag-item {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: start;
  max-width: 1200px;
  margin: 0 auto;
}

.zigzag-text {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 75ch;
}

.zigzag-media img {
  width: 100%;
  border-radius: 0.75rem;
  object-fit: cover;
  transform: scale(1.1);
  transition: transform 1.2s ease;
}


@media (hover: hover) {
  .zigzag-media:hover img {
    transform: scale(1);
  }
}
	/* Mobiel: alles onder elkaar */
	@media (max-width: 768px) {
		.zigzag-item {
			grid-template-columns: 1fr;
			text-align: left;
		}

		.zigzag-text {
			max-width: 75ch;
			margin: 0 auto;
			padding: 0 2rem 0 2rem;
		}

		table {
			margin: 2rem 0;
		}



		section {
			padding: 0 2rem;
		}
	}

	/* Reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.zigzag-media img {
			transition: none;
			transform: none;
		}
	}
</style>
