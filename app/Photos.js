Vue.component('Photos', {
	template: `
	    <div class="Photos">
			
			<div class="Photos__row">
				<input
					v-model="query"
					 class="Photos__input"
				/>
				<div class="Photos__favouriteTitleCont">
					<span class="Photos__favouriteTitle">Избранные</span>
				</div>
			</div>
			
			<div class="Photos__row">
				<div class="Photos__resultPhotos">
					<Photo
							v-for="photo in resultPhotos"
							:id="photo.id"
							:href="photo.href"
							:key="photo.id"
							@click="doAddPhotoInFavourites"
							buttonTitle="в избранные"
					/>
				</div>
				
				<div class="Photos__favouritePhotos">
					<Photo
							v-for="photo in favouritePhotos"
							:id="photo.id"
							:href="photo.href"
							:key="photo.id"
							@click="doDeletePhotoInFavourites"
							buttonTitle="удалить"
					/>
				</div>
			</div>
			
	    </div>
	`,
	props: [],
	data() {
		return {
			query: '',
			resultPhotos: [],
			favouritePhotos: {},
		}
	},
	mixins: [
	],
	created() {
		this.minLengthQuery = this.$root.minLengthQuery;
		this.maxCountPhotos = this.$root.maxCountPhotos;
		this.debug = this.$root.debug;
		this.v_api = this.$root.vk.v_api;
		this.sizeType = 'r'; // 510
		this.debouncPeriod = 300;
		this.doDebouncedQuery = _.debounce(this.doQuery, this.debouncPeriod);
	},
	computed: {},
	watch: {
		query() {
			if (this.query.length >= this.minLengthQuery) {
				this.doDebouncedQuery();
			}
		}
	},
	methods: {
		doQuery() {
			this.doSearch()
				.then(photos => {
					this.resultPhotos = photos;
				})
				.catch(error => {
					console.error(error);
				});
		},
		doAddPhotoInFavourites(photo) {
			this.$set(this.favouritePhotos, photo.id, photo);
		},
		doDeletePhotoInFavourites(photo) {
			this.$delete(this.favouritePhotos, photo.id);
		},
		doSearch() {
			return new Promise((resolve, reject) => {
				if (!this.debug) {
					VK.Api.call(
						'photos.search',
						{
							q: this.query,
							count: this.maxCountPhotos,
							v: this.v_api,
						}, r => {
							if (!r.error) {
								const photos = r.response.items
									.map(this.item2photo)
									.filter(photo => photo.href);
								resolve(photos);
							} else {
								reject(new Error(r.error.error_msg));
							}
						});
				} else {
					resolve(this.getDebugResults().map(this.item2photo));
				}
			});
		},
		getHref(sizes) {
			const sizeR = _.find(sizes, {
				'type': this.sizeType
			});
			if (!sizeR) throw new Error('Отсутствует размер '+this.sizeType);
			return sizeR.url;
		},
		item2photo(item) {
			if (!this.debug) {
				let href;
				try {
					href = this.getHref(item.sizes);
				} catch (error) {
					console.error(error.message);
				}
				return {
					id: item.id,
					href: href,
				};
			} else {
				return {
					id: item.id,
					href: item.photo_604,
				};
			}
		},
		getDebugResults() {
			return [{
				"id":363464848,"album_id":-6,"owner_id":65056617,"photo_75":"https://pp.vk.me/c614825/v614825345/3672/mR_9By_IT9o.jpg","photo_130":"https://pp.vk.me/c614825/v614825345/3673/b_M63SxBEVo.jpg","photo_604":"https://pp.vk.me/c614825/v614825345/3674/Lsqt2qs8SYI.jpg","photo_807":"https://pp.vk.me/c614825/v614825345/3675/umc1xwq9M-g.jpg","photo_1280":"https://pp.vk.me/c614825/v614825345/3676/ACo0Gf8sBC4.jpg","width":1280,"height":960,"text":"","date":1429623443,"lat":29.954948,"long":29.838876,"post_id":240
			},{
				"id":360453137,"album_id":-7,"owner_id":299697617,"photo_75":"https://pp.vk.me/c624824/v624824617/2e9ec/eTgX6G2_0Zo.jpg","photo_130":"https://pp.vk.me/c624824/v624824617/2e9ed/-clRkZNS0ug.jpg","photo_604":"https://pp.vk.me/c624824/v624824617/2e9ee/KCuPxhBMoWc.jpg","photo_807":"https://pp.vk.me/c624824/v624824617/2e9ef/ZoE79xBmeZI.jpg","photo_1280":"https://pp.vk.me/c624824/v624824617/2e9f0/LGL694rxsbE.jpg","width":960,"height":720,"text":"","date":1429028169,"lat":30.002294,"long":30.154188
			},{
				"id":351812809,"album_id":114960642,"owner_id":82558703,"photo_75":"https://pp.vk.me/c625631/v625631703/1549b/Lxa6jyaGfT8.jpg","photo_130":"https://pp.vk.me/c625631/v625631703/1549c/gHTlf3n0DmY.jpg","photo_604":"https://pp.vk.me/c625631/v625631703/1549d/k4me3yJO4ps.jpg","photo_807":"https://pp.vk.me/c625631/v625631703/1549e/0NmSombRmOA.jpg","photo_1280":"https://pp.vk.me/c625631/v625631703/1549f/ulT-kxBKuyc.jpg","width":960,"height":882,"text":"","date":1421921710,"lat":29.941856,"long":30.058600
			},{
				"id":343907753,"album_id":206356712,"owner_id":128004123,"photo_75":"https://pp.vk.me/c618125/v618125123/24a85/7TarfSjfa3g.jpg","photo_130":"https://pp.vk.me/c618125/v618125123/24a86/0nlVJc4wnAs.jpg","photo_604":"https://pp.vk.me/c618125/v618125123/24a87/q9sKT4radus.jpg","photo_807":"https://pp.vk.me/c618125/v618125123/24a88/R4XmpspyITk.jpg","photo_1280":"https://pp.vk.me/c618125/v618125123/24a89/6e7_rwryJ9s.jpg","photo_2560":"https://pp.vk.me/c618125/v618125123/24a8a/IOCfWEVW_Ao.jpg","width":2560,"height":1707,"text":"","date":1416505311,"lat":29.999996,"long":29.999997
			},{
				"id":347850650,"album_id":-6,"owner_id":196866116,"photo_75":"https://pp.vk.me/c618723/v618723116/26558/-z-sEWXkg8I.jpg","photo_130":"https://pp.vk.me/c618723/v618723116/26559/TvnY4jKP0p0.jpg","photo_604":"https://pp.vk.me/c618723/v618723116/2655a/agXPpuNfPnA.jpg","photo_807":"https://pp.vk.me/c618723/v618723116/2655b/MntFvqCaHpk.jpg","photo_1280":"https://pp.vk.me/c618723/v618723116/2655c/mne08hKmbwA.jpg","photo_2560":"https://pp.vk.me/c618723/v618723116/2655d/ASKYFNmEmxE.jpg","width":1620,"height":1080,"text":"","date":1416422583,"lat":30.045335,"long":30.058591,"post_id":962
			},{
				"id":335994366,"album_id":-7,"owner_id":-45732347,"user_id":100,"photo_75":"https://pp.vk.me/c620419/v620419449/12c06/BqaXR1eVeqY.jpg","photo_130":"https://pp.vk.me/c620419/v620419449/12c07/Oy22_Zc5f8U.jpg","photo_604":"https://pp.vk.me/c620419/v620419449/12c08/XIyG2HKt4Ck.jpg","photo_807":"https://pp.vk.me/c620419/v620419449/12c09/kbWamN9DbvQ.jpg","photo_1280":"https://pp.vk.me/c620419/v620419449/12c0a/95VDCXWjwkY.jpg","width":1024,"height":771,"text":"","date":1408271287,"lat":29.999996,"long":29.999997
			},{
				"id":326991086,"album_id":-6,"owner_id":249390767,"photo_75":"https://pp.vk.me/c605216/v605216767/5336/XeqYTC3wgwo.jpg","photo_130":"https://pp.vk.me/c605216/v605216767/5337/IdbmUgGaoys.jpg","photo_604":"https://pp.vk.me/c605216/v605216767/5338/6wIHGv9_xZ8.jpg","width":403,"height":336,"text":"","date":1396601780,"lat":29.942251,"long":29.882819,"post_id":1
			},{
				"id":307717585,"album_id":-6,"owner_id":177543463,"photo_75":"https://pp.vk.me/c313216/v313216463/2314/i1zs3SFqH4M.jpg","photo_130":"https://pp.vk.me/c313216/v313216463/2315/dHMAvfcAlCo.jpg","photo_604":"https://pp.vk.me/c313216/v313216463/2316/4k4IxSfFDrQ.jpg","photo_807":"https://pp.vk.me/c313216/v313216463/2317/L4cnXzWG8ag.jpg","photo_1280":"https://pp.vk.me/c313216/v313216463/2318/zFZpMiD5Rcw.jpg","photo_2560":"https://pp.vk.me/c313216/v313216463/2319/ieEhseI9ng4.jpg","width":2560,"height":1920,"text":"","date":1375634448,"lat":30.040577,"long":29.882820,"post_id":15
			},{
				"id":305242969,"album_id":-7,"owner_id":63374584,"photo_75":"https://pp.vk.me/c417730/v417730584/5cf6/9cmb9dg-8X0.jpg","photo_130":"https://pp.vk.me/c417730/v417730584/5cf7/LNVM6Z1BxDE.jpg","photo_604":"https://pp.vk.me/c417730/v417730584/5cf8/MhHMGLSHTW0.jpg","photo_807":"https://pp.vk.me/c417730/v417730584/5cf9/0mq5dtLx4eM.jpg","photo_1280":"https://pp.vk.me/c417730/v417730584/5cfa/zan8aLM4fb4.jpg","photo_2560":"https://pp.vk.me/c417730/v417730584/5cfb/ab8QyYkUMSE.jpg","width":960,"height":1280,"text":"","date":1370411279,"lat":29.993004,"long":30.058592
			},{
				"id":293275039,"album_id":-7,"owner_id":151139196,"photo_75":"https://pp.vk.me/c417928/v417928196/9b7/Sjr4UbJAWZw.jpg","photo_130":"https://pp.vk.me/c417928/v417928196/9b8/B1OlZ44jBAo.jpg","photo_604":"https://pp.vk.me/c417928/v417928196/9b9/JR2VMtlpGsE.jpg","photo_807":"https://pp.vk.me/c417928/v417928196/9ba/rFb6EjSJWKA.jpg","photo_1280":"https://pp.vk.me/c417928/v417928196/9bb/hZQnKFl04dY.jpg","width":1280,"height":960,"text":"","date":1353933238,"lat":29.916863,"long":29.970696
			},{
				"id":292008486,"album_id":-6,"owner_id":189727131,"photo_75":"https://pp.vk.me/c304314/v304314131/4db0/G4Uv-NH56MQ.jpg","photo_130":"https://pp.vk.me/c304314/v304314131/4db1/wI0TjrVZvqM.jpg","photo_604":"https://pp.vk.me/c304314/v304314131/4db2/jOuGREtXCGg.jpg","width":604,"height":453,"text":"","date":1353002842,"lat":29.993012,"long":29.970705,"post_id":2
			},{
				"id":288226020,"album_id":-6,"owner_id":63668179,"photo_75":"https://pp.vk.me/c305908/v305908179/2854/rq3jUfgBsS8.jpg","photo_130":"https://pp.vk.me/c305908/v305908179/2855/SVNqaIu_Hjg.jpg","photo_604":"https://pp.vk.me/c305908/v305908179/2856/14wHbZ40nlI.jpg","photo_807":"https://pp.vk.me/c305908/v305908179/2857/o6mAjuFe9tU.jpg","photo_1280":"https://pp.vk.me/c305908/v305908179/2858/v-1fZ5tz7Cc.jpg","photo_2560":"https://pp.vk.me/c305908/v305908179/2859/anYZFCrIeTQ.jpg","width":2560,"height":1707,"text":"","date":1345648641,"lat":29.993012,"long":29.970705,"post_id":442
			},{
				"id":276164148,"album_id":-6,"owner_id":5279543,"photo_75":"https://pp.vk.me/c11471/u5279543/-6/s_bcff17de.jpg","photo_130":"https://pp.vk.me/c11471/u5279543/-6/m_2153af27.jpg","photo_604":"https://pp.vk.me/c11471/u5279543/-6/x_68120077.jpg","photo_807":"https://pp.vk.me/c11471/u5279543/-6/y_8330b4c2.jpg","photo_1280":"https://pp.vk.me/c11471/u5279543/-6/z_f5102717.jpg","photo_2560":"https://pp.vk.me/c11471/u5279543/-6/w_c5cb5a89.jpg","text":"","date":1326289442,"lat":30.031067,"long":30.102541,"post_id":660
			},{
				"id":114421167,"album_id":33645547,"owner_id":5178736,"photo_75":"https://pp.vk.me/c1423/u5178736/33645547/s_adcf7306.jpg","photo_130":"https://pp.vk.me/c1423/u5178736/33645547/m_92e55fc5.jpg","photo_604":"https://pp.vk.me/c1423/u5178736/33645547/x_98c4cb32.jpg","text":"","date":1215298055,"lat":30.088115,"long":29.948728
			}];
		},
	},
});
