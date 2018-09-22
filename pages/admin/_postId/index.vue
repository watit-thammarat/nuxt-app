<template>
  <div class="admin-post-page">
    <section class="update-form">
      <admin-post-form :post="post" @submit="onSubmit" />
    </section>
  </div>
</template>

<script>
import AdminPostForm from '~/components/Admin/AdminPostForm.vue';

export default {
  async asyncData({ app, error, params: { postId } }) {
    try {
      const data = await app.$axios.$get(`/posts/${postId}.json`);
      return { post: { ...data, id: postId } };
    } catch (err) {
      error(err);
    }
  },
  middleware: ['check-auth', 'auth'],
  layout: 'admin',
  components: {
    AdminPostForm
  },
  data: () => ({}),
  methods: {
    async onSubmit(post) {
      try {
        await this.$store.dispatch('editPost', post);
        this.$router.push('/admin');
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}
@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>
