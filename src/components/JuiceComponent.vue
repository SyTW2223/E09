<template>
  <div class="juice">
    <div class="juice-info" >
      <h3>@{{ userName }}</h3>
      <p>{{ date }}</p>
      <p>{{ text }}</p>
      <div class="juice-buttons">
        <div class="juice-meta">
          <button v-if="loggedUser" class="like-btn" @click="likeJuice">
            <span v-if="liked" class="like-txt"><span style="color:red">❤</span> {{ likes_count }}</span>
            <span v-else>♡ {{ likes_count }}</span>
          </button>
          <p v-else>♡ {{ likes_count }}</p>
        </div>
        <div class="juice-settings">
          <button v-if="loggedUser && loggedUser.name == userName" class="delete-btn" @click="deleteJuice">
            <span>🗑</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { toRaw } from 'vue';
  import { mapGetters } from 'vuex';
  export default {
    name: 'JuiceComponent',
    data() {
      return {
        likes_count: 0,
        liked: false
      }
    },
    created() {
      let likes_list = toRaw(this.likes);
      this.likes_count = likes_list.length;
      if (likes_list.indexOf(this.loggedUser.name) !== -1) {
        this.liked = true;
      } else {
        this.liked = false;
      }
    },
    computed: {
      ...mapGetters(['loggedUser', 'error', 'userName', 'date', 'text', 'likes', 'juice_id']),
    },
    methods: {
      deleteJuice() {
        this.$store.dispatch('deleteJuice');
        this.$store.dispatch('setJuicePage', false);
      },
      likeJuice() {
        let updated_likes = this.proxyToArray(this.likes);
        const index = updated_likes.indexOf(this.loggedUser.name);
        if (index > -1) { 
          updated_likes.splice(index, 1);
          this.liked = false;
        } else {
          updated_likes.push(this.loggedUser.name);
          this.liked = true;
        }
        this.$store.dispatch('likeJuice', updated_likes);
        this.$store.dispatch('setLikes', updated_likes);
        this.likes_count = updated_likes.length;
        this.$store.dispatch('getJuices');
      },
      proxyToArray(proxy) {
        return toRaw(proxy);
      }
    }
  }
</script>
  
       
<style>
  .juice-box {
    width: 600px;
    margin: 50px auto;
    box-shadow: 0px 0px 5px;
    padding: 20px;
    padding-top: 10px;
    border-radius: 10px;
  }
  .juice-info {
    margin-top: 10px;
    text-align: left;
  }
  .juice-buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .juice-settings {
    text-align: right;
  }
  .like-btn {
    border-radius: 15%;
    border: none;
    background-color: white;
  }
  .like-btn:hover{
    background-color: lightgray;
  }
  .delete-btn {
    border-radius: 15%;
    border: none;
    background-color: white;
    text-align: right;
  }
  .delete-btn:hover{
    background-color: lightcoral;
    color: white;
  }
</style>