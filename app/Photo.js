Vue.component('Photo', {
	template: `
	    <div
	    	class="Photo"
	    	:style="bg"
	    	@mouseenter="onMouseEnter"
	    	@mouseleave="onMouseLeave"
	    >
			<button
	    		class="Photo__button"
				v-if="showButton"
	    		@click="onClick"
	    		v-text="buttonTitle"
			></button>
	    </div>
	`,
	props: [
		'id',
		'href',
		'buttonTitle',
	],
	data() {
		return {
			showButton: false,
		}
	},
	mixins: [],
	created() {},
	computed: {
		bg() {
			return `background-image: url(${this.href})`;
		}
	},
	watch: {},
	methods: {
		onClick() {
			this.$emit('click', this);
		},
		onMouseEnter() {
			this.showButton = true;
		},
		onMouseLeave() {
			this.showButton = false;
		},
	},
});
