/* Dearest — "Send for real" plug-in (saves to Supabase, gives a short link).
   Add these lines to index.html just before </body>, AFTER connect.js:
   <script src="config.js"></script>
   <script src="send.js"></script>
   All colors are hex. */
(function () {
  var C = window.DEAREST, $ = function (s, r) { return (r || document).querySelector(s); };
  var B = $(".builder"), bar = B && $(".bar", B), editor = B && ($("#letter-editor", B) || $("textarea", B));
  if (!C || !bar || !editor || $("#sd-out")) return; // already loaded
  var H = { apikey: C.key, Authorization: "Bearer " + C.key };
  var nameIn = $('input[placeholder="Their name"]', B), mailIn = $('input[type="email"]', B);
  var files = B.querySelectorAll('input[type="file"]');

  var st = document.createElement("style");
  st.textContent = "#sd-out{margin-top:20px}.sd-box{background:var(--card,#fffaf6);border:1px solid var(--gold,#a8812f);border-radius:16px;padding:18px 20px}" +
    ".sd-box b{font-size:22px;color:var(--ink,#3a0f1f)}.sd-link{display:block;margin:12px 0 4px;padding:10px 14px;border:1px dashed var(--rose,#b76e79);border-radius:12px;color:var(--rose,#b76e79);word-break:break-all;font-size:17px}" +
    ".sd-row{display:flex;gap:10px;flex-wrap:wrap;margin:12px 0 4px}.sd-row .btn{padding:11px 22px;font-size:18px}.sd-box p{margin:10px 0 0;color:var(--muted,#7a4a58);font-size:17px}.sd-err{color:var(--wine,#6b1230);font-style:italic}";
  document.head.appendChild(st);

  var btn = document.createElement("button");
  btn.type = "button"; btn.className = "btn"; btn.textContent = "Send for real ♥";
  bar.appendChild(btn);
  var out = document.createElement("div"); out.id = "sd-out"; out.setAttribute("role", "status");
  B.appendChild(out);

  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function err(t) { out.innerHTML = '<p class="sd-err">' + esc(t) + "</p>"; }
  function chosen(k) { return [].map.call(document.querySelectorAll('[data-list="' + k + '"] .chip[aria-pressed="true"]'), function (x) { return x.textContent; }); }
  function val(sel) { var e = $(sel); return e ? e.value.trim() : ""; }
  function letterContent() {
    if (window.DEAREST_PAPER_UI && window.DEAREST_PAPER_UI.getContent) return window.DEAREST_PAPER_UI.getContent();
    var text = editor.value !== undefined ? editor.value : (editor.innerText || editor.textContent || "");
    return {
      paperId: "original",
      richTextHtml: window.DEAREST_RICH_TEXT ? window.DEAREST_RICH_TEXT.getHtml(editor) : "",
      text: text
    };
  }

  async function up(file, id, i) {
    if (file.size > 15 * 1024 * 1024) throw new Error(file.name + " is over 15 MB. Please choose a smaller file.");
    var path = id + "/" + i + "-" + file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-").slice(-60);
    var r = await fetch(C.url + "/storage/v1/object/media/" + path, {
      method: "POST", body: file,
      headers: Object.assign({ "Content-Type": file.type || "application/octet-stream", "x-upsert": "false" }, H)
    });
    if (!r.ok) throw new Error("Upload failed (" + r.status + "). Check the storage setup.");
    return C.url + "/storage/v1/object/public/media/" + path;
  }

  btn.addEventListener("click", async function () {
    var content = letterContent();
    if (!content.text.trim()) return err("Write your words in step 7 first. Only you can write them.");
    var mode = val("#cn-mode"), date = val("#cn-date"), q = val("#cn-q"), a = val("#cn-a");
    if (mode === "date" && !date) return err("Pick the date and time you want it to unlock.");
    if (mode === "q" && !(q && a)) return err("Add both the question and its answer.");

    var label = btn.textContent; btn.disabled = true; btn.textContent = "Sealing your letter…"; out.innerHTML = "";
    try {
      var id = Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
      var d = {
        to: nameIn ? nameIn.value.trim() : "", letter: chosen("letter")[0] || "", envelope: chosen("envelope")[0] || "",
        stamp: chosen("stamp")[0] || "", extras: chosen("extras"), paperId: content.paperId || "original",
        richTextHtml: content.richTextHtml || "", text: content.text || "", ps: val("#cn-ps")
      };
      if (files[0] && files[0].files[0]) { btn.textContent = "Uploading your song…"; d.audio = await up(files[0].files[0], id, 0); }
      if (files[1] && files[1].files.length) {
        btn.textContent = "Uploading photos…"; d.photos = [];
        var list = [].slice.call(files[1].files, 0, 6);
        for (var i = 0; i < list.length; i++) d.photos.push({ src: await up(list[i], id, i + 1), caption: "" });
      }
      btn.textContent = "Sealing your letter…";
      var r = await fetch(C.url + "/rest/v1/rpc/create_letter", {
        method: "POST", headers: Object.assign({ "Content-Type": "application/json" }, H),
        body: JSON.stringify({
          p_data: d,
          p_unlock_at: mode === "date" ? new Date(date).toISOString() : null,
          p_question: mode === "q" ? q : null, p_answer: mode === "q" ? a : null
        })
      });
      if (!r.ok) { var e = {}; try { e = await r.json(); } catch (x) {} throw new Error(e.message || "Couldn’t save the letter (" + r.status + ")."); }
      var letterId = await r.json();
      var link = new URL("l.html?id=" + encodeURIComponent(letterId), location.href).href;
      var to = mailIn ? mailIn.value.trim() : "";
      var mail = "mailto:" + encodeURIComponent(to) + "?subject=" + encodeURIComponent("A letter for you") +
        "&body=" + encodeURIComponent("I wrote you a letter. Open it here:\n\n" + link);
      out.innerHTML = '<div class="sd-box"><b>Your letter is sealed ♥</b><span class="sd-link">' + esc(link) + '</span>' +
        '<div class="sd-row"><button class="btn" type="button" id="sd-copy">Copy link</button>' +
        '<a class="btn ghost" href="' + esc(mail) + '">Email it</a><a class="btn ghost" href="' + esc(link) + '" target="_blank" rel="noopener">Open it</a></div>' +
        '<p>Your song and photos are saved with the letter. Locks are checked by the server, so a locked letter stays sealed until it’s time.</p></div>';
      $("#sd-copy").addEventListener("click", function () {
        var b = this, done = function () { b.textContent = "Copied ♥"; setTimeout(function () { b.textContent = "Copy link"; }, 1800); };
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(link).then(done, function () { prompt("Copy your link:", link); });
        else prompt("Copy your link:", link);
      });
    } catch (e2) { err(e2.message || "Something went wrong. Please try again."); }
    btn.disabled = false; btn.textContent = label;
  });
})();
