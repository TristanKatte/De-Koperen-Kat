<script lang="ts">
import IconArrow from '../atoms/IconArrow.svelte';

export let direction: 'prev' | 'next';
export let onClick: () => void;
</script>


<button
class="carousel-arrow"
aria-label={direction === 'prev' ? 'Vorige slide' : 'Volgende slide'}
on:click={onClick}
>
<IconArrow direction={direction === 'prev' ? 'left' : 'right'} />
</button>


<style>
.carousel-arrow {
background: rgba(0,0,0,0.6);
color: white;
border: none;
font-size: 2rem;
width: 3rem;
height: 3rem;
border-radius: 50%;
cursor: pointer;
}
</style>