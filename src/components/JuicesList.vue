<template>
  <div class="container">
    <div class="juices-list div-center" v-if="juices.length > 0">
      <button id="juice-btn" class="juice-box2 juice-button" v-for="(juice, index) in juices" :key="index" @click="openJuicePage(juice, index)">
        <div class="juice">
          <div class="juice-info">
            <router-link class="navigation-link" :to="'/profile/' + juice.userName"><h3 class="user-name" @click.stop>@{{ juice.userName }}</h3></router-link>
            <p>{{ juice.date }}</p>
            <p>{{ juice.text }}</p>
            <div class="juice-buttons">
              <div class="juice-meta"> {{ calculateLikes(juice.likes, index) }}
                <button v-if="loggedUser" class="like-btn bttn" @click.stop="likeJuice(juice, index)">
                  <span v-if="liked[index]" class="like-txt"><span style="color:red">❤</span> {{ likes[index].length }}</span>
                  <span v-else>♡ {{ likes[index].length }}</span>
                </button>
                <p v-else>♡ {{ likes[index].length }}</p>
              </div>
              <div class="juice-settings">
                <button v-if="loggedUser && loggedUser.name == juice.userName" class="delete-btn bttn" @click.stop="openDeleteMsg(juice)">
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
        if (this.loggedUser && (juice_likes.indexOf(this.loggedUser.name) === -1)) {
          this.liked[index] = false;
        } else {
          this.liked[index] = true;
        }
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
      },
      openDeleteMsg(juice) {
        this.$store.dispatch('setJuice', juice);
        this.$store.dispatch('setDeleteMsg', true);
      }
    },
    computed: {
      ...mapGetters(['juices','loggedUser']),
    },
    created() {
      this.liked = new Array(this.$store.getters.juices.length).fill(false);
      this.likes = new Array(this.$store.getters.juices.length).fill([]);
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
  @media screen and (max-width: 767px) {
    .div-center {
      width: 100%;
    }
  }
  .juice-info p {
    color: black;
  }
  .juice-meta p {
    color: black;
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
  .navigation-link {
    width: fit-content;
  }
  .user-name {
    color: black;
  }
  .user-name:hover {
    font-weight: bold;
  }
  a:hover {
    text-decoration: none !important;
  }
</style>

    