(function () {
  const data = window.siteData;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function setTextBindings() {
    $$("[data-bind]").forEach((node) => {
      const value = node.dataset.bind.split(".").reduce((acc, key) => acc && acc[key], data);
      if (value) node.textContent = value;
      if (node.tagName === "A" && node.dataset.bind === "profile.email") {
        node.href = `mailto:${value}`;
      }
    });
  }

  function linkHTML(link) {
    const isExternal = /^https?:\/\//.test(link.href);
    const target = isExternal ? ' target="_blank" rel="noreferrer"' : "";
    return `<a href="${link.href}"${target} aria-label="${link.label}" title="${link.label}">${link.icon || link.label}</a>`;
  }

  function escapeHTML(value) {
    return String(value || "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#039;"
    }[char]));
  }

  function tagHTML(tag) {
    return `<span class="tag">${escapeHTML(tag)}</span>`;
  }

  const writingStorageKeys = {
    insights: "yan-yiran-insights",
    reflections: "yan-yiran-reflections"
  };

  function todayStamp() {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${now.getFullYear()}.${month}.${day}`;
  }

  function parseTags(value) {
    return String(value || "").split(/[，,、;；]/).map((tag) => tag.trim()).filter(Boolean);
  }

  function textWithBreaks(value) {
    return escapeHTML(value).replace(/\n/g, "<br>");
  }

  function readWritingItems(type) {
    const fallback = data[type] || [];
    try {
      const saved = JSON.parse(localStorage.getItem(writingStorageKeys[type]) || "null");
      if (Array.isArray(saved)) {
        return saved
          .filter((item) => !String(item.id || "").includes(`${type}-seed-`))
          .map((item, index) => ({ id: item.id || `${type}-saved-${index}`, ...item }));
      }
    } catch (error) {
      // Ignore malformed local drafts and fall back to built-in content.
    }
    return fallback.map((item, index) => ({ id: item.id || `${type}-seed-${index}`, ...item }));
  }

  function saveWritingItems(type, items) {
    try {
      localStorage.setItem(writingStorageKeys[type], JSON.stringify(items));
      return true;
    } catch (error) {
      window.alert("当前浏览器无法保存内容，请检查本地存储权限。");
      return false;
    }
  }

  function renderAbout() {
    const target = $('[data-render="about"]');
    if (!target) return;
    target.innerHTML = data.about.map((item) => {
      if (typeof item === "string") return `<p>${item}</p>`;
      if (item.type === "list") {
        return `<ul class="about-list">${item.items.map((text) => `<li>${text}</li>`).join("")}</ul>`;
      }
      return `<p class="${item.indent ? "indent" : ""}">${item.text}</p>`;
    }).join("");
  }

  function renderFacts() {
    const target = $('[data-render="facts"]');
    if (!target) return;
    target.innerHTML = data.facts.map((fact) => `
      <div class="fact">
        <span>${fact.label}</span>
        <strong>${fact.value}</strong>
      </div>
    `).join("");
  }

  function renderTimeline(target, items) {
    const container = $(`[data-render="${target}"]`);
    if (!container) return;
    const detailHTML = (detail) => {
      if (!detail) return "";
      if (Array.isArray(detail)) {
        return detail.map((line) => `<p>${line}</p>`).join("");
      }
      return `<p>${detail}</p>`;
    };

    container.innerHTML = items.map((item) => `
      <article class="timeline-item">
        <div class="timeline-mark" aria-hidden="true">
          ${item.logo ? `<img src="${item.logo}" alt="">` : item.mark || "•"}
        </div>
        <div class="timeline-body">
          <div class="item-head">
            <h3>${item.title}</h3>
            <time>${item.meta}</time>
          </div>
          <p class="subtitle">${item.subtitle}</p>
          ${detailHTML(item.detail)}
          ${item.tags ? `<div class="tags">${item.tags.map(tagHTML).join("")}</div>` : ""}
        </div>
      </article>
    `).join("");
  }

  function renderProjects() {
    const target = $('[data-render="projects"]');
    if (!target) return;
    target.innerHTML = data.projects.map((project) => `
      <article class="project-card">
        <div>
          <p class="project-status">${project.status}</p>
          <h3><a href="project.html?id=${project.id}">${project.title}</a></h3>
          <p>${project.summary}</p>
        </div>
        <div>
          <div class="tags">${project.tags.map(tagHTML).join("")}</div>
          <a class="detail-link" href="project.html?id=${project.id}">查看详情</a>
        </div>
      </article>
    `).join("");
  }

  function renderPublications() {
    const target = $('[data-render="publications"]');
    if (!target) return;
    target.innerHTML = data.publications.map((pub) => `
      <li>
        <a class="publication-link" href="research.html?id=${pub.id}">
          <div class="publication-head">
            <h3>${pub.title}</h3>
            <p class="venue">${pub.venue}</p>
          </div>
          <p class="publication-desc">${pub.description}</p>
          ${pub.links.length ? `<div class="pub-links">${pub.links.map((link) => `<a href="${link.href}" target="_blank" rel="noreferrer">${link.label}</a>`).join("")}</div>` : ""}
        </a>
      </li>
    `).join("");
  }

  function renderEducationSummary() {
    const target = $('[data-render="education-summary"]');
    if (!target) return;
    target.innerHTML = data.educationSummary.map((line) => `<li>${line}</li>`).join("");
  }

  function renderProjectDetail() {
    const target = $('[data-render="project-detail"]');
    if (!target) return;

    const params = new URLSearchParams(window.location.search);
    const project = data.projects.find((item) => item.id === params.get("id")) || data.projects[0];
    document.title = `${project.title} - ${data.profile.name}`;
    const renderCaseTable = (table) => `
      <div class="case-table-wrap">
        <table class="case-table">
          <thead>
            <tr>${table.columns.map((column) => `<th>${column}</th>`).join("")}</tr>
          </thead>
          <tbody>
            ${table.rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}
          </tbody>
        </table>
      </div>
    `;
    const renderDetailContent = (section) => `
      ${section.image ? `
        <figure class="detail-figure case-figure ${section.image.wide ? "case-figure-wide" : ""}">
          <img src="${section.image.src}" alt="${section.image.alt}">
        </figure>
      ` : ""}
      ${section.subhead ? `<h3 class="case-subhead">${section.subhead}</h3>` : ""}
      ${section.paragraphs ? section.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("") : ""}
      ${section.noteBullets ? `<ul class="case-bullets case-note-bullets">${section.noteBullets.map((item) => `<li>${item}</li>`).join("")}</ul>` : ""}
      ${section.bullets ? `<ul class="case-bullets">${section.bullets.map((item) => `<li>${item}</li>`).join("")}</ul>` : ""}
      ${section.metrics ? `<div class="case-metrics">${section.metrics.map((metric) => `
        <div class="case-metric">
          <strong>${metric.value}</strong>
          <span>${metric.label}</span>
          ${metric.note ? `<small>${metric.note}</small>` : ""}
        </div>
      `).join("")}</div>` : ""}
      ${section.table ? renderCaseTable(section.table) : ""}
      ${section.conclusion ? `<p class="case-conclusion">${section.conclusion}</p>` : ""}
      ${section.note ? `<blockquote class="case-note">${section.note}</blockquote>` : ""}
      ${section.imageAfter ? `
        <figure class="detail-figure case-figure ${section.imageAfter.wide ? "case-figure-wide" : ""}">
          <img src="${section.imageAfter.src}" alt="${section.imageAfter.alt}">
        </figure>
      ` : ""}
    `;
    const renderDetailSubsection = (subsection) => `
      <div class="case-subsection">
        <h3>${subsection.title}</h3>
        ${renderDetailContent(subsection)}
        ${subsection.groups ? subsection.groups.map((group) => `
          <div class="case-subgroup">
            <h4>${group.title}</h4>
            ${renderDetailContent(group)}
          </div>
        `).join("") : ""}
      </div>
    `;
    const renderDetailSection = (section, index) => `
      <section class="detail-block ${index === 0 ? "first-detail-block" : ""} detail-prose project-case-section">
        <h2>${section.title}</h2>
        ${renderDetailContent(section)}
        ${section.subsections ? section.subsections.map(renderDetailSubsection).join("") : ""}
      </section>
    `;
    const customDetailHTML = project.detailPage ? `
      ${project.detailPage.sections.map(renderDetailSection).join("")}
    ` : "";
    const placeholderHTML = `
      <section class="detail-block">
        <h2>详情待补充</h2>
        <p>这里已经为项目详情页预留好结构。后续你可以继续补充项目背景、目标指标、用户问题、方案设计、数据实验、上线结果与复盘沉淀。</p>
      </section>

      <section class="detail-block detail-grid">
        <div>
          <h3>建议补充：背景与问题</h3>
          <p>说明业务场景、用户痛点、策略问题或平台目标。</p>
        </div>
        <div>
          <h3>建议补充：产品方案</h3>
          <p>说明你如何定义需求、拆解链路、设计策略或推进跨团队协作。</p>
        </div>
        <div>
          <h3>建议补充：结果与复盘</h3>
          <p>补充指标变化、实验结论、上线范围、长期沉淀或下一步迭代。</p>
        </div>
      </section>
    `;

    target.innerHTML = `
      <a class="back-link" href="index.html#projects">返回项目列表</a>
      <p class="section-kicker">Project Case</p>
      <h1>${project.title}</h1>
      <p class="detail-summary">${project.summary}</p>
      <div class="tags">${project.tags.map(tagHTML).join("")}</div>
      ${customDetailHTML || placeholderHTML}
    `;
  }

  function renderResearchDetail() {
    const target = $('[data-render="research-detail"]');
    if (!target) return;

    const params = new URLSearchParams(window.location.search);
    const research = data.publications.find((item) => item.id === params.get("id")) || data.publications[0];
    document.title = `${research.title} - ${data.profile.name}`;
    const mediaHTML = (headingLevel = "h2", blockClass = "detail-block research-media") => research.video ? `
      <section class="${blockClass}" aria-label="成果展示视频">
        <${headingLevel}>${research.detailPage?.videoTitle || "成果展示"}</${headingLevel}>
        <video controls preload="metadata" playsinline>
          <source src="${research.video}" type="video/quicktime">
          <source src="${research.video}" type="video/mp4">
          当前浏览器不支持视频播放。
        </video>
      </section>
    ` : "";
    const customDetailHTML = research.detailPage ? `
      <section class="detail-block first-detail-block detail-prose">
        <h2>${research.detailPage.introTitle}</h2>
        ${research.detailPage.intro.map((paragraph) => `<p>${paragraph}</p>`).join("")}
      </section>
      ${research.detailPage.image ? `
        <figure class="detail-figure">
          <img src="${research.detailPage.image.src}" alt="${research.detailPage.image.alt}">
        </figure>
      ` : ""}
      ${mediaHTML("h3", "research-media nested-research-media")}
    ` : "";
    const placeholderHTML = `
      <p class="detail-summary">${research.description}</p>
      ${mediaHTML()}

      <section class="detail-block">
        <h2>详情待补充</h2>
        <p>这里已经为论文与研究详情页预留好结构。后续你可以继续补充研究背景、问题定义、方法设计、实验结果、个人贡献与复盘沉淀。</p>
      </section>

      <section class="detail-block detail-grid">
        <div>
          <h3>建议补充：背景与问题</h3>
          <p>说明研究场景、技术挑战、业务或学术价值。</p>
        </div>
        <div>
          <h3>建议补充：方法与贡献</h3>
          <p>说明模型框架、关键技术、你负责的模块和创新点。</p>
        </div>
        <div>
          <h3>建议补充：结果与沉淀</h3>
          <p>补充实验表现、指标提升、论文状态或可复用资产。</p>
        </div>
      </section>
    `;

    target.innerHTML = `
      <a class="back-link" href="index.html#education">返回论文与研究</a>
      <p class="section-kicker">Research Case</p>
      <div class="detail-title-row">
        <h1>${research.title}</h1>
        <p class="venue">${research.venue}</p>
      </div>
      ${customDetailHTML || placeholderHTML}
    `;
  }

  function renderInsights() {
    if (window.sharedWritingEnabled) return;
    const target = $('[data-render="insights"]');
    if (!target) return;
    document.title = `Insights - ${data.profile.name}`;
    const items = readWritingItems("insights");
    target.innerHTML = `
      <div class="writing-toolbar">
        <a class="publish-button" href="compose.html?type=insights">发布</a>
      </div>
      ${items.length ? items.map((item) => `
        <article class="insight-card" data-id="${escapeHTML(item.id)}">
          <div class="writing-card-head">
            <time>${escapeHTML(item.date)}</time>
            <div class="card-actions">
              <a href="compose.html?type=insights&id=${encodeURIComponent(item.id)}">编辑</a>
              <button type="button" data-action="delete" data-type="insights" data-id="${escapeHTML(item.id)}">删除</button>
            </div>
          </div>
          <h2>${escapeHTML(item.title)}</h2>
          <p>${textWithBreaks(item.body)}</p>
          <div class="tags">${(item.tags || []).map(tagHTML).join("")}</div>
        </article>
      `).join("") : `<p class="empty-writing">暂无随记</p>`}
    `;

    bindWritingListActions(target, "insights");
  }

  function renderReflections() {
    if (window.sharedWritingEnabled) return;
    const target = $('[data-render="reflections"]');
    if (!target) return;
    document.title = `Reflections - ${data.profile.name}`;
    const items = readWritingItems("reflections");
    target.innerHTML = `
      <div class="writing-toolbar">
        <a class="publish-button" href="compose.html?type=reflections">发布</a>
      </div>
      ${items.length ? items.map((item) => `
        <article class="reflection-card" data-id="${escapeHTML(item.id)}">
          <div class="reflection-head">
            <p class="reflection-series">${escapeHTML(item.series)}</p>
            <span>${escapeHTML(item.status)}</span>
          </div>
          <div class="writing-card-head">
            <h2>${escapeHTML(item.title)}</h2>
            <div class="card-actions">
              <a href="compose.html?type=reflections&id=${encodeURIComponent(item.id)}">编辑</a>
              <button type="button" data-action="delete" data-type="reflections" data-id="${escapeHTML(item.id)}">删除</button>
            </div>
          </div>
          <p>${textWithBreaks(item.summary)}</p>
          <div class="tags">${(item.tags || []).map(tagHTML).join("")}</div>
          ${(item.notes || []).length ? `
            <ul>
              ${item.notes.map((note) => `<li>${escapeHTML(note)}</li>`).join("")}
            </ul>
          ` : ""}
        </article>
      `).join("") : `<p class="empty-writing">暂无知识沉淀</p>`}
    `;
    bindWritingListActions(target, "reflections");
  }

  function bindWritingListActions(target, type) {
    target.onclick = (event) => {
      const button = event.target.closest("button[data-action='delete']");
      if (!button) return;
      const label = type === "reflections" ? "知识沉淀" : "随记";
      if (!window.confirm(`确认删除这条${label}吗？`)) return;
      const current = readWritingItems(type);
      if (saveWritingItems(type, current.filter((item) => item.id !== button.dataset.id))) {
        type === "reflections" ? renderReflections() : renderInsights();
      }
    };
  }

  function renderCompose() {
    if (window.sharedWritingEnabled) return;
    const target = $('[data-render="compose"]');
    if (!target) return;
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type") === "reflections" ? "reflections" : "insights";
    const isReflection = type === "reflections";
    const listPage = isReflection ? "reflections.html" : "insights.html";
    const editId = params.get("id");
    const current = readWritingItems(type);
    const editingItem = current.find((item) => item.id === editId);
    const title = editingItem
      ? (isReflection ? "编辑知识沉淀" : "编辑随记")
      : (isReflection ? "发布知识沉淀" : "发布随记");
    document.title = `${title} - ${data.profile.name}`;

    target.innerHTML = `
      <a class="back-link" href="${listPage}">返回${isReflection ? "知识沉淀" : "随记"}</a>
      <p class="section-kicker">${isReflection ? "Reflections" : "Insights"}</p>
      <h1>${title}</h1>
      <form class="writing-editor compose-editor" data-editor="${type}">
        ${isReflection ? `
          <div class="editor-grid">
            <label>
              <span>系列</span>
              <input name="series" type="text" value="${escapeHTML(editingItem?.series || "")}" placeholder="例如：搜广推策略笔记">
            </label>
            <label>
              <span>状态</span>
              <input name="status" type="text" value="${escapeHTML(editingItem?.status || "")}" placeholder="持续更新 / 计划中 / 已完成">
            </label>
          </div>
          <label>
            <span>标题</span>
            <input name="title" type="text" value="${escapeHTML(editingItem?.title || "")}" placeholder="写一个知识沉淀标题">
          </label>
          <label>
            <span>内容</span>
            <textarea name="summary" rows="5" placeholder="写下这篇沉淀、频道或笔记专栏的主要内容">${escapeHTML(editingItem?.summary || "")}</textarea>
          </label>
          <label>
            <span>标签</span>
            <input name="tags" type="text" value="${escapeHTML((editingItem?.tags || []).join("，"))}" placeholder="用逗号分隔，例如：推荐策略，Agent，复盘">
          </label>
          <label>
            <span>条目</span>
            <textarea name="notes" rows="4" placeholder="每行一条，用来放目录、子话题或文档链接标题">${escapeHTML((editingItem?.notes || []).join("\n"))}</textarea>
          </label>
        ` : `
          <div class="editor-grid">
            <label>
              <span>日期</span>
              <input name="date" type="text" value="${escapeHTML(editingItem?.date || todayStamp())}" placeholder="2026.08.07">
            </label>
            <label>
              <span>标题</span>
              <input name="title" type="text" value="${escapeHTML(editingItem?.title || "")}" placeholder="写一个短标题">
            </label>
          </div>
          <label>
            <span>内容</span>
            <textarea name="body" rows="6" placeholder="写下留言、日记、今日体会或一段短观察">${escapeHTML(editingItem?.body || "")}</textarea>
          </label>
          <label>
            <span>标签</span>
            <input name="tags" type="text" value="${escapeHTML((editingItem?.tags || []).join("，"))}" placeholder="用逗号分隔，例如：日常，产品观察，AI">
          </label>
        `}
        <div class="editor-actions">
          <button type="submit">${editingItem ? "保存修改" : "发布"}</button>
          <a class="ghost-button" href="${listPage}">取消</a>
        </div>
      </form>
    `;

    const form = $(".writing-editor", target);
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const current = readWritingItems(type);
      const nextItem = isReflection
        ? {
          id: editingItem?.id || `reflection-${Date.now()}`,
          series: form.elements.series.value.trim() || "未命名系列",
          title: form.elements.title.value.trim() || "未命名沉淀",
          summary: form.elements.summary.value.trim(),
          status: form.elements.status.value.trim() || "持续更新",
          tags: parseTags(form.elements.tags.value),
          notes: form.elements.notes.value.split(/\n/).map((note) => note.trim()).filter(Boolean)
        }
        : {
          id: editingItem?.id || `insight-${Date.now()}`,
          date: form.elements.date.value.trim() || todayStamp(),
          title: form.elements.title.value.trim() || "未命名随记",
          body: form.elements.body.value.trim(),
          tags: parseTags(form.elements.tags.value)
        };
      const nextItems = editingItem
        ? current.map((item) => item.id === editingItem.id ? nextItem : item)
        : [nextItem, ...current];
      if (saveWritingItems(type, nextItems)) {
        window.location.href = listPage;
      }
    });
  }

  function setupTheme() {
    const root = document.documentElement;
    const saved = localStorage.getItem("theme");
    if (saved) root.dataset.theme = saved;

    const toggle = $(".theme-toggle");
    if (!toggle) return;
    toggle.addEventListener("click", () => {
      const next = root.dataset.theme === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      localStorage.setItem("theme", next);
    });
  }

  function revealOnScroll() {
    if (!("IntersectionObserver" in window)) {
      $$(".reveal").forEach((section) => section.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    }, { threshold: 0.12 });

    $$(".reveal").forEach((section) => observer.observe(section));
  }

  function render() {
    document.title = `${data.profile.name} - 个人主页`;
    setTextBindings();
    const links = $('[data-render="links"]');
    if (links) links.innerHTML = data.profile.links.map(linkHTML).join("");
    const year = $('[data-render="year"]');
    if (year) year.textContent = new Date().getFullYear();
    renderAbout();
    renderFacts();
    renderTimeline("education", data.education);
    renderTimeline("experience", data.experience);
    renderProjects();
    renderPublications();
    renderEducationSummary();
    renderProjectDetail();
    renderResearchDetail();
    renderInsights();
    renderReflections();
    renderCompose();
    setupTheme();
    revealOnScroll();
  }

  render();
})();
