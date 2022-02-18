<template>
  <el-row class="home-content" :gutter="20">
    <!-- 左侧部分 -->
    <el-col :span="8">
      <!-- 个人信息部分 -->
      <div class="home-info">
        <el-card>
          <div class="user-infoBox">
            <img :src="imgSrc" class="image" />
            <div class="user-info">
              <p>Oscar</p>
              <span>超级管理员</span>
            </div>
          </div>
          <el-divider></el-divider>
          <div class="user-loginInfo">
            <el-descriptions
              class="margin-top"
              title=""
              :column="1"
              :size="size"
            >
              <el-descriptions-item label="上次登录时间"
                >2021-02-18</el-descriptions-item
              >
              <el-descriptions-item label="上次登录地点">
                <el-tag size="small">学校</el-tag>
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </el-card>
      </div>
      <!-- 表格部分 -->
      <div class="home-data">
        <el-card class="box-card">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column
              v-for="(item, index) in tableTab"
              :key="index"
              :prop="index"
              :label="item"
            >
            </el-table-column>
          </el-table>
        </el-card>
      </div>
    </el-col>
    <!-- 右侧部分 -->
    <el-col :span="16">
      <div class="home-other">
        
      </div> 
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      // 头像url
      imgSrc: require('../../assets/images/user.png'),
      loginTime: new Date(),
      tableTab: {
        name: '课程',
        todayBuy: '今日购买',
        totalBuy: '总购买',
        monthBuy: '本月购买',
      },
      tableData: [
        {
          name: 'oppo',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: 'vivo',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: '苹果',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: '小米',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: '三星',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: '魅族',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.home-content {
  .home-info {
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 0 10px #888;
    .user-infoBox {
      display: flex;

      .image {
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
      .user-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 2em;
        p {
          font-size: 2em;
          margin-bottom: 0.3em;
        }
        span {
          font-size: 1em;
          color: #999;
        }
      }
    }
  }
  .home-data {
    margin-top: 1em;
    box-shadow: 0 0 10px #888;
  }
  .home-other {
    background-color: yellowgreen;
  }
}
</style>
