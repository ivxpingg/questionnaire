import bootPage from 'components/bootPage/bootPage';
export default {
    props: {
        index: {
            type: Number,
            default: 1
        },
        questionId: {
            type: String,
            default: function () {
                return "";
            }
        },
        // 题目标题
        question: {
            type: String,
            default: function () {
                return "";
            }
        },
        beginDate: {
            type: String,
            default: ""
        },
        endDate: {
            type: String,
            default: ""
        }
    },
    data: function () {
        return {
            async_t: true,
            lenArr: [5, 50, 100], // 每页显示长度设置
            pageLen: 5,     // 可显示的分页数
            len: 5,    // 每页显示几行
            active: 1,
            param: {
                beginDate: "",
                endDate: ""
            },
            url: 'questionnaire/api/questionnaire/rpt/getAnswerStatisticsPage',
            tableList: []
        };
    },
    components: {bootPage},
    created: function () {
        this.param.beginDate = this.beginDate;
        this.param.endDate = this.endDate;
    },
    methods: {
        // 分页组件传回的表格数据
        callbackData: function (data) {
            this.tableList = data;
        }
    }
}
