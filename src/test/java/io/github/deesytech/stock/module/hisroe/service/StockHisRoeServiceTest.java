package io.github.deesytech.stock.module.hisroe.service;

import io.github.deesytech.stock.module.maindata.services.StockHisRoeService;
import io.github.deesytech.stock.module.maindata.services.StockService;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import com.alibaba.fastjson.JSON;
import io.github.deesytech.stock.common.util.stock.StockDateUtil;
import io.github.deesytech.stock.module.maindata.po.Stock;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

/**
 * ${DESCRIPTION}
 *
 * @author Louis.He
 * @create 2018-03-27 10:47
 **/
@RunWith(SpringRunner.class)
@SpringBootTest
public class StockHisRoeServiceTest {
    @Autowired
    private StockService stockService;
    @Autowired
    private MongoTemplate template;

    @Ignore
    @Test
    public void addStock() throws Exception {
        stockService.addStock(new String[]{
                "000895","601288","000338","601668","601633"
        });
    }
    @Test
    public void getUpdateInfoQueue(){
        Integer date= StockDateUtil.getCurrentDateNumber();
        Criteria cr = new Criteria();
        Criteria c1 = Criteria.where("Infodate").lt(date);
        Criteria c2 = Criteria.where("Infodate").exists(false);
        Query query = new Query(cr.orOperator(c1,c2));
        query.limit(3);
       List<Stock> list= template.find(query, Stock.class);
       list.stream().forEach(stock -> {
           System.out.println(JSON.toJSONString(stock));
       });

    }

}