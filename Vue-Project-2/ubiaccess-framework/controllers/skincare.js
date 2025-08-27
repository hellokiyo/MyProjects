const logger = require('../util/logger');

const Database = require('../database/database_mysql')

const ControllerHelper = require('../util/controller_helper');

const skinSql = require('../database/sql/skincare-sql');

/**
 * @Controller(path="/skin")
 */
module.exports = class Skin {

    constructor() {
        this.database = new Database('database_mysql');

        this.controllerHelper = new ControllerHelper(this.database);
    }

    ///
    /// 모든 데이터 조회하기
    ///

    /**
     * @RequestMapping(path="/list-all", method="get,post")
     */
    async listAll(req, res) {
        logger.debug(`skin::listAll 호출됨.`);

        const sqlName = 'skin_list_all';
        this.controllerHelper.execute(req, res, sqlName);

    }


    ///
    /// 리스트 조회하기 (페이지 단위로 조회하거나 조건으로 검색하는 것 포함)
    ///

    /**
     * @RequestMapping(path="/list", method="get,post")
     */
    async list(req, res) {
        logger.debug(`skin::list 호출됨.`);

        const sqlObj = skinSql.skin_list;
        this.controllerHelper.executeList(req, res, sqlObj);
    }

    ///
    /// id를 이용해 하나 검색하기
    ///

    /**
     * @RequestMapping(path="/read", method="get,post")
     */
    async read(req, res) {
        logger.debug(`skin::read 호출됨.`);

        const sqlName = 'skin_read';
        this.controllerHelper.execute(req, res, sqlName);

    }

    ///
    /// 좋아요 기능
    ///
    
    /**
     * @RequestMapping(path="/like/:skinId", method="get,post")
     */
    async like(req, res) {
        logger.debug(`skin::like 호출됨.`);

        const sqlName = 'skin_like';
        this.controllerHelper.execute(req, res, sqlName);
    }

}

