const poolDb = require('./lib/dbcon');

const database = {};

database.getHouses = function(){
    let query = "SELECT * FROM public.houses";
    let queryParams = [];

    return poolDb.queryDb(query, queryParams)
        .then(function (result) {
            return result.rows;
        });
}
/** Add houses to db
 * @param  {array} params Array of objects. Each with one house details
 */
database.insertHouses = function(houses){
    let query = "INSERT INTO public.houses (item_ref, price, topology, link, origin, consumed) VALUES ";
    let queryParams = [];
    let len = 0;

    houses.map(function(item){
        len = queryParams.length;
        //console.log('queryParams.lenght',queryParams.length)
        //case not the first element, add ','
        if (len) {query += ','}
        query += `($${len + 1}, $${len + 2}, $${len + 3}, $${len + 4}, $${len + 5}, false)`;
        let price = Number(item.price.replace(/\D/g,"")) //trim currency //TODO -> crawler
        queryParams.push(
            item.ref,
            price,
            item.topology, 
            item.link, 
            item.origin
        );
    })
    query += ' ON CONFLICT ON CONSTRAINT houses_primary_key DO UPDATE SET last_checked = now()' 
    //console.log('QUERY: ', query);
    //console.log('queryParams: ', queryParams);

    return poolDb.queryDb(query, queryParams)
        .then(function (result) {
            return result.rows;
        });
}

/**
 * Gets the houses that are marked as unprocessed
 * @returns Rows of houses to be processed
 */
database.getUnprocessedHouses = function(){
    let query = `select
                    house_uuid,
                    origin,
                    price,
                    link
                from
                    public.houses
                where
                    consumed = false
                order by
                    price asc`;
    let queryParams = [];
    return poolDb.queryDb(query, queryParams)
        .then(function (result) {
            return result.rows;
        });
}
/**
 * Marks in DB the items as processed
 * 
 * @param  {array} items Array of UUIDs to update in database
 * @returns The UUIDs of the modified items
 */
database.markItemsProcessed = function(items){
    if (!items.length){
        return [];
    }
    let query = `UPDATE public.houses 
                 SET consumed = true
                 WHERE house_uuid = ANY($1::uuid[])`
    let queryParams = [items];
    console.log('getUnprocessedHouses query,queryParams: ',query,queryParams)
    return poolDb.queryDb(query, queryParams)
        .then(function (result) {
            return result.rows;
        });
}

module.exports = database;