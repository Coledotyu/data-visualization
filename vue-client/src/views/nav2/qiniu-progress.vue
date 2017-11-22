<script src="./qiniu-progress.js"></script>
<template>
  <section class="progress">
    <img class="img" v-show="fileUrl&&percent==null&&fileType=='image'" :height="height" :src="fileUrl||url">
    <div class="video" :style="{width: 2*height+'px', height: height+'px'}" v-if="fileUrl&&percent==null&&fileType=='video'" >
      视频链接：{{fileUrl||url}}
    </div>
    <el-progress v-if="percent!=null" :width="height" type="circle" class="progress"
                 :percentage="percent||0">
    </el-progress>
  </section>
</template>
<style lang="stylus" scoped>
  .progress {
    height: 100%;
    display: inline-block;
  }

  .img, .video, .audio {
    display:inline-block;
    word-wrap: word-wrap;
  }

  .video {
    word-break: break-all;
    margin-top: -10px;
  }

</style>
