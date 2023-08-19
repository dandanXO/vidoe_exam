import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useVideoInfo = defineStore('videoInfo',{
  state: () => ({
    forYouVideo: [],
	followVideo: []
  }),
	actions: {
		setForYouVideo(payload){
			console.log(payload)
			this.forYouVideo = payload
		},
		setFollowVideo(payload){
			console.log(payload)
			this.followVideo = payload
		}
	}
})
