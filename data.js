window.siteData = {
  profile: {
    name: "闫仪冉",
    shortName: "Yan Yiran",
    role: "策略产品经理",
    tagline: "北航本硕｜搜广推策略 & AI 产品路线｜AI重度爱好者",
    email: "1832126635@qq.com",
    current: "北京航空航天大学管理科学与工程硕士在读，研究方向为 LLM4GNN；目前在字节跳动抖音生态方向担任推荐策略产品经理实习生。",
    links: [
      { label: "Email", href: "mailto:1832126635@qq.com", icon: "email" },
      { label: "Project", href: "#projects", icon: "project" },
      { label: "Insights", href: "insights.html", icon: "insights" },
      { label: "Reflections", href: "reflections.html", icon: "Reflections" }
    ]
  },

  about: [
    {
      type: "paragraph",
      indent: true,
      text: "大家好，我是闫仪冉。北航<strong class=\"highlight\">双A +工科本硕</strong>，本科信息管理与信息系统、硕士管理科学与工程，师从左源老师，研究方向为 <strong class=\"highlight\">LLM4GNN</strong>，掌握<strong>大模型微调、RAG、强化学习图推理</strong>等前沿 AI 技术。深耕<strong class=\"highlight\">搜广推赛道策略 & AI</strong> 产品，先后在<strong>字节跳动</strong>、<strong>小红书</strong>、<strong>百度</strong>完成多段核心实习："
    },
    {
      type: "list",
      items: [
        "<strong>字节跳动-抖音</strong>：<strong class=\"highlight\">独立主导</strong> LLM4 高价值作者识别项目，深度参与推荐链路智能排查 Agent、长尾兴趣、低活人群 TGI 偏好泛化等多项推荐策略项目；",
        "<strong>百度 MEG 商业化</strong>：核心参与智能优惠券项目；",
        "<strong>小红书商业化</strong>：主导电商平台「乘风」的搭建。"
      ]
    },
    {
      type: "paragraph",
      indent: true,
      text: "精通从数据基建迭代、指标体系搭建、链路诊断、AB 实验验证到策略全量上线、复盘迭代的<strong class=\"highlight\">完整业务闭环</strong>，擅长将<strong class=\"highlight\">前沿 AI 技术落地</strong>，打造具备量化收益的内容分发与商业化增长解决方案。"
    }
  ],

  facts: [
    { label: "产品方向", value: "推荐策略、广告策略、平台产品" },
    { label: "研究方向", value: "LLM4GNN" },
    { label: "方法能力", value: "复杂数据分析、机器学习、大模型技术" }
  ],

  education: [
    {
      title: "北京航空航天大学",
      subtitle: "本科 - 信息管理与信息系统（A+ 工科学科）",
      meta: "2021.09 - 2025.07",
      mark: "BU"
    },
    {
      title: "北京航空航天大学",
      subtitle: "研究生 - 管理科学与工程（A+ 工科学科）",
      meta: "2025.09 - 至今",
      mark: "MS"
    }
  ],

  educationSummary: [
    "<strong>学业成绩：</strong>GPA 3.86/4.0（前5%）&nbsp;&nbsp;&nbsp;&nbsp;排名：9/188（前5%）",
    "<strong>主修课程：</strong>人工智能与机器学习、高级数据科学、SQL数据分析、机器学习与数据挖掘、Python数据分析、数据结构、计算机网络、C语言",
    "<strong>研究方向：</strong>LLM4GNN，关注大语言模型与图神经网络在检索、推理和鲁棒性方向的结合。",
    "<strong>所获荣誉：</strong>2021-2022年学习优秀奖学金、2022-2023年学习优秀奖学金、2023-2024年学习优秀奖学金、2025年研究生学业奖学金一等奖、校级三好学生等10余项"
  ],

  // 复制一个对象并修改字段，就可以新增一段经历。
  experience: [
    {
      title: "字节跳动 - 抖音生态",
      subtitle: "推荐策略产品经理",
      meta: "2025.08 - 至今",
      detail: "深度参与短视频推荐内容生态，落地长尾兴趣、人群偏好-TGI泛化、LLM4高价值作者识别三大优化策略，搭建推荐链路智能诊断Agent，以数据建模、大模型能力与标准化策略持续优化用户内容体验。",
      tags: ["推荐策略", "内容生态", "Agent搭建", "AB 实验"],
      logo: "assets/bytedance.png",
      mark: "BD"
    },
    {
      title: "小红书 - 商业4组",
      subtitle: "闭环电商广告客增方向产品经理",
      meta: "2025.05 - 2025.08",
      detail: "主导小红书闭环电商「乘风」PC 优化与乘风 Lite 从零搭建，统筹 PRD 撰写、跨方评审至上线全流程产品落地，通过多端体验迭代拉动广告新客与电商闭环营收增长。",
      tags: ["平台产品", "商业化", "客户增长", "PRD"],
      logo: "assets/xiaohongshu.png",
      mark: "RED"
    },
    {
      title: "百度-MEG商业化",
      subtitle: "闭环电商广告策略产品经理",
      meta: "2024.10 - 2025.05",
      detail: "围绕百度电商平台开展广告策略与智能优惠券相关工作，结合商品、直播间和用户行为构建智能优惠券预估模型，精准挖掘营销敏感人群，实现千人千面的动态补贴定价。",
      tags: ["广告策略", "商业化", "智能优惠券", "uplift模型"],
      logo: "assets/baidu.png",
      mark: "DU"
    }
  ],

  projects: [
    {
      id: "llm-author-value",
      title: "LLM4 高价值作者识别",
      summary: "构建一套基于 LLM 的长期价值作者判断方案，识别作者是否对用户具有持续、稳定、可重复的消费价值，从而为推荐系统做可理解的迭代和优化。",
      tags: ["LLM", "推荐系统", "作者价值", "内容生态"],
      status: "详情待补充"
    },
    {
      id: "recommendation-agent",
      title: "推荐链路智能排查 Agent",
      summary: "建设 AI 标准化推荐链路排查能力，实现基于用户负反馈自动识别问题类型、定位推荐链路异常并沉淀共性问题的能力。",
      tags: ["Agent", "推荐链路", "问题诊断", "负反馈"],
      status: "详情待补充"
    },
    {
      id: "long-tail-interest",
      title: "长尾兴趣项目",
      summary: "针对平台流量过度向热门内容倾斜导致小众兴趣分发不足的痛点，主导“基建调优-价值验证-链路诊断-实验验证-策略推全”全流程，系统性提升长尾内容分发效率。",
      tags: ["长尾兴趣", "内容分发", "生态多元", "策略实验"],
      status: "详情待补充"
    },
    {
      id: "tgi-generalization",
      title: "人群偏好 - TGI 泛化项目（低活方向）",
      summary: "针对新低活用户行为数据稀疏、推荐结果易受大盘热门内容主导的问题，构建目标群体偏好指数并推进链路诊断、策略设计、模型优化与 AB 实验。",
      tags: ["TGI", "低活用户", "个性化推荐", "AB 实验"],
      status: "详情待补充"
    },
    {
      id: "chengfeng-platform",
      title: "小红书电商平台「乘风」建设",
      summary: "主导小红书电商平台乘风 PC 的多个需求，从 PRD 撰写、需求评审到上线全流程，优化客户平台体验、促进新客增长和广告收入提升。",
      tags: ["平台产品", "电商广告", "客户体验", "增长"],
      status: "详情待补充"
    },
    {
      id: "smart-coupon",
      title: "智能优惠券项目",
      summary: "面向百度电商平台，融合商品特征、直播间属性及用户历史行为，构建智能优惠券预估模型，挖掘营销敏感人群，实现千人千面的动态补贴定价。",
      tags: ["广告策略", "智能补贴", "模型预估", "电商"],
      status: "详情待补充",
      detailPage: {
        sections: [
          {
            title: "一、背景",
            paragraphs: [
              "传统上业界各大电商平台通过优惠券实现拉新、促活、复购、GMV 提升等各项业务收益，但是目前的优惠券补贴都是基于人工制定，包括补贴的主播和补贴的具体规则，效率难以保障。我们希望结合商品、直播间、用户历史行为等维度，实现千人千面的智能优惠券能力，对优惠券敏感人群发放更高面额撬动转化，对优惠券低敏感人群降低面额节省成本，实现 ROI 打正持续补贴，从而撬动客户预算达到 1+1>2 的提收作用。"
            ],
            bullets: [
              "<strong>对于商业侧：</strong>定位为商业产品 & 运营手段，ROI 打正情况下<strong>最大化提升 CVR 撬动转化和收入</strong>，提供给运营<strong>打开商家预算</strong>拿到间接收入增长。",
              "<strong>对于用增侧：</strong>用增侧目标为<strong>提升交易用户规模和 GMV</strong>。"
            ]
          },
          {
            title: "二、项目定位",
            subsections: [
              {
                title: "2.1 模型介绍",
                subhead: "Uplift 模型（营销增益模型）",
                noteBullets: [
                  "核心定义：<strong>Uplift（增益模型）不是预测用户会不会下单，而是预测「干预动作（发券）能给用户带来多大的转化增量」</strong>。",
                  "对优惠券项目：<strong>转化率 Uplift = 发券后的 CVR − 不发券的 CVR</strong>，也就是发券这个动作带来的转化率提升幅度。",
                  "模型的样本：如果平台有预算可以给用户发优惠券以提升用户购买，全流量发放券有以下 4 种领券群体："
                ],
                table: {
                  columns: ["分类", "中文名称", "行为含义", "营销策略（优惠券场景）", "Uplift 增益值"],
                  rows: [
                    ["Persuadables", "说服型", "<strong>不发券大概率不买，发券才会买</strong>", "✅ <strong>核心目标人群，重点发券</strong>", "Uplift＞0，正向增益"],
                    ["Sure things", "确定型", "不管发不发券，都会下单", "❌ 不要发券，纯消耗补贴成本", "Uplift≈0，没有增量"],
                    ["Lost causes", "无效型", "无论发不发券，都不会下单", "❌ 不要发券，完全浪费预算", "Uplift≈0"],
                    ["Sleeping dogs", "沉睡反作用型", "<strong>不发券会买，发券反而不买</strong>", "❌ 严禁发券，干预带来负效果", "Uplift＜0，负增益"]
                  ]
                },
                note: "Uplift 模型的目标：只给 <strong>Persuadables 说服型用户</strong> 发放优惠券，另外三类尽量拦截，把补贴预算全部花在能产生增量的人身上。"
              },
              {
                title: "2.2 合作模式",
                paragraphs: [
                  "该项目采用和电商用增团队合作模式，原因有三个："
                ],
                bullets: [
                  "<strong>策略角度：</strong>直播商业独立样本不够建模。剔除虚拟品和珠宝玉石等不允许补贴品类后，直播广告日均总共 5k 转化，且模型需要学习的是补券后转化的样本（正样本）与不补券也能转化的样本（负样本）之间的特征差异，正样本将更少。因此必须引入用户侧样本，叠加后去除刷单后日均 1.7w 单，所以将采用用商联合的建模方案。",
                  "<strong>预算角度：</strong>用增补券预算 9kw/年，日均 24w，十分充足，远大于之前商业侧申请的额度；且用增预算的收益考核较宽松，只要求复购率增长即可，对于前期测试更有利。",
                  "<strong>人力角度：</strong>用增侧对应的算法和商业侧算法都很强，预计用一套建模方案实现用商两侧各自的目标。"
                ]
              },
              {
                title: "2.3 产品方案",
                groups: [
                  {
                    title: "2.3.1 竞品分析",
                    paragraphs: [
                      "千川智能优惠券产品："
                    ],
                    bullets: [
                      "<strong>产品覆盖率：</strong>消费覆盖整体 66%，直播 69%，短视频 65%（7 月初数据）。",
                      "<strong>效果数据：</strong>商家的跑量效果提升 93%，整体 ROI 上升 58%（运营 showcase 数据，可能虚高）。",
                      "<strong>产品使用：</strong>在直播、短视频投放场景启用智能优惠券功能。",
                      "<strong>使用要求：</strong>内测期间不接受主动报名，平台定向邀约产品适配的抖音号账户开通功能。",
                      "<strong>领券过程：</strong>推广计划触达的用户进入直播间自动领券，优惠券金额 2-30 元。优惠券类型为电商平台券，适用直播间所有商品，下单自动抵扣；可和其他店铺券叠加，和其他平台券不可叠加，优先使用面额高的平台券。"
                    ]
                  },
                  {
                    title: "2.3.2 产品定位",
                    paragraphs: [
                      "对齐千川，作为策略产品能力落地在投放端，作为一个开关以运营邀约形式而非全量开放给客户使用。主要考虑两点："
                    ],
                    bullets: [
                      "商家治理有强约束，对部分品类和服务分的客户不允许补贴，所以采取定向邀约，否则会有客情风险。",
                      "以商品产品交付给商家，提升商家的感知能力；且部分商家预估补券收益高但运营无法有效触达时，可以提供给商家自行使用。",
                      "前期补券成本 100% 由平台承担，后期考虑平台和客户各承担一部分，这样对客户来说就并不是一个必定正向的产品能力。"
                    ],
                    conclusion: "所以具体来说，商家在投放计划创编流程中选择“启用”智能优惠券并投放后，由模型对适配的商业付费流量用户发放平台优惠券，在满足预算 ROI 要求的前提下，提高用户下单率、提升商家 GMV，并带来广告收入增长。"
                  }
                ]
              },
              {
                title: "2.4 产品预期收益",
                bullets: [
                  "<strong>直接收益：</strong>提高营销敏感人群的下单率，提升转化，带动收入增长，实现补贴带来的消费增益 / 补贴金额 > 1，通过长期 AB 实验核算。",
                  "<strong>间接受益：</strong>由于并非全部品类、商品都适合补贴（如 >1000 元高客单商品等），优惠券模型寻找营销敏感人群的预估能力也存在天然差异。需通过运营手段触达并激励商家，优化品类结构和生态，提高满足补贴条件的商品覆盖，带动收入增长。"
                ]
              }
            ]
          },
          {
            title: "三、执行方案",
            subsections: [
              {
                title: "3.1 执行链路",
                image: {
                  src: "assets/smart-coupon-execution-flow.png",
                  alt: "智能优惠券项目从投放平台、优惠券模型、平台券创建与发放到用户下单核销的执行链路",
                  wide: true
                }
              },
              {
                title: "3.2 执行阶段",
                image: {
                  src: "assets/smart-coupon-stage-overview.png",
                  alt: "智能优惠券项目三阶段执行规划：发券通路建设、uplift 模型训练、推全与模型优化",
                  wide: true
                },
                groups: [
                  {
                    title: "阶段 1：基于规则的选人补贴阶段",
                    note: "<p>· <strong>目标：</strong>积累充足的 4 类样本；保证用增补贴、商业补贴如常进行，能够满足预算考核目标，实现业务目标。</p><p>· 第一阶段是 uplift 模型的构建阶段，这个阶段主要希望收集足够多的样本，同时满足业务的预算需求。我们构建了实验组 1、实验组 2 和对照组。其中，实验组 1 是全部发券；实验组 2 是选取高 ROI 人群进行策略发券；对照组是不发券；到目前基本完成了第一阶段的构建。</p>",
                    imageAfter: {
                      src: "assets/smart-coupon-stage-1.png",
                      alt: "智能优惠券阶段 1 基于规则选人补贴的实验组和对照组设计",
                      wide: true
                    }
                  },
                  {
                    title: "阶段 2：uplift 模型实验阶段",
                    note: "<p>· <strong>目标：</strong>积累充足的 4 类样本；保证用增补贴、商业补贴如常进行，能够满足预算考核目标，实现业务目标；完成模型训练。</p><p>· 第二阶段是 uplift 模型的测试阶段，这个时期会多设置一组实验组，使用 uplift 模型进行发券，所以是三个实验组和一个对照组，用于积累样本和测试模型准确率。</p>",
                    imageAfter: {
                      src: "assets/smart-coupon-stage-2.png",
                      alt: "智能优惠券阶段 2 uplift 模型实验的实验组和对照组设计",
                      wide: true
                    }
                  },
                  {
                    title: "阶段 3：uplift 模型推全阶段",
                    note: "<p>· <strong>目标：</strong>扩大自动发券流量，优化模型发券效果。</p><p>· 第三阶段为 uplift 模型推全阶段，这个阶段将全部流量都用于 uplift 模型发券。</p>",
                    imageAfter: {
                      src: "assets/smart-coupon-stage-3.png",
                      alt: "智能优惠券阶段 3 uplift 模型推全后的高低 uplift 人群发券设计",
                      wide: true
                    }
                  }
                ]
              }
            ]
          },
          {
            title: "四、最终收益",
            paragraphs: [
              "完成智能优惠券 Uplift 模型的产品化落地，打通投放与发券平台、模型策略服务及 C 端用户触达链路，形成从人群识别、优惠券创建与发放到领取核销的完整业务闭环。"
            ],
            bullets: [
              "<strong>模型与数据资产：</strong>第一阶段累计沉淀 <strong>60 万+</strong> 实验样本，覆盖不同干预响应类型，为模型学习用户差异、识别营销敏感人群及后续策略迭代提供了稳定的数据基础。",
              "<strong>预算与经营结果：</strong>在满足预算约束的前提下，前两个季度 <strong>Charge ROI 均高于 1.5</strong>、<strong>T-Charge ROI 均高于 2.5</strong>，累计实现 <strong>700 万+</strong> 增量收入，验证了智能补贴策略的业务价值与持续放量能力。"
            ]
          }
        ]
      }
    }
  ],

  publications: [
    {
      id: "gnn-llm-rl-reasoning",
      title: "基于强化学习的 GNN-LLM 协同上下文检索与推理框架",
      venue: "in preparation",
      description: "针对图推理场景，采用<strong>强化学习机制</strong>，将 LLM 的推理结果作为环境奖励来指导采样器的迭代更新，驱使模型自适应提取图中高价值的上下文信息。",
      links: []
    },
    {
      id: "llm-gnn-robustness",
      title: "基于大语言模型的图神经网络鲁棒性提升方法研究",
      venue: "优秀毕业论文&nbsp;&nbsp;&nbsp;&nbsp;2025.02 - 2025.06",
      description: "通过构造对抗扰动图模拟真实攻击，基于 COT 方法对大模型进行<strong>SFT 微调</strong>，融合 LLM 语义推理与图自编码器修复受损图结构，有效提升 GNN 对抗攻击下的节点分类鲁棒性。",
      links: []
    },
    {
      id: "financial-ai-risk-library",
      title: "金融智能模型风险识别模型库研发",
      venue: "2024.10 - 2025.04",
      description: "开发了面向金融智能模型的风险评估模型库与系统，全面覆盖预测模型、合成模型及大语言模型等主流智能模型类型，并融合波动率等具有金融特性的专业模型，支持合成数据驱动的黑盒/白盒检测，我主要负责鲁棒性方面的构建。",
      detailPage: {
        introTitle: "项目简介",
        intro: [
          "该系统是首个面向金融智能模型的风险评估模型库与系统，旨在构建一套面向金融智能模型的安全风险评估指标体系，包括鲁棒性、隐私性、责任性、合规性等关键指标，形成系统化的模型风险识别与评估方法。系统支持对预测模型、大语言模型等多类主流模型的检测，兼容包括表格、文本、时序和图像在内的多种数据结构和 Sklearn、PyTorch、TensorFlow 等多种模型架构，提供了统一的任务创建标准化流程，支持灵活配置模型类型、任务类型、检测方式和检测维度等。",
          "目前，我们针对“市场信息操纵识别”、“财务舞弊识别”、“信用评级预测”、“交易欺诈检测”、“账户异常检测”、“信贷风险防控”以及“资讯推荐”七个典型的应用场景下超过 700 个模型进行了评测。",
          "在该系统研发过程中课题组已取得一些创新成果，在 MIS Quarterly、KDD、TKDE、TIFS 等顶级会议及期刊发表高水平论文 7 篇，申请发明专利 8 项，目前获批 2 项行业标准立项通知。系统研发成果已在申万宏源和兴业银行等机构落地部署，最终面向市场风险预警与模型监管。"
        ],
        image: {
          src: "assets/financial-risk-system.png",
          alt: "金融风险评估系统覆盖金融风险评估、多类金融场景与企业内落地应用的示意图"
        },
        videoTitle: "项目展示"
      },
      video: "assets/最终版AI补帧.mov",
      links: []
    }
  ],

  skills: [
    "熟练掌握 SQL 与 Python，能够进行复杂数据处理与分析",
    "扎实掌握数据结构、人工智能、机器学习等计算机基础",
    "熟悉 PyTorch 等深度学习框架，掌握 MLP、CNN、GNN、RNNs、Transformer 等经典模型结构",
    "熟练掌握大模型相关技术，如 SFT 微调、RAG 检索增强等"
  ],

  awards: [
    { title: "一等奖学业奖学金", detail: "北京航空航天大学" },
    { title: "学习优秀奖学金一等奖", detail: "北京航空航天大学" },
    { title: "校级三好学生等校级及以上荣誉 10 余项", detail: "北京航空航天大学" }
  ],

  // 在这里追加短随记：复制一个对象，改日期、标题、正文和标签即可。
  insights: [],

  // 在这里追加知识沉淀：适合放系列频道、文档分享、方法论笔记。
  reflections: []
};
