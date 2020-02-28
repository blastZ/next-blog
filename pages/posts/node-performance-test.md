# Node 性能测试

## 1.压力测试

使用 ab（Apache Bench）进行单核压测，常用的参数如下：

- -c（concurrency） 指定并发请求的数量
- -n（request number） 指定总共请求的数量
- -H（header） 添加自定义的请求头
- -m（request method） 指定请求的类型
- -t（timelimit）指定一次测试持续的时间（s），内部隐式添加了 -n 50000

我们以测试
