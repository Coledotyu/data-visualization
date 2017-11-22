<script src="./qiniu-upload.js"></script>
<template>
  <span :id="'container' + uuid" class="container" :style="{height: height+'px'}">
    <qiniu-progress class="progress" v-if="showProgress" :fileUrl="fileIcon" :qiniu-btn="getQiniuBtn" :height="height-(16+1)*2" :fileType="fileType"
    ></qiniu-progress>
    <button class="right-area" :class="{disable: isDisabled, ml: fileIcon}" :id="'pickfiles'+uuid" :disabled="isDisabled" ref="abc">
      <i class="el-icon-upload space-bottom"></i>
      <el-button size='small' :disabled="isDisabled" class="vtop">
        <i class="glyphicon glyphicon-plus"></i>
        <span class="label">{{text}}</span>
      </el-button>
    </button>

  </span>
</template>
<style lang="stylus" scoped>
.container {
  height: 100%;
  display: inline-block;
  border: 1px dashed #d9d9d9;
  box-sizing: border-box;
  padding: 16px; //注意： 改变该值也要改变 :width 的值
  color: #97a8be
}
.progress {
  height: 100%;
  vertical-align: top;
}

.right-area {
  vertical-align: top;
  display: inline-block;
  cursor: pointer;
  outline: none;
}

.ml{
  margin-left: 16px
}

.disable {
  cursor: not-allowed;
}

.el-icon-upload {
  display: block;
  font-size: 50px;
}

.label {
  color:#97a8be;
}
.space-bottom {
  margin-bottom: 6px;
}
</style>
