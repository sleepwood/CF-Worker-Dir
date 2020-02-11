# CF-Worker-Dir

CF-Worker-Dir是一款适用于Cloudflare Worker平台上的云函数程序，可以使用它在一分钟内搭建属于自己的导航页面。CF-Worker-Dir提供丰富的自定义配置，同时它还可以预留了接口帮助你售出自己域名。如果你的域名还没有搭建网站，不如先利用CF-Worker-Dir让你的域名不再浪费。😉

### 演示地址

🎉[演示地址](http://gethe.best/)

### 系统安装

1. 在 [Cloudflare Worker](https://workers.cloudflare.com/) 管理页面创建一个新的 **Worker** 。
2. 在Worker编辑页面左边粘贴 `index.js` 中的代码。
3. 根据自身需要修改 `config` 的配置内容

## 系统配置

CF-Worker-Dir允许用户自定义导航页面，配置内容如下：
### title
自定义网站标题
### subtitle
自定义网站副标题
### logo_icon
选择网站logo icon 暂时只支持[semantic-ui icon](https://semantic-ui.com/elements/icon.html)
### selling_ads
是否要开启网址售卖广告
### sell_info
广告信息
> #### domain
> 当前域名
> #### price
> 价格
> ##### mon_unit
> 货币单位  [semantic-ui icon](https://semantic-ui.com/elements/icon.html#computers)
> ##### contact
> 联系方式
> >##### type
> >通讯工具icon ("weixin","qq","telegram plane","envelope" or "phone") 
> >##### type
> >号码/地址
### lists
网址信息
> #### name
> 网址类别
> #### icon
> 网址类别icon 暂时只支持[semantic-ui icon](https://semantic-ui.com/elements/icon.html)
> #### list
> 网址数组
> >##### url
> >网站url
> >##### name
> >网站名称
> >##### name
> >网站描述

### 配置例子
```
const config = {
  title: "自定义导航",                 //write your website title
  subtitle: "Cloudflare Workers Nav", //write your website subtitle
  logo_icon: "sitemap",               //select your logo by semantic-ui icon (you can get more msg in:https://semantic-ui.com/elements/icon.html)
  selling_ads: true,                  //Selling your domain or not.(turning on may be helpful for selling this domain by showing some ads.)
  sell_info:{
    domain:"example.com",
    price:500,                        //domain price
    mon_unit:"yen sign",              //monetary unit 
    contact:[                         //how to contact you
      {
        type:"envelope",               //contact type ("weixin","qq","telegram plane","envelope" or "phone")
        content:"info@example.com"
      }
    ]                        
  },
  lists: [                            //Url list
    {
      name:"技术",
      icon:"code",
      list:[
        {
          url:"https://oschina.net/",
          name:"开源中国",
          desc:"领先的中文开源技术社区"
        }
      ]
    }
  ]
}
```

## Licence

MIT
