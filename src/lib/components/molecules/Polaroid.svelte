<script lang="ts">
  export let src: string;
  export let alt: string = "";
  export let rotation: number = 0; // rotatie per kaart
</script>

<div class="polaroid" style={`--rot: ${rotation}deg`}>
  <img src={src} alt={alt} loading="lazy" decoding="async" />
</div>

<style>
.polaroid {
  display: inline-block;
  transform: rotate(var(--rot));
  transition: transform 0.3s ease, z-index 0.3s ease;
  cursor: pointer;
  width: fit-content;
}

.polaroid img {
  width: 1500px;
  max-width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 8px 18px rgba(0,0,0,0.25);
}

/* Hover interactie alleen op devices met hover */
@media (hover: hover) {
  .polaroid:hover {
    transform: rotate(calc(var(--rot) * 0.5)) scale(1.05);
    z-index: 2;
  }
}

/* Tablet: subtiele rotatie */
@media (max-width: 900px) {
  .polaroid {
    transform: rotate(calc(var(--rot) * 0.4));
  }
  .polaroid:hover {
    transform: rotate(calc(var(--rot) * 0.2)) scale(1.03);
  }
}

/* Mobiel: geen rotatie */
@media (max-width: 600px) {
  .polaroid {
    transform: none !important;
    width: 100%;
  }
  .polaroid img {
    width: 100%;
    max-width: 350px;
    margin: 0 auto;
  }
}
</style>
