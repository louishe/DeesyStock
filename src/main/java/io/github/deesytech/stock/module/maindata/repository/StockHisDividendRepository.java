package io.github.deesytech.stock.module.maindata.repository;

import io.github.deesytech.stock.module.maindata.po.StockHisDividend;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

/**
 * Stock History Dividend  dao define
 * @author Louis.He
 * @create 2018-02-01 15:46
 **/
@Repository
public interface StockHisDividendRepository extends PagingAndSortingRepository<StockHisDividend,String> {



}
