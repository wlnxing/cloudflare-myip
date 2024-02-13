# cloudflare-myip
Get my IP through cloudflare worker

## 部署

复制仓库里的index.js, 在cloudflare新建workers, 粘贴代码后部署既可快速使用
 > 默认的worker地址是被污染了的, 建议使用自己的域名

## 用法

1. 直接访问'/': 直接得到当前ip地址
2. 访问'/info': 当前ip地址的详细信息(由cloudflare提供)

## 进阶用法

### ipv4 ipv6隔离
 
> todo....

大概步骤: 

1. 关闭cloudflare的ipv6兼容
    
    cloudflare ipv6兼容, 导致打开cloudflare proxy时直接访问会被优先解析到ipv6上
    > 现在cloudflare在面板上强制打开了这个选项, 需要使用cloudflare api来关闭, 关键词: `cloudflare dns 关闭ipv6`


2. 分两个域名, 分别只解析A, AAAA, 解析地址为cloudflare的地址, **不要打开cloudflare proxy**