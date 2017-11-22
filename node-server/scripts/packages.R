# 更换源
local({
  r <- getOption("repos")
  r["CRAN"] <- "http://mirrors.tuna.tsinghua.edu.cn/CRAN/"
  options(repos=r)
})
install.packages('jiebaR')
install.packages('sqldf')
install.packages('wordcloud2')
