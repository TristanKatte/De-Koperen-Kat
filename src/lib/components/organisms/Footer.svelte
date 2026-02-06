<script>
</script>

<footer class="site-footer">
	<div class="footer-content">
		<div class="footer-brand">
			<h2>Brouwerij De Koperen Kat</h2>
			<p>Ambachtelijk gebrouwen sinds 2011</p>
		</div>

		<div class="footer-contact">
			<h3>Contact</h3>
			<a href="mailto:info@dekoperenkat.nl">info@dekoperenkat.nl</a>
			<a href="mailto:reserveringen@dekoperenkat.nl">reserveringen@dekoperenkat.nl</a>
		</div>

		<div class="footer-socials">
			<h3>Volg ons</h3>
			<a href="https://www.facebook.com/dekoperenkat" target="_blank">Facebook</a>
			<a href="https://www.instagram.com/dekoperenkat/" target="_blank">Instagram</a>
		</div>

		<div class="footer-info">
			<p>&copy; {new Date().getFullYear()} Brouwerij De Koperen Kat</p>
		</div>
	</div>
</footer>

<style>
	.site-footer {
		background-color: var(--footer-color);
		color: var(--background-color);
		padding: 4rem 2rem 3rem;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
	}

	.footer-content {
		max-width: 1200px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1fr;
		gap: 2.5rem;
		text-align: center;
	}

	.footer-brand h2 {
		
		color: var(--text-color-alt);
	}

	.footer-contact h3,
	.footer-socials h3 {
		font-size: 1.1rem;
		margin-bottom: 0.5rem;
		color: var(--text-color-alt);
	}

	.footer-contact a,
	.footer-socials a {
		display: block;
		color: var(--background-color);
		text-decoration: none;
		margin: 0.25rem 0;
		transition: color 0.2s ease;
	}

	.footer-contact a:hover,
	.footer-socials a:hover {
		color: var(--cta-hover);
	}

	@media (min-width: 768px) {
		.footer-content {
			grid-template-columns: 2fr 1fr 1fr 2fr;
			align-items: start;
			text-align: left;
		}

		.footer-info {
			text-align: right;
			align-self: end;
		}
	}
</style>
