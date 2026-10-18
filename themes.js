/* Dearest — letter themes. Gives each of the 31 letter styles its own paper, fonts, mood and ornaments.
   Loaded by letter.html. All colors are hex. */
(function () {
  if (window.__dth) return; window.__dth = 1;
  var L = function (c, g) { return "repeating-linear-gradient(180deg,#0000 0 " + (g - 1) + "px," + c + " " + (g - 1) + "px " + g + "px)"; };
  var AIR = "border:10px solid transparent;border-image:repeating-linear-gradient(135deg,#c4283c 0 12px,#f4efe0 12px 24px,#1f4e9c 24px 36px) 10;";
  var tape = "<div style='position:absolute;top:-14px;left:50%;width:120px;height:30px;margin-left:-60px;background:repeating-linear-gradient(45deg,#ffd166 0 10px,#fff0c2 10px 20px);opacity:.9;transform:rotate(-3deg)'></div>";
  var ctr = function (css, t) { return "<div style='text-align:center;margin-bottom:16px;" + css + "'>" + t + "</div>"; };
  var CG = "'Cormorant Garamond',Georgia,serif";

  // [name pattern, theme]  b=page, p=paper, c=ink, f=font, s=size, a=align, x=paper css, o=other css (§=body.t), t/u=top/bottom ornament, dc=drop cap, li=list, fx=[type,glyphs,color]
  var T = [
    [/Victorian/, { b: "radial-gradient(ellipse at 50% 0,#3b2b1f,#120d09 75%)", p: "linear-gradient(#f5ecd9,#efe2c6)", c: "#2a1d14", f: "'IM Fell English',Georgia,serif", s: 21,
      x: "border:6px double #3a2a1f;box-shadow:inset 0 0 40px #8a6a3a33,0 20px 60px #000000aa;border-radius:2px", t: ctr("font-family:Pinyon Script;font-size:34px;color:#7a1f2b", "❦ ✥ ❦"), dc: "float:left;font:64px/.8 Pinyon Script;color:#7a1f2b;margin:6px 8px 0 0" }],
    [/Romantic/, { b: "linear-gradient(#2a1a3a,#4a2a4a 55%,#7a4a5a)", p: "linear-gradient(160deg,#fbeff0,#efe3f4 60%,#e6e9f7)", c: "#4a2a46", f: CG, s: 23, x: "font-style:italic;border-radius:14px;box-shadow:0 20px 60px #00000066,0 0 60px #e0a3c966", t: ctr("font-size:30px;color:#c78aa8", "❀ ~ ❀"), fx: ["fall", "❀ ✿", "#e0a3c9"] }],
    [/Medieval/, { b: "radial-gradient(#2b1b10,#0d0805)", p: "radial-gradient(ellipse at center,#e9d4a3,#d2b57c 85%,#a98650)", c: "#3a1d0c", f: "'IM Fell English',serif", s: 21,
      x: "box-shadow:inset 0 0 60px #6b3a1288;border-radius:6px 22px 8px 28px;clip-path:polygon(0 2%,3% 0,40% 1%,70% 0,100% 2%,99% 40%,100% 75%,98% 100%,60% 99%,30% 100%,1% 98%,0 60%)", t: ctr("font-family:Cinzel;letter-spacing:.3em;color:#8c1d1d", "✠ ✦ ✠"), dc: "float:left;font:72px/.85 UnifrakturMaguntia;color:#8c1d1d;text-shadow:2px 2px 0 #d9b66a;margin:4px 10px 0 0" }],
    [/Renaissance/, { b: "radial-gradient(#3a2414,#150c06)", p: "linear-gradient(90deg,#0000 54px,#a8452f55 54px 56px,#0000 56px),linear-gradient(#f0e0bf,#e8d1a2)", c: "#3b2312", f: "'EB Garamond',serif", s: 22, x: "font-style:italic;padding-left:78px!important;box-shadow:0 20px 60px #000000aa;border-radius:3px", t: ctr("color:#a8452f;font-size:26px", "⁂") }],
    [/Roaring/, { b: "repeating-conic-gradient(from 0deg at 50% 110%,#15110a 0 7.5deg,#241a0b 7.5deg 15deg)", p: "linear-gradient(#f6ecd0,#ecdcae)", c: "#1d1608", f: "'Josefin Sans',sans-serif", s: 19, x: "border:3px solid #b8903a;box-shadow:0 0 0 6px #1d1608,0 0 0 8px #b8903a,0 20px 60px #000000cc;border-radius:0", t: ctr("font-family:Poiret One;font-size:34px;letter-spacing:.3em;color:#b8903a", "◆ ◇ ◆") }],
    [/1940s|Wartime/, { b: "radial-gradient(#2a2e1c,#0e100a)", p: "linear-gradient(#e7dcb4,#ddd0a0)", c: "#2a2a1a", f: "'Special Elite','Courier New',monospace", s: 18, x: AIR + "box-shadow:0 20px 60px #000000aa;border-radius:0", t: "<div style='float:right;font-family:Special Elite;color:#b3283f;border:2px solid #b3283f;padding:2px 10px;transform:rotate(-4deg);font-size:13px;letter-spacing:.15em'>V-MAIL</div>" }],
    [/Beat/, { b: "radial-gradient(#201a14,#0a0806)", p: "linear-gradient(90deg,#0000 62px,#d44 62px 64px,#0000 64px)," + L("#6a8fcf88", 32) + ",#f7ec9a", c: "#1f2a5a", f: "'Caveat',cursive", s: 26, x: "padding-left:84px!important;transform:rotate(-.6deg);box-shadow:0 20px 60px #000000aa;border-radius:2px", o: "§ #tx p{line-height:32px;margin:0 0 32px}" }],
    [/Poetic/, { b: "linear-gradient(#1e1a33,#3a2a4a)", p: "radial-gradient(ellipse at 30% 20%,#fff,#f3e8f2 60%,#ead9ee)", c: "#4a2a5a", f: CG, s: 25, a: "center", x: "font-style:italic;border-radius:30px;box-shadow:0 0 80px #c9a3e066,0 20px 60px #00000066", t: ctr("font-size:28px;color:#b88ad0", "♪ ✧ ♫"), fx: ["tw", "✦ ♪", "#d9b6f0"] }],
    [/Gothic/, { b: "radial-gradient(ellipse at 50% 30%,#2a0a14,#07020a 75%)", p: "radial-gradient(ellipse at 50% 0,#3b0f1f,#1b0610)", c: "#f1d9dc", f: CG, s: 22, x: "border:1px solid #b88a2f;box-shadow:inset 0 0 0 8px #1b0610,inset 0 0 0 9px #b88a2f88,0 0 80px #8c1d4666,0 20px 60px #000", t: ctr("font-family:Cinzel;color:#b88a2f;font-size:26px;letter-spacing:.4em", "✟ ✦ ✟"), fx: ["rise", "· •", "#e0a35f"] }],
    [/Playful/, { b: "linear-gradient(#35122a,#5a1d48)", p: "radial-gradient(#ff8fb133 2px,#0000 3px) 0 0/22px 22px,#fff4f8", c: "#7a1d4a", f: "'Patrick Hand',cursive", s: 24, x: "border-radius:18px 28px 16px 30px;transform:rotate(-1deg);border:3px dashed #ff6f9c", t: tape }],
    [/Vulnerable/, { b: "radial-gradient(#1a1520,#08060b)", p: "radial-gradient(circle at 20% 80%,#b8a79a55 0 30px,#0000 32px),radial-gradient(circle at 80% 30%,#b8a79a44 0 22px,#0000 24px),#efe8df", c: "#3a3038", f: CG, s: 23, x: "font-style:italic;box-shadow:0 20px 60px #000000aa;border-radius:3px" }],
    [/Shy/, { b: "linear-gradient(#2a1426,#3d1d36)", p: "#fdeff2", c: "#7a5060", f: "'Handlee',cursive", s: 21, x: "max-width:430px;margin:0 auto;padding:30px 26px!important;border-radius:4px;box-shadow:0 14px 40px #000000aa", o: "§ #paper::after{content:'';position:absolute;right:0;bottom:0;border:0 solid;border-width:0 0 38px 38px;border-color:#0000 #0000 #3d1d36 #e8c3cc}" }],
    [/Erotic|Sensual/, { b: "radial-gradient(#3b0a1a,#12030a)", p: "linear-gradient(135deg,#5a0f2b,#2b0614 45%,#6b1230 70%,#2b0614)", c: "#f7dde0", f: "'Playfair Display',serif", s: 21, x: "font-style:italic;border-radius:12px;box-shadow:0 0 70px #b3284066,0 20px 60px #000,inset 0 0 0 1px #d9b66a55", fx: ["tw", "· ✦", "#f0b6c0"] }],
    [/Angsty/, { b: "linear-gradient(#0d0f1a,#1a1325)", p: "linear-gradient(115deg,#0000 40%,#00000012 41% 42%,#0000 43%)," + L("#8aa0c866", 30) + ",#ece6d8", c: "#1a1a2e", f: "'Shadows Into Light',cursive", s: 26, x: "padding-top:54px!important;clip-path:polygon(0 1%,4% 0,18% 1.5%,34% 0,52% 1%,70% 0,88% 1.5%,100% 0,99% 25%,100% 50%,98.5% 75%,100% 100%,80% 98.5%,60% 100%,40% 98.5%,20% 100%,0 99%,1.5% 70%,0 45%,1% 20%);transform:rotate(.8deg)", fx: ["fall", "|", "#7f8fc0"] }],
    [/Calm/, { b: "linear-gradient(#1b2a22,#101a15)", p: "repeating-linear-gradient(0deg,#00000008 0 1px,#0000 1px 3px),repeating-linear-gradient(90deg,#00000008 0 1px,#0000 1px 3px),#efeadb", c: "#33432f", f: "Lora,serif", s: 21, x: "border-radius:10px;box-shadow:0 20px 60px #00000088", t: ctr("color:#7a9a6a;font-size:22px", "❧") }],
    [/Confession/, { b: "linear-gradient(#2a1a33,#3d2347)", p: "linear-gradient(#0000 49.5%,#00000018 50%,#0000 50.5%),linear-gradient(90deg,#0000 52px,#e0505088 52px 54px,#0000 54px)," + L("#6aa0e066", 30) + ",#fffdf7", c: "#2c3a8a", f: "Kalam,cursive", s: 21, x: "padding-left:74px!important;transform:rotate(1deg);box-shadow:0 20px 60px #000000aa;border-radius:2px", t: "<div style='position:absolute;right:22px;top:12px;font-size:32px;color:#e0507a;transform:rotate(12deg)'>♡</div>", o: "§ #tx p{line-height:30px;margin:0 0 30px}" }],
    [/Long-Distance/, { b: "linear-gradient(#0e1a33,#1c2d52)", p: "linear-gradient(#f2f6fb,#e4ecf7)", c: "#1d2b4a", f: CG, s: 22, x: AIR + "box-shadow:0 20px 60px #000000aa;border-radius:0;font-style:italic", t: ctr("font-family:Cinzel;letter-spacing:.35em;color:#1f4e9c;font-size:14px", "✈ · · · · · · ♥"), fx: ["tw", "✦", "#bcd0ff"] }],
    [/Anniversary/, { b: "radial-gradient(#2a1d0c,#0e0904)", p: "linear-gradient(#fbf5e6,#f2e8cc)", c: "#3a2a10", f: "'Playfair Display',serif", s: 20, x: "border:2px solid #c9a24b;box-shadow:inset 0 0 0 9px #f6eed8,inset 0 0 0 10px #c9a24b,0 20px 60px #000000aa", t: ctr("color:#c9a24b;font-size:20px;letter-spacing:.5em", "● ─ ● ─ ●") }],
    [/Just Because/, { b: "linear-gradient(#2a2038,#3a2d4a)", p: "linear-gradient(#fff3a8,#ffe97a)", c: "#5a3a10", f: "Caveat,cursive", s: 28, x: "max-width:440px;margin:0 auto;transform:rotate(-2deg);border-radius:2px 2px 14px 2px;box-shadow:8px 14px 24px #00000080", t: tape }],
    [/Makeup|Apology/, { b: "linear-gradient(#1a2028,#0e1218)", p: "linear-gradient(90deg,#0000 49.7%,#00000014 50%,#0000 50.3%),linear-gradient(#0000 33%,#00000010 33.3%,#0000 33.6%),linear-gradient(#f5f6f8,#e6e9ee)", c: "#2a3340", f: "Lora,serif", s: 21, x: "font-style:italic;border-radius:3px;box-shadow:0 20px 60px #000000aa" }],
    [/Reassurance/, { b: "radial-gradient(ellipse at 50% 100%,#6b3a2a,#2a1612 70%)", p: "radial-gradient(ellipse at 50% 0,#fff6ea,#fde3cf 80%)", c: "#6a3a24", f: "Nunito,sans-serif", s: 20, x: "border-radius:28px;box-shadow:0 0 90px #ffb88a66,0 20px 60px #00000066", fx: ["tw", "·", "#ffc99a"] }],
    [/Marriage/, { b: "radial-gradient(#1d1730,#08060f)", p: "linear-gradient(135deg,#fffaf0,#f4ead0 55%,#fff6e0)", c: "#4a3a18", f: CG, s: 23, x: "border:3px double #c9a24b;box-shadow:0 0 90px #ffe9a366,0 20px 60px #000", t: ctr("font-family:Great Vibes;color:#c9a24b;font-size:44px", "◇"), fx: ["tw", "✦ ✧", "#ffe7a0"] }],
    [/Wedding/, { b: "linear-gradient(#2a2430,#4a3f55)", p: "#fffdfb", c: "#6a5058", f: CG, s: 23, a: "center", x: "font-style:italic;border-top:14px dotted #e8d6d0;border-bottom:14px dotted #e8d6d0;box-shadow:0 0 70px #ffffff44,0 20px 60px #00000066;border-radius:6px", t: ctr("font-family:Pinyon Script;color:#c9a24b;font-size:38px", "~ ♥ ~"), fx: ["tw", "✧", "#ffffff"] }],
    [/Future/, { b: "radial-gradient(#0a1230,#02040c)", p: "linear-gradient(135deg,#dfe7f2,#b9c8de 40%,#e8eef7 60%,#aebfd6)", c: "#0e1c33", f: CG, s: 22, x: "border:2px solid #7fa0d0;border-radius:6px;box-shadow:0 0 60px #4f7fd066,0 20px 60px #000", t: ctr("font-family:Orbitron;letter-spacing:.35em;color:#3a5a9a;font-size:13px", "◐ ▪▪▪▪▪ ◑"), fx: ["tw", "· ✦", "#bcd0ff"] }],
    [/Alternate|Fantasy/, { b: "radial-gradient(#1a1040,#05030f)", p: "radial-gradient(ellipse at center,#f1e4bf,#dcc690 85%)", c: "#3a2a14", f: "'IM Fell English',serif", s: 21, x: "box-shadow:0 0 80px #8ad9a666,0 0 0 2px #b88a2f,0 20px 60px #000;border-radius:8px 30px 8px 30px", t: ctr("color:#2f8a5a;font-size:22px;letter-spacing:.5em", "ᚠ ᚢ ᚦ ᚨ ᚱ"), dc: "float:left;font:70px/.85 UnifrakturMaguntia;color:#2f8a5a;margin:4px 10px 0 0", fx: ["tw", "✦ ✧", "#8ad9a6"] }],
    [/Micro/, { b: "linear-gradient(#1b1b1b,#2a2a2a)", p: "linear-gradient(#f6e9a8,#efdc84)", c: "#2a2410", f: "'Special Elite',monospace", s: 19, x: "max-width:440px;margin:0 auto;padding:26px 24px!important;border-top:10px solid #b3283f;border-bottom:10px solid #b3283f;border-radius:0", t: ctr("letter-spacing:.4em;font-size:13px;color:#b3283f", "▪ ▪ ▪ ▪ ▪"), o: "§ #tx p{text-transform:uppercase;letter-spacing:.08em}" }],
    [/Bulleted/, { b: "linear-gradient(#2a1a2a,#3a2438)", p: L("#e8a0b8aa", 34) + ",#fff9fb", c: "#6a2a4a", f: "'Patrick Hand',cursive", s: 23, x: "box-shadow:0 20px 60px #000000aa;border-radius:4px;padding-top:34px!important", li: 1, o: "§ #tx p{margin:0;line-height:34px}§ .li{line-height:34px}§ .li::before{content:'♥';color:#e0507a;margin-right:10px}" }],
    [/Pop-Culture/, { b: "radial-gradient(#ff3d7f55 2px,#0000 3px) 0 0/16px 16px,#1a0a2a", p: "radial-gradient(#ffd16655 2px,#0000 3px) 0 0/12px 12px,#fffbe6", c: "#1a0a2a", f: "'Comic Neue',sans-serif", s: 22, x: "border:5px solid #1a0a2a;box-shadow:10px 10px 0 #ff3d7f,0 0 0 5px #ffd166;border-radius:6px;font-weight:700", t: ctr("font-family:Bangers;font-size:38px;color:#ff3d7f;text-shadow:3px 3px 0 #1a0a2a;letter-spacing:.1em", "★ ♥ ★") }],
    [/Fiction/, { b: "radial-gradient(#2b1c12,#0c0704)", p: "linear-gradient(90deg,#00000030,#0000 8%,#0000 92%,#00000018),linear-gradient(#f4e8cc,#ead9b0)", c: "#2a1a0e", f: "'IM Fell English',serif", s: 21, x: "border-radius:2px 8px 8px 2px;box-shadow:inset 20px 0 30px -12px #00000066,0 20px 60px #000", dc: "float:left;font:74px/.8 UnifrakturMaguntia;color:#5a2a1a;margin:6px 10px 0 0", u: ctr("color:#7a5a3a;font-size:15px;margin:20px 0 0;font-style:italic", "— 1 —") }],
    [/Open When/, { b: "linear-gradient(#2a1d12,#150e08)", p: "repeating-linear-gradient(90deg,#00000008 0 2px,#0000 2px 5px),linear-gradient(#c9a26b,#b98e56)", c: "#3a2410", f: "Caveat,cursive", s: 27, x: "border:2px dashed #7a5a2a;box-shadow:0 20px 60px #000000aa;border-radius:4px", t: "<div style='font-family:Special Elite;color:#7a1f2b;border:2px solid #7a1f2b;display:table;margin:0 auto 16px;padding:4px 14px;transform:rotate(-2deg);letter-spacing:.2em;font-size:14px'>OPEN WHEN…</div>" }],
    [/Abstract/, { b: "radial-gradient(circle at 20% 20%,#5a2a8a,#0000 50%),radial-gradient(circle at 80% 30%,#c23a62,#0000 50%),radial-gradient(circle at 50% 90%,#1f6a8a,#0000 55%),#120a22", p: "radial-gradient(circle at 15% 20%,#ffc2dd88,#0000 40%),radial-gradient(circle at 85% 70%,#bfe3ff88,#0000 45%),radial-gradient(circle at 40% 100%,#d9c2ff88,#0000 50%),#fffafd", c: "#3a2a5a", f: CG, s: 24, a: "center", x: "border-radius:40px;box-shadow:0 0 90px #c28aff66;font-weight:300" }]
  ];

  /* which style is this letter? */
  var h = location.hash, name = "Victorian Formal";
  if (h.indexOf("#d=") === 0) { try { name = JSON.parse(decodeURIComponent(escape(atob(h.slice(3).replace(/-/g, "+").replace(/_/g, "/"))))).letter || ""; } catch (e) {} }
  else if (h.indexOf("#demo:") === 0) name = decodeURIComponent(h.slice(6));
  var th = null; for (var i = 0; i < T.length; i++) if (T[i][0].test(name)) { th = T[i][1]; break; }
  if (!th) return;

  /* fonts */
  var lk = document.createElement("link"); lk.rel = "stylesheet";
  lk.href = "https://fonts.googleapis.com/css2?family=EB+Garamond:ital@0;1&family=Lora:ital@0;1&family=Playfair+Display:ital@0;1&family=IM+Fell+English&family=Josefin+Sans&family=Poiret+One&family=Special+Elite&family=Caveat&family=Cinzel&family=Patrick+Hand&family=Great+Vibes&family=Orbitron&family=Bangers&family=Comic+Neue:wght@700&family=Kalam&family=Handlee&family=Nunito&family=UnifrakturMaguntia&family=Shadows+Into+Light&display=swap";
  document.head.appendChild(lk);

  /* styles */
  var css = "body.t{background:" + th.b + " fixed!important}" +
    "body.t #rd{max-width:620px}body.t #rd,body.t #stage{position:relative;z-index:1}" +
    "body.t #paper{position:relative;padding:44px 34px;background:" + th.p + "!important;color:" + th.c + "!important;font-family:" + th.f + "!important;" + (th.x || "") + "}" +
    "body.t #tx p{font-size:" + (th.s || 21) + "px;line-height:1.7;margin:0 0 1em;" + (th.a ? "text-align:" + th.a : "") + "}" +
    "body.t #psw{border-color:" + th.c + "77}" +
    (th.dc ? "body.t #tx p:first-child::first-letter{" + th.dc + "}" : "") +
    (th.o ? th.o.replace(/§/g, "body.t") : "") +
    "#fx i{position:fixed;pointer-events:none;z-index:0;font-style:normal;opacity:0}" +
    "@keyframes dtw{0%,100%{opacity:0;transform:scale(.5)}50%{opacity:.9;transform:scale(1)}}" +
    "@keyframes drs{from{opacity:.8;transform:translateY(0)}to{opacity:0;transform:translateY(-105vh)}}" +
    "@keyframes dfl{from{opacity:.6;transform:translateY(0)}to{opacity:.6;transform:translateY(115vh)}}";
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
  document.body.classList.add("t");

  /* ornaments */
  var pa = document.getElementById("paper");
  if (th.t) pa.insertAdjacentHTML("afterbegin", th.t);
  if (th.u) pa.insertAdjacentHTML("beforeend", th.u);

  /* bullet list mode */
  if (th.li) {
    var esc = function (t) { return t.replace(/[&<>]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]; }); };
    new MutationObserver(function () {
      [].forEach.call(document.querySelectorAll("#tx p"), function (p) {
        if (p.dataset.l) return; p.dataset.l = 1;
        p.innerHTML = p.textContent.split("\n").filter(Boolean).map(function (l) { return "<div class='li'>" + esc(l) + "</div>"; }).join("");
      });
    }).observe(document.getElementById("tx"), { childList: true });
  }

  /* floating sparkles / rain / embers */
  if (th.fx && !(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches)) {
    var box = document.createElement("div"); box.id = "fx"; document.body.appendChild(box);
    var g = th.fx[1].split(" "), k = th.fx[0], n = k === "fall" ? 36 : 22;
    for (var j = 0; j < n; j++) {
      var e = document.createElement("i"), r = Math.random;
      e.textContent = g[j % g.length];
      e.style.cssText = "left:" + (r() * 100) + "%;color:" + th.fx[2] + ";font-size:" + (10 + r() * 14) + "px;" +
        (k === "tw" ? "top:" + (r() * 100) + "%;animation:dtw " + (3 + r() * 4) + "s " + (-r() * 6) + "s infinite ease-in-out"
          : k === "rise" ? "bottom:-20px;animation:drs " + (6 + r() * 6) + "s " + (-r() * 10) + "s infinite linear"
            : "top:-20px;animation:dfl " + (5 + r() * 7) + "s " + (-r() * 10) + "s infinite linear");
      box.appendChild(e);
    }
  }
})();
