## 前言

> 本应用是一个基于Spring boot 实现的股票指数爬虫工具，数据来源于`同花顺`,`新浪财经`,`雪球`,`上交所`,`深交所`

## 实现功能

 :ballot_box_with_check: 指数更新
 
 :ballot_box_with_check: 股票数据范围：目前只支持上市和沪市（A股）
 
 :ballot_box_with_check: 市盈率，市净率，ROE ,所属行业
 
 :ballot_box_with_check: 历史数据：市盈率，市净率 ，分红，净资产收益率
 
 ## Pending
 1. Get daily history data
 2. Support getting break news or stock related news.
 3. Support user-defined stocks category.
 4. Support email notification (SMS or wechat) notification.
 5. Provide trend analysis and suggestion.
 6. Support real-time stock analysis and alert.
 7. Add real-time chart.
 

## Demo 效果 

:link: [点我查看效果](http://www.deesytech.com/stock) (demo版) :link:




## 国内指数
`http://hq.sinajs.cn/list=sz399001,sh000001,sz399006,sh000300`

Note:
How to get the token of "雪球":
1. Open the URL of "雪球" and login on PC using firefox.
2. Press F12 then click Network tab and find a "雪球" request URL.
![Alt text](https://github.com/louishe/DeesyStock/raw/master/images/snowball_cookie.JPG)
3. Copy the selected cookie, paste it in an editor, like notepad++.
![Alt text](https://github.com/louishe/DeesyStock/raw/master/images/snowball_token.JPG)