<section class="huurbrouwen" aria-labelledby="huurbrouwen-title">
  <h2 id="huurbrouwen-title">Huurbrouwen 🍻</h2>
  <div class="huurbrouwen-content">
    <div class="huurbrouwen-card">
      <p>
        Delftse Stadsbrouwerij De Koperen Kat is een brouwerij en proeflokaal ineen. 
        Met een brouwinstallatie van 10HL en vergistingstanks van 10HL betekent dit 
        ook dat wij plaats kunnen bieden aan huurbrouwers.
      </p>
      <p>
        Heb je geen of te weinig eigen ketels en interesse in huurbrouwen bij De Koperen Kat, 
        mail dan naar
        <a href="mailto:huurbrouwen@dekoperenkat.nl">huurbrouwen@dekoperenkat.nl</a>.
      </p>
      <p>Wij hopen op een fijne samenwerking!</p>
    </div>
  </div>
</section>

<style>
  .huurbrouwen {
    width: 100%;
    max-width: 900px;
    margin: 0 auto 3rem;
    container-type: inline-size;
    container-name: huurbrouwen-section;
  }
  
  h2 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 2rem;
    color: var(--text-color);
  }
  
  .huurbrouwen-content {
    width: 100%;
  }
  
  .huurbrouwen-card {
    color: var(--text-color);
    text-align: left;
    line-height: 1.6;
  }
  
  .huurbrouwen-card p {
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }
  
  .huurbrouwen-card a {
    color: #c27c3a;
    text-decoration: none;
    font-weight: 600;
  }
  
  .huurbrouwen-card a:hover {
    text-decoration: underline;
  }
  
  @container huurbrouwen-section (min-width: 70rem) {
    .huurbrouwen-card {
      padding: 2rem;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 1rem;
    }
  }
</style>