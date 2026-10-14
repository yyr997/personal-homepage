# 差集词云风格统一

使用内置 imagegen 编辑。每张图使用对应原差集词云作为编辑目标，`audience-common.webp` 仅作为风格参照。用户确认的对应关系保持为：图一方案 A、图二方案 B。原图保留。

## 两张图共用的提示词

Use case: style-transfer. Asset type: Chinese handwritten word-cloud website graphic. Input image 1 is the EDIT TARGET. Input image 2 is ONLY the style reference, the intersection-interest word cloud. Restyle image 1 to closely match image 2: thin blue-pen handwritten Chinese, slightly irregular monoline strokes, no brush calligraphy or thick marker strokes, restrained navy/medium blue/teal colors, white background, generous exterior margins and balanced space between phrases. Keep ALL the target's words exactly, each once; never import words from the reference. Preserve the target's relative word-size hierarchy, not its overly crowded composition. Recompose into an airy centered word-cloud cluster, with roughly 10–14% empty white border on every side, matching the visual density of the reference. All text horizontal and easily readable. Landscape 8:5 canvas. No new title, no labels, no icons, no decorations, no borders, no watermarks. Existing opaque white background must stay opaque white.

## 方案 A 追加的提示词

Exact target text: NBA2K、奥特曼、明星偶像、越南民俗、沙海探宝、大学校园生活、街头篮球、休闲消费、游戏、影视综音、流量人员救助、社科、教育、文化、动画、社会资讯、汽车知识、医疗运动、亲子、儿童穿搭、暗区突围、港澳台、掼蛋比赛、亲子摄影、公益、刘卓. Largest phrase: 影视综音; next large: 社会资讯 and 明星偶像; medium-large: 大学校园生活、游戏、休闲消费、教育. Others smaller as in target.

## 方案 B 追加的提示词

Exact target text: 轻欧美妆、亚裔美妆、恋爱讨论、素人帅哥、CS系列、历史人物、西游记IP、艺术机构、耳机、动画剧情、社交互动、可穿戴数码、黄金投资、动作片、场景见闻、射击游戏、广州、蛋仔派对、地方美食、子宫内膜异位症. Largest phrase: 素人帅哥; next large: 动画剧情、轻欧美妆、亚裔美妆; medium: 西游记IP、耳机、可穿戴数码. Others smaller as in target.

## 页面资产

- 方案 A：`audience-method-a-styled.webp`
- 方案 B：`audience-method-b-styled.webp`

生成结果按原比例缩放到最大 1280 × 800，导出为 WebP 后供页面和词云放大弹窗使用。
