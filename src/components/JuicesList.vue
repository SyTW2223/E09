<template>
  <div class="container">
    <div class="juices-list div-center" v-if="juices.length > 0">
      <button id="juice-btn" class="juice-box2 juice-button" v-for="(juice, index) in juices" :key="index" @click="openJuicePage(juice, index)">
        <div class="juice">
          <div class="juice-info">
            <h3>@{{ juice.userName }}</h3>
            <p>{{ juice.date }}</p>
            <p>{{ juice.text }}</p>
            <div class="juice-buttons">
              <div class="juice-meta">
                <button v-if="loggedUser" class="like-btn" @click="likeJuice(juice, index)"> {{ calculateLikes(juice.likes, index) }}
                  <span v-if="liked[index]" class="like-txt"><span style="color:red">❤</span> {{ likes[index].length }}</span>
                  <span v-else>♡ {{ likes[index].length }}</span>
                </button>
                <p v-else>♡ {{ likes[index].length }}</p>
              </div>
              <div class="juice-settings">
                <button v-if="loggedUser && loggedUser.name == juice.userName" class="delete-btn" @click="deleteJuice(juice)">
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
    data() {
      return {
        likes: [],
        liked: []
      }
    },
    methods: {
      calculateLikes(juice_likes, index) {
        this.likes[index] = juice_likes;
        if (juice_likes.indexOf(this.loggedUser.name) === -1) {
          this.liked[index] = false;
        } else {
          this.liked[index] = true;
        }
      },
      deleteJuice(juice) {
        this.$store.dispatch('setJuice', juice);
        this.$store.dispatch('deleteJuice');
      },
      likeJuice(juice, index) {
        const position = this.likes[index].indexOf(this.loggedUser.name);
        if (position > -1) {
          this.liked[index] = false;
          this.likes[index].splice(position, 1);
        } else {
          this.liked[index] = true;
          this.likes[index].push(this.loggedUser.name);
        }
        juice.likes = this.likes[index];
        this.$store.dispatch('setJuice', juice);
        this.$store.dispatch('likeJuice', this.likes[index]);
      },
      openJuicePage(juice, index) {
        juice.likes = this.likes[index];
        this.$store.dispatch('setJuice', juice);
        this.$store.dispatch('setJuicePage', true);
      }
    },
    computed: {
      ...mapGetters(['juices','loggedUser']),
    },
    created() {
      this.liked = new Array(this.$store.getters.juices.length).fill(false);
      this.likes = new Array(this.$store.getters.juices.length).fill([]);
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

    