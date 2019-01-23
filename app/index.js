new Vue({
	el: '#app',
	template: `
		<App/>
	`,
	created() {
		this.minLengthQuery = 3;
		this.maxCountPhotos = 50;
		this.app_url = 'https://vitamarkesh.github.io/';
		this.vk = {
			client_id: '6829444',
			search_url: 'https://vk.com/dev/photos.search',
			v_api: '5.92',
			scope: VK.access.PHOTOS,
			auth_url: 'https://oauth.vk.com/authorize',
		};
		this.debug = false;
	},
});
