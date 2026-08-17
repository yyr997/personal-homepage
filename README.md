# Personal Homepage

这是一个参考 Luka Homepage Template 气质重做的静态个人主页：左侧是个人身份信息，右侧展示关于我、产品项目、实习经历、教育背景、论文研究、课程技能和荣誉。

## 修改内容

主要编辑 `data.js`：

- `profile`: 姓名、邮箱、当前状态、社交链接和简历链接。
- `about`: 关于我的段落。
- `education`: 教育经历。
- `experience`: 实习经历。
- `projects`: 项目列表；每个项目通过 `id` 自动生成详情页链接。
- `publications`: 论文或研究成果。
- `courses`: 主修课程。
- `skills`: 专业技能。
- `awards`: 奖项和荣誉。

头像可以替换 `assets/avatar.svg`。如果有简历 PDF，可以放到 `assets/cv.pdf`，再把 `data.js` 里的 CV 链接从 `#` 改成 `assets/cv.pdf`。

## 预览

直接打开 `index.html` 即可预览。发布到 GitHub Pages、Vercel、Netlify 或任意静态文件服务器都可以。
