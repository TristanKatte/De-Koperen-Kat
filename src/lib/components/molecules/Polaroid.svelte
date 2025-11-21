<script lang="ts">
  export let src: string;
  export let alt: string = "";
  export let rotation: number = 0; // rotation kan per kaart verschillen
</script>

<div class="polaroid" style={`--rot: ${rotation}deg`}>
  <img src={src} alt={alt} loading="lazy" />
</div>

<style>
.polaroid {
  transform: rotate(var(--rot));
  transition: transform 0.3s ease;
  width: fit-content;
}

.polaroid img {
  width: 240px;
  height: auto;
  display: block;
  object-fit: cover;
  border-radius: 6px;
  box-shadow: 0 8px 18px rgba(0,0,0,0.25);
}

/* Hover interactie */
@media (hover: hover) {
  .polaroid:hover {
    transform: rotate(calc(var(--rot) * 0.5)) scale(1.05);
    z-index: 2;
  }
}

/* Mobiel */
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
