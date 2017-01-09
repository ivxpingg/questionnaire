export default {
    props: {
        text: {
            type: String,
            default: ""
        },
        btnText: {
            type: String,
            default: "确定"
        }
    },
    data: function () {
        return {};
    },
    methods: {
        callbackAlert: function () {
            this.$emit("callbackAlert");
        }
    }
}
