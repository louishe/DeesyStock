package io.github.deesytech.stock.module.maindata.repository;

import io.github.deesytech.stock.module.maindata.po.StockHisPb;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 *
 *
 * @author Louis.He
 * @create 2018-03-09 14:55
 **/
@Repository
public interface StockHisPbRepository extends MongoRepository<StockHisPb,String> {

}
