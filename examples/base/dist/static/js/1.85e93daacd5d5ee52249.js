webpackJsonp([1],{"3sYt":function(t,n,i){"use strict";var e={props:{data:{type:Array,default:function(){return[]}}},data:function(){return{isFinishAnimation:!1}},computed:{setStyle:function(t,n){var i=this;return function(t,n){return{background:n.background,animation:i.isFinishAnimation?"none":i.$style["list-load"]+" "+(200*t+400)+"ms"}}}},methods:{animationend:function(t){t===this.data.length-1&&(this.isFinishAnimation=!0)},clickHandler:function(t,n){this.$refs.item[n].style.background="gold",this.isFinishAnimation=!0,this.$emit("item-click",t,n)}}},s={render:function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("div",{class:t.$style.list},t._l(t.data,function(n,e){return i("div",{key:n.id,ref:"item",refInFor:!0,staticClass:"item",style:t.setStyle(e,n),attrs:{id:"item"+e},on:{click:function(i){return t.clickHandler(n,e)},animationend:function(n){return t.animationend(e)}}},[i("div",{staticClass:"text"},[t._v("id: "+t._s(n.id))]),t._v(" "),i("div",{staticClass:"text"},[t._v("text: "+t._s(n.text))]),t._v(" "),n.children?i("div",{staticClass:"text"},[t._v("子项长度: "+t._s(n.children.length))]):t._e()])}),0)},staticRenderFns:[]};var r=i("VU/8")(e,s,!1,function(t){this.$style=i("nGsU")},null,null);n.a=r.exports},CHg1:function(t,n,i){(n=t.exports=i("FZ+f")(!1)).push([t.i,"\n.list-1DzVi_0 .item {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin-bottom: 0.1rem;\n  height: 1.2rem;\n  border-radius: 0.06rem;\n  text-align: center;\n  padding: 0.1rem 0;\n}\n.list-1DzVi_0 .item .text {\n  font-size: 0.2rem;\n  line-height: 0.3rem;\n  color: #fff;\n}\n@-webkit-keyframes list-load-34AMi_0 {\n0% {\n    -webkit-transform: translateY(100px);\n            transform: translateY(100px);\n}\n100% {\n    -webkit-transform: translateY(0px);\n            transform: translateY(0px);\n}\n}\n@keyframes list-load-34AMi_0 {\n0% {\n    -webkit-transform: translateY(100px);\n            transform: translateY(100px);\n}\n100% {\n    -webkit-transform: translateY(0px);\n            transform: translateY(0px);\n}\n}\n",""]),n.locals={list:"list-1DzVi_0","list-load":"list-load-34AMi_0"}},KvKx:function(t,n,i){(n=t.exports=i("FZ+f")(!1)).push([t.i,"\n.number-list-1XfEg_0 {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  height: 100%;\n  padding: 0.1rem;\n}\n",""]),n.locals={"number-list":"number-list-1XfEg_0"}},OWP9:function(t,n,i){var e=i("KvKx");"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);i("rjj0")("428486ba",e,!0,{})},P31M:function(t,n,i){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var e=i("3sYt"),s=i("W+FH"),r=i("ye1K"),a=(i("YBc6"),{beforeRouteEnter:function(t,n,i){i()},components:{ColorList:e.a},mixins:[r.a],data:function(){return{numberList:[]}},methods:{pullingDownHandler:function(){this.getNumberList()},getNumberList:function(){var t=this;Object(s.e)().then(function(n){n.data&&1===n.data.code&&(t.numberList=n.data.data)})},clickHandler:function(t){this.$router.push({name:"testCaseNumberDetail",params:{numberId:t.id}})}}}),o={render:function(){var t=this.$createElement,n=this._self._c||t;return n("vi-page",[n("vi-scroll",{ref:"scroll",staticStyle:{color:"#999"},attrs:{data:this.numberList,options:this.scrollOptions,scrollEvents:this.scrollEvents},on:{"pulling-down":this.pullingDownHandler}},[n("div",{class:this.$style["number-list"]},[n("color-list",{attrs:{data:this.numberList},on:{"item-click":this.clickHandler}})],1)])],1)},staticRenderFns:[]};var l=i("VU/8")(a,o,!1,function(t){this.$style=i("OWP9")},null,null);n.default=l.exports},nGsU:function(t,n,i){var e=i("CHg1");"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);i("rjj0")("09946e9e",e,!0,{})}});