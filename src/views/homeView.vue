<template>
  <div>
    <div class="page">
      <SignedIn/>
    </div>
    <NewJuice v-if='newJuice'/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import NewJuice from "@/components/NewJuice.vue";
import SignedIn from "../components/SignedIn.vue";
export default {
  name: 'HomeView',
  components: {
    SignedIn,
    NewJuice
  },
  computed: {
    ...mapGetters(['newJuice'])
  }
}
</script>

<style>
 .page {
    position: absolute;
    width: 100%;
    height: 100%;
  }
</style>