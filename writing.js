(async function () {
  if (!window.sharedWritingEnabled) return;

  const config = window.supabaseConfig || {};
  const listTarget = document.querySelector('[data-render="insights"], [data-render="reflections"]');
  const composeTarget = document.querySelector('[data-render="compose"]');
  if (!listTarget && !composeTarget) return;

  const escapeHTML = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[char]));
  const withBreaks = (value) => escapeHTML(value).replace(/\n/g, "<br>");
  const parseTags = (value) => String(value || "").split(/[,，、]/).map((tag) => tag.trim()).filter(Boolean);
  const todayStamp = () => {
    const date = new Date();
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
  };
  const formatTime = (value) => new Intl.DateTimeFormat("zh-CN", {
    year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit"
  }).format(new Date(value));

  if (!config.url || !config.publishableKey || !window.supabase?.createClient) {
    const target = listTarget || composeTarget;
    target.innerHTML = `
      <div class="writing-state">
        <h2>共享内容服务尚未配置</h2>
        <p>请先填写 <code>supabase-config.js</code> 中的项目 URL 和 publishable key。</p>
      </div>`;
    return;
  }

  const client = window.supabase.createClient(config.url, config.publishableKey, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
  });
  let admin = false;

  async function refreshAdminState() {
    const { data: { user } } = await client.auth.getUser();
    if (!user) {
      admin = false;
      return null;
    }
    const { data, error } = await client.from("site_admins").select("user_id").eq("user_id", user.id).maybeSingle();
    admin = !error && Boolean(data);
    return user;
  }

  function tagsHTML(tags) {
    return (tags || []).map((tag) => `<span class="tag">${escapeHTML(tag)}</span>`).join("");
  }

  function commentHTML(comment, replies) {
    return `
      <article class="comment ${comment.parent_id ? "comment-reply" : ""}" data-comment-id="${comment.id}">
        <div class="comment-meta">
          <strong>${escapeHTML(comment.author_name)}${comment.is_owner ? '<span class="owner-badge">作者</span>' : ""}</strong>
          <time>${formatTime(comment.created_at)}</time>
        </div>
        <p>${withBreaks(comment.body)}</p>
        <div class="comment-actions">
          <button type="button" data-action="reply" data-comment-id="${comment.id}" data-author="${escapeHTML(comment.author_name)}">回复</button>
          ${admin ? `<button type="button" data-action="delete-comment" data-comment-id="${comment.id}">删除</button>` : ""}
        </div>
        ${replies.length ? `<div class="comment-replies">${replies.map((reply) => commentHTML(reply, [])).join("")}</div>` : ""}
      </article>`;
  }

  function commentsSection(post, comments) {
    const roots = comments.filter((comment) => comment.post_id === post.id && !comment.parent_id);
    return `
      <section class="comments" aria-label="评论区">
        <div class="comments-heading"><h3>评论</h3><span>${comments.filter((item) => item.post_id === post.id).length}</span></div>
        <div class="comment-list">
          ${roots.length ? roots.map((comment) => commentHTML(
            comment,
            comments.filter((reply) => reply.parent_id === comment.id)
          )).join("") : '<p class="no-comments">还没有评论，来说说你的想法吧。</p>'}
        </div>
        <form class="comment-form" data-post-id="${post.id}">
          <input type="hidden" name="parent_id" value="">
          <div class="replying-to" hidden>正在回复 <strong></strong><button type="button" data-action="cancel-reply">取消</button></div>
          <label><span>你的称呼</span><input name="author_name" maxlength="80" required autocomplete="name" placeholder="怎么称呼你"></label>
          <label><span>评论内容</span><textarea name="body" maxlength="2000" rows="3" required placeholder="友善交流，留下你的想法"></textarea></label>
          <label class="comment-honeypot" aria-hidden="true">网址<input name="website" tabindex="-1" autocomplete="off"></label>
          <button type="submit">发表评论</button>
          <p class="form-status" aria-live="polite"></p>
        </form>
      </section>`;
  }

  async function fetchPosts(type) {
    const { data, error } = await client.from("posts")
      .select("id,type,title,content,date_text,series,status,tags,notes,created_at,updated_at")
      .eq("type", type)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data || [];
  }

  async function fetchComments(posts) {
    if (!posts.length) return [];
    const { data, error } = await client.from("comments")
      .select("id,post_id,parent_id,author_name,body,is_owner,created_at")
      .in("post_id", posts.map((post) => post.id))
      .order("created_at", { ascending: true });
    if (error) throw error;
    return data || [];
  }

  async function renderList() {
    const type = listTarget.dataset.render;
    listTarget.innerHTML = '<p class="writing-state">正在加载内容…</p>';
    try {
      await refreshAdminState();
      const posts = await fetchPosts(type);
      const comments = await fetchComments(posts);
      const label = type === "reflections" ? "知识沉淀" : "随记";
      listTarget.innerHTML = `
        <div class="writing-toolbar">
          ${admin ? `
            <a class="publish-button" href="compose.html?type=${type}">发布${label}</a>
            <button class="ghost-button" type="button" data-action="import-local">导入本机旧内容</button>
            <button class="ghost-button" type="button" data-action="logout">退出管理</button>
          ` : `<a class="manage-link" href="compose.html?type=${type}">管理员入口</a>`}
        </div>
        ${posts.length ? posts.map((post) => `
          <article class="${type === "reflections" ? "reflection-card" : "insight-card"}" data-id="${post.id}">
            ${type === "reflections" ? `
              <div class="reflection-head"><p class="reflection-series">${escapeHTML(post.series)}</p><span>${escapeHTML(post.status)}</span></div>
            ` : ""}
            <div class="writing-card-head">
              ${type === "insights" ? `<time>${escapeHTML(post.date_text)}</time>` : `<h2>${escapeHTML(post.title)}</h2>`}
              ${admin ? `<div class="card-actions"><a href="compose.html?type=${type}&id=${post.id}">编辑</a><button type="button" data-action="delete-post" data-post-id="${post.id}">删除</button></div>` : ""}
            </div>
            ${type === "insights" ? `<h2>${escapeHTML(post.title)}</h2><p>${withBreaks(post.content)}</p>` : `<p>${withBreaks(post.content)}</p>`}
            <div class="tags">${tagsHTML(post.tags)}</div>
            ${type === "reflections" && post.notes?.length ? `<ul>${post.notes.map((note) => `<li>${escapeHTML(note)}</li>`).join("")}</ul>` : ""}
            ${commentsSection(post, comments)}
          </article>
        `).join("") : `<p class="empty-writing">暂无${label}</p>`}`;
      bindListEvents(type);
    } catch (error) {
      listTarget.innerHTML = `<div class="writing-state error-state"><h2>内容加载失败</h2><p>${escapeHTML(error.message)}</p></div>`;
    }
  }

  function bindListEvents(type) {
    listTarget.onclick = async (event) => {
      const action = event.target.closest("[data-action]")?.dataset.action;
      if (!action) return;
      if (action === "reply") {
        const button = event.target.closest("button");
        const form = button.closest("article[data-id]").querySelector(".comment-form");
        form.elements.parent_id.value = button.dataset.commentId;
        const hint = form.querySelector(".replying-to");
        hint.hidden = false;
        hint.querySelector("strong").textContent = button.dataset.author;
        form.elements.body.focus();
      }
      if (action === "cancel-reply") {
        const form = event.target.closest("form");
        form.elements.parent_id.value = "";
        form.querySelector(".replying-to").hidden = true;
      }
      if (action === "logout") {
        await client.auth.signOut();
        await renderList();
      }
      if (action === "delete-post" && admin) {
        if (!window.confirm("确认删除这篇内容及其全部评论吗？")) return;
        const { error } = await client.from("posts").delete().eq("id", event.target.dataset.postId);
        if (error) window.alert(error.message); else await renderList();
      }
      if (action === "delete-comment" && admin) {
        if (!window.confirm("确认删除这条评论吗？")) return;
        const { error } = await client.from("comments").delete().eq("id", event.target.dataset.commentId);
        if (error) window.alert(error.message); else await renderList();
      }
      if (action === "import-local" && admin) await importLocalItems();
    };

    listTarget.onsubmit = async (event) => {
      const form = event.target.closest(".comment-form");
      if (!form) return;
      event.preventDefault();
      if (form.elements.website.value) return;
      const status = form.querySelector(".form-status");
      const submit = form.querySelector("button[type='submit']");
      status.textContent = "正在提交…";
      submit.disabled = true;
      const name = form.elements.author_name.value.trim();
      localStorage.setItem("yan-yiran-comment-name", name);
      const payload = {
        post_id: form.dataset.postId,
        parent_id: form.elements.parent_id.value ? Number(form.elements.parent_id.value) : null,
        author_name: name,
        body: form.elements.body.value.trim()
      };
      const { error } = await client.from("comments").insert(payload);
      if (error) {
        status.textContent = `提交失败：${error.message}`;
        submit.disabled = false;
      } else {
        await renderList();
      }
    };

    const savedName = localStorage.getItem("yan-yiran-comment-name");
    if (savedName) listTarget.querySelectorAll('input[name="author_name"]').forEach((input) => { input.value = savedName; });
  }

  async function importLocalItems() {
    const rows = [];
    for (const type of ["insights", "reflections"]) {
      let items = [];
      try { items = JSON.parse(localStorage.getItem(`yan-yiran-${type}`) || "[]"); } catch (_) { /* ignore */ }
      if (!Array.isArray(items)) continue;
      items.forEach((item, index) => rows.push({
        type,
        title: item.title || "未命名内容",
        content: type === "reflections" ? (item.summary || "") : (item.body || ""),
        date_text: item.date || null,
        series: item.series || null,
        status: item.status || null,
        tags: item.tags || [],
        notes: item.notes || [],
        legacy_key: String(item.id || `${type}-${index}`)
      }));
    }
    if (!rows.length) {
      window.alert("当前浏览器没有可导入的旧内容。");
      return;
    }
    const { error } = await client.from("posts").upsert(rows, { onConflict: "legacy_key", ignoreDuplicates: true });
    if (error) window.alert(`导入失败：${error.message}`);
    else {
      window.alert(`已导入 ${rows.length} 条本机旧内容。`);
      await renderList();
    }
  }

  function loginHTML(message = "") {
    return `
      <a class="back-link" href="insights.html">返回内容页</a>
      <p class="section-kicker">Admin</p>
      <h1>管理员登录</h1>
      <p>只有站点管理员可以发布、编辑和删除文章。</p>
      <form class="writing-editor admin-login">
        <label><span>邮箱</span><input name="email" type="email" autocomplete="username" required></label>
        <label><span>密码</span><input name="password" type="password" autocomplete="current-password" required></label>
        <div class="editor-actions"><button type="submit">登录</button></div>
        <p class="form-status" aria-live="polite">${escapeHTML(message)}</p>
      </form>`;
  }

  async function renderCompose() {
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type") === "reflections" ? "reflections" : "insights";
    const isReflection = type === "reflections";
    const listPage = isReflection ? "reflections.html" : "insights.html";
    composeTarget.innerHTML = '<p class="writing-state">正在验证管理员身份…</p>';
    await refreshAdminState();
    if (!admin) {
      composeTarget.innerHTML = loginHTML();
      const form = composeTarget.querySelector("form");
      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const status = form.querySelector(".form-status");
        status.textContent = "正在登录…";
        const { error } = await client.auth.signInWithPassword({
          email: form.elements.email.value.trim(),
          password: form.elements.password.value
        });
        if (error) status.textContent = `登录失败：${error.message}`;
        else {
          await refreshAdminState();
          if (!admin) {
            await client.auth.signOut();
            status.textContent = "这个账号不是站点管理员。";
          } else await renderCompose();
        }
      });
      return;
    }

    const editId = params.get("id");
    let post = null;
    if (editId) {
      const { data, error } = await client.from("posts").select("*").eq("id", editId).eq("type", type).maybeSingle();
      if (error) {
        composeTarget.innerHTML = `<p class="writing-state error-state">${escapeHTML(error.message)}</p>`;
        return;
      }
      post = data;
    }
    const title = `${post ? "编辑" : "发布"}${isReflection ? "知识沉淀" : "随记"}`;
    composeTarget.innerHTML = `
      <a class="back-link" href="${listPage}">返回${isReflection ? "知识沉淀" : "随记"}</a>
      <p class="section-kicker">${isReflection ? "Reflections" : "Insights"}</p>
      <h1>${title}</h1>
      <form class="writing-editor compose-editor">
        ${isReflection ? `
          <div class="editor-grid">
            <label><span>系列</span><input name="series" value="${escapeHTML(post?.series)}" placeholder="例如：推荐策略笔记"></label>
            <label><span>状态</span><input name="status" value="${escapeHTML(post?.status || "持续更新")}" placeholder="持续更新 / 已完成"></label>
          </div>
          <label><span>标题</span><input name="title" value="${escapeHTML(post?.title)}" required maxlength="200"></label>
          <label><span>内容</span><textarea name="content" rows="8" maxlength="50000">${escapeHTML(post?.content)}</textarea></label>
          <label><span>标签</span><input name="tags" value="${escapeHTML((post?.tags || []).join("，"))}" placeholder="用逗号分隔"></label>
          <label><span>条目</span><textarea name="notes" rows="4" placeholder="每行一条">${escapeHTML((post?.notes || []).join("\n"))}</textarea></label>
        ` : `
          <div class="editor-grid">
            <label><span>日期</span><input name="date_text" value="${escapeHTML(post?.date_text || todayStamp())}"></label>
            <label><span>标题</span><input name="title" value="${escapeHTML(post?.title)}" required maxlength="200"></label>
          </div>
          <label><span>内容</span><textarea name="content" rows="8" maxlength="50000">${escapeHTML(post?.content)}</textarea></label>
          <label><span>标签</span><input name="tags" value="${escapeHTML((post?.tags || []).join("，"))}" placeholder="用逗号分隔"></label>
        `}
        <div class="editor-actions"><button type="submit">${post ? "保存修改" : "发布"}</button><a class="ghost-button" href="${listPage}">取消</a></div>
        <p class="form-status" aria-live="polite"></p>
      </form>`;

    const form = composeTarget.querySelector("form");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const status = form.querySelector(".form-status");
      const button = form.querySelector("button[type='submit']");
      status.textContent = "正在保存…";
      button.disabled = true;
      const payload = {
        type,
        title: form.elements.title.value.trim(),
        content: form.elements.content.value.trim(),
        tags: parseTags(form.elements.tags.value),
        date_text: isReflection ? null : form.elements.date_text.value.trim(),
        series: isReflection ? form.elements.series.value.trim() : null,
        status: isReflection ? form.elements.status.value.trim() : null,
        notes: isReflection ? form.elements.notes.value.split(/\n/).map((line) => line.trim()).filter(Boolean) : []
      };
      const query = post
        ? client.from("posts").update(payload).eq("id", post.id)
        : client.from("posts").insert(payload);
      const { error } = await query;
      if (error) {
        status.textContent = `保存失败：${error.message}`;
        button.disabled = false;
      } else window.location.href = listPage;
    });
  }

  client.auth.onAuthStateChange((_event, session) => {
    if (!session) admin = false;
  });

  if (listTarget) await renderList();
  if (composeTarget) await renderCompose();
})();
