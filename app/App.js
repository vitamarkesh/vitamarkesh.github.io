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
		this.app_url = this.$root.app_url;
		this.vk = this.$root.vk;
		this.debug = this.$root.debug;
		this.connected = this.debug;

		// https://vk.com/dev/openapi
		VK.init({
			apiId: this.vk.client_id,
		});
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
	},
});
