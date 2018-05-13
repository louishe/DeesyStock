package io.github.deesytech.stock.module.hisroe.service;

import io.github.deesytech.stock.module.maindata.services.StockHisRoeService;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

/**
*
* @author Louis.He
* @create 2018-03-09 15:02
**/
@RunWith(SpringRunner.class)
@SpringBootTest
public class StockHisRoeServiceTest2 {

   @Autowired
   private StockHisRoeService service;

   @Test
   public void addStockHisRoe() throws Exception {
       service.addStockHisRoe("601006");
   }

}
