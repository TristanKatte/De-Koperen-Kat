<script>
  export let src;
  export let alt = "";
</script>

<img class="polaroid-img" {src} {alt} loading="lazy" />

<style>
.polaroid-img {
  width: 240px; /* ← wijzig hier de grootte */
  height: auto;
  display: block;
  object-fit: cover;
  transition: transform 0.3s ease;
  box-shadow: 0 8px 18px rgba(0,0,0,0.25);
  border-radius: 6px;
  position: relative;
  z-index: 1;
}

/* Zig-zag & rotation */
.polaroid-img:nth-child(odd) {
  transform: rotate(-4deg);
  margin: 0 30px 60px 0;
}

.polaroid-img:nth-child(even) {
  transform: rotate(4deg);
  margin: 60px 0 30px 30px;
}

/* Hover – lichte rechttrekking zoals Sambrook’s */
@media (hover: hover) {
  .polaroid-img:hover {
    transform: rotate(0deg) scale(1.04);
    z-index: 2;
  }
}

/* Mobiel — stacking netjes en recht */
@media (max-width: 600px) {
  .polaroid-img,
  .polaroid-img:nth-child(odd),
  .polaroid-img:nth-child(even) {
    width: 90%;   /* responsive scaling */
    margin: 20px auto;
    transform: none;
  }
}


</style>
