
export default {
    props: {},
    data: function () {
        return {};
    },
    created: function () {
        var id = this.$route.params.id;
        console.log('test', id);
    }
}
