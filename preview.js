/* Dearest — live preview plug-in.
   Add this one line to index.html, just before </body>:
   <script src="preview.js"></script>
   Reads the builder's choices and shows them on a little envelope. All colors are hex. */
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var host = $(".builder .intro");
  if (!host || document.getElementById("lp")) return; // already loaded

  /* ---------- styles ---------- */
  var st = document.createElement("style");
  st.textContent = [
    "#lp{position:sticky;top:8px;z-index:20;display:flex;gap:14px;align-items:center;background:var(--card,#fffaf6);border:1px solid var(--gold,#a8812f);border-radius:16px;padding:12px 14px;margin:0 0 18px;box-shadow:0 10px 30px #00000026}",
    "#lp .sc{flex:0 0 min(44%,210px)}",
    ".lp-env{position:relative;aspect-ratio:3/2;border-radius:5px;box-shadow:0 8px 18px #00000033;transition:background .4s,border-color .4s;border:2px solid transparent}",
    ".lp-env .f{position:absolute;left:0;right:0;top:0;height:62%;clip-path:polygon(0 0,100% 0,50% 100%);border-radius:5px 5px 0 0;transition:background .4s}",
    ".lp-env .s{position:absolute;left:50%;top:42%;width:26%;aspect-ratio:1;margin-left:-13%;border-radius:50%;display:grid;place-items:center;font-size:clamp(11px,3.4vw,18px);color:#ffffffd9;box-shadow:0 3px 8px #00000066,inset 0 0 0 3px #ffffff26;transition:background .4s}",
    ".lp-env .p{position:absolute;right:5%;top:9%;width:17%;aspect-ratio:4/5;background:#fffaf0;border:2px dashed #c9a8a0;border-radius:2px;display:grid;place-items:center;font-size:clamp(9px,2.6vw,14px);color:#8c1d46;z-index:2}",
    ".lp-env .p.pulse{animation:lpp 1.2s ease-in-out infinite}",
    "@keyframes lpp{50%{transform:scale(1.12)}}",
    "#lp .in{flex:1;min-width:0}",
    "#lp .tt{font-family:'Pinyon Script','Snell Roundhand',cursive;font-size:28px;line-height:1;color:var(--rose,#b76e79);margin-bottom:6px}",
    "#lp .ln{font-size:16px;line-height:1.35;color:var(--muted,#7a4a58);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
    "#lp .ln b{color:var(--ink,#3a0f1f);font-weight:600}",
    "#lp .rd{margin-top:8px;padding:8px 16px;font-size:16px}",
    "#lp.lp-writing{position:relative;top:auto;z-index:1}",
    "#lp-m{position:fixed;inset:0;background:#000000b3;display:none;place-items:center;z-index:100;padding:20px}",
    "#lp-m.on{display:grid}",
    "#lp-m .pp{position:relative;width:100%;max-width:440px;max-height:80vh;overflow:auto;padding:34px 28px 30px;border-radius:6px;box-shadow:0 20px 60px #00000080;font-size:20px;line-height:1.7;white-space:pre-wrap;word-wrap:break-word}",
    "#lp-m .x{position:absolute;right:10px;top:6px;background:none;border:0;font-size:28px;cursor:pointer;color:inherit;opacity:.7}",
    "#lp-m .tags{margin-top:18px;padding-top:12px;border-top:1px solid #b76e7966;font-size:15px;font-style:italic;opacity:.8;white-space:normal}"
  ].join("\n");
  document.head.appendChild(st);

  /* ---------- markup ---------- */
  var box = document.createElement("div");
  box.id = "lp";
  box.setAttribute("aria-live", "polite");
  box.innerHTML =
    '<div class="sc"><div class="lp-env"><div class="f"></div><div class="s">♥</div><div class="p">♥</div></div></div>' +
    '<div class="in"><div class="tt">Live preview</div>' +
    '<div class="ln" data-k="letter"></div><div class="ln" data-k="envelope"></div>' +
    '<div class="ln" data-k="stamp"></div><div class="ln" data-k="extras"></div>' +
    '<button class="btn rd" type="button">Read letter</button></div>';
  host.parentNode.insertBefore(box, host.nextSibling);
  var paperStep = $("#paper-gallery") && $("#paper-gallery").closest(".panel");
  var writingStep = $("#letter-editor") && $("#letter-editor").closest(".panel");
  function syncPreviewPosition() {
    box.classList.toggle("lp-writing", !!((paperStep && paperStep.open) || (writingStep && writingStep.open)));
  }
  if (paperStep) paperStep.addEventListener("toggle", syncPreviewPosition);
  if (writingStep) writingStep.addEventListener("toggle", syncPreviewPosition);
  syncPreviewPosition();

  var modal = document.createElement("div");
  modal.id = "lp-m";
  modal.innerHTML = '<div class="pp" role="dialog" aria-label="Letter preview"><button class="x" aria-label="Close">×</button><div class="tx"></div><div class="tags"></div></div>';
  document.body.appendChild(modal);

  /* ---------- look-up tables (all hex) ---------- */
  // [pattern, envelope body, flap, seal, border]
  var ENV = [
    [/Regal Wax/i, "#ecd9b8", "#dcc294", "#8c1d2f", "#ecd9b8"],
    [/Lace|Ribbon/i, "#f7e1e6", "#efc9d3", "#d98ba0", "#f7e1e6"],
    [/Scroll|Parchment/i, "#e6d2a8", "#d6bf8c", "#7a4a1d", "#e6d2a8"],
    [/Airmail/i, "#fbf7f0", "#f1ece2", "#1f4e9c", "#c4283c"],
    [/Origami/i, "#f3ead8", "#e6d8bd", "#b3283f", "#f3ead8"],
    [/Telegram/i, "#d9c6a0", "#c9b48a", "#6b4a1d", "#d9c6a0"],
    [/Cassette|VHS/i, "#3a3a44", "#2b2b33", "#e0609b", "#3a3a44"],
    [/Gilded/i, "#2b1018", "#3a1823", "#d9b66a", "#d9b66a"],
    [/Gothic|Velvet/i, "#3b0a1a", "#2a0612", "#b88a2f", "#3b0a1a"],
    [/Cottagecore|Pressed/i, "#d8c3a0", "#c9b08a", "#6b7f4a", "#d8c3a0"],
    [/Cyberpunk|Neon/i, "#0f1229", "#171b3d", "#ff2f9b", "#2ff0ff"],
    [/Celestial|Star/i, "#101a3d", "#18255a", "#e5c76b", "#101a3d"],
    [/Minimalist|Soft/i, "#f4f1f2", "#e9e4e6", "#b76e79", "#f4f1f2"],
    [/Watercolor/i, "#f3dfe9", "#e6d1ee", "#c48bb8", "#f3dfe9"],
    [/Noir|Detective/i, "#cbb68a", "#b9a374", "#8c1d2f", "#cbb68a"],
    [/Rose|Bloom/i, "#f6d5da", "#eeb7c0", "#b3283f", "#f6d5da"],
    [/Safe|Vault|Lock/i, "#4a4f57", "#3a3e45", "#d9b66a", "#4a4f57"]
  ];
  var ENV_DEFAULT = ["#f1dcd0", "#e6c2b6", "#a3294f", "#f1dcd0"];

  var STAMP = [
    [/Victorian|Silhouette/i, "♛"], [/Wax-Cancel/i, "◎"], [/Mytholog/i, "❦"], [/Nouveau|Flora/i, "❀"],
    [/Aerogramme|Luggage/i, "✈"], [/Botanical/i, "☘"], [/Postmark/i, "≋"], [/Initials/i, "&"],
    [/Crane|Origami/i, "✦"], [/Cupid/i, "➳"], [/Constellation/i, "✧"], [/Knot/i, "∞"],
    [/Lip/i, "♡"], [/Line Art/i, "♡"], [/Barcode/i, "▌▎▍"], [/Holographic/i, "◆"], [/Pop Art/i, "✸"],
    [/Terrazzo/i, "◐"], [/Bauhaus/i, "◗"], [/Passport/i, "⌖"], [/Mixtape/i, "▭"], [/Bottle/i, "⚗"],
    [/Polaroid/i, "▣"], [/Glint|Sparkle/i, "✦"], [/Watercolor/i, "●"], [/Weather/i, "☼"]
  ];

  // [pattern, paper, ink, font]
  var PAPER = [
    [/1940s|Beat|Micro|Telegram/i, "#f1e6cf", "#3a2a1a", "'Courier New',Courier,monospace"],
    [/Gothic/i, "#2a0d19", "#f1d9dc", "'Cormorant Garamond',Georgia,serif"],
    [/Playful|Roaring|Pop-Culture/i, "#fff1f3", "#7a1232", "'Cormorant Garamond',Georgia,serif"],
    [/Victorian|Renaissance|Medieval|Romantic/i, "#f6ecd6", "#3a1f10", "'Cormorant Garamond',Georgia,serif"],
    [/Sensual|Erotic|Angsty/i, "#3b0a1a", "#f7dde0", "'Cormorant Garamond',Georgia,serif"]
  ];
  var PAPER_DEFAULT = ["#fffaf3", "#3a0f1f", "'Cormorant Garamond',Georgia,serif"];

  function find(table, name) {
    for (var i = 0; i < table.length; i++) if (table[i][0].test(name)) return table[i];
    return null;
  }
  function pick(k) {
    return [].map.call(document.querySelectorAll('[data-list="' + k + '"] .chip[aria-pressed="true"]'), function (x) { return x.textContent; });
  }

  /* ---------- files (music & photos) ---------- */
  var music = "", photos = 0;
  var files = document.querySelectorAll('.builder input[type="file"]');
  if (files[0]) files[0].addEventListener("change", function () { music = this.files[0] ? this.files[0].name : ""; update(); });
  if (files[1]) files[1].addEventListener("change", function () { photos = this.files.length; update(); });

  /* ---------- update ---------- */
  var env = $(".lp-env", box), flap = $(".f", env), seal = $(".s", env), stamp = $(".p", env);
  function line(k, label, val) {
    $('[data-k="' + k + '"]', box).innerHTML = "<b>" + label + "</b> " + val;
  }
  function esc(t) { return t.replace(/[&<>]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]; }); }

  function update() {
    var l = pick("letter")[0], e = pick("envelope")[0], s = pick("stamp")[0], x = pick("extras");

    var c = (e && find(ENV, e)) || [0].concat(ENV_DEFAULT);
    env.style.background = c[1]; flap.style.background = c[2]; seal.style.background = c[3]; env.style.borderColor = c[4];
    var g = (s && find(STAMP, s)) ; stamp.textContent = g ? g[1] : "♥";
    stamp.classList.toggle("pulse", !!(s && /Pulse|Shimmer|Sparkle/i.test(s)));

    line("letter", "Style", l || "not chosen yet");
    line("envelope", "Envelope", e || "not chosen yet");
    line("stamp", "Stamp", s || "not chosen yet");
    var extra = x.length ? x.length + " touch" + (x.length > 1 ? "es" : "") : "none yet";
    if (music) extra += " · ♪";
    if (photos) extra += " · ✿ " + photos;
    line("extras", "Extras", extra);

    var paperContent = window.DEAREST_PAPER_UI && window.DEAREST_PAPER_UI.getContent
      ? window.DEAREST_PAPER_UI.getContent() : null;
    var livePaper = document.getElementById("letter-live-content");
    if (livePaper && paperContent && paperContent.paperId === "original") {
      var legacyPaper = (l && find(PAPER, l)) || [0].concat(PAPER_DEFAULT);
      livePaper.style.backgroundColor = legacyPaper[1];
      livePaper.style.color = legacyPaper[2];
      livePaper.style.fontFamily = legacyPaper[3] || "'Cormorant Garamond',Georgia,serif";
      livePaper.style.setProperty("--paper-base", legacyPaper[1]);
      livePaper.style.setProperty("--paper-ink", legacyPaper[2]);
      livePaper.style.setProperty("--paper-font", legacyPaper[3] || "'Cormorant Garamond',Georgia,serif");
      if (window.DEAREST_PAPER_UI.updateContrast) window.DEAREST_PAPER_UI.updateContrast();
    }
  }

  /* ---------- reading the letter ---------- */
  var tx = $(".tx", modal), tags = $(".tags", modal), pp = $(".pp", modal);
  function openLetter() {
    var l = pick("letter")[0], pr = (l && find(PAPER, l)) || [0].concat(PAPER_DEFAULT);
    var content = window.DEAREST_PAPER_UI && window.DEAREST_PAPER_UI.getContent
      ? window.DEAREST_PAPER_UI.getContent()
      : { paperId: "original", richTextHtml: "", text: ($(".builder textarea") || {}).value || "" };
    if (content.paperId && content.paperId !== "original" && window.DEAREST_PAPER_CONFIG &&
        window.DEAREST_PAPER_CONFIG.has(content.paperId)) {
      window.DEAREST_PAPER_CONFIG.apply(pp, content.paperId);
    } else {
      pp.classList.remove("paper-sheet");
      pp.removeAttribute("data-paper-id");
      pp.removeAttribute("data-texture");
      pp.removeAttribute("data-edge");
      pp.style.background = pr[1]; pp.style.color = pr[2]; pp.style.fontFamily = pr[3];
    }
    var safeHtml = window.DEAREST_RICH_TEXT ? window.DEAREST_RICH_TEXT.sanitize(content.richTextHtml || "") : "";
    tx.innerHTML = safeHtml || (content.text.trim()
      ? (window.DEAREST_RICH_TEXT ? window.DEAREST_RICH_TEXT.plainTextToHtml(content.text) : esc(content.text))
      : '<span style="opacity:.55;font-style:italic">Your words will appear here once you write them.</span>');
    var psEl = document.getElementById("cn-ps"), psv = psEl ? psEl.value.trim() : "";
    if (psv) tx.innerHTML += '<div style="margin-top:1.2em;padding-top:.8em;border-top:1px dashed #b76e7999;font-style:italic">' + esc(psv) + "</div>";
    var bits = [].concat(pick("letter"), pick("envelope"), pick("stamp"), pick("extras"));
    if (music) bits.push("♪ " + music);
    if (photos) bits.push(photos + " photo" + (photos > 1 ? "s" : ""));
    tags.textContent = bits.join(" · ");
    modal.classList.add("on");
    $(".x", modal).focus();
  }
  function closeLetter() { modal.classList.remove("on"); }

  $(".rd", box).addEventListener("click", openLetter);
  $(".x", modal).addEventListener("click", closeLetter);
  modal.addEventListener("click", function (e) { if (e.target === modal) closeLetter(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeLetter(); });
  document.addEventListener("click", function () { setTimeout(update, 0); });

  update();
})();
