export default {
    routes: [
        {
            method: 'GET',
            path: '/posts/:slug',
            handler: 'post.findOne',
            config: {
                auth: false,
            },
        },
    ],
}
