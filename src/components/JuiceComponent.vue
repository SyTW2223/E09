<template>
  <div class="juice-box form-container">
    <div class="juice">
      <div class="juice-info">
        <h2>{{ juice.username }}</h2>
        <p>{{ juice.date }}</p>
        <p>{{ juice.text }}</p>
        <div class="juice-meta">
          <button @click="likeJuice" class="like-button btn btn-outline-primary">
            <span>♡ {{ juice.likes }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
       
<script>
  export default {
    name: 'JuiceComponent',
    data() {
      return {
        juice: {
          username: '@username',
          text: 'This is an example of the text that can be included inside of a Juice. It can be really extensive!!',
          date: '01/01/2020',
          likes: '7'
        }
      }
    },
    methods: {
      likeJuice() {
      // code to handle the like action
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
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 20px;
  }
  .btn-outline-primary {
    color: #000000 !important;
    outline-color: #000000;
    border-color: #000000;
    lighting-color: #f31b0b;
    background-color: #ff898173;

  }
  .btn-outline-primary:hover {
    background-color: #ff8981ce;
  }
  .btn-outline-primary:active {
    background-color: #fc0606ce;
  }
</style>