const logger = require('../util/logger');

const Database = require('../database/database_mysql')

const DatabaseHelper = require('../util/database_helper');
const ControllerHelper = require('../util/controller_helper');

const skinSql = require('../database/sql/skin-sql');

/**
 * @Controller(path="/skin/v1")
 */
module.exports = class Skin {

    constructor() {
        this.database = new Database('database_mysql');

        this.databaseHelper = new DatabaseHelper(this.database);
        this.controllerHelper = new ControllerHelper(this.database);
    }

    ///
    /// 모든 데이터 조회하기
    ///

    /**
     * @RequestMapping(path="/list-all", method="get,skin")
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
     * @RequestMapping(path="/list", method="get,skin")
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
     * @RequestMapping(path="/read", method="get,skin")
     */
    async read(req, res) {
        logger.debug(`skin::read 호출됨.`);

        const sqlName = 'skin_read';
        this.controllerHelper.execute(req, res, sqlName);

    }

    ///
    /// 추가하기
    ///

    /**
     * @RequestMapping(path="/add", method="get,skin")
     */
    async add(req, res) {
        logger.debug(`skin::add 호출됨.`);

        const sqlName = 'skin_add';
        this.controllerHelper.execute(req, res, sqlName);

    }

    ///
    /// 추가하기2
    ///

    /**
     * @RequestMapping(path="/add2", method="get,skin")
     */
    async add2(req, res) {
        logger.debug(`skin::add2 호출됨.`);

        const sqlName = 'skin_add2';
        this.controllerHelper.execute(req, res, sqlName);

    }

    ///
    /// 수정하기
    ///

    /**
     * @RequestMapping(path="/modify", method="get,skin")
     */
    async modify(req, res) {
        logger.debug(`skin::modify 호출됨.`);

        const sqlName = 'skin_modify';
        this.controllerHelper.execute(req, res, sqlName);

    }


    ///
    /// 삭제하기
    ///

    /**
     * @RequestMapping(path="/remove", method="get,skin")
     */
    async remove(req, res) {
        logger.debug(`skin::remove 호출됨.`);

        const sqlName = 'skin_remove';
        this.controllerHelper.execute(req, res, sqlName);

    }

    /**
     * @RequestMapping(path="/like/:skinId", method="get,skin")
     */
    async like(req, res) {
        logger.debug(`skin::like 호출됨.`);

        const sqlName = 'skin_like';
        this.controllerHelper.execute(req, res, sqlName);
    }

}

