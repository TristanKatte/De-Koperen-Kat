<script lang="ts">
	import Accordion from '$lib/components/molecules/Accordion.svelte';
	import BookingForm from '$lib/components/organisms/BookingForm.svelte';

	export let form;
</script>

<div
	id="tabpanel-afhuren"
	role="tabpanel"
	aria-labelledby="tab-afhuren"
	tabindex="0"
>
	<h2>Proeflokaal afhuren</h2>

	<p>
		Ons proeflokaal is beschikbaar voor besloten gezelschappen, borrels en
		bedrijfsuitjes. We denken graag mee over de invulling.
	</p>

	<Accordion title="Vraag een offerte aan">
		<BookingForm form={form} />
	</Accordion>
</div>
