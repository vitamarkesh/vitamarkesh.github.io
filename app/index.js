new Vue({
	el: '#app',
	template: `
		<App/>
	`,
	created() {
		this.minLengthQuery = 3;
		this.maxCountPhotos = 50;
		this.debug = false;
	},
});
