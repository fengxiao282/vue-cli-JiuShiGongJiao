<template>
	<div id="tablecomponentleft">

		<subitemheader :titleName="titleName" :titleTime="titleTime"/>
		<tablebodyleft :propType='propType'/>

	</div>
</template>

<script>
import subitemheader from './subitemheader';
import tablebodyleft from './tablebodyleft';
export default {
	name: 'tablecomponentleft',
	props: {
			titleName : String,
			titleTime : String,
			propType: String
	},
  components:{
		subitemheader,
		tablebodyleft
  },
	data(){
		return{}
	},
	mounted(){
	},
	methods:{
	}
}
</script>
<style lang="postcss" scoped>
#tablecomponentleft{
	font-family: PingFangSC-Regular;
	font-size: 40px;
	color: #FFF;
	width: 100%;
	height: 590px;
}

</style>
