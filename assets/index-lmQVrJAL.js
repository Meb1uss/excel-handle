import{_ as k,r as d,c as D,w,o as c,a as B,b as _,d as a,e as p,g as r,u as I,f,t as h}from"./index-C1jolOq4.js";import{_ as C,E as T,a as N,b as V,X as W,c as X}from"./index-BgrbgNxt.js";const z={class:"entity_container"},F={class:"top"},G={class:"table"},S={class:"createExcel"},$={__name:"index",setup(q){const n=d([]),o=d([]);let u=d(!1);const v=D(()=>!!(n.value.length&!u.value));function y(e){n.value=e,console.log(e)}function g(){u.value=!0,o.value=n.value,x()}w(n,()=>{u.value=!1});function x(){o.value=o.value.filter(e=>e.处理类型!="暂不处理"),o.value.forEach(e=>{e.一类词="",e.二类词="",e.三类词="",e.词的类型==="一类词"?e.一类词=e.实体词:e.词的类型==="二类词"?e.二类词=e.实体词:e.三类词=e.实体词;for(let l in e)l!=="一类词"&&l!=="二类词"&&l!=="三类词"&&l!=="实体标准名称（非电商标题名称）"&&l!=="实体ID"&&delete e[l]}),m(o.value)}function m(e){for(let l=0;l<e.length;l++)for(let s=l+1;s<e.length;s++)e[l]["实体标准名称（非电商标题名称）"]===e[s]["实体标准名称（非电商标题名称）"]&&(E(e[l],e[s]),e.splice(s,1),s--);console.log(e)}function E(e,l){l.一类词?e.一类词?e.一类词=e.一类词+","+l.一类词:e.一类词=l.一类词:l.二类词?e.二类词?e.二类词=e.二类词+","+l.二类词:e.二类词=l.二类词:e.三类词?e.三类词=e.三类词+","+l.三类词:e.三类词=l.三类词}return(e,l)=>{const s=T,i=N,t=X,b=V;return c(),B("div",z,[_("div",F,[a(W,{onGetEntityWord:y}),a(s,{type:"primary",size:"default",onClick:g,plain:"",disabled:!v.value},{default:p(()=>[f("改变格式")]),_:1},8,["disabled"]),o.value.length?(c(),r(i,{key:0,class:"mx-1",type:"primary"},{default:p(()=>[f(h(o.value.length),1)]),_:1})):(c(),r(i,{key:1,class:"mx-1",type:"primary"},{default:p(()=>[f(h(n.value.length),1)]),_:1}))]),_("div",G,[I(u)?(c(),r(b,{key:0,data:o.value,stripe:"",style:{width:"100%"},height:"600","default-sort":{prop:"实体ID"}},{default:p(()=>[a(t,{prop:"实体ID",label:"实体ID",sortable:"",width:"150"}),a(t,{prop:"实体标准名称（非电商标题名称）",label:"实体标准名称（非电商标题名称）",sortable:""}),a(t,{prop:"一类词",label:"一类词"}),a(t,{prop:"二类词",label:"二类词"}),a(t,{prop:"三类词",label:"三类词"})]),_:1},8,["data"])):(c(),r(b,{key:1,data:n.value,stripe:"",style:{width:"100%"},height:"600","default-sort":{prop:"编号"}},{default:p(()=>[a(t,{prop:"实体ID",label:"实体ID",sortable:"",width:"150"}),a(t,{prop:"实体标准名称（非电商标题名称）",label:"实体标准名称（非电商标题名称）",sortable:""}),a(t,{prop:"实体词",label:"实体词"}),a(t,{prop:"词的类型",label:"词的类型"}),a(t,{prop:"处理类型",label:"处理类型"})]),_:1},8,["data"]))]),_("div",S,[a(C,{data:o.value},null,8,["data"])])])}}},J=k($,[["__scopeId","data-v-a8cfc6f4"]]);export{J as default};