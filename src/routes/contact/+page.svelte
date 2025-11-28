<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	gsap.registerPlugin(ScrollTrigger);

	let name = '';
	let email = '';
	let message = '';
	let success = false;
	let error: string | null = null;

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		error = null;
		success = false;

		if (!name || !email || !message) {
			error = 'Vul alstublieft alle velden in.';
			return;
		}

		const { error: insertError } = await supabase
			.from('contacts')
			.insert([{ name, email, message }]);

		if (insertError) {
			console.error(insertError);
			error = 'Er ging iets mis bij het verzenden. Probeer het later opnieuw.';
			return;
		}

		success = true;
		name = '';
		email = '';
		message = '';
	}

	onMount(() => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReducedMotion) return;

		gsap.from('.contact-info-row', {
			scrollTrigger: {
				trigger: '.contact-info-row',
				start: 'top 90%',
				toggleActions: 'play none none reverse'
			},
			y: 30,
			opacity: 0,
			duration: 0.6,
			ease: 'power1.out'
		});

		gsap.from('.contact-layout > *', {
			scrollTrigger: {
				trigger: '.contact-layout',
				start: 'top 80%',
				toggleActions: 'play none none reverse'
			},
			y: 30,
			opacity: 0,
			stagger: 0.15,
			duration: 0.6,
			ease: 'power1.out'
		});
	});
</script>

<section class="contact-section">
	<!-- --- Info bovenaan --- -->
	<div class="contact-info-row">
		<div>
			<h2>Onze locatie</h2>
			<p>De Koperen Kat<br />Schieweg 15M<br />2627 AN Delft</p>
			<p>📞 +31 (0) 6 42 12 33 98</p>
			<p>✉️ Algemene e-mail: <span>info@dekoperenkat.nl</span></p>
			<p>✉️ Reserveringen: <span>reserveringen@dekoperenkat.nl</span></p>
		</div>

		<div>
			<h2>Openingstijden</h2>
			<p><b>Het Proeflokaal</b></p>
			<p>Donderdag: 15:00 – 03:00 (1 mei – 1 okt.) & 21:00 – 03:00 (1 okt. – 1 mei)</p>
			<p>Vrijdag: 15:00 – 21:00</p>
			<p>Zaterdag: 14:00 – 20:00</p>
			<p>Zondag: 14:00 – 20:00</p>
		</div>

		<div>
			<h2>Post</h2>
			<p>Postbus 569<br />2600 AN Delft</p>
		</div>
	</div>

	<!-- --- Formulier + kaart --- -->
	<div class="contact-layout">
		<form class="contact-form" on:submit={handleSubmit} aria-describedby="contact-instructions">
			<p id="contact-instructions" class="sr-only">
				Vul je naam, e-mail en bericht in om contact op te nemen.
			</p>

			<div class="form-group">
				<label for="name">Naam</label>
				<input id="name" type="text" bind:value={name} required placeholder="Je naam" />
			</div>

			<div class="form-group">
				<label for="email">E-mail</label>
				<input id="email" type="email" bind:value={email} required placeholder="je@email.com" />
			</div>

			<div class="form-group">
				<label for="message">Bericht</label>
				<textarea id="message" bind:value={message} required placeholder="Typ je bericht hier"></textarea>
			</div>

			<button type="submit" class="btn">Verstuur bericht</button>

			{#if success}
				<p role="status" class="success-message">Bedankt! Je bericht is verzonden.</p>
			{/if}

			{#if error}
				<p role="alert" class="error-message">{error}</p>
			{/if}
		</form>

		<div class="map-container" aria-label="Kaart van locatie">
			<iframe
				title="Kaart van locatie"
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2456.656775228789!2d4.36484881285303!3d51.994909171811265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5b5974d9ee3d3%3A0xfa62833bc2649ef9!2sStadsbrouwerij%20De%20Koperen%20Kat!5e0!3m2!1snl!2snl!4v1764131929255!5m2!1snl!2snl"
				loading="lazy"
				referrerpolicy="no-referrer-when-downgrade"
			></iframe>
		</div>
	</div>
</section>

<style>
.contact-section {
	max-width: 1200px;
	margin: 0 auto;
	padding: 3rem 1.5rem;
}

.contact-info-row {
	display: flex;
	gap: 2rem;
	margin-bottom: 3rem;
	flex-wrap: wrap;
	justify-content: space-between;
	background: #f5f2eb;
	padding: 2rem;
	border-radius: 1rem;
}

.contact-info-row div {
	flex: 1 1 250px;
}

.contact-info-row span {
	color: #d2691e;
}

.contact-layout {
	display: flex;
	gap: 3rem;
	justify-content: center;
	align-items: start;
	flex-wrap: wrap;
}

.contact-form,
.map-container {
	flex: 1 1 450px;
	min-width: 300px;
	max-width: 500px;
	height: 400px;
	margin-bottom: 2rem;
	background: #f5f2eb; /* zelfde achtergrond als info-row */
	padding: 2rem;
	border-radius: 1rem;
	box-shadow: 0 6px 16px rgba(0,0,0,0.05);
	justify-content: space-evenly;
}

input,
textarea {
	padding: 0.9rem;
	font-size: 1rem;
	border-radius: 0.6rem;
	border: 1px solid #ccc;
	width: 90%;
	
}

textarea {
	min-height: 120px;
	resize: vertical;
}

.btn {
	padding: 0.9rem 2rem;
	border-radius: 2rem;
	background-color: #d2691e;
	color: white;
	border: none;
	cursor: pointer;
	font-weight: 600;
	width: 90%;
	margin-top: 0.5rem;
}

.success-message,
.error-message {
	margin-top: 0.5rem;
	font-size: 0.95rem;
}

.map-container iframe {
	width: 100%;
	height: 400px;
	border: 0;
	border-radius: 1rem;
}

/* --- Responsive --- */
@media (max-width: 900px) {
	.contact-layout {
		flex-direction: column;
		align-items: center;
	}

	.contact-form,
	.map-container {
		max-width: 100%;
	}
}
</style>
