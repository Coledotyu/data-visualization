### 数据可视化方案

```
    数据可视化是经图形化手段将数据展示出来，依据数据及其内在模式和关系，利用计算机生成的图像来获得深入认识和知识，并起到帮助产
品改进、运营监控等目的，可视化方案多种多样，如plotly、Gephi、R ggplot2等，以下介绍三种常用数据可视化工具。
```

---

#### 一、Superset

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
* 登录页面
![image](https://github.com/TIME-GATE/data-visualization/blob/master/vue-client/static/images/superset-login.png)
* 主页面
![image](https://github.com/TIME-GATE/data-visualization/blob/master/vue-client/static/images/superset-main.png)
* 查询数据 & 可视化
![image](https://github.com/TIME-GATE/data-visualization/blob/master/vue-client/static/images/superset-sql-editor.png)
* 查看数据结果
![image](https://github.com/TIME-GATE/data-visualization/blob/master/vue-client/static/images/superset-query-results.png)
* 力导向图
![image](https://github.com/TIME-GATE/data-visualization/blob/master/vue-client/static/images/superset-directed-forced-layout.png)
* 桑基图
![image](https://github.com/TIME-GATE/data-visualization/blob/master/vue-client/static/images/superset-sankey.png)

---

### 二、Echarts

* vue + Echarts 搭建可视化


```
git clone https://github.com/TIME-GATE/data-visualization.git

cd data-visualization/node-server && npm install
npm run start

cd data-visualization/vue-client && npm install
npm run dev
```
* 登录页面
![image](https://github.com/TIME-GATE/data-visualization/blob/master/vue-client/static/images/vue-admin-login.png)
* 主页面
![image](https://github.com/TIME-GATE/data-visualization/blob/master/vue-client/static/images/vue-admin-main.png)
* 词云图
![image](https://github.com/TIME-GATE/data-visualization/blob/master/vue-client/static/images/vue-admin-cloud.png)
* 各种图表展示
![image](https://github.com/TIME-GATE/data-visualization/blob/master/vue-client/static/images/vue-admin-views.png)

---

### 三、R可视化

```
cd R-GUI

Rsript cloud.R
Rsript cluster.R
Rsript Emap.R
```
* 词云图
![image](https://github.com/TIME-GATE/data-visualization/blob/master/vue-client/static/images/R-cloud.png)
* 聚类分析
![image](https://github.com/TIME-GATE/data-visualization/blob/master/vue-client/static/images/R-cluster.png)
* 迁徙图
![image](https://github.com/TIME-GATE/data-visualization/blob/master/vue-client/static/images/R-Emap.png)

---

### 四、各方案对比

```
1、superset开源免费，直接查表即可实现普通可视化，但支持数据库有限，不能通过接口形式可视化数据，自由定制程度低
2、vue + echarts可以实现各种形式数据可视化，无论功能和性能皆可高于superset，但需要前后端配合开发，成本略大。
3、R可视化方式对统计人员非常方便，可以直接做统计分析和机器学习模型训练，并实时生成各种模型图，但不方便自动化集成
```
---

### 五、参考

* [superset](https://superset.incubator.apache.org/)
* [R官网](https://www.r-project.org/)
* [cran](https://cran.r-project.org/mirrors.html)
