<script>
import { following } from "@/request/api";
import { onMounted, ref, reactive } from "vue";
import { onBeforeRouteLeave } from 'vue-router'
import { useVideoInfo } from '@/stores/videoInfo'


export default {
  setup() {
    const videoInfo = useVideoInfo()
    const urlData = ref([])
    const name = ref('')
    // 判斷是否真的有切換演片  pre index
    const preVideIndex = ref('')
    // 當前 影片index
    const currentVideIndex = ref(0)
    const videoPlayerInstance = ref([])
    const playerOptions = reactive({
        autoplay: false, //如果true,瀏覽器準備好時開始回放。
        muted: true, // 默認情況下將會消除任何音頻。
        loop: true, // 導緻視頻一結束就重新開始。
        preload: "auto", // 建議瀏覽器在<video>加載元素後是否應該開始下載視頻數據。auto瀏覽器選擇最佳行為,立即開始加載視頻（如果瀏覽器支持）
        language: "zh-CN",
        // poster:"http://192.168.172.227:3000/images/Toyota_Camry_XV70.png",
        aspectRatio: `${document.documentElement.clientWidth}:${document.documentElement.clientHeight}`, // 將播放器置於流暢模式，並在計算播放器的動態大小時使用該值。值應該代錶一個比例 - 用冒號分隔的兩個數字（例如"16:9"或"4:3"）
        fluid: true,
        fill: true,
        // sources: [{ type: "application/x-mpegURL", src: "http://192.168.172.227:3000/media/Rolls_Royce_Ghost.m3u8" , withCredentials: false}],
        width: document.documentElement.clientWidth,
        notSupportedMessage: "此視頻暫無法播放，請稍後再試", //允許覆蓋Video.js無法播放媒體源時顯示的默認信息。
        controls: true,
        disablePictureInPicture: true,
        controlBar: {
          timeDivider: false, // 分時
          durationDisplay: false, // 持續時間顯示
          remainingTimeDisplay: false, // 剩餘時間顯示
          fullscreenToggle: false, //全屏按鈕
          playToggle: false,
          currentTimeDisplay: false,
        },
      },)
      const onDragStart = (swipeItem)=>{
        preVideIndex.value = urlData.value[currentVideIndex.value].title
        for( let i= 0;i<videoPlayerInstance.value.length; i++){
            if(videoPlayerInstance.value[i].player.id() === urlData.value[currentVideIndex.value].title){
              // 滑動時當前的暫停
              videoPlayerInstance.value[i].player.pause()
              // 顯示cover
              // 前一 當前 後一都要顯示 cover              
              urlData.value[currentVideIndex.value].showPosterImage = true
              // 檢查超出 問題 cover顯示
              console.log((currentVideIndex.value + 1 < videoPlayerInstance.value.length) , (currentVideIndex.value -1  >= 0))
              if((currentVideIndex.value + 1 < videoPlayerInstance.value.length)){
                urlData.value[currentVideIndex.value+1].showPosterImage = true
                urlData.value[videoPlayerInstance.value.length-1].showPosterImage = true
              } else if((currentVideIndex.value -1  >= 0)){
                urlData.value[currentVideIndex.value-1].showPosterImage = true
              }
              // 第一個最後一個 直接上cover
              urlData.value[videoPlayerInstance.value.length-1].showPosterImage = true
              urlData.value[0].showPosterImage = true
              break
            }
          }
      }
      const onDragEnd = (swipeItem)=>{
        console.log(swipeItem.index)
        for( let i= 0;i<videoPlayerInstance.value.length; i++){
            if(videoPlayerInstance.value[i].player.id() === urlData.value[swipeItem.index].title){
              // 沒滑成功繼續播
              videoPlayerInstance.value[i].player.play()
              videoPlayerInstance.value[i].player.posterImage.show()
              // 不顯示cover
              urlData.value[currentVideIndex.value].showPosterImage = false
              break
            }
          }
      }
      const onChange = (itemIndex)=>{
        if (currentVideIndex.value < urlData.value.length - 1) {
          currentVideIndex.value = itemIndex
          name.value = urlData.value[currentVideIndex.value].title;
          // 成功變幻時進行播放
          for( let i= 0;i<videoPlayerInstance.value.length; i++){
            if(videoPlayerInstance.value[i].player.id() === urlData.value[currentVideIndex.value].title){
              // 滑動時當前的暫停
              videoPlayerInstance.value[i].player.play()
              break
            }
          }
          // playerOptions.sources[0].src = urlData.value[currentVideIndex.value].play_url
        }else {
          currentVideIndex.value = itemIndex
          following().then(res=>{
            urlData.value = res.items
            name.value = res.items[0].title
            // 成功變幻時進行播放
            for( let i= 0;i<videoPlayerInstance.value.length; i++){
              if(videoPlayerInstance.value[i].player.id() === urlData.value[currentVideIndex.value].title){
                // 滑動時當前的暫停
                videoPlayerInstance.value[i].player.play()
                break
              }
            }
          })
        }
        preVideIndex.value = urlData.value[currentVideIndex.value].title
      }
      const playerMounted = (instance)=>{
        if(!(videoPlayerInstance.value.find(item=>{
            return item.player?.id == instance.playToggle?.id
          }))
        ){
          videoPlayerInstance.value.push(instance)
        }
        // 播放當前的
        for( let i= 0;i<videoPlayerInstance.value.length; i++){
          //比對如果看過 要記住時間並送回去
            videoInfo.followVideo.map(preVideo=>{
              if(preVideo.player.id() == videoPlayerInstance.value[i].player.id()){
                console.log('in', preVideo.player.id())
                videoPlayerInstance.value[i].player.currentTime(preVideo.state.currentTime)
              }
            })
            if(videoPlayerInstance.value[i].player.id() === urlData.value[currentVideIndex.value].title){
              // 滑動時當前的 播放
              videoPlayerInstance.value[i].player.play()
            }
          }
      }
    onMounted(()=>{
      // 取得清單以及比對如果看過 要記住時間
      following().then(res=>{
        res.items = res.items.map(item=>{
          item.showPosterImage = false
          return item
        })
        urlData.value = res.items
        name.value = res.items[0].title
        preVideIndex.value =  res.items[0].title
      })
    })
    onBeforeRouteLeave((to, from)=>{
      // 記錄離開時的時間
      videoInfo.setFollowVideo(videoPlayerInstance.value)
    })
    // expose to template and other options API hooks
    return {
      urlData,
      playerOptions,
      name,
      currentVideIndex,
      videoPlayerInstance,
      onDragEnd,
      onDragStart,
      onChange,
      playerMounted
    }
  },
}

