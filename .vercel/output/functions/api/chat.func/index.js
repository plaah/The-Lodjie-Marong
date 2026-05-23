var p=Object.defineProperty;var I=Object.getOwnPropertyDescriptor;var N=Object.getOwnPropertyNames;var O=Object.prototype.hasOwnProperty;var T=(n,e)=>{for(var t in e)p(n,t,{get:e[t],enumerable:!0})},W=(n,e,t,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let a of N(e))!O.call(n,a)&&a!==t&&p(n,a,{get:()=>e[a],enumerable:!(o=I(e,a))||o.enumerable});return n};var M=n=>W(p({},"__esModule",{value:!0}),n);var E={};T(E,{default:()=>b});module.exports=M(E);function A(n){let e=/\b(is|are|the|what|do|can|you|we|please|hello|hi|how|price|book|package|wedding|date|want|need|help|thanks|thank|offer|cost|guest)\b/i,t=/\b(saya|aku|apa|gimana|bisa|harga|paket|nikah|pesan|booking|halo|hai|mau|info|tolong|dong|punya|berapa|ada|kasih|terima|makasih|bantu)\b/i,o=(n.match(e)||[]).length,a=(n.match(t)||[]).length;return o>a?"en":"id"}function w(n,e="id"){let t=n.packages.map(i=>`- ${i.name}: ${i.capacity}, ${i.priceRange}. ${i.description}`).join(`
`),o=n.faq.slice(0,6).map(i=>`Q: ${i.q}
A: ${i.a}`).join(`

`),a=n.contact.whatsapp;return e==="en"?`You are Mbak Sari, Wedding Concierge at The Lodjie Marong Wonosobo \u2014 a luxury heritage wedding venue. Warm, friendly, professional.

RULES:
1. ALWAYS end with: "For more info, chat our admin on WhatsApp: ${a}"
2. If user wants to book \u2192 direct to WhatsApp immediately: "Great! Please chat our admin on WhatsApp for booking: ${a}"
3. Only answer wedding & venue questions. Off-topic: "Sorry, I can only help with The Lodjie Marong wedding venue."
4. Keep responses short \u2014 max 3 sentences + WhatsApp CTA.
5. Never invent prices or dates. Use only data below.

VENUE:
${n.venue.name} \u2014 ${n.venue.type}
${n.venue.description}

PACKAGES:
${t}

FAQ:
${o}`:`Kamu Mbak Sari, Wedding Concierge The Lodjie Marong Wonosobo \u2014 venue pernikahan heritage mewah. Hangat, ramah, profesional.

ATURAN:
1. Akhiri SEMUA jawaban dengan: "Untuk info lengkap, chat admin WhatsApp: ${a}"
2. User minta booking/pesan \u2192 langsung arahkan WhatsApp: "Baik! Silakan chat admin via WhatsApp untuk booking: ${a}"
3. Hanya jawab soal venue & pernikahan. Di luar itu: "Maaf, Mbak Sari hanya bantu info The Lodjie Marong ya."
4. Jawaban singkat. Maksimal 3 kalimat + WhatsApp CTA.
5. Jangan mengarang harga/tanggal. Pakai data di bawah.

VENUE:
${n.venue.name} \u2014 ${n.venue.type}
${n.venue.description}

PAKET:
${t}

FAQ:
${o}`}var g=require("fs"),f=require("path"),h;try{h=JSON.parse((0,g.readFileSync)((0,f.join)(process.cwd(),"src/data/knowledge-base.json"),"utf-8"))}catch{h={venue:{},packages:[],facilities:[],faq:[],contact:{}}}function v(){if(process.env.NVIDIA_API_KEY)return process.env.NVIDIA_API_KEY;try{let e=(0,g.readFileSync)((0,f.join)(process.cwd(),".env.local"),"utf-8").match(/NVIDIA_API_KEY=(.+)/);if(e)return e[1].trim()}catch{}return null}function c(n,e,t){n.writeHead(e,{"Content-Type":"application/json"}),n.end(JSON.stringify(t))}function k(n,e){if(n==="[DONE]")return e.write(`data: ${JSON.stringify({done:!0})}

`),!0;try{let t=JSON.parse(n),o=t.choices?.[0]?.delta?.content;o&&e.write(`data: ${JSON.stringify({content:o})}

`),t.choices?.[0]?.finish_reason==="stop"&&e.write(`data: ${JSON.stringify({done:!0})}

`)}catch{}return!1}async function b(n,e){if(e.setHeader("Access-Control-Allow-Origin","*"),e.setHeader("Access-Control-Allow-Methods","POST, OPTIONS"),e.setHeader("Access-Control-Allow-Headers","Content-Type"),n.method==="OPTIONS")return e.writeHead(200),e.end();if(n.method!=="POST")return c(e,405,{error:"Method not allowed."});if(!v())return c(e,500,{error:"Chat service unavailable. Please try again later."});let{messages:t}=n.body||{};if(!Array.isArray(t)||t.length===0)return c(e,400,{error:"Invalid request."});if(t.length>20)return c(e,400,{error:"Message history too long. Please start a new conversation."});let o=A(t[0]?.content||""),a=w(h,o),i=t.map((r,u)=>u===0?{role:"user",content:`${a}

---

${r.content}`}:r),s=[];for(let r of i)r.content&&(s.length>0&&s[s.length-1].role===r.role||s.push(r));if(s.length===0||s[s.length-1].role!=="user")return c(e,400,{error:"Invalid message sequence."});let l=await fetch("https://integrate.api.nvidia.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${v()}`},body:JSON.stringify({model:"google/gemma-2-2b-it",messages:s,temperature:.2,top_p:.7,max_tokens:1024,stream:!0}),signal:AbortSignal.timeout(3e4)});if(!l.ok){let r=await l.text();return console.error("NVIDIA API error:",l.status,r.substring(0,200)),c(e,502,{error:"Connection to AI service failed. Please try again or contact us via WhatsApp."})}e.setHeader("Content-Type","text/event-stream"),e.setHeader("Cache-Control","no-cache"),e.setHeader("Connection","keep-alive"),e.flushHeaders();let S=l.body.getReader(),$=new TextDecoder,d="";try{for(;;){let{done:r,value:u}=await S.read();if(r)break;d+=$.decode(u,{stream:!0});let m=d.split(`
`);d=m.pop();for(let C of m){let y=C.trim();if(!y.startsWith("data: "))continue;let P=y.slice(6);if(k(P,e))break}}if(d.trim().startsWith("data: ")){let r=d.trim().slice(6);k(r,e)}}catch{}e.end()}
