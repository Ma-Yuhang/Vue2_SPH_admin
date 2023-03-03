<template>
  <div>
    <Card />
    <Sale />
    <Observe />
  </div>
</template>

<script>
import Card from './card'
import Sale from './sale'
import Observe from './observe'
export default {
  name: 'Dashboard',
  components: { Card, Sale, Observe }
}
</script>
<style>
.chart div:nth-child(1) {
  width: 100% !important;
}
.chart div:nth-child(1) canvas {
  width: 100% !important;
}
</style>