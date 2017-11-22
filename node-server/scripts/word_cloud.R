library(jiebaRD)
library(jiebaR)
library(wordcloud2)
library(sqldf)

# Args[6]:文件路径 Args[7]:词频云图 Args[8]:过滤词
Args <- commandArgs()
wk<-worker()
f<-scan(segment(Args[6], wk), sep="\n", what="", encoding="UTF-8")
df<-freq(wk[f])
df<-df[order(-df$freq),]
df<-sqldf(paste("select [char],[freq] from df where length([char])>1 and [char] not in", Args[8], "limit 300"))
df<-df[nchar(df$char)>1,]
htmlwidgets::saveWidget(wordcloud2(df, size=0.8), file = Args[7], selfcontained = FALSE)
