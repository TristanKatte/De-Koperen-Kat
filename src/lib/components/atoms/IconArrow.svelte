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
        background-color: var(--background-color);
        color: var(--text-color);
        border-radius: 50%;
        padding: 0.5rem;
	}

    .icon-arrow:hover {
        transform: rotate(var(--rotation)) scale(1.2);
    }
</style>
