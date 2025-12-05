<script lang="ts">
	import { enhance } from '$app/forms';
	import FormField from '$lib/components/molecules/FormField.svelte';
	import FormButton from '$lib/components/atoms/FormButton.svelte';
	import ContactForm from '$lib/components/organisms/ContactForm.svelte';

	type ContactForm = {
		values: {
			name: string;
			email: string;
			message: string;
			category: string;
		};
		error: {
			name: string | null;
			email: string | null;
			message: string | null;
			category: string | null;
		};
		success: boolean;
	};

	let form: ContactForm = {
		values: { name: '', email: '', message: '', category: '' },
		error: { name: null, email: null, message: null, category: null },
		success: false
	};

	// Svelte 5 correct enhance
	function handleEnhance(formElement: HTMLFormElement) {
		// Direct enhance aanroepen, geen extra properties
		return enhance(formElement);
	}
</script>

<section class="contact-section">
  <!-- --- Info blok bovenaan --- -->
  <div class="contact-info-block">
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
  </div>

  <!-- --- Formulier + kaart blok --- -->
  <div class="form-map-block">
    <form class="contact-form" method="POST" novalidate aria-describedby="contact-instructions">
      <p id="contact-instructions" class="sr-only">
        Vul je naam, e-mail en bericht in om contact op te nemen.
      </p>
      <ContactForm />
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
  display: flex;
  flex-direction: column;
  gap: 2.5rem; /* ruimte tussen de twee blokken */
}

/* --- Info blok --- */
.contact-info-block {
  background: #f5f2eb;
  padding: 2rem;
  border-radius: 1rem;
}

.contact-info-row {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: space-between;
}

.contact-info-row div {
  flex: 1 1 250px;
}

.contact-info-row span {
  color: #d2691e;
}

/* --- Formulier + kaart blok --- */
.form-map-block {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: space-between; /* uitgelijnd met info-blok */
}

.contact-form,
.map-container {
  flex: 1 1 450px;
  min-width: 300px;
  max-width: 500px;
  background: #f5f2eb;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 6px 16px rgba(0,0,0,0.05);
}

.map-container iframe {
  width: 100%;
  height: 400px;
  border: 0;
  border-radius: 1rem;
}

/* --- Responsive --- */
@media (max-width: 900px) {
  .contact-info-row,
  .form-map-block {
    flex-direction: column;
    align-items: center;
  }

  .contact-form,
  .map-container {
    max-width: 100%;
  }
}
</style>
