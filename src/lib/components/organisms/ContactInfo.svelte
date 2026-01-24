<section class="contact-info-block">
	<div class="contact-info-row">
		<div>
			<h2>Onze locatie</h2>
			<p>De Koperen Kat<br />Schieweg 15M<br />2627 AN Delft</p>
			<p>📞 +31 (0) 6 42 12 33 98</p>
			<p>
				📧 Algemene e-mail: <span
					><a href="mailto:info@dekoperenkat.nl">info@dekoperenkat.nl</a></span
				>
			</p>
			<p>
				📧 Reserveringen: <span
					><a href="mailto:reserveringen@dekoperenkat.nl">reserveringen@dekoperenkat.nl</a></span
				>
			</p>
		</div>
		<div>
			<h2>Openingstijden</h2>
			<p><b>Het Proeflokaal</b></p>
			<ul>
				<li>Woensdag: 15:00 – 21:00</li>
				<li>Donderdag: 15:00 – 21:00</li>
				<li>Vrijdag: 15:00 – 21:00</li>
				<li>Zaterdag: 14:00 – 20:00</li>
				<li>Zondag: 14:00 – 20:00</li>
			</ul>
		</div>
		<div>
			<h2>Post</h2>
			<p>Postbus 569<br />2600 AN Delft</p>
		</div>
	</div>
</section>

<style>
	.contact-info-block {
		background-color: var(--background-soft);
		padding: 2rem 1rem;
		margin-bottom: 2rem;
        border-radius: 1.5rem;
        border-top: 4px solid var(--accent);
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
	}

	.contact-info-row {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.contact-info-row div h2 {
		margin-bottom: 0.5rem;
	}

	.contact-info-row div p {
		margin: 0.25rem 0;
		line-height: 1.4;
	}

	.contact-info-row div span {
		font-weight: bold;
	}

    .contact-info-row ul {
        list-style-type: '🕛';
        margin: 0;
        padding: 0;
        line-height: 1.4;
    }

	@media (min-width: 768px) {
		.contact-info-row {
			flex-direction: row;
			justify-content: space-between;
			gap: 4rem;
		}

		.contact-info-row div {
			flex: 1;
		}
	}
</style>
