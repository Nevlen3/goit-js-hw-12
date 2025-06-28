import{a as m,S as h,i as a}from"./assets/vendor-DqB7j7Ix.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const y="50910167-da0c49dcf69b8279e7055dacc",g="https://pixabay.com/api/";async function b(o){const r={key:y,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0};return(await m.get(g,{params:r})).data}const d=document.querySelector(".gallery"),u=document.querySelector(".loader"),L=new h(".gallery a");function w(o){const r=o.map(({webformatURL:i,largeImageURL:s,tags:e,likes:t,views:n,comments:f,downloads:p})=>`
    <li class="photo-card">
      <a href="${s}">
        <img src="${i}" alt="${e}" />
        <div class="info">
          <p><b>Likes:</b> ${t}</p>
          <p><b>Views:</b> ${n}</p>
          <p><b>Comments:</b> ${f}</p>
          <p><b>Downloads:</b> ${p}</p>
        </div>
      </a>
    </li>
  `).join("");d.insertAdjacentHTML("beforeend",r),L.refresh()}function v(){d.innerHTML=""}function S(){u.classList.remove("is-hidden")}function q(){u.classList.add("is-hidden")}const c=document.querySelector(".form"),x=new URLSearchParams(window.location.search),l=x.get("search-text");l&&(c.elements["search-text"].value=l,c.dispatchEvent(new Event("submit")));c.addEventListener("submit",async o=>{o.preventDefault();const r=o.target.elements["search-text"].value.trim();if(!r){a.warning({message:"Будь ласка, введіть слово для пошуку!",position:"topRight"});return}v(),S();try{const s=(await b(r)).hits;s.length===0?a.info({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}):w(s)}catch{a.error({message:"Сталася помилка. Спробуйте ще раз.",position:"topRight"})}finally{q()}});
//# sourceMappingURL=index.js.map
