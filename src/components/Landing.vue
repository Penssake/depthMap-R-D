<template>
  <div class="Landing">
    <SectionOne />
    <SectionTwo />
  </div>
</template>

<script>
import SectionOne from "@/components/SectionOne.vue";
import SectionTwo from "@/components/SectionTwo.vue";

export default {
  name: "Landing",
  components: {
    SectionOne,
    SectionTwo,
  },
};
</script>

<style></style>
