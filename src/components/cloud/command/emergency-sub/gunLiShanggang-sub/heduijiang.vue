<template>
<div id="heduijiang"> <!-- 和对讲 -->
    <!-- <div class="content-title" :style="{'bottom':bottom_status}"> -->
	<div class="content-title">
        <div class="title-left"><img class="img-icon" src="../../../../../../resource/images/exposition/main/phone.png"> 和对讲</div>
        <div class="control-panel">
            <div class="control-touch" @click="change_position"></div>
        </div>
    </div>

    <div class="heduijiang-body">
		<!-- <iframe src="https://www.baidu.com/?tn=98010089_dg" id="heduijiang_webview" :style="{width:webview_width, height:webview_height}"></iframe> -->
		<webview src="https://112.33.0.176:4499/station/" id="heduijiang_webview" :style="{width:webview_width, height:webview_height}"></webview>
    </div>
</div>
</template>
<script>
export default {
	name: 'heduijiang',
	components: {
	},
	data () {
		return {
			defaultPosition:'relative',
			bottom_status:'830px',
			webview_width:'1299.2px',
			webview_height:'664.8px',
		}
	},
    updated(){
		// this.scale = 1.25;
	},
	methods:{
		change_position(){ //改变 emergency.vue 中 .heDuiJiang-container 的 position，进而调整和对讲大小
			if(this.defaultPosition == 'relative'){
				this.defaultPosition = 'static';
				this.bottom_status = '2035px';
				this.$emit("heduijiang_changePosition","static");
				this.webview_width = '2616px';
				this.webview_height = '1625.6px';
			}else if(this.defaultPosition == 'static'){
				this.defaultPosition = 'relative';
				this.bottom_status = '830px';
				this.$emit("heduijiang_changePosition","relative");
				this.webview_width = '1299.2px';
				this.webview_height = '664.8px';
			}
		}
	}
}
</script>

<style lang="postcss" scoped>
#heduijiang{
	display: flex;
	flex-direction: column;
	justify-content:flex-start;
	align-items: center;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 3px;
}
.content-title{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 80px;
	border-bottom: 2.5px solid #008BFF;
	padding:0 20px 0 40px;
	box-sizing: border-box;
	background-color: #000517;
	/* position: absolute;
	top: 0; */
}
.title-left{
	width: 240px;
    height: 100%;
    font-size: 50px;
}
.img-icon{
	width: 45px;
	height: 45px;
	margin-bottom: -5px;
}
.control-panel{
	position: relative;
	width: 75px;
	height: 60px;
	border: 2px solid #ffffff;
}
.control-touch{
	position: absolute;
    top: 20px;
    bottom: 0;
    right: 25px;
	left: 0;
	border: 2px solid #ffffff;
	background-color: #3D9AFF;
	margin: -2px;
}
.control-touch:hover{
	cursor: pointer;
}
.heduijiang-body{
    flex: 1;
    width: 100%;
	overflow: hidden;
	box-sizing: content-box;
	background-color:#ffffff;
}
#heduijiang_webview{
	transform-origin: left top;
	transform: scale(1.25);
}
</style>