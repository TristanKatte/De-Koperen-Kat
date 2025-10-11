<script>
	import HomeTemplate from '$lib/templates/HomeTemplate.svelte';

	const hero = {
		title: 'Welkom bij De Koperen Kat',
		subtitle: 'Ontdek onze ambachtelijke bieren en gezellige evenementen.',
		image: '/images/brouwerij.jpg',
		ctaLabel: 'Bekijk onze bieren',
		ctaLink: '/bieren'
	};

	const beers = [
		{ name: 'Poeslief', type: 'Blond', image: '/images/poeslief.jpg', link: '/bieren/poeslief' },
		{ name: 'Dubbele Kat', type: 'Dubbel', image: '/images/dubbelekat.jpg', link: '/bieren/dubbele-kat' }
	];

	const events = [
		{ title: 'Bierproeverij', date: '25 oktober', image: '/images/event1.jpg', link: '/evenementen/bierproeverij' },
		{ title: 'Rondleiding', date: '2 november', image: '/images/event2.jpg', link: '/evenementen/rondleiding' }
	];
</script>

<HomeTemplate {hero} {beers} {events} />
