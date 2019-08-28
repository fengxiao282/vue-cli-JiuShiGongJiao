<template>
<div id="test">
	
	<!-- <mapComponent/> -->

	<div class="rect">
		<span class="rect-content" @mouseenter="enter($event)">你好，hello world。你好，hello world。你好，hello world。你好，hello world</span>
	</div>
	
</div>
</template>
<script>
import { setTimeout } from 'timers';
// import { mapState } from 'vuex';
// import mapComponent from './map_test/map.vue';
export default {
	name: 'test',
	components: {
		// "mapComponent":mapComponent,
	},
	data () {
		return {
		}
	},
	mounted(){
		// console.log("L---",L)
	},
	methods:{
		enter(event){

			// e.target 是你当前点击的元素
			// e.currentTarget 是你绑定事件的元素

			// console.log(event.target.offsetWidth,event.target.offsetHeight);
			// console.log(event.target.parentNode.offsetWidth)

			// event.target.style.marginLeft = `-${event.target.offsetWidth}px`;
			setTimeout(function(){
				console.log(event.target)
				// event.target.style.marginLeft = `${event.target.offsetWidth}px`;
			},0);

		}
	}
}
</script>

<style lang="postcss" scoped>
#test{
	width: 100%;
	height: 100%;
}
.rect{
	width: 500px;
	height: 50px;
	border: 1px solid red;
	margin: 200px;
	/* text-overflow:ellipsis;
	overflow: hidden; */
}
.rect-content{
	white-space: nowrap;
	background-color: pink;
	transition: margin-left 3s linear;
	/* pointer-events: none; */
}
</style>