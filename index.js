/**
 *  自定义网站配置 
 */
const config = {
  title: "自定义导航",                 //write your website title
  subtitle: "Cloudflare Workers Dir", //write your website subtitle
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
          desc:"程序员集散地"
        },
        {
          url:"https://v2ex.com",
          name:"V2EX",
          desc:"程序员集散地"
        },
        {
          url:"https://csdn.net/",
          name:"CSDN技术社区",
          desc:"程序员集散地"
        },
        {
          url:"https://github.com/",
          name:"Github",
          desc:"程序员集散地"
        },
      ]
    },
    {
      name:"学习",
      icon:"graduation cap",
      list:[
        {
          url:"https://w3school.com.cn/",
          name:"W3school在线教程",
          desc:"程序员集散地"
        },
        {
          url:"https://runoob.com/",
          name:"菜鸟教程",
          desc:"程序员集散地"
        },
        {
          url:"https://segmentfault.com/",
          name:"思否社区",
          desc:"程序员集散地"
        },
        {
          url:"https://jianshu.com/",
          name:"简书",
          desc:"程序员集散地"
        },
      ]
    }
  ]
}

function renderLists() {
  let main = "";
  config.lists.forEach(item => {
    let divider = '<h4 class="ui horizontal divider header"><i class="'+ item.icon +' icon"></i> '+ item.name +' </h4>';
    let content = "";
    item.list.forEach(link => {
      let card = '<a class="card" href="'+ link.url +'" target="_blank"><div class="content"><img class="left floated mini ui image" src="'+ getFavicon(link.url) +'" /><div class="header">'+ link.name +'</div><div class="meta">'+ link.desc +'</div></div></a>';
      content = content.concat(card);
    });
    main = main.concat(divider,'<div class="ui four stackable cards">', content,'</div>');
  });
  
  return main;
}

function renderSeller(info) {
  let contact = "";
  info.contact.forEach(item => {
    let tmp = '<div class="item"><i class="'+item.type +' icon"></i><div class="content">'+ item.content +' </div></div>';
    contact = contact.concat(tmp);
  });

  return `
  <div id="seller" class="ui basic modal">
    <h1 class="ui yellow dividing header">
      <i class="gem outline icon"></i>
      <div class="content">${info.domain} 正在出售</div>
    </h1>
    <div class="content">
      <div class="ui basic segment">
        <div class="ui two column stackable center aligned grid">
          <div class="ui inverted vertical divider">感兴趣？</div>
          <div class="middle aligned row">
            <div class="column">
              <div class="ui large yellow statistic">
                <div class="value"><i class="${info.mon_unit} icon"></i> ${info.price} </div>
              </div>
            </div>
            <div class="column">
              <h3 class="ui center aligned icon inverted header"><i class="circular envelope open outline grey inverted icon"></i> 联系我 </h3>
              <div class="ui relaxed celled large list">
                ${contact}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="actions">
      <div class="ui basic cancel inverted button">
        <i class="reply icon"></i>
        返回
      </div>
    </div>
  </div>
  `
}

/*通过分析链接 实时获取favicon
* @url 需要分析的Url地址
*/
function getFavicon(url){
  if(url.match(/https{0,1}:\/\//)){
    return "https://ui-avatars.com/api/?bold=true&size=36&background=0D8ABC&color=fff&rounded=true&name=" + url.split('//')[1];
  }else{
    return "https://ui-avatars.com/api/?bold=true&size=36&background=0D8ABC&color=fff&rounded=true&name=" + url;
  }
  
}

async function handleRequest(request) {
  const init = {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
    },
  }
  return new Response(renderHTML(renderLists(),config.selling_ads? renderSeller(config.sell_info) :null,config), init);
}
addEventListener('fetch', event => {
  return event.respondWith(handleRequest(event.request))
})

function renderHTML(list,seller,config) {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>${config.title} - ${config.subtitle}</title>
      <link href="https://cdn.jsdelivr.net/npm/semantic-ui-css@2.4.1/semantic.min.css" rel="stylesheet">
      <link href="https://cdn.jsdelivr.net/gh/sleepwood/cf-worker-dir/style.css" rel="stylesheet">
      <script src="https://cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/semantic-ui-css@2.4.1/semantic.min.js"></script>
  </head>
  <body>
    <header>
      <div class="ui inverted vertical masthead center aligned segment">
        <div class="ui container">
          <div class="ui large secondary inverted menu">
            <div class="item">
              <p id="hitokoto">条条大路通罗马</p>
            </div>
            <div class="right item">
            ${config.selling_ads ? '<a id="menubtn" class="red ui icon inverted button"><i class="heart icon"></i> 喜欢此域名 </a>' : ''}
            </div>
          </div>
        </div>

        <div id="title" class="ui text container">
          <h1 class="ui inverted header">
            <i class="${config.logo_icon} icon"></i>
            <div class="content">${config.title}
              <div class="sub header">${config.subtitle}</div>
            </div>
          </h1>
          <div class="ui left action icon fluid input">
            <select id="sengine" class="ui compact selection dropdown">
              <option value="https://www.google.com/search?q=">谷 歌</option>
              <option value="https://www.baidu.com/s?wd=">百 度</option>
              <option value="https://www.bing.com/search?q=">必 应</option>
            </select>
            <input id="searchinput" type="search" placeholder="搜索你想要知道的……">
            <i class="inverted circular search link icon"></i>
          </div>
        </div>
      </div>
    </header>
    <main>
      <div class="ui container">
        ${list}
      </div>
    </main>
    <footer>
      <div class="footer">Powered by <a href="https://github.com/sleepwood/cf-worker-dir" target="_blank">Cf-Worker-Dir</a> &copy; Base on MIT License</div>
    </footer>
    ${config.selling_ads ? seller : ''}
    <script src="https://v1.hitokoto.cn/?encode=js&select=%23hitokoto" defer></script>
    <script>
      $('.dropdown').dropdown();
      $('.search').on('click',function(e){
        var url = $('#sengine').val();
        url = url.concat($('#searchinput').val());
        window.open(url);
      })
      $('#menubtn').on('click',(e)=>{
        $('#seller').modal('show');
      })
    </script>
  </body>

  </html>`
}
