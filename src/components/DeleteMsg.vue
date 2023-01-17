<template>
  <div class="overlay">
    <div class="juice-box form-container">
      <button class="boton-cerrar" @click="deleteMsg(false)">✖</button>
      <div class="juice">
        <div class="juice-info">
          <p>¿Está seguro de que quiere eliminar este juice?</p>
          <div class="juice-meta">
            <button class="btn btn-outline-primary" @click="deleteJuice">
              <span>Si</span>
            </button>
            <button class="btn btn-outline-primary" @click="deleteMsg(false)">
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
    },
  }
}
</script>