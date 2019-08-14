<template>
  <div id=mapComponent>
	  <div id="map"></div>
  </div>
</template>
<script>
export default {
  name: "mapComponent",
  components: {
    // guanlizao,
  },
  data() {
    return {};
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      let map = L.map("map",{
		  maxZoom:15,
		  minZoom:11,
		  attributionControl:false,
	  }).setView([39.90, 116.38], 13);

      let layer1 = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	  });

	let myDivIcon = L.divIcon({
		html:'<div class="xxxx">啊啊啊</div>',
		// html:'<img src="http://localhost:3000/static/img/ym.6d2294b.png">',
	});
	
	let marker = L.marker([39.90, 116.38], {
		icon: myDivIcon,
		// pane:'tilePane',
		iconSize:[300,300],
		title:'hover tips',
	}).addTo(map)

    //   let tileLayer2 = L.tileLayer("http://online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=pl&udt=20150518", {
    //     attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	//   }).addTo(map);
	
	// L.Icon.Default.prototype.options.imagePath = 'http://localhost:3000/static/img/ym.6d2294b.png'; //修改默认icon路径

	// let layer2 = L.layerGroup();
	// let layer3 = L.layerGroup();

	// let baseLayer = {
	// 	'地图':layer1,
	// 	'图层2':layer2,
	// 	'图层3':layer3
	// };

	// let mk1 = L.marker([39.90, 116.38])
	// 	.addTo(map)
	// 	.bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
	// 	.openPopup();

	// let overLayer = {
	// 	'点位1':mk1,
	// };

	// L.control.layers(baseLayer,overLayer).addTo(map);


	},
  }
};
</script>
<style lang="postcss" scoped>
#mapComponent {
  width: 100%;
  height: 100%;
}
#map{
  padding: 20px;
  width: 95%;
  height: 95%;
  border: 1px solid #ff0000;
  background-color: #39394d;
}
.xxxx{
	color: red;
	width: 300px;
	height: 100px;
	z-index: 999
}
.my-div-icon{
	color: red;
	width: 100px;
	height: 200px;
	background-color: #ffffff;
}
.anim-tooltip{
    color: #fff;
    font-size: 50px;
}
/* 提示气泡 */
.tip-bubble{
	position: relative;
	width: 340px;
	height: 185px;
	background: #000000;
	box-sizing: border-box;
	border: 2.5px solid #FF0A03;
	border-radius: 5px;
}
.triangle{
	position:absolute;
	top: 175px;
	left: 142px;
	width: 51px;
	height: 20px;
	background-color:#000000;
	/* background-color:#fff; */
}
/* rect-x */
.rect-x{
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	width: 45px;
	height: 80px;
}
.rect-x-top{
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 49px;
	border: 1.25px solid #FF3939;
	background-color: #000000;
	border-radius: 5px;
	box-sizing: border-box;
}
.rect-x-top-inner{
	background-color: #FF3939;
	width: 22.5px;
	height: 22.5px;
	border-radius: 3px;
}
.rect-x-bottom{
	position: relative;
	flex: 1;
	width: 20px;
	box-sizing: border-box;
}
.rect-x-1{
	position: absolute;
	top: 0;
	left: 6px;
	height: 15px;
	width: 8px;
	z-index: 999;
	background-color: #FF3939;
}
.rect-x-2{
	position: absolute;
	bottom: 0;
	width: 20px;
	height: 20px;
	border-radius: 10px;
	background-color: #FF3939;
}
/*  */
.che-icon{
	width: 57.5px;
	height: 57.5px;
}
</style>