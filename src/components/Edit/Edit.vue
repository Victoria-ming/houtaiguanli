<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>编辑</el-breadcrumb-item>
      <el-breadcrumb-item>文本编辑</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 富文本编辑 -->
    <div class="edit_container">
      <quill-editor
        v-model="content"
        ref="myQuillEditor"
        class="editer"
        :options="editorOption"
        @ready="onEditorReady($event)"
      ></quill-editor>
    </div>
    <div class="submit_btn">
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
// You can also register Quill modules in the component
import { quillEditor } from 'vue-quill-editor'

export default {
  data () {
    return {
      content: '<h3>文本编辑</h3>',
      editorOption: {}
    }
  },
  components: {
    quillEditor
  },
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  },
  methods: {
    onEditorReady (editor) {
      console.log('editor ready!', editor)
    },
    submit () {
      console.log(this.content)
      this.$message.success('提交成功！')
    }
  }
}
</script>
<style lang="less" scoped>
.edit_container {
  padding: 40px;
  margin-bottom: 40px;
}
.editer {
  height: 350px;
}
.submit_btn {
  text-align: center;
}
</style>
