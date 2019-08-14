<template>
<div>
    <div v-show="bgcolor !== '#3bb1bb'">
        <svg :viewBox="viewbox">
            <defs>
                <marker id="arrow" markerWidth="100" markerHeight="100" refX="0" refY="30" orient="auto" markerUnits="userSpaceOnUse">
                    <path d="M0,0 L0,60 L30,30 z" :fill="bgcolor"></path>
                </marker>
            </defs>
            <line x1="30" y1="100" x2="30" y2="30" :stroke="bgcolor" stroke-width="30" marker-end="url(#arrow)"></line>
        </svg>
    </div>
    <div v-show="bgcolor == '#3bb1bb'">
        <svg :viewBox="viewbox">
            <line x1="0" y1="50" x2="60" y2="50" :stroke="bgcolor" stroke-width="30"></line>
        </svg>
    </div>
</div>
</template>

<script>
    export default {
        props: {
            viewbox: {
                type: String,
                default: '0 0 60 100'
            },
            bgcolor: {
                type: String,
                default: '#BB3B3B'
            }
        },
        data () {
            return {}
        },
    }
</script>

<style>
    
</style>