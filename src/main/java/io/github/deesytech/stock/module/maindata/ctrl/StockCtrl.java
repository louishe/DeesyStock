package io.github.deesytech.stock.module.maindata.ctrl;

import io.github.deesytech.stock.common.util.stock.StockSpider;
import io.github.deesytech.stock.module.maindata.services.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Louis.He
 * @create 2018-03-27 11:14
 **/
@RestController
public class StockCtrl {

    @Autowired
    private StockService service;


    @RequestMapping("/stock/q")
    public String queryStock(Integer page, Integer rows, String code, String sidx, String sord){
        String order =(null==sord||sord.isEmpty())?"asc":sord;
        String field =(null==sidx||sidx.isEmpty())?"_id":sidx;
        return service.queryStock(page,rows,code,field,order);
    }

    /**
     * @param code
     * @return
     *//*
    @RequestMapping("/stock/add/{code}")
    public String addStock(@PathVariable String code) {
        String msg = "success";
        try {
            service.addStock(code);
        } catch (Exception e) {
            msg = e.getMessage();
            e.printStackTrace();
        }
        return msg;
    }*/
    @Autowired
    private StockSpider spider;
    @ResponseBody
    @RequestMapping("/stock/dys")
    public String getStockDy() throws Exception {
        return spider.getDy(1).toJSONString();
    }
}
