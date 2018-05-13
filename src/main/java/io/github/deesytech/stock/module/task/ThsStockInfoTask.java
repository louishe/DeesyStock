package io.github.deesytech.stock.module.task;

import com.alibaba.fastjson.JSONObject;
import com.mongodb.WriteResult;
import io.github.deesytech.stock.common.util.stock.StockDateUtil;
import io.github.deesytech.stock.common.util.stock.StockSpider;
import io.github.deesytech.stock.module.maindata.po.Stock;
import io.github.deesytech.stock.module.maindata.repository.StockHisDividendRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * 定时更新股票信息
 *
 * @author Louis.He
 * @create 2018-03-29 14:50
 **/
@Component
public class ThsStockInfoTask {

    private Logger log = LoggerFactory.getLogger(ThsStockInfoTask.class);

    @Autowired
    private StockSpider spider;
    @Autowired
    private MongoTemplate template;
    @Autowired
    private StockHisDividendRepository stockHisDividendRepository;

    @Scheduled(cron = "*/6 * * * * *")
    public void stockInfoExecute() throws Exception {
        int day=StockDateUtil.getCurrentWeekDay();
        if(day==6||day==0){
            log.debug("非交易时间不执行操作...");
            return ;
        }
        Long start = System.currentTimeMillis();
        Integer dateNumber = StockDateUtil.getCurrentDateNumber();
        Criteria cr = new Criteria();
        Criteria c1 = Criteria.where("Infodate").lt(dateNumber);
        Criteria c2 = Criteria.where("Infodate").exists(false);
        Query query = new Query(cr.orOperator(c1,c2));
        query.limit(3);
        List<Stock> list = template.find(query, Stock.class);
        if(null==list||list.size()==0){
            log.debug("stock info 今日已全部更新完!");
            return ;
        }
        int affected=0;
        for (Stock stock :list) {
            Stock item = null;
            try {
                JSONObject info = spider.getStockInfo(stock.getCode());
                item = info.toJavaObject(Stock.class);
                if (null == item) return;
                WriteResult wr = template.upsert(
                        new Query(Criteria.where("_id").is(stock.getCode())),
                        new Update()
                                .set("_id", stock.getCode())
                                .set("industry", item.getIndustry())
                                .set("mainBusiness", item.getMainBusiness())
                                .set("totalValue", item.getTotalValue())
                                .set("pb", item.getPb())
                                .set("roe", item.getRoe())
                                .set("bvps", item.getBvps())
                                .set("pes", item.getPes())
                                .set("ped", item.getPed())
                                .set("Infodate", item.getInfodate()),
                        "stock"
                );
                affected+=wr.getN();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        log.info(String.format("info更新一批耗时：%s ms ,受影响行: %s", (System.currentTimeMillis() - start),affected));
    }
}
