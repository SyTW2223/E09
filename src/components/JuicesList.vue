<template>
  <div class="juices-list">
    <button class="juice-box2 juice-button" v-for="juice in juices" :key="juice._id" @click="openJuicePage({userName: juice.userName,text: juice.text,date: juice.date,likes: juice.likes})">
      <div class="juice">
        <div class="juice-info">
          <h3>@{{ juice.userName }}</h3>
          <p>{{ juice.date }}</p>
          <p>{{ juice.text }}</p>
          <div class="juice-meta">
            <button v-if="loggedUser" class="like-button btn btn-outline-primary">
              <span>♡ {{ juice.likes }}</span>
            </button>
            <p v-else>♡ {{ juice.likes }}</p>
          </div>
        </div>
      </div>
    </button>
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
    width: 66%;
    border-bottom: 1px solid lightgray !important;
    padding: 20px;
    padding-top: 10px;
  }
</style>

    