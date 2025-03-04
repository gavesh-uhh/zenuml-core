<template>
  <div class="title ml-2 text-skin-title text-base font-semibold">
    {{ title ? title : "No Title" }}
  </div>
</template>

<script>
export default {
  name: "DiagramTitle",
  props: ["context"],
  computed: {
    title: function () {
      return this.context?.content();
    },
  },
};
</script>

<style scoped></style>
