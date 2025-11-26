<script lang="ts">
	import { supabase } from '$lib/supabaseClient';

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
</script>

<section class="contact-section" aria-labelledby="contact-title">
	<h1 id="contact-title">Neem contact op</h1>

	<div class="contact-layout">
		<!-- Formulier -->
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
				<textarea id="message" bind:value={message} required placeholder="Typ je bericht hier"
				></textarea>
			</div>

			<button type="submit" class="btn">Verstuur bericht</button>

			{#if success}
				<p role="status" class="success-message">Bedankt! Je bericht is verzonden.</p>
			{/if}

			{#if error}
				<p role="alert" class="error-message">{error}</p>
			{/if}
		</form>

		<!-- Info + kaart -->
		<div class="info-wrapper">
			<div class="contact-info">
				<h2>Onze locatie</h2>
				<p>De Koperen Kat<br />Schieweg 15M<br />2627 AN Delft</p>
				<p>📞 [M] +31 (0) 6 42 12 33 98</p>
				<p>✉️ <b>Algemene e-mail</b>: <span>info@dekoperenkat.nl</span></p>
        <p>✉️ <b>Reserveringen</b>: <span>reserveringen@dekoperenkat.nl</span></p>

				<h2>Post</h2>
				<p>Postbus 569<br />2600 AN Delft</p>

				<h2>Openingstijden</h2>
				<p><b>Het Proeflokaal</b></p>
				<p>Donderdag: 15:00 – 03:00 (1 mei – 1 okt.) & 21:00 – 03:00 (1 okt. – 1 mei)</p>
				<p>Vrijdag: 15:00 – 21:00</p>
				<p>Zaterdag: 14:00 – 20:00</p>
				<p>Zondag: 14:00 – 20:00</p>
			</div>

			<div class="map-container" aria-label="Kaart van locatie">
				<iframe
					title="Kaart van locatie"
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2456.656775228789!2d4.36484881285303!3d51.994909171811265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5b5974d9ee3d3%3A0xfa62833bc2649ef9!2sStadsbrouwerij%20De%20Koperen%20Kat!5e0!3m2!1snl!2snl!4v1764131929255!5m2!1snl!2snl"
					loading="lazy"
					referrerpolicy="no-referrer-when-downgrade"
				></iframe>
			</div>
		</div>
	</div>
</section>



<style>
	/* --- Layout --- */

	.contact-section {
		max-width: 1200px;
		margin: 0 auto;
		padding: 3rem 1.5rem;
	}

	h1 {
		text-align: left;
		margin-bottom: 2rem;
	}

	.contact-layout {
		display: grid;
		grid-template-columns: 1fr 1.3fr;
		gap: 4rem;
		align-items: start;
	}

  span {
    color: #d2691e;
  }

	/* --- Formulier --- */

	.contact-form {
		display: grid;
		gap: 1.25rem;
		max-width: 450px;
		width: 100%;
	}

	.form-group {
		display: grid;
		gap: 0.4rem;
	}

	input,
	textarea {
		padding: 0.9rem;
		font-size: 1rem;
		border-radius: 0.6rem;
		border: 1px solid #ccc;
		width: 100%;
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
		width: fit-content;
	}

	.success-message,
	.error-message {
		margin-top: 0.5rem;
		font-size: 0.95rem;
	}

	/* --- Info + kaart --- */

	.info-wrapper {
		display: grid;
		gap: 2rem;
	}

	/* op grote schermen: info + kaart naast elkaar */
	@media (min-width: 900px) {
		.info-wrapper {
			grid-template-columns: 1fr 1fr;
		}
	}

	.contact-info h2 {
		margin-top: 1rem;
		margin-bottom: 0.5rem;
	}

	.map-container iframe {
		width: 100%;
		height: 320px;
		border: 0;
		border-radius: 1rem;
	}

	/* --- Responsive --- */

	@media (max-width: 900px) {
		.contact-layout {
			grid-template-columns: 1fr;
			gap: 3rem;
		}

		.btn {
			width: 100%;
		}
	}
</style>
