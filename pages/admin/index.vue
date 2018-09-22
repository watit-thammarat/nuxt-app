<template>
  <div class="admin-page">
    <section class="new-post">
      <app-button @click="$router.push('/admin/new-post')">Create Post</app-button>
      <app-button @click="logout">Logout</app-button>
    </section>
    <section class="existing-posts">
      <h1>Existing Posts</h1>
      <post-list isAdmin :posts="posts" />
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  layout: 'admin',
  middleware: ['check-auth', 'auth'],
  computed: {
    ...mapGetters(['posts'])
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/admin/auth');
    }
  }
};
</script>

<style scoped>
.admin-page {
  padding: 20px;
}

.new-post {
  text-align: center;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
}

.existing-posts h1 {
  text-align: center;
}
button + button {
  margin-left: 20px;
}
</style>
