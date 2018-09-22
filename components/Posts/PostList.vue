<template>
  <section class="post-list">
    <post-preview v-for="p in posts" :key="p.id" :id="p.id" :isAdmin="isAdmin" :thumbnail="p.thumbnail" :title="p.title" :previewText="p.previewText" />
  </section>
</template>

<script>
import PostPreview from '~/components/Posts/PostPreview.vue';

export default {
  props: {
    isAdmin: {
      type: Boolean,
      default: false
    },
    posts: {
      type: Array,
      required: true
    }
  },
  components: {
    PostPreview
  }
};
</script>

<style scoped>
.post-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
