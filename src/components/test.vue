<template>
<div id="test">

	<!-- <div class="rect"></div> -->
	<mapComponent/>
	
</div>
</template>
<script>
// import { mapState } from 'vuex';
import mapComponent from './map_test/map.vue';
// import investitemtitle from '../../../common/cloudmonitor/sourceinvest/investitemtitle.vue';


export default {
	name: 'test',
	components: {
		// guanlizao,
		"mapComponent":mapComponent,
	},
	data () {
		return {
		}
	},
	mounted(){
		// console.log("L---",L)
	},
	methods:{
	}
}
</script>

<style lang="postcss" scoped>
#test{
	width: 100%;
	height: 100%;
}
.rect{
	width: 400px;
	height: 400px;
	border: 5px solid red;
}
</style>