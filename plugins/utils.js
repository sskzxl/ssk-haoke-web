import Vue from "vue";
import { debounce } from "lodash";

Vue.prototype._debounce = debounce;

export const utils = {
    offset: function(element) {
        var actualLeft=element.offsetLeft;
        var actualTop=element.offsetTop;
        var parent=element.offsetParent;  //是有定位属性的父元素，如果box没有positon属性，则offsetParent为body，但是也要考虑body的boder
        while(parent!=null){
            actualLeft+=parent.offsetLeft+parent.clientLeft;
            actualTop+=parent.offsetTop+parent.clientTop;
            parent=parent.offsetParent;
        }
        return { top: actualTop, left: actualLeft};
    }
}