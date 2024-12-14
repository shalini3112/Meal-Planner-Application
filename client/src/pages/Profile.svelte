<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import MealPlanCard from "../components/MealPlanCard.svelte";

  // Props: ID passed from the route parameter
  let { id } = $props();

  // State to hold the fetched profile data
  let profile = $state(null);

  onMount(async () => {
    try {
      // Get user info from local storage
      const user = JSON.parse(localStorage.getItem("user"));

      // Fetch profile with meal plans from the server with access token
      const response = await axios.get(`http://localhost:8080/users/${id}`, {
        headers: {
          Authorization: user.header_token, // Attach token for authorization
        },
      });
      // Assign profile to the response
      profile = response.data;
    } catch (error) {
      console.log(error);
    }
  });
</script>

<div class="profile-container">
  {#if !profile}
    <div>Loading User Profile...</div>
  {:else}
    <h1>Welcome, {profile.username}!</h1>
    <!-- Displaying the username -->
    {#if profile.preferences.length > 0}
      <p class="preferences">Your dietary preferences: {profile.preferences}</p>
      <!-- Displaying the preferences -->
    {:else}
      <p>You have not set any dietary preferences yet.</p>
    {/if}
    <hr />
    <h2>Your Meal Plans</h2>
    <div class="meal-plans-list">
      {#if profile.mealPlan.length === 0}
        <p>You have not created any meal plans yet.</p>
      {:else}
        {#each profile.mealPlan as plan}
          <div class="meal-plan-section">
            <h3>Week: {plan.week}</h3>
            <!-- Displaying the week -->
            <div class="meals-list">
              {#each plan.meals as meal}
                <MealPlanCard
                  name={meal.name}
                  diets={meal.diets}
                  image={meal.image}
                />
              {/each}
            </div>
          </div>
        {/each}
      {/if}
    </div>
  {/if}
</div>

<style>
  .profile-container {
    margin: 2rem auto;
    padding: 2rem;
    text-align: left;
    color: #fff;
  }

  h1 {
    font-family: "Montserrat", sans-serif;
    font-size: 2rem;
    color: #ff9f1c;
  }

  h2 {
    font-family: "Montserrat", sans-serif;
    font-size: 1.5rem;
  }

  .meal-plans-list {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-top: 2rem;
  }

  h3 {
    font-family: "Montserrat", sans-serif;
    font-size: 1.2rem;
    color: #81d4fa;
    margin-bottom: 1rem;
  }

  .meals-list {
    display: flex; /* flexbox for horizontal layout */
    gap: 1.5rem;
    overflow: hidden;
  }

  p {
    font-family: "Roboto", sans-serif;
    color: #bbb;
  }
</style>
