<template>
  <div class="container">
    <div class="juices-list div-center" v-if="juices.length > 0">
      <button class="juice-box2 juice-button" v-for="juice in juices" :key="juice._id" @click="openJuicePage({juice_id: juice._id, userName: juice.userName,text: juice.text,date: juice.date, likes: juice.likes})">
        <div class="juice">
          <div class="juice-info">
            <h3>@{{ juice.userName }}</h3>
            <p>{{ juice.date }}</p>
            <p>{{ juice.text }}</p>
            <div class="juice-buttons">
              <div class="juice-meta">
                <button v-if="loggedUser" class="like-btn">
                  <span>♡ {{ juice.likes.length }}</span>
                </button>
                <p v-else>♡ {{ juice.likes.length }}</p>
              </div>
              <div class="juice-settings">
                <button v-if="loggedUser && loggedUser.name == juice.userName" class="delete-btn" @click="deleteJuice">
                  <span>🗑</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </button>
    </div>
  </div>
</template>
  
<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'JuicesList',
    methods: {
      openJuicePage(juice) {
        this.$store.dispatch('setJuice', juice);
        this.$store.dispatch('setJuicePage', true);
      }
    },
    computed: {
      ...mapGetters(['juices','loggedUser']),
    },
    created() {
      this.$store.dispatch('getJuices');
    }
  }
</script>
    
<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .div-center {
    width: 66%;
    margin: 0 auto;
  }
  .juice-button {
    background-color: white;
    border: none;
  }
  .juice-button:hover {
    background-color: #F8F9FA;
  }
  .juice-list {
    top: 50%;
  }
  .juice-box2 {
    width: 100%;
    border-bottom: 1px solid lightgray !important;
    padding: 20px;
    padding-top: 10px;
  }
</style>

    