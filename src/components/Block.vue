<template>
    <div v-html="cmsBlocks.items[0].content"></div>
</template>
<script>
import { GET_BLOCK } from '@/grapql/query_cmsblock';
export default {
    name: "CmsBlock",
    data() {
        return {
            cmsBlocks: {
                items: [
                    {
                        content: "<style>...</style><div>...</div>"
                    }
                ]
            }
        };
    },
    apollo: {
        cmsBlocks: {
            query: GET_BLOCK,
            variables() {
                return {
                    sku: this.block.content,
                };
            },
            update: data => data.cmsBlocks
        },
    },
    props: {
        block: {}
    }
}
</script>