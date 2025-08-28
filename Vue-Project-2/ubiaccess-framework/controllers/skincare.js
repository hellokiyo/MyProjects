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
        /// 특징 및 케어 팁 검색
        ///

        /**
         * @RequestMapping(path="/quality_tips/:id", method="get,post")
         */
        async quality_tips(req, res) {
            logger.debug(`skin::quality_tips 호출됨.`);

            const id = req.params.id //url에서 id값 가져오기

            const sqlName = 'skin_quality_tips';
            this.controllerHelper.execute(req, res, sqlName, id);

        }

        ///
        /// 특징 및 케어 팁 검색
        ///

        /**
         * @RequestMapping(path="/ampm/:id", method="get,post")
         */
        async ampm(req, res) {
            logger.debug(`skin::ampm 호출됨.`);

            const id = req.params.id //url에서 id값 가져오기

            const sqlName = 'skin_ampm';
            this.controllerHelper.execute(req, res, sqlName, id);

        }


        ///
        /// 특징 및 케어 팁 검색
        ///

        /**
         * @RequestMapping(path="/season/:id", method="get,post")
         */
        async season(req, res) {
            logger.debug(`skin::season 호출됨.`);

            const id = req.params.id //url에서 id값 가져오기

            const sqlName = 'skin_season';
            this.controllerHelper.execute(req, res, sqlName, id);

        }


        ///
        /// 특징 및 케어 팁 검색
        ///

        /**
         * @RequestMapping(path="/guide/:id", method="get,post")
         */
        async guide(req, res) {
            logger.debug(`skin::guide 호출됨.`);

            const id = req.params.id //url에서 id값 가져오기

            const sqlName = 'skin_guide';
            this.controllerHelper.execute(req, res, sqlName, id);

        }

    }

