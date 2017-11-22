## library(devtools)
## install_github('lchiffon/REmap')

## 导入REmap包
library(REmap)

get_city_coord("Shanghai")
set.seed(125)
origin = rep("北京",10)
city_destination = c('上海','广州','大连','南宁','南昌', '拉萨','长春','包头','重庆','常州')
start_end = data.frame(origin, city_destination)
out_data = remap(start_end, title = "REmap迁徙图", subtitle = "theme:Dark")
plot(out_data)
