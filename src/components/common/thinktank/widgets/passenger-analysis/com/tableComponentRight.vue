<template>
	<div id="tablecomponentright">

		<subitemheader :titleName="titleName" :titleTime="titleTime"/>
		<tablebodyright :propType='propType'/>

	</div>
</template>

<script>
import subitemheader from './subitemheader';
import tablebodyright from './tablebodyright';
export default {
	name: 'tablecomponentright',
	props: {
			titleName : String,
			titleTime : String,
			propType: String
	},
  components:{
		subitemheader,
		tablebodyright
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
#tablecomponentright{
	font-family: PingFangSC-Regular;
	font-size: 40px;
	color: #FFF;
	width: 100%;
	height: 590px;
}

</style>
