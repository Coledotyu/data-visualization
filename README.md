### 数据可视化几种方案

```
  数据可视化是经过图形化手段将数据展示出来，以下是几种常用数据可视化方案。
```
#### 一、Superset可视化

* Superset搭建(推荐docker)

```
docker pull amancevice/caravel

docker run -d -p 8088:8088 --name superset amancevice/caravel:latest

docker exec -it superset demo // 设置管理员
Username [admin]: amdin
User first name [admin]: admin
User last name [user]: admin
Email [admin@fab.org]: zq_sdk@163.com
Password: 
Repeat for confirmation:
```

![image](https://github.com/TIME-GATE/data-visualization/blob/master/vue-client/static/images/superset-login.png)
![image](https://github.com/TIME-GATE/data-visualization/blob/master/vue-client/static/images/superset-main.png)
![image](https://github.com/TIME-GATE/data-visualization/blob/master/vue-client/static/images/superset-sql-editor.png)
![image](https://github.com/TIME-GATE/data-visualization/blob/master/vue-client/static/images/superset-query-results.png)
![image](https://github.com/TIME-GATE/data-visualization/blob/master/vue-client/vue-admin/static/images/superset-directed-forced-layout.png)
![image](https://github.com/TIME-GATE/data-visualization/blob/master/vue-client/static/images/superset-sankey.png)

### 二、Echarts可视化

* vue + Echarts 搭建可视化


```
git clone https://github.com/TIME-GATE/data-visualization.git

cd data-visualization/node-server && npm install
npm run start

cd data-visualization/vue-client && npm install
npm run dev
```

![image](https://github.com/TIME-GATE/data-visualization/blob/master/vue-client/static/images/vue-admin-login.png)
![image](https://github.com/TIME-GATE/data-visualization/blob/master/vue-client/static/images/vue-admin-main.png)
![image](https://github.com/TIME-GATE/data-visualization/blob/master/vue-client/static/images/vue-admin-cloud.png)
![image](https://github.com/TIME-GATE/data-visualization/blob/master/vue-client/static/images/vue-admin-views.png)
### 三、R可视化

### 各方案对比

```
1、superset可视化开源免费，普通可视化需求基本可以实现零配置，直接查表即可，但支持数据库有限，不能通过接口形式可视化，自由定制程度低
2、vue + echarts可以实现各种形式数据可视化，无论功能和性能远高于superset，但是需要前后端开发，成本比较大。
3、R可视化方式对统计人员非常方便，可以直接做统计分析和机器学习模型训练，并实时生成各种模型图，但不方便自动化集成等
```
