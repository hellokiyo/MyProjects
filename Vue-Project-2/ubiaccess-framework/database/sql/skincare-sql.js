module.exports = {

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

    // 특징 및 해결방안
    skin_quality_tips: {
        sql: `
            select id, skin_type, features, care_tips, key_ingredients, purchase_link
            from skincare.skin_care_info
            where id = :id
        `

    }



}