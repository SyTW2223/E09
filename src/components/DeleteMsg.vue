<template>
  <div class="overlay2">
    <div class="juice-box msg-container">
      <button class="boton-cerrar" @click="deleteMsg(false)">✖</button>
      <div class="juice">
        <div class="juice-info">
          <p>¿Está seguro de que quiere eliminar este juice?</p>
          <div class="juice-meta">
            <button class="bttn" @click="deleteJuice">
              <span>Si</span>
            </button>
            <button class="bttn" @click="deleteMsg(false)">
              <span>No</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeleteMsg',
  methods: {
    deleteMsg(value) {
      this.$store.dispatch('setDeleteMsg', value);
    },
    deleteJuice() {
      this.$store.dispatch('deleteJuice');
      this.$store.dispatch('setDeleteMsg', false);
      this.$store.dispatch('setJuicePage', false);
    },
  }
}
</script>

<style>
  .overlay2 {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 4;
  }
  .msg-container {
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    z-index: 5;
  }
  .bttn span {
    color: black;
  }
</style>