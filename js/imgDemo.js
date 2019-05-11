var mushroomDatas = [
    {
        id:1,
        name:"裂丝盖伞",
        fenlei:"科属: 伞菌目 红菇科  红菇属",
        origin:"别名:草民",
        englishName:"拉丁名:inocybe rimosa ",
        feature:"菌盖直径2-4厘米，有明显辐射状开裂，常常露出白色菌肉。菌柄长2.5-5厘米。",
        habit:"夏秋季林中地上，并常见于柳树附近，单生或散生。具有毒性，产生神经性症状以及胃肠道症状，食后发病快，病程短。",
        trustL:"可信度95.6%",
        url:"./images/Giant1.png"
    },{
        id:2,
        name:"赭盖鹅膏菌",
        fenlei:"科属: 伞菌目 红菇科  红菇属",
        origin:"别名:贵族",
        englishName:"拉丁名:Amanita rubescens",
        feature:"子实体中等大。菌盖直径3.5-8cm，扁半球形至平展，浅土黄色或浅红褐色，具块状和近疣状鳞片，边缘有不明显的条纹。菌肉白色，后变红褐色，薄。菌褶白色至近白色，渐变红褐色、离生、稍密、不等长。菌柄圆柱形，长6-12cm，粗0.5-1cm，同菌盖色，具纤毛状鳞片，内部松软变至空心，菌柄上部有花纹，基部膨大。菌环生菌柄的上部，膜质，下垂，上面白色，下面灰褐色，易脱落。菌托由灰褐色絮状鳞片组成。",
        habit:"夏秋季在林中地上单生或散生。一般无毒，但不可生食。",
        trustL:"可信度86%",
        url:"./images/Giant2.png"
    },{
        id:3,
        name:"豹斑毒鹅膏菌",
        fenlei:"科属: 伞菌目 红菇科  红菇属",
        origin:"别名:(嘿吐红菇、棺材盖子)",
        englishName:"拉丁名:Amanita pantherina",
        feature:"有时污白色，散布白色至污白色的小斑块或颗粒状鳞片，老后部分脱落，盖缘有明显的条棱，当湿润时表面粘。菌肉白色。菌褶白色，离生，不等长。菌柄圆柱形，长5-17cm，粗0.8-2.5cm，表面有小鳞片，内部松软至空心，基部膨大有几圈环带状的菌托。菌环一般生长在中下部。孢子印白色。孢子光滑无色，宽椭圆形，10-12.5μm×7.2-9.3μm，非糊性反应。\n",
        habit:"夏秋季在阔叶林或针叶林中地上成群生长，具有毒性。食后半小时至6小时发病,主要表现为副交感神经兴奋、呕吐、腹泻、大量出汗、流泪流涎、瞳孔缩小、感光消失、脉搏减慢、呼吸障碍、体温下降、四肢发冷等。中毒严重时出现幻视谵语、抽搐、昏迷,甚至有肝损害和出血等现象,一般很少造成人畜死亡。\n",
        trustL:"可信度86%",
        url:"./images/Giant3.png"
    }
    // ,{
    //     id:4,
    //     name:"大人",
    //     fenlei:"科属: 伞菌目 红菇科  红菇属",
    //     origin:"别名:(嘿吐红菇、棺材盖子)",
    //     englishName:"拉丁名:Russula emetica",
    //     feature:"这一年起了两个比较创新的项目:JS SDK和无线SDK(IOS， 安卓)，这两个SDK的出现在一定程度上由业务和安全两方面决。",
    //     habit:"上手并不是那么困难，同时没有涉及过多的 MVC的内容，做SDK基础层的东西还是比较得心应手的，就这样 IOS的无线SDK版本就生成了，此时在开放平台的技术团队内部正 在执行一个叫做Hack project的活动，其中一个自主项目就是",
    //     trustL:"可信度85.6%",
    //     url:"./images/du4.jpg"
    // },{
    //     id:5,
    //     name:"秦始皇",
    //     fenlei:"科属: 伞菌目 红菇科  红菇属",
    //     origin:"别名:(嘿吐红菇、棺材盖子)",
    //     englishName:"拉丁名:Russula emetica",
    //     feature:"畴)，授权时长。所有的信息可监控、归档、快速定位， 我们内部叫做Top Ocean，简单说来就是对所有的访问日志做归 档，归档的载体是块状文件，归档时对块状文件的所有记录按照 需求建立索引，然后保留索引，上传本地文件到远端分布式文件 系统备份。实时的监控服务调用和应用访问，授权异。",
    //     habit:"第二，第三方应用。采用监控集群对所有ISV的服务器做安全 扫描，对普通的Web安全漏洞做扫描，对应用的可用性和响应时间 做监控。同时，正式启动“聚石塔”项目，提供弹性计算和存储能 力及可靠的安全网络环境给ISV，帮助ISV提供自身应用的安全性。\n" +
    //     "至此为止，5年左右的技术历程已部分展示在了大家的",
    //     trustL:"可信度85.6%",
    //     url:"./images/du5.jpeg"
    // },{
    //     id:6,
    //     name:"亲岚",
    //     fenlei:"科属: 伞菌目 红菇科  红菇属",
    //     origin:"别名:(嘿吐红菇、棺材盖子)",
    //     englishName:"拉丁名:Russula emetica",
    //     feature:"Characteristic和feature都有“特色”的意思,但characteristic基本的意思是“特征”,指恒定的、使某人或物有别于其他的人或物的属性和特质。",
    //     habit:"c基本的意思是“特征”,指恒定的、使某人或物有别于其他的人或物的属性和特质",
    //     trustL:"可信度85.6%",
    //     url:"./images/du6.jpeg"
    // },{
    //     id:7,
    //     name:"范增",
    //     fenlei:"科属: 伞菌目 红菇科  红菇属",
    //     origin:"别名:(嘿吐红菇、棺材盖子)",
    //     englishName:"拉丁名:Russula emetica",
    //     feature:"Characteristic和feature都有“特色”的意思,但characteristic基本的意思是“特征”,指恒定的、使某人或物有别于其他的人或物的属性和特质。",
    //     habit:"c基本的意思是“特征”,指恒定的、使某人或物有别于其他的人或物的属性和特质",
    //     trustL:"可信度85.6%",
    //     url:"./images/du7.jpeg"
    //
    // },{
    //     id:8,
    //     name:"韩信",
    //     fenlei:"科属: 伞菌目 红菇科  红菇属",
    //     origin:"别名:(嘿吐红菇、棺材盖子)",
    //     englishName:"拉丁名:Russula emetica",
    //     feature:"2011年12月8日那天，有同事恭喜我，我才知道自己在淘宝已 经七周年了。很多人问“七年痒不痒?”老实说，也曾经痒过， 但往往都是一痒而过，然后又投入到水深火热的工作中去。回家 之后就想，我在这七年到底收获了什么，且不论成败与否，这七 年的经历，是我人生的宝贵财富。。",
    //     habit:"第一年(2004年—2005年)\n" +
    //     "@正牌七公曾经说过，要是写一本淘宝的历史书，一定有很 多人感兴趣，其实我也很想写写这样一本书。2004年12月8日入 职的时候，我和@衲子如幻一起进来，迎接我的是骆冰和黄裳@ 岳旭强 ，骆冰是百阿的班主任，黄裳是我的师父。当时还没有百 淘，先参加了百阿，百阿给我发了一本",
    //     trustL:"可信度85.6%",
    //     url:"./images/du8.jpeg"
    // },{
    //     id:9,
    //     name:"章韩",
    //     fenlei:"科属: 伞菌目 红菇科  红菇属",
    //     origin:"别名:(嘿吐红菇、棺材盖子)",
    //     englishName:"拉丁名:Russula emetica",
    //     feature:"我被震撼了，它跟传统的企业非常不一样，到处都是 生机勃勃的样子，还有前台的@香香的好朋友笑得很亲切，之前 见到的公司前台的态度都是冷冰冰的。@武当三丰给我两张笔试 题做，后来居然通过了。财神面试我的时候，问我。",
    //     habit:"，跟高手在一起成长一定很快。我每说一句，他点头“嗯哼” 一下，以至于后来我跟我老婆形容公司的CEO时，她只记得那个 喜欢“嗯哼”的人。",
    //     trustL:"可信度85.6%",
    //     url:"./images/du9.jpeg"
    // },
]