</script>

<template>
  
  <div class="home">
    <van-swipe
      ref="vantSwip"
      style="height: 100vh"
      vertical
      @change="onChange"
      @drag-start="onDragStart"
      @drag-end="onDragEnd"
      :show-indicators="false"
    >
    <van-swipe-item v-for="(vidoe, index) in urlData" :key="vidoe.title" >
      <div class="main">
          <div class="posterImage" v-if="vidoe.showPosterImage">
            <img :src="vidoe.cover" style="width: 100%;height: 100%;">
          </div>
          <video-player
            @mounted="playerMounted"
            class="video-player vjs-custom-skin"
            ref="videoPlayer"
            :id="vidoe.title"
            :src="vidoe.play_url"
            :poster="vidoe.cover"
            :playsinline="true"
            :options="playerOptions"
          ></video-player>
        <div class="footbox">
          <div class="foot">
            <p class="name">{{ name }}!!{{ index }}!!{{ currentVideIndex }}</p>
          </div>
        </div>
      </div>
    </van-swipe-item>
    </van-swipe>
  </div>
</template>

<style lang="less" scoped>
/deep/.vjs-big-play-button {
  display: none;
}
/deep/ .video-player{
  margin: 0px;
}
.main {
  height: 100%;
}
.posterImage{
  height: 100vh;
  width: 100vw;
  z-index: 10;
  position:absolute;
}
.footbox {
  position: relative;
  bottom: 3.6rem;
  width: 95%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.user {
  font-size: 14px;
}
.user,
.name {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.foot {
  width: 80%;
  color: #fff;
  font-size: 16px;
  z-index: 10001;
}
.pl {
  width: 10%;
  color: #fff;
  font-size: 16px;
  z-index: 10001;
}

</style>
