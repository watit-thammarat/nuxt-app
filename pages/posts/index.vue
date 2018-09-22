<template>
  <div class="posts-page">
    <post-list :posts="posts" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  // middleware: ['log'],
  computed: {
    ...mapGetters(['posts'])
  },
  created() {
    // this.$store.dispatch('setPosts', this.posts);
  }
};
</script>

<style scoped>
.posts-page {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
