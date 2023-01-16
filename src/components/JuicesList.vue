<template>
  <div class="container">
    <div class="juices-list div-center">
      <div v-for="juice in juices" :key="juice._id" style="position: relative;">
        <div>
          <button class="juice-box2 juice-button" @click="openJuicePage({userName: juice.userName,text: juice.text,date: juice.date,likes: juice.likes})">
            <div class="juice">
              <div class="juice-info">
                <h3>@{{ juice.userName }}</h3>
                <p>{{ juice.date }}</p>
                <p>{{ juice.text }}</p>
              </div>
            </div>
          </button>
        </div>
        <div class="juice-meta">
          <button v-if="loggedUser.name == juice.userName" class="delete-button btn btn-outline-primary">
            <span>🗑 Eliminar</span>
          </button>
          <button v-if="loggedUser" class="like-button btn btn-outline-primary">
            <span>♡ {{ juice.likes }}</span>
          </button>
          <p v-else>♡ {{ juice.likes }}</p>
        </div>
      </div>
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
  .juice-meta {
    position: absolute;
    top: 65%;
    left: 80%;
    z-index:1;
  }
  .like-button{
    margin-left: auto;
  }
</style>

    