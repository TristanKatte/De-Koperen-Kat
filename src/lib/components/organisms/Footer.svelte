<script>
	</script>

<footer class="site-footer">
	<div class="footer-content">
		<div class="footer-brand">
			<h2>Brouwerij De Koperen Kat</h2>
			<p>Ambachtelijk gebrouwen sinds 2011</p>
		</div>

		<div class="footer-socials">
			<a href="https://www.facebook.com/dekoperenkat" target="_blank" rel="noopener noreferrer"
				>Facebook</a
			>
			<a href="https://www.instagram.com/dekoperenkat/" target="_blank" rel="noopener noreferrer"
				>Instagram</a
			>
		</div>


		<div class="footer-info">
			<p>&copy; {new Date().getFullYear()} Brouwerij De Koperen Kat. Alle rechten voorbehouden.</p>
			
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
	align-items: center;
}

/* ===== Brand ===== */
.footer-brand h2 {
	font-family: var(--font-family-headings);
	font-size: 2rem;
	margin-bottom: 0.5rem;
	color: #ed651c;
}

.footer-brand p {
	margin: 0;
	font-size: 1rem;
	opacity: 0.9;
}

/* ===== Socials ===== */
.footer-socials {
	display: flex;
	gap: 1.5rem;
	justify-content: center;
	align-items: center;
}

.footer-socials a {
	color: var(--background-color);
	text-decoration: none;
	font-weight: 500;
	transition: color 0.25s ease;
}

.footer-socials a:hover {
	color: var(--cta-hover);
}

/* ===== Info ===== */
.footer-info {
	font-size: 0.9rem;
	opacity: 0.85;
}

/* ===== Desktop layout ===== */
@media (min-width: 768px) {
	.footer-content {
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		text-align: left;
	}

	.footer-brand {
		justify-self: start;
	}

	.footer-socials {
		justify-self: center;
	}

	.footer-info {
		justify-self: end;
		text-align: right;
	}
}

</style>
