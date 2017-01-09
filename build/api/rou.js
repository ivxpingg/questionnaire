module.exports = {
    "get": [
        {
            "oUrl": '/questionnaire/api/questionnaire/getQuestionnaireList',
            "des": ""
        }
    ],
    "post": [
        {
            "oUrl": '/questionnaire/api/questionnaire/getQuestionnaireList',
            "des": '获取列表, 可带查询参数',
            "param": { "name":'', "pageNo": 0, "pageSize": ''}
        },
        {
            "oUrl": '/questionnaire/api/questionnaire/uploadImage',
            "des": "上传图片",
            "param": {"base64": ""}
        },
        {
            "oUrl": '/questionnaire/api/questionnaire/addQuestionnaire',
            "des": '添加问卷调查',
            "param": {"questionnaireJson": ""}
        },
        {
            "oUrl": '/questionnaire/api/questionnaire/getModuleList',
            "des": '获取模块列表'
        },
        {
            "oUrl": '/questionnaire/api/questionnaire/deleteQuestionnaire',
            "des": '通过ID删除问卷',
            "param": {"id": ''}
        },
        {
            "oUrl": '/questionnaire/api/questionnaire/updateQuestionnaire',
            "des": "更新问卷发布或回收",
            "param": {"id": "", "status": "", "isPublish": ""}
        },
        {
            "oUrl": '/questionnaire/api/questionnaire/getQuestionnaireDetail',
            "des": "通过ID获取问卷详情",
            "param": {"id": "string"}
        },
        {
            "oUrl": '/questionnaire/api/questionnaire/addHits',
            "des": "增加点击数",
            "param": {"id": ""}
        },
        {
            "oUrl": '/questionnaire/api/questionnaire/pushPaperAnswer',
            "des": "上传问卷结果",
            "param": {"paperAnswerJson": ""}
        },
        {
            "oUrl": '/questionnaire/api/questionnaire/rpt/getQuestionList',
            "des": "根据问卷id获取问题列表信息 用来获取统计数据",
            "param": {"questionnaireId": "string"}
        },
        {
            "oUrl": "/questionnaire/api/questionnaire/rpt/getAnswerStatistics",
            "des": "单选题、多选题的统计数据",
            "param": {"questionId": "string"}
        },
        {
            "oUrl": "/questionnaire/api/questionnaire/rpt/getAnswerStatisticsPage",
            "des": "填空题统计",
            "param": {"questionId": ""}
        },
        {
            "oUrl": "/questionnaire/api/questionnaire/rpt/getAnswerContactPage",
            "des": "联系人统计",
            "param": {"questionnaireId": ""}
        }, {
            "oUrl": "/questionnaire/api/questionnaire/rpt/getHitsList",
            "des": "获取点击数统计",
            "param": {"questionnaireId": ""}
        }, {
            "oUrl": "/questionnaire/api/questionnaire/rpt/getPaperCountRpt",
            "des": "获取回收统计",
            "param": {"questionnaireId": ""}
        }, {
            "oUrl": "/questionnaire/api/questionnaire/rpt/getLatLonRpt",
            "des": "获取位置地图分析数据",
            "param": {"questionnaireId": ""}
        }
    ]
};
