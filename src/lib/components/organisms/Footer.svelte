<footer class="site-footer">
	<div class="footer-content">
		<div class="footer-brand">
			<h2>Brouwerij De Koperen Kat</h2>
			<p>Ambachtelijk gebrouwen sinds 1987</p>
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
		padding: 5rem 2rem 3rem; /* extra ademruimte bovenaan */
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		margin-top: 6rem; /* afstand tot de vorige sectie */
	}

	.footer-content {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 3rem;
		text-align: center;
	}

	.footer-brand h2 {
		font-family: var(--font-family-headings);
		font-size: 2rem;
		margin-bottom: 0.5rem;
		color: #ed651c;
	}

	.footer-info {
		font-size: 0.9rem;
		color: var(--background-color);
		margin-top: 1rem;
	}

	@media (min-width: 768px) {
		.footer-content {
			flex-direction: row;
			justify-content: space-between;
			align-items: flex-start;
			text-align: left;
		}

		.footer-brand {
			flex: 1;
		}

		.footer-info {
			flex: 1;
			text-align: right;
		}
	}
</style>
