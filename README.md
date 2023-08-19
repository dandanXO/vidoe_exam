# video

底下一些基本操作

## 注意事項
`api.js` 檔案中 因為開發作業方便ip需要再自行更換

![test](https://i.imgur.com/MVnRxcy.png)

## Cheked list

- [x] 前端框架 Vue / React，(Vue / React 版本不限定，其他前端框架暫時不考慮)

- [x] 可使用 JavaScript / TypeScript

- [x] 可以使用任何 UI Framework，純手做也可

- [x] 只需製作 WAP版本(Mobile Device)，可以忽略RWD設計

- [x] 影片播放部分需有進度條(Progress Bar)，並可拖曳播放進度

- [x] 可參考抖音APP 樣式

- [x] 檢核只採用iPhone XR(414x896)解析度

- [x] Following / For You 切換暫停(切換回去要從離開的進度繼續播放)

- [x] 過場圖片 遮罩(封面圖) 功能，如影片所示意 https://imgur.com/a/IXuQz4j


## 加分題答案 
如果影片想要設計試看功能，請問怎麼設計比較好？
舉例 一個影片長30mins，但試看只能看前5mins

以我想法通常是需要搭配後端驗證 如果這個帳號請求影片列表有1 2 3 

3部影 其中只有購買一部兩部未購買

未購買`respons`傳送來的 m3u8 url 只給五分鐘ts切片播放即可

已購賣則是完整的 m3u8 url ts切片

假如有api可以用id查詢影片詳細資料就是在查詢時後端驗證此人的帳號狀態返回正確的詳細資料，不讓原片又洩漏風險。


## 小記
有些 路由keep alive 
ui動畫

就沒有去做了
## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
