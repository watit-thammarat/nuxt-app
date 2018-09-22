<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
      <admin-post-form @submit="onSubmit" />
    </section>
  </div>
</template>

<script>
import AdminPostForm from '~/components/Admin/AdminPostForm.vue';

export default {
  layout: 'admin',
  middleware: ['check-auth', 'auth'],
  components: {
    AdminPostForm
  },
  data: () => ({}),
  methods: {
    async onSubmit(post) {
      try {
        await this.$store.dispatch('addPost', post);
        this.$router.push('/admin');
      } catch (err) {
        console.error(err);
      }
    }
  }
};
</script>

<style scoped>
.new-post-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .new-post-form {
    width: 500px;
  }
}
</style>
