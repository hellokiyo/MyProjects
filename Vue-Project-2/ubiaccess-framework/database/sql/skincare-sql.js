module.exports = {

    skin_list_all: {
        sql: `select id, skin_type, features, care_tips, morning_routine, evening_routine, seasonal_routine, recommended_products, key_ingredients,
                     purchase_link, created_at, updated_at
              from skincare.skin_care_info`
    },


    skin_list: {
        sql: `
            select id, skin_type, features, care_tips, morning_routine, evening_routine, seasonal_routine, recommended_products, key_ingredients,
                purchase_link, created_at, updated_at
            from skincare.skin_care_info
        `,
        count: `select count(*) as total from skincare.skin_care_info`,
        where: ` where # `,
        order: ` order by # `,
        page: ` limit # `
    },


    skin_read: {
        sql: `select id, skin_type, features, care_tips, morning_routine, evening_routine, seasonal_routine, recommended_products, key_ingredients,
                purchase_link, created_at, updated_at
              from skincare.skin_care_info
              where id = :id`
    },


    // 고객 데이터 삭제
    skin_remove: {
        sql: `delete from skincare.skin_care_info
              where id = :id `
    },


    // 좋아요 수 증가
    skin_like: {
        sql: `update skincare.skin_care_info
              set likes = likes + 1
              where id = :id `
    }

}