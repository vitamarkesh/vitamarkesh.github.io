Vue.component('App', {
	template: `
	    <div>
			777
	    </div>
	`,
	props: [],
	data() {
		return {
			xxx: 'xxx',
		}
	},
	components: {
	},
	mixins: [
	],
	created() {
		this.url = 'https://vk.com/dev/photos.search';

		this.doSearch()
			.then(data => {
				console.log(data);
			})
			.catch(error => {
				console.log(error);
			});
	},
	computed: {},
	watch: {},
	methods: {
		async doSearch() {
			const response = await axios.get(this.url, {
				params: {
					q: 'Nature',
				}
			});
			return response.data;
		},
	},
});
