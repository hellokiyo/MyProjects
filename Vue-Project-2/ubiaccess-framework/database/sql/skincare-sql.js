module.exports = {
    skin_list_all: {
        sql: `select id, title, contents, category,createDate, likes, comments,thumbnail
              from test.skin`
    },
    skin_list: {
        sql: `
            select id, title, contents, category, createDate, likes, comments, thumbnail,
                CASE
                    WHEN TIMESTAMPDIFF(MINUTE, createDate, NOW()) < 1
                        THEN '방금전'
                    WHEN TIMESTAMPDIFF(HOUR, createDate, NOW()) < 1
                        THEN CONCAT(TIMESTAMPDIFF(MINUTE, createDate, NOW()), '분전')
                    WHEN TIMESTAMPDIFF(DAY, createDate, NOW()) < 1
                        THEN CONCAT(TIMESTAMPDIFF(HOUR, createDate, NOW()), '시간전')
                    ELSE CONCAT(TIMESTAMPDIFF(DAY, createDate, NOW()), '일전')
                    END AS relativeTime
            from test.skin
        `,
        count: `select count(*) as total from test.skin`,
        where: ` where # `,
        order: ` order by # `,
        page: ` limit # `
    },

    skin_read: {
        sql: `select id, title, contents, category,createDate, likes, comments,thumbnail
              from test.skin
              where id = :id`
    },

    // 고객 데이터 추가  (사진 입력)
    skin_add: {
        sql: `insert into test.skin(title, contents, category,createDate, likes, comments,thumbnail)
              values
                  (:title, :contents, :category, :createDate, :likes, :comments, :thumbnail)`
    },

    // 고객 데이터 추가  (사진 입력)
    skin_add2: {
        sql: `insert into test.skin(title, contents, category, likes, comments,thumbnail)
              values
                  (:title, :contents, :category, :likes, :comments, :thumbnail)`
    },


    // 고객 데이터 수정
    skin_modify: {
        sql: `update test.skin
              set title = :title,
                  contents = :contents,
                  category = :category,
                  createDate = :createDate,
                  likes = :likes,
                  comments = :comments,
                  thumbnail = :thumbnail
              where id = :id `
    },


    // 고객 데이터 삭제
    skin_remove: {
        sql: `delete from test.skin
              where id = :id `
    },

    // 좋아요 수 증가
    skin_like: {
        sql: `update test.skin
              set likes = likes + 1
              where id = :id `
    }

}