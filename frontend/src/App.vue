<template>
  <div class="app">

    <div class="container-fluid py-5 px-5">

      <h1 class="main-title mb-5">
        🎮 Game Catalog
      </h1>

      <!-- FORM -->

      <div class="game-form card p-4 mb-5">

        <input
          v-model="newGame.title"
          class="form-control mb-3"
          placeholder="Game title"
        />

        <input
          v-model="newGame.genre"
          class="form-control mb-3"
          placeholder="Genre"
        />

        <input
          v-model="newGame.platform"
          class="form-control mb-3"
          placeholder="Platform"
        />

        <input
          v-model="newGame.release_year"
          type="number"
          class="form-control mb-3"
          placeholder="Release year"
        />

        <input
          v-model="newGame.rating"
          type="number"
          step="0.1"
          class="form-control mb-4"
          placeholder="Rating"
        />
        <input
          v-model="newGame.image_url"
          class="form-control mb-4"
          placeholder="Image URL"
/>
        <button
          class="btn btn-primary add-btn"
          @click="addGame"
        >
          {{ editingId ? 'Update Game' : 'Add Game' }}
        </button>

      </div>

      <!-- GRID -->

      <div class="games-grid">

        <div
          v-for="game in games"
          :key="game.id"
          class="game-card"
        >

          <div>
          <img
             :src="game.image_url"
             class="game-image"
             alt="Game cover"
/>
            <h2>{{ game.title }}</h2>

            <p>🎯 Genre: {{ game.genre }}</p>

            <p>💻 Platform: {{ game.platform }}</p>

            <p>📅 Year: {{ game.release_year }}</p>

            <p>⭐ Rating: {{ game.rating }}</p>

          </div>

          <div class="buttons">

            <button
              class="btn btn-warning"
              @click="editGame(game)"
            >
              Edit
            </button>

            <button
              class="btn btn-danger"
              @click="deleteGame(game.id)"
            >
              Delete
            </button>

          </div>

        </div>

      </div>

    </div>

  </div>
</template>

<script setup>

import { ref, onMounted } from 'vue'
import axios from 'axios'

const games = ref([])

const editingId = ref(null)

const newGame = ref({
  title: '',
  genre: '',
  platform: '',
  release_year: '',
  rating: '',
  image_url: ''
})

const API_URL = 'http://localhost:3000/games'

const fetchGames = async () => {

  const response = await axios.get(API_URL)

  games.value = response.data
}

const addGame = async () => {

  if (editingId.value) {

    await axios.put(
      `${API_URL}/${editingId.value}`,
      newGame.value
    )

    editingId.value = null

  } else {

    console.log(newGame.value)
    await axios.post(API_URL, newGame.value)

  }

  newGame.value = {
  title: '',
  genre: '',
  platform: '',
  release_year: '',
  rating: '',
  image_url: ''
}

  fetchGames()
}

const deleteGame = async (id) => {

  await axios.delete(`${API_URL}/${id}`)

  fetchGames()
}

const editGame = (game) => {

  editingId.value = game.id

  newGame.value = {
    title: game.title,
    genre: game.genre,
    platform: game.platform,
    release_year: game.release_year,
    rating: game.rating,
    image_url: game.image_url
  }
}

onMounted(() => {

  fetchGames()

})

</script>

<style>

body {
  background: #0d0d0d;
  color: white;
  font-family: Arial, sans-serif;
}

.main-title {
  text-align: center;
  font-size: 4rem;
  font-weight: bold;
  color: white;
}

.game-form {
  max-width: 500px;
  margin: 0 auto;
  background: #181818;
  border: 1px solid #2c2c2c;
  border-radius: 20px;
}

.form-control {
  background-color: #252525 !important;
  color: white !important;
  border: 1px solid #3a3a3a !important;
  padding: 14px;
}

.form-control::placeholder {
  color: #9f9f9f !important;
}

.form-control:focus {
  background-color: #252525 !important;
  color: white !important;
  border-color: #7c4dff !important;
  box-shadow: 0 0 10px #7c4dff55 !important;
}

.add-btn {
  background: #7c4dff;
  border: none;
  padding: 12px;
  font-size: 1.1rem;
  font-weight: bold;
}

.add-btn:hover {
  background: #6d3df5;
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.game-card {
  background: #181818;
  border: 1px solid #2d2d2d;
  border-radius: 20px;
  padding: 25px;

  min-height: 260px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  transition: 0.3s;
}

.game-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 20px #7c4dff33;
}

.game-card h2 {
  color: white;
  margin-bottom: 20px;
}

.game-card p {
  color: #d0d0d0;
}

.buttons {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.btn-warning {
  color: white;
}

@media (max-width: 1200px) {
  .games-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .games-grid {
    grid-template-columns: 1fr;
  }
}
.game-image {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 15px;
  margin-bottom: 20px;
}

</style>