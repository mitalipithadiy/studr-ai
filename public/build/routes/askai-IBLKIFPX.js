import{g as r,h as v,i as k,j as R}from"/build/_shared/chunk-CQNWAQVP.js";import{a as f,b as y}from"/build/_shared/chunk-LJCX3DN2.js";import{Ca as w,sa as p,wa as N,y as b}from"/build/_shared/chunk-MPAYQPS2.js";import"/build/_shared/chunk-5KNMRCGT.js";import{a as D,r as m}from"/build/_shared/chunk-VVVWHFCJ.js";import{e as i}from"/build/_shared/chunk-ADMCF34Z.js";var a=i(D(),1);var e=i(m(),1);function S(){let[g,x]=a.useState([]),[s,d]=a.useState(""),[o,I]=a.useState(!1),n=a.useRef(null),l=a.useRef(null),M=a.useRef(null),h=()=>{if(!s.trim())return;let t={id:String(Date.now()),content:s,role:"user",timestamp:new Date};x(u=>[...u,t]),d(""),I(!0),setTimeout(()=>{let u={id:String(Date.now()+1),content:"This is a simulated AI response. In a real implementation, this would be connected to an AI service.",role:"assistant",timestamp:new Date};x(T=>[...T,u])},1e3)};return a.useEffect(()=>{n.current&&(n.current.scrollTop=n.current.scrollHeight),!o&&l.current&&l.current.focus()},[g,o]),(0,e.jsxs)("div",{className:"flex h-[calc(100vh-3.5rem)] flex-col overflow-hidden",children:[(0,e.jsx)(v,{mode:"wait",children:o?(0,e.jsx)(r.div,{className:"flex-1 overflow-hidden",initial:{opacity:0,y:-20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},transition:{duration:.3},children:(0,e.jsx)(k,{ref:n,className:"h-full px-4 py-8",children:(0,e.jsx)("div",{className:"mx-auto max-w-2xl space-y-4",children:g.map(t=>(0,e.jsxs)(r.div,{className:`flex gap-3 ${t.role==="assistant"?"justify-start":"justify-end"}`,initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.2},children:[t.role==="assistant"&&(0,e.jsx)("div",{className:"flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md bg-primary text-primary-foreground",children:(0,e.jsx)(b,{className:"h-4 w-4"})}),(0,e.jsxs)("div",{className:`group relative flex max-w-xl rounded-lg px-3 py-2 text-sm ${t.role==="assistant"?"bg-muted":"bg-primary text-primary-foreground"}`,children:[(0,e.jsx)("div",{className:"prose prose-sm dark:prose-invert",children:t.content}),(0,e.jsx)("div",{className:"absolute -top-5 right-0 hidden whitespace-nowrap text-xs text-muted-foreground group-hover:block",children:t.timestamp.toLocaleTimeString()})]}),t.role==="user"&&(0,e.jsx)("div",{className:"flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md bg-primary text-primary-foreground",children:(0,e.jsx)(w,{className:"h-4 w-4"})})]},t.id))})})},"chat"):(0,e.jsx)(r.div,{className:"flex flex-1 items-center justify-center p-4",initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:20},transition:{duration:.3},children:(0,e.jsxs)("div",{className:"w-full max-w-2xl px-4",children:[(0,e.jsxs)("div",{className:"text-center mb-8",children:[(0,e.jsx)("div",{className:"inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4",children:(0,e.jsx)(N,{className:"h-6 w-6 text-primary"})}),(0,e.jsx)("h1",{className:"text-3xl font-bold tracking-tight mb-2",children:"How can I help you today?"}),(0,e.jsx)("p",{className:"text-lg text-muted-foreground",children:"Ask me anything - I'm here to assist with your questions"})]}),(0,e.jsxs)("div",{className:"relative",children:[(0,e.jsx)("div",{className:"absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 blur-3xl -z-10"}),(0,e.jsxs)("form",{ref:M,onSubmit:t=>{t.preventDefault(),h()},className:"relative flex gap-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-1 rounded-lg border shadow-lg",children:[(0,e.jsx)(y,{ref:l,placeholder:"Type your message...",value:s,onChange:t=>d(t.target.value),className:"flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"}),(0,e.jsxs)(f,{type:"submit",size:"sm",children:[(0,e.jsx)(p,{className:"h-4 w-4 mr-2"}),"Send"]})]})]})]})},"input")}),(0,e.jsx)(v,{children:o&&(0,e.jsx)(r.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:20},transition:{duration:.3},className:"border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",children:(0,e.jsx)("div",{className:"mx-auto max-w-2xl p-4",children:(0,e.jsxs)("form",{onSubmit:t=>{t.preventDefault(),h()},className:"flex gap-2",children:[(0,e.jsx)(y,{ref:l,placeholder:"Type your message...",value:s,onChange:t=>d(t.target.value),className:"flex-1"}),(0,e.jsxs)(f,{type:"submit",children:[(0,e.jsx)(p,{className:"h-4 w-4"}),(0,e.jsx)("span",{className:"sr-only",children:"Send message"})]})]})})})})]})}var c=i(m(),1);function A(){return(0,c.jsx)(R,{minimal:!0,children:(0,c.jsx)("div",{className:"h-[calc(100vh-3.5rem)] overflow-hidden",children:(0,c.jsx)(S,{})})})}export{A as default};
