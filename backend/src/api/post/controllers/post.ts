/**
 * post controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController(
    'api::post.post',
    ({ strapi }) => ({
        async findOne(ctx) {
            const { slug } = ctx.params
            const post = await strapi.db.query('api::post.post').findOne({
                where: { slug },
            })
            const sanitizedPost = await this.sanitizeOutput(post, ctx)
            return this.transformResponse(sanitizedPost)
        },
    })
)
