<script>
  //making  variables accessible as props using export
  export let name = "";
  export let diets = [];
  export let image = "";
</script>

<div class="meal-card">
  <img src={image} alt={name} class="meal-image" />
  <p class="meal-name">{name}</p>
  <p class="meal-diets">
    {diets.length > 0 ? diets.join(", ") : "No specific diets"}
  </p>
</div>

<style>
  .meal-card {
    background: #2b2d42;
    border-radius: 8px;
    padding: 1rem;
    text-align: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    color: #fff;
  }

  .meal-card:hover {
    transform: scale(1.05);
  }

  .meal-image {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 5px;
    margin-bottom: 10px;
  }

  .meal-name {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 8px;
    color: #ff9f1c;
  }

  .meal-diets {
    font-size: 14px;
    color: #aaa;
  }
</style>
