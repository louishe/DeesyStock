package io.github.deesytech.stock.module.maindata.repository;

import io.github.deesytech.stock.module.maindata.po.Stock;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

/**
 * stock price dao define
 * @author Louis.He
 * @create 2018-02-01 15:46
 **/
@Repository
public interface StockRepository extends PagingAndSortingRepository<Stock,String> {

//    Page<Stock> queryAll(String code, Pageable pageable);


}
