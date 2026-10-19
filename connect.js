/* Dearest — connect plug-in.
   Add this line to index.html, just before </body> (after preview.js if you use it):
   <script src="connect.js"></script>
   It turns "Preview & send" into a real preview of letter.html, adds a P.S. box and
   lock options, and gives you a shareable link + an email button. All colors are hex. */
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var B = $(".builder");
  var old = $("#preview");
  var editor = B && ($("#letter-editor", B) || $("textarea", B));
  if (!B || !old || !editor || $("#cn-ps")) return; // already loaded
  var nameIn = $('input[placeholder="Their name"]', B);
  var mailIn = $('input[type="email"]', B);
  var files = B.querySelectorAll('input[type="file"]');

  /* ---------- styles ---------- */
  var st = document.createElement("style");
  st.textContent = [
    ".cn-lock{margin-top:16px;padding-top:14px;border-top:1px solid var(--line,#e2c9c4)}",
    ".cn-lock b{display:block;color:var(--ink,#3a0f1f);font-size:20px}",
    ".cn-lock select,.cn-lock input{width:100%;margin-top:10px;background:var(--bg,#fbf3ee);color:var(--ink,#3a0f1f);border:1px solid var(--line,#e2c9c4);border-radius:12px;padding:12px 14px;font:400 18px 'Cormorant Garamond',Georgia,serif}",
    "#cn-ps{margin-top:12px}",
    "#cn-out{margin-top:20px}",
    ".cn-box{background:var(--card,#fffaf6);border:1px solid var(--gold,#a8812f);border-radius:16px;padding:18px 20px}",
    ".cn-box b{font-size:22px;color:var(--ink,#3a0f1f)}",
    ".cn-row{display:flex;gap:10px;flex-wrap:wrap;margin:14px 0 4px}",
    ".cn-row .btn{padding:11px 22px;font-size:18px}",
    ".cn-box p{margin:10px 0 0;color:var(--muted,#7a4a58);font-size:17px}",
    ".cn-err{color:var(--wine,#6b1230);font-style:italic}"
  ].join("\n");
  document.head.appendChild(st);

  /* ---------- extra fields ---------- */
  var ps = document.createElement("input");
  ps.type = "text"; ps.id = "cn-ps"; ps.placeholder = "P.S. (optional)"; ps.setAttribute("aria-label", "Postscript");
   editor.parentNode.insertBefore(ps, editor.nextSibling);

  var dp = $('[data-list="extras"]', B);
  dp = dp && dp.parentNode;
  if (dp) {
    var lk = document.createElement("div");
    lk.className = "cn-lock";
    lk.innerHTML = '<b>Lock the letter?</b>' +
      '<select id="cn-mode" aria-label="Lock type"><option value="">No lock</option><option value="date">Until a date and time</option><option value="q">Until they answer a question</option></select>' +
      '<input id="cn-date" type="datetime-local" hidden aria-label="Opens at">' +
      '<input id="cn-q" type="text" placeholder="Your question" hidden>' +
      '<input id="cn-a" type="text" placeholder="The answer" hidden>';
    dp.insertBefore(lk, $(".note", dp));
    $("#cn-mode").addEventListener("change", function () {
      $("#cn-date").hidden = this.value !== "date";
      $("#cn-q").hidden = $("#cn-a").hidden = this.value !== "q";
    });
  }

  /* ---------- build the letter data ---------- */
  function chosen(k) {
    return [].map.call(document.querySelectorAll('[data-list="' + k + '"] .chip[aria-pressed="true"]'), function (x) { return x.textContent; });
  }
  function letterContent() {
    if (window.DEAREST_PAPER_UI && window.DEAREST_PAPER_UI.getContent) return window.DEAREST_PAPER_UI.getContent();
    var text = editor.value !== undefined ? editor.value : (editor.innerText || editor.textContent || "");
    return {
      paperId: "original",
      richTextHtml: window.DEAREST_RICH_TEXT ? window.DEAREST_RICH_TEXT.getHtml(editor) : "",
      text: text
    };
  }
  function data(media) {
    var content = letterContent();
    var d = {
      to: nameIn ? nameIn.value.trim() : "",
      letter: chosen("letter")[0] || "", envelope: chosen("envelope")[0] || "", stamp: chosen("stamp")[0] || "",
      extras: chosen("extras"), paperId: content.paperId || "original",
      richTextHtml: content.richTextHtml || "", text: content.text || "", ps: ps.value.trim()
    };
    var m = $("#cn-mode"); m = m ? m.value : "";
    if (m === "date" && $("#cn-date").value) d.unlock = { date: $("#cn-date").value };
    if (m === "q" && $("#cn-q").value.trim() && $("#cn-a").value.trim()) d.unlock = { question: $("#cn-q").value.trim(), answer: $("#cn-a").value.trim() };
    if (media) { // works only in this browser, for the preview tab
      if (files[0] && files[0].files[0]) d.audio = URL.createObjectURL(files[0].files[0]);
      if (files[1] && files[1].files.length) d.photos = [].slice.call(files[1].files, 0, 6).map(function (f) { return { src: URL.createObjectURL(f), caption: "" }; });
    }
    return d;
  }
  function link(d) {
    var b = btoa(unescape(encodeURIComponent(JSON.stringify(d)))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    return new URL("letter.html", location.href).href + "#d=" + b;
  }

  /* ---------- the button ---------- */
  var btn = old.cloneNode(true); // drops the old "coming soon" handler
  old.parentNode.replaceChild(btn, old);
  var out = document.createElement("div");
  out.id = "cn-out"; out.setAttribute("role", "status");
  var msgOld = $("#msg"); if (msgOld) msgOld.hidden = true;
  btn.parentNode.parentNode.appendChild(out);

  function err(t) { out.innerHTML = '<p class="cn-err"></p>'; $("p", out).textContent = t; }
  function copy(t, done) {
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(done, function () { prompt("Copy your link:", t); });
    else prompt("Copy your link:", t);
  }

  btn.addEventListener("click", function () {
    if (!letterContent().text.trim()) return err("Write your words in step 7 first. Only you can write them.");
    var m = $("#cn-mode");
    if (m && m.value === "date" && !$("#cn-date").value) return err("Pick the date and time you want it to unlock.");
    if (m && m.value === "q" && !($("#cn-q").value.trim() && $("#cn-a").value.trim())) return err("Add both the question and its answer.");

    window.open(link(data(true)), "_blank");        // preview, with your song and photos
    var share = link(data(false));                   // link you can send
    var to = mailIn ? mailIn.value.trim() : "";
    var who = nameIn && nameIn.value.trim();
    var mail = "mailto:" + encodeURIComponent(to) + "?subject=" + encodeURIComponent("A letter for you") +
      "&body=" + encodeURIComponent("I wrote you a letter. Open it here:\n\n" + share);

    out.innerHTML = '<div class="cn-box"><b>Your letter is ready</b>' +
      '<div class="cn-row"><button class="btn" type="button" id="cn-copy">Copy link</button>' +
      '<a class="btn ghost" id="cn-mail" href="' + mail.replace(/"/g, "&quot;") + '">Email it' + (who ? " to " + who.replace(/[<>&"]/g, "") : "") + '</a></div>' +
      '<p>A preview just opened in a new tab. Your song and photos show there, but they can’t travel inside the link yet.</p>' +
      (share.length > 1900 ? '<p class="cn-err">This is a long letter, so the link is long too. If the email button doesn’t open, use Copy link and paste it into your message.</p>' : "") + '</div>';
    $("#cn-copy").addEventListener("click", function () {
      var b = this; copy(share, function () { b.textContent = "Copied ♥"; setTimeout(function () { b.textContent = "Copy link"; }, 1800); });
    });
  });
})();
