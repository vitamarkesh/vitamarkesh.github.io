Vue.component('App', {
	template: `
	    <div class="App">
			<template v-if="connected">
				<Photos/>
			</template>
			<div v-else>
				<div>Пользователь не авторизован ВКонтакте или не разрешил доступ приложению.</div>
				<button @click="doLogin">Авторизоваться</button>
			</div>
	    </div>
	`,
	props: [],
	data() {
		return {
			connected: false,
		}
	},
	components: {
	},
	mixins: [
	],
	created() {
		this.app_url = 'https://vitamarkesh.github.io/';
		this.vk = {
			client_id: '6829444',
			search_url: 'https://vk.com/dev/photos.search',
			v_api: '5.92',
			scope: VK.access.PHOTOS,
			auth_url: 'https://oauth.vk.com/authorize',
		};
		this.debug = this.$root.debug;
		this.connected = this.debug;

		//https://vk.com/dev/openapi

		VK.init({
			apiId: this.vk.client_id,
		});

		//if (! this.connected) this.doLogin();

		//this.doAuth();
		//this.doSearch();

		/*try {
			const data = this.doSearch();
		} catch (e) {

		}*/

		/*this.doSearch()
			.then(data => {
				console.log(data);
			})
			.catch(error => {
				console.log(error);
			});*/
	},
	computed: {},
	watch: {},
	methods: {
		setConnected(response) { //console.log(response);
			let connected = false;
			switch (response.status) {
				case 'connected': { // пользователь авторизован ВКонтакте и разрешил доступ приложению
					connected = true;
				} break;
				case 'not_authorized': // пользователь авторизован в ВКонтакте, но не разрешил доступ приложению
				case 'unknown': { // пользователь не авторизован ВКонтакте
				} break;
			}
			this.connected = connected;
		},
		doLogin() {
			VK.Auth.login(this.setConnected, this.vk.scope);
		},
		doLoginout() {
			VK.Auth.logout(this.setConnected);
		},
		/*doSearch() {
			const response = axios.jsonp(this.vk.search_url, {
				params: {
					q: 'Nature',
					v: this.vk.v_api,
				},
			})
				.then(response => {
					console.log('doSearch', response);
				})
				.catch(error => {
					console.log(error);
				});
			//return response.data;
		},*/
		/*doAuth() {
			axios.jsonp(this.vk.auth_url, {
				params: {
					client_id: this.vk.client_id,
					display: 'page',
					redirect_uri: this.app_url,
					scope: this.vk.scope,
					response_type: 'token',
					v: this.vk.v_api,
				},
			})
				.then(response => {
					console.log('doAuth', response);
				})
				.catch(error => {
					console.log(error);
				});
		},*/
	},
});
