<template>
  <div>
    <div>front left friction: {{frictionFL}}</div>
    <div>front right friction: {{tireFrictionFR}}</div>
    <div>back left friction: {{tireFrictionBL}}</div>
    <div>back right friction: {{tireFrictionBR}}</div>
  </div>
</template>

<script>
export default {
  props: ['tireFrictionFL', 'tireFrictionFR', 'tireFrictionBL', 'tireFrictionBR'],
  data() {
    return {
      
    };
  },
  computed: {
    frictionFL: function () {
      return this.tireFrictionFL;
    },
    frictionFR: function () {
      return this.tireFrictionFR;
    },
    frictionBL: function () {
      return this.tireFrictionBL;
    },
    frictionBR: function () {
      return this.tireFrictionBR;
    },
  }
};
</script>
