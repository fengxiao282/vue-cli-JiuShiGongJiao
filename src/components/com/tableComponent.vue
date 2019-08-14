<template>
	<div id="tableComponent">
		<subitemheader :titleName="titleName" :titleTime="titleTime"/>
		<tableBody :propType='propType'/>
	</div>
</template>

<script>
import subitemheader from "./subitemheader";
import tableBody from "./tableBody";
export default {
  name: "tableComponent",
  props: {
    titleName: String,
    titleTime: String,
    propType: String
  },
  components: {
    subitemheader,
    tableBody
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="postcss" scoped>
#tableComponent {
  font-family: PingFangSC-Medium;
  font-size: 40px;
  color: #fff;
  width: 100%;
  height: 590px;
}
</style>
