<script lang="ts">
	export let direction: 'left' | 'right' | 'up' | 'down' = 'right';
	export let size = 24;
	export let label = 'Pijl';

    	function rotation(dir: string) {
		switch (dir) {
			case 'left':
				return 180;
			case 'up':
				return -90;
			case 'down':
				return 90;
			default:
				return 0;
		}
	}

    function handleKeydown(e: KeyboardEvent) {
        if (e.key === 'ArrowRight') {
            direction = 'right';
            e.preventDefault();
        }
    }
</script>

<svg
	class="icon-arrow"
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	aria-hidden="true"
	aria-label={label}
	style="--rotation: {rotation(direction)}deg"
    on:keydown={handleKeydown}
>
	<path
		d="M5 12H19M13 6L19 12L13 18"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	/>
</svg>

<style>
	.icon-arrow {
		display: inline-block;
		transform: rotate(var(--rotation));
		transition: transform 0.25s ease;
        background-color: #f5f5f0;
        color: var(--text-color);
		border: 2px solid var(--divider-color);
        border-radius: 1rem;
		width: 100%;
		height: 100%;
        padding: 0.55rem;
		margin-top: 8.55rem;
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
		cursor: pointer;
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
	}

    .icon-arrow:hover {
        transform: rotate(var(--rotation)) scale(1.2);
    }
</style>
