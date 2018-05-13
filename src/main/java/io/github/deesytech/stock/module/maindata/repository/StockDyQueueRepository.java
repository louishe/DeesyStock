package io.github.deesytech.stock.module.maindata.repository;

import io.github.deesytech.stock.module.maindata.po.StockDyQueue;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

/**
 * stock price dao define
 * @author Louis.He
 * @create 2018-02-01 15:46
 **/
@Repository
public interface StockDyQueueRepository extends PagingAndSortingRepository<StockDyQueue,String> {

//    Page<Stock> queryAll(String code, Pageable pageable);


}
