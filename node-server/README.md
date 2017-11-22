接口地址以及说明
--------------

### 一 Install  A 或 B
```
# A 非docker场景下安装
安装: node.js v7.6.0 R v3.3.3 redis v3.2.3 mongodb v3.4.1 elasticsearch v5.3.0
elasticsearch 需要配置中文分词ik

# B docker场景下安装 

引用docker: node-rscript:1.0, 安装docker: redis mongodb elasticsearch

docker pull daocloud.io/baidao/node-rscript:1.0

docker run -p 6379:6379 -d daocloud.io/baidao/redis:latest
docker run -p 27017:27017 -d daocloud.io/baidao/mongodb:3.5
docker run -p 9200:9200 -d daocloud.io/baidao/elasticsearch:v1

docker ps

node app.js

```
#### 简单说明

```text
1) koa2 Node.js框架
2) mongodb 数据存储等
3) R 数据分析及可视化等
4) redis 数据缓存等
5) elasticsearch 数据搜索等
```

### 二、接口地址（待定）

* http://test-stock-api.baidao.com:3001/

### 三、开发部署

#### 阿里云
* 1 登录https://dashboard.daocloud.io/ 创建应用: quotation-admin-service
* 2 本地创建编辑Dockerfile、build.sh、gitlab-ci.yml文件
* 3 首次build执行: sh build.sh
* 4 登录测试服 创建并挂载项目目录
* 5 登录gitlab 在setting中配置CI 
* 6 测试: http://test-stock-api.baidao.com:8082/#/login
