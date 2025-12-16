<script lang="ts">
	import type { BookingFormState } from '$lib/types/form';
	import AccordionGroup from '../molecules/AccordionGroup.svelte';
	import Accordion from '$lib/components/molecules/Accordion.svelte';
	import BookingForm from '$lib/components/organisms/BookingForm.svelte';

	export let form;
</script>

<div role="tabpanel" id="tab-bezoeken" aria-labelledby="tab-button-bezoeken">
	<section class="zigzag-item">
		<div class="text">
			<h2>Bezoeken</h2>
			<p>
				Wij heten u graag van harte welkom in ons gezellige, knusse proeflokaal in onze brouwerij.
				Vanaf de bar kunt u onze brouwketels zien staan, een echte unieke ervaring! Tijdens onze
				openingstijden kunt u activiteiten boeken, maar gewoon binnenlopen mag ook altijd. Op de
				donderdagavond hebben wij traditiegetrouw een karaoke-avond, waar de stem wordt getest en de
				keel wordt gesmeerd. Zondag kunt u ook regelmatig bands tegenkomen die bij ons optreden, dus
				houd onze agenda in de gaten. <br /><br />
				Voor de mensen die niet kunnen wachten om in ons proeflokaal langs te komen hebben wij sinds
				kort ook een hele mooie Google Streetview van ons proeflokaal! Deze is hier te vinden!
			</p>
		</div>
		<div class="media">
			<figure>
				<img src="./images/bar-glas-ketels.jpg" alt="glas op de bar" />
			</figure>
		</div>
	</section>

	<section class="zigzag-item reverse">
		<div class="text">
			<h3>Wat zijn de openingstijden?</h3>
			<ul>
				<li>Donderdag 15:00 – 03:00 (1 mei – 1 okt.) & 21:00 – 03:00 (1 okt. – 1 mei)</li>
				<li>Vrijdag 15:00 - 21:00 uur</li>
				<li>Zaterdag 14:00 - 20:00 uur</li>
				<li>Zondag 14:00 - 20:00 uur</li>
			</ul>
		</div>
		<div class="media">
			<figure>
				<img src="./images/vergisting-ketels.jpg" alt="glas op de bar" />
			</figure>
		</div>
	</section>

	<section class="zigzag-item">
		<div class="text">
			<h3>Wat kun je verwachten?</h3>
			<ul>
				<li>Rondleiding door de brouwerij</li>
				<li>Proeverij van onze bieren</li>
				<li>Uitleg over het brouwproces</li>
			</ul>
		</div>
		<div class="media">
			<figure>
				<img src="./images/bar-gloed-1.jpg" alt="glas op de bar" />
			</figure>
		</div>
	</section>

	<section>
		<AccordionGroup {form} />
	</section>
</div>

<style>
	section {
		padding: 2rem 0;
		max-width: 1200px;
		margin: 0 auto;
		min-height: 50dvh;
	}

	ul {
		list-style: '✅';
		margin-left: 1.5rem;
		margin-bottom: 2rem;
	}

	li {
		margin-bottom: 0.5rem;
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

	.zigzag-item.reverse {
		direction: rtl; /* afbeelding links, tekst rechts */
	}

	.zigzag-item.reverse .text {
		direction: ltr; /* tekst normaal lezen */
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
		.zigzag-item,
		.zigzag-item.reverse {
			grid-template-columns: 1fr;
			text-align: left;
		}

		.zigzag-item.reverse {
			direction: ltr;
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
