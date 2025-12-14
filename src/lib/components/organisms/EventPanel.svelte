<script lang="ts">
	import Accordion from '$lib/components/molecules/Accordion.svelte';
	import BookingForm from '$lib/components/organisms/BookingForm.svelte';

	export let form;
</script>

<div
	id="tabpanel-evenementen"
	role="tabpanel"
	aria-labelledby="tab-evenementen"
	tabindex="0"
>
	<h2>Evenementen</h2>

	<p>
		Regelmatig organiseren we proeverijen, workshops en speciale avonden
		in ons proeflokaal.
	</p>

	<ul>
		<li>🍺 Bierproeverijen</li>
		<li>🎓 Workshops brouwen</li>
		<li>🎉 Speciale releases</li>
	</ul>

	<Accordion title="Aanmelden voor een evenement">
		<BookingForm form={form} />
	</Accordion>
</div>
