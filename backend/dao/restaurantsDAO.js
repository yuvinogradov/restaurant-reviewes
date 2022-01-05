let restaurants

export default class RestaurantsDAO {
    static async injectDB(conn) {
        if (restaurants) {
            return
        }
        try {
            restaurants = await conn.db(process.env.RESTREVIEWS_NS).collection("restaurants")
            console.log(restaurants)
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in restaurntsDAO: ${e}`,
            )
        }
    }

    static async getRestaurants({
        filters = null,
        page = 0,
        restaurantsPerPage = 20,
    } = {}) {
        let query
        if (filters) {
            if ("name" in filters) {
                // идет поиск по тексту. по какому полю искать, настраивается в mongoDB:
                // нужно зайти в соотв.-ую коллекцию (в нашем сл. это restaurants),
                // и добавить индекс: {"name": "text"}
                query = { $text: { $search: filters["name"] } }
            } else if ("cuisine" in filters) {
                query = { "cuisine": { $eq: filters["cuisine"] } }
            } else if ("zipcode" in filters) {
                // отфильтровываются записи с полем address.zipcode, равным filters["zipcode"]
                query = { "address.zipcode": { $eq: filters["zipcode"] } }

            }
        }

        let cursor

        try {
            cursor = await restaurants.find(query)  // это найдет все рестораны в БД, в соотвествии с query
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { restaurantsList: [], totalNumRestaurants: 0 }
        }
        // если ошибки нет, то получаем опред. кол-во записей (параметр в limit),
        // пропустив опред.кол - во(параметр в skip)
        const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page)

        try {
            const restaurantsList = await displayCursor.toArray()
            const totalNumRestaurants = await restaurants.countDocuments(query)

            return { restaurantsList, totalNumRestaurants }
        } catch (error) {
            console.error(`Unable to convert cursor to array or problem counting documents, ${error}`)
            return { restaurantsList: [], totalNumRestaurants: 0 }
        }
    }


}