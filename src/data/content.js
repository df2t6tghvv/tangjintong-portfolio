/**
 * ============================================================
 *  站点内容数据 —— 所有文案与作品都集中在这里维护
 *  后续替换作品：把新图片放进 public/works/，并更新下方 works 数组
 *  note 字段为 200 字以内的设计说明（卡片下方展示）
 * ============================================================
 */

export const profile = {
  name: '唐金铜',
  nameEn: 'TANG JINTONG',
  role: '平面视觉设计师',
  roleEn: 'GRAPHIC & VISUAL DESIGNER',
  slogan: '让每一寸视觉，都有态度。',
  city: '中国 · 天津',
  school: '天津理工大学 · 视觉传达设计',
  period: '2023.09 — 2027.06',
  portrait: 'portrait.webp',
  /* IP 形象：填入 public/ip/ 下的形象图后，个人经历屏将以动态 IP 形象替代证件照展示（留空则用证件照） */
  ipMascot: 'ip/ip-a.webp',
  ipName: 'IP 形象',
  /* IP 形象动画视频：填入 public/videos/ 下的循环视频后，形象将以视频形式动起来（留空则用形象图 + 浮动动画） */
  ipMascotVideo: 'videos/ip-mascot.mp4',
  intro: [
    '视觉传达设计专业本科生，主修品牌设计、平面设计、包装设计、广告创意、字体设计、IP 形象设计等方向。',
    '拥有 AIGC 漫剧短剧实战经验，熟练操作 Kling、Pika、Runway、即梦、ComfyUI 等主流生成工具，掌握提示词撰写优化、关键帧调控与 AIGC 美术全流程管线搭建，可稳定维持角色画风与形象统一；熟练使用 Adobe Photoshop、Premiere Pro，熟悉短视频与漫剧叙事结构。',
  ],
  stats: [
    { value: 3, suffix: '段', label: '专业实习经历' },
    { value: 15, suffix: '+', label: '原创设计作品' },
    { value: 8, suffix: '+', label: '常用设计工具' },
    { value: 10, suffix: '+', label: '主修专业课程' },
  ],
  /* Hero 动态视频背景：填入可直接播放的视频 URL 后自动启用（留空则使用 Canvas 粒子动画） */
  heroVideo: 'videos/hero.mp4',
}

export const education = {
  school: '天津理工大学',
  major: '视觉传达设计 · 本科',
  period: '2023.09 — 2027.06',
  courses:
    '品牌设计 / 平面设计 / 包装设计 / 广告创意 / 动画设计 / 专业摄影 / 文创设计 / IP形象设计 / 视频剪辑 / 图形处理 / 字体设计',
}

export const experiences = [
  {
    period: '2026.01 — 2026.03',
    company: '常州和目文化传媒有限公司',
    role: '导演助理',
    points: [
      '依据剧本与导演要求，使用即梦、Pika、Kling 产出角色并优化视觉素材',
      '完成视觉分镜预演，定义镜头景别、转场与节奏，整合 AI 视觉/音频素材',
      '借助 Photoshop 修正 AIGC 五官，保持角色风格一致性对齐',
    ],
  },
  {
    period: '2025.07 — 2025.09',
    company: '常州格里马蒂文化传播有限公司',
    role: '设计师助理',
    points: [
      '深度参与 AI 漫剧剧本可视化拆解、人物 IP 设计、场景搭建与成片优化',
      '运用 PS / PR + Runway / Pika / 即梦完成角色立绘、动态镜头与多层特效合成',
      '搭建项目专属 AIGC 产出流水线，把控整部漫剧画风统一与镜头叙事节奏',
    ],
  },
  {
    period: '2024.06 — 2024.09',
    company: '赣州鑫洲文化传媒有限公司',
    role: '视频剪辑（实习生）',
    points: [
      '负责短视频、宣传短片剪辑，熟练运用 PR / 剪映完成粗剪精剪、调色配乐、字幕包装',
      '对接运营需求修改成片，按平台调性调整画面尺寸、时长与风格，产出多条流量短视频',
    ],
  },
]

/* 作品分类（用于筛选 tab） */
export const workCategories = [
  { key: 'all', label: '全部作品' },
  { key: 'brand', label: '品牌设计' },
  { key: 'poster', label: '公益海报' },
  { key: 'ui', label: 'UI 设计' },
  { key: 'illustration', label: '插画艺术' },
]

export const works = [
  {
    id: 'yunling',
    file: 'works/1e99c5af457fd1ce9050d7f7d64cf2ed.webp',
    title: '雲岭春芽 · 高山茶品牌',
    category: 'brand',
    tag: '品牌设计 / 包装设计',
    year: '2026',
    desc: '高山云雾 · 手工采摘 · 匠心制茶。从品牌故事、配色方案到包装结构与礼盒延展的完整茶叶品牌视觉体系。',
    note: '以高山云雾为品牌意象，主视觉采用云雾缭绕的茶山与手绘线稿结合，青绿与暖金双色贯穿包装体系，突出“自然、匠心、稀有”的品牌内核。字体选用衬线体呈现东方茶韵，留白克制，让产品本身成为画面主角。包装结构兼顾便携与礼赠场景，从外盒到内衬统一视觉语言，完成从品牌故事到货架呈现的完整闭环。',
  },
  {
    id: 'cloudmeadow',
    file: 'works/a5176082c28faa0dea4178bd9cd39a80.webp',
    title: '云栖田野 · VI 品牌系统',
    category: 'brand',
    tag: '品牌 VI / 视觉识别',
    year: '2026',
    desc: '自然 · 健康 · 生活。覆盖标志制图、字体、辅助图形、物料包装、导视与车辆应用的完整 VI 识别系统。',
    note: '围绕“自然、健康、生活”构建完整视觉识别系统。标志以田野与云朵的几何共生图形为核心，辅助图形提取稻穗、山峦、水滴等自然元素，形成可延展的纹样语言。色彩采用大地绿与暖米白，传递安心、质朴的品牌气质。从名片、工牌到导视、车辆，全部应用遵循统一网格与规范，确保品牌在任何触点都保持识别一致与呼吸感。',
  },
  {
    id: 'woof',
    file: 'works/c4da8e1356dee17e7782206eb2712143.webp',
    title: '汪汪伴侣 · 养宠 APP',
    category: 'ui',
    tag: 'UI 设计 / 产品视觉',
    year: '2026',
    desc: '一站式养宠服务：健康管理、宠物社区、实时定位与领养救助，让每一只狗狗都被温柔以待。',
    note: '以“被温柔以待”为产品理念，界面采用圆润卡片与暖橙主色，营造亲和的陪伴感。首页信息架构按宠物体检、社区、定位、领养四大模块组织，突出高频功能入口；插图统一使用手绘风格，降低用户理解成本。状态反馈、空页面、勋章体系等细节均围绕养宠场景定制，让工具感让位于情感温度。',
  },
  {
    id: 'beanmoment',
    file: 'works/932453c7fdacf40beac90b60e2c23ed0.webp',
    title: 'BeanMoment · 咖啡 APP',
    category: 'ui',
    tag: 'UI 设计 / 品牌视觉',
    year: '2026',
    desc: '咖啡，让生活更有味道。覆盖首页、发现、点单、会员与色彩组件规范的咖啡生活方式应用。',
    note: '围绕“咖啡让生活更有味道”的生活方式定位，界面以深咖色为基底、奶油金点缀，传递精品咖啡的质感。首页大图轮播与点单快捷栏并置，兼顾浏览与转化；会员页与积分体系用图形化进度呈现，增强参与感。组件规范统一圆角与阴影层级，保证多机型一致体验，把咖啡美学渗透进每一次交互。',
  },
  {
    id: 'health',
    file: 'works/a13771107db582af5b4ddddeacebdda2.webp',
    title: '悦健 · 健康生活 APP',
    category: 'ui',
    tag: 'UI 设计 / 视觉规范',
    year: '2026',
    desc: '为更健康的你而设计，从功能信息架构到视觉语言的健康管理类产品界面。',
    note: '为“更健康的你”而设计，界面强调数据可视化与低干扰阅读。仪表盘采用大数字与环形图呈现步数、心率、睡眠等核心指标，色彩以清爽蓝绿为主，克制而可信。功能架构按记录、计划、报告三级组织，降低使用门槛；图表动效平滑细腻，让枯燥的数据产生正向反馈，引导用户坚持健康习惯。',
  },
  {
    id: 'green-travel',
    file: 'works/海报1.webp',
    title: '绿色出行 · 未来可期',
    category: 'poster',
    tag: '公益海报 / 视觉传达',
    year: '2026',
    desc: '低碳环保公益宣传：步行、骑行、公共交通、拼车、新能源汽车五种绿色出行方式。',
    note: '以五种绿色出行方式为视觉主线，用扁平几何插画逐一呈现步行、骑行、公共交通、拼车与新能源车。画面以明亮绿色为主调，人物动态轻松，城市元素点缀其中，传递“未来可期”的乐观情绪。版式采用分段式信息流，配合简洁图标与短句标语，兼顾公益海报的科普功能与视觉吸引力。',
  },
  {
    id: 'city-breath',
    file: 'works/海报2.webp',
    title: '城市呼吸计划',
    category: 'poster',
    tag: '公益海报 / 世界环境日',
    year: '2026',
    desc: '2026 世界环境日主题海报：为城市留白，为未来深呼吸，科技感线条勾勒城市与自然共生。',
    note: '围绕世界环境日的城市议题，用科技感线条勾勒城市天际线与绿植共生的意象，寓意“为城市留白、为未来深呼吸”。画面以冷蓝与绿色渐变构成昼夜交替的氛围，呼吸感的曲线元素贯穿版面，强化主题联想。标题字号层级分明，信息区块留白充足，在公益严肃性与视觉美感间取得平衡。',
  },
  {
    id: 'guard-earth',
    file: 'works/156ee149e67fbfd9cfb3b687e4f2c7dd.webp',
    title: '守护地球 · 从现在开始',
    category: 'poster',
    tag: '公益海报 / 绿色未来',
    year: '2026',
    desc: '绿色未来 A GREENER FUTURE，以清新视觉号召低碳行动，为地球减负。',
    note: '以“绿色未来”为核心主张，采用清新自然的蓝绿色调与拟人化地球形象，降低环保主题的距离感。主图形将地球与嫩芽、水滴结合，象征生机与行动；标语“为地球减负”以醒目衬线体压版，强化记忆点。版面下方辅以简洁的行动号召图标，引导观者从认知走向参与，完成公益海报的传播闭环。',
  },
  {
    id: 'green-anime',
    file: 'works/3b5aec7159419355309232414547ed79.webp',
    title: '绿色出行 · 动漫版',
    category: 'poster',
    tag: '公益海报 / 二次元',
    year: '2026',
    desc: '二次元动漫风格公益海报：少一份碳排放，多一片蓝天，出发为了更清新的未来。',
    note: '将公益主题转化为二次元动漫叙事，用元气少女与伙伴们骑行、乘车的场景唤起年轻受众共鸣。画面高饱和明快，动态线条与光效增强“出发”的爽快感，标语“少一份碳排放，多一片蓝天”自然融入场景。构图采用倾斜视角制造速度感，让环保主张像一次轻松的城市冒险，更具传播力。',
  },
  {
    id: 'guofeng-fairy',
    file: 'works/b27e9a9242b6c31edbcf9490b8673c90.webp',
    title: '国风 · 仙居山水',
    category: 'illustration',
    tag: '国风插画 / 奇幻',
    year: '2026',
    desc: '身着华服立于莲花座上的古风女子，融合仙宫、山水、花鸟意象的空灵雅致插画。',
    note: '以东方神话为蓝本，描绘华服女子立于莲花座上的空灵景象。仙宫、山水、花鸟意象层层叠叠，形成“人在画中游”的纵深。工笔笔触与水墨晕染结合，金线点缀云纹，色彩在青绿与绯红间流转，营造飘渺雅致的仙家气质。留白与云气分割画面，让观者的视线随衣袂流转，沉浸于古典浪漫。',
  },
  {
    id: 'guofeng-whale',
    file: 'works/e656f3328b6723da068966dc53836acb.webp',
    title: '国风 · 鲸落海底',
    category: 'illustration',
    tag: '国风插画 / 海洋奇幻',
    year: '2026',
    desc: '东方神话与海洋奇幻交织：巨型金纹鲸鱼、锦鲤与悬浮仙山，唯美梦幻的海底仙境。',
    note: '将东方神话与海洋奇幻交织：巨型金纹鲸鱼巡游于海底，锦鲤环绕、悬浮仙山点缀其间，构建梦幻的海底仙境。蓝金主调平衡了神话的庄重与海洋的深邃，鲸落意象暗含“新生”的东方哲思。波纹、气泡与光晕层层叠加，画面既有工笔的细腻，又有奇幻的想象张力，兼具装饰性与叙事感。',
  },
  {
    id: 'pop-studio',
    file: 'works/a05a76190573dc3865c481201f1f93a6.webp',
    title: '波普 · 创意工坊',
    category: 'illustration',
    tag: '波普插画 / 潮流',
    year: '2026',
    desc: '高饱和波普风：耳机小狗持画笔创作，火箭、鲸鱼与浮空城构建天马行空的创意世界。',
    note: '以高饱和波普风打造“创意工坊”的狂欢现场：耳机小狗执笔创作，火箭、鲸鱼与浮空城填充画面，符号化元素密集而有序。撞色色块与网点肌理强化印刷质感，粗黑描边让每个形象清晰可辨。画面中心保持主次节奏，四周元素向外发散，营造天马行空又自成体系的创意宇宙，传递大胆玩味的潮流态度。',
  },
  {
    id: 'pop-flight',
    file: 'works/f429e66f5d31894efea3dc4833f208fc.webp',
    title: '波普 · 奇想飞行',
    category: 'illustration',
    tag: '波普插画 / 潮流',
    year: '2026',
    desc: '皇冠角色骑着铅笔飞行器探险，彩虹云朵与浮空岛屿，充满创意与欢乐的冒险主题。',
    note: '皇冠角色驾驭铅笔飞行器穿越彩虹云海，将“灵感起飞”具象为一场奇幻冒险。画面采用倾斜构图与速度线，强化俯冲的动势；高饱和补色碰撞出强烈的视觉冲击，浮空岛屿与星星点缀丰富层次。角色表情自信张扬，象征创意的无拘无束。整体兼具波普的张力与童话的浪漫，适合潮玩与传播场景延展。',
  },
  {
    id: 'small-steps',
    file: 'works/06cde7fb6085ae8058b2950c0e9e1abb.webp',
    title: 'Small Steps Big Dreams',
    category: 'illustration',
    tag: '潮流插画 / 学习主题',
    year: '2026',
    desc: 'GOOD THINGS TAKE TIME · STUDY MAKES LIFE BETTER，关于坚持与成长的潮流视觉。',
    note: '以“小小的坚持成就大大的梦想”为主题，用潮流插画语言表现学习与成长的过程。阶梯、书本与星星等符号串联画面，人物向上攀登的动态呼应“GOOD THINGS TAKE TIME”的价值观。暖色渐变营造励志氛围，标题英文压版强化记忆点，版式简洁有力，适合作为学习社群与励志场景的视觉载体。',
  },
  {
    id: 'dream-plan',
    file: 'works/16f48b98e79072c80200254f5b874df0.webp',
    title: 'DREAM · PLAN · DO · REPEAT',
    category: 'illustration',
    tag: '潮流插画 / 励志',
    year: '2026',
    desc: 'BETTER LIVING EVERYDAY · HEALTH IS HAPPINESS，梦想与行动的循环进行时。',
    note: '以“梦想—计划—行动—重复”的循环逻辑为核心，用几何化人物与轨道元素表现日复一日的坚持。画面采用秩序感构图，箭头与循环符号引导阅读路径，传达“健康即幸福”的生活态度。撞色与几何图形兼具现代感与亲和力，标语“BETTER LIVING EVERYDAY”作为视觉锚点，鼓励观者即刻行动。',
  },
]

/* 个人优势 —— 核心能力卡片 */
export const advantages = [
  {
    icon: '◎',
    title: '品牌全案能力',
    desc: '从品牌策略、标志与 VI 系统到包装、物料与延展应用，具备完整的视觉全案输出能力。',
  },
  {
    icon: '◈',
    title: 'AIGC 全流程管线',
    desc: '熟悉 Kling / Pika / Runway / 即梦 / ComfyUI，搭建标准化提示词模板与 AIGC 产出流水线。',
  },
  {
    icon: '✧',
    title: '跨媒介视觉表达',
    desc: '平面、插画、UI 与动态影像多维贯通，擅长把创意意图准确转化为成片级视觉语言。',
  },
  {
    icon: '➤',
    title: '快节奏项目协同',
    desc: '多段传媒公司实战，与编剧、导演、运营紧密协作，理解创意意图并高质量落地。',
  },
]

/* 设计能力（0-100） */
export const designSkills = [
  { name: '平面设计', en: 'Graphic Design', value: 95 },
  { name: '品牌视觉', en: 'Brand Identity', value: 90 },
  { name: '插画创作', en: 'Illustration', value: 88 },
  { name: '排版字体', en: 'Typography', value: 92 },
  { name: 'UI / 交互', en: 'UI / Interaction', value: 85 },
]

/* 软件熟练度（0-100） */
export const softwareSkills = [
  { name: 'Photoshop', value: 95 },
  { name: 'Premiere Pro', value: 90 },
  { name: 'Illustrator', value: 88 },
  { name: 'After Effects', value: 82 },
  { name: 'Figma', value: 80 },
]

/* AIGC 工具 */
export const aiTools = [
  { name: 'Kling', level: 92, tag: '视频生成' },
  { name: 'Pika', level: 90, tag: '视频生成' },
  { name: 'Runway', level: 88, tag: '视频生成' },
  { name: '即梦', level: 90, tag: '图生 / 视频' },
  { name: 'ComfyUI', level: 84, tag: '工作流搭建' },
  { name: '提示词工程', level: 95, tag: 'Prompt' },
]

export const contacts = [
  {
    label: '电话 / PHONE',
    value: '13921049615',
    href: 'tel:13921049615',
  },
  {
    label: '邮箱 / EMAIL',
    value: '3033471043@qq.com',
    href: 'mailto:3033471043@qq.com',
  },
  {
    label: '坐标 / LOCATION',
    value: '中国 · 天津',
    href: null,
  },
]

export const navLinks = [
  { id: 'hero', label: '首页', en: 'HOME' },
  { id: 'about', label: '个人经历', en: 'ABOUT' },
  { id: 'works', label: '项目作品', en: 'WORKS' },
  { id: 'skills', label: '个人优势', en: 'SKILLS' },
  { id: 'contact', label: '联系我', en: 'CONTACT' },
]

/* ============================================================
 *  界面文案字典 —— 页面上所有可见文字都在这里维护
 *  编辑模式下均可直接修改（data-edit 路径即 ui.xxx）
 *  控件类按钮（编辑/保存/箭头符号等）保持不可编辑以免误触
 * ============================================================ */
export const ui = {
  nav: {
    logo: 'TJT',
    brand: 'GRAPHIC',
    cta: '开始合作',
  },
  hero: {
    eyebrow: 'PORTFOLIO — 2026 ·',
    viewWorks: '查看作品',
    aboutMe: '了解我',
    scroll: 'SCROLL',
    watermark: 'DESIGN',
  },
  about: {
    index: '01 / ABOUT',
    title: '个人经历',
    en: 'DESIGNER PROFILE',
    eduTag: 'EDUCATION',
    expTag: 'EXPERIENCE',
    eduPrefix: '主修：',
    cardTitle: 'AIGC 全流程',
    cardTools: 'Kling / Pika / Runway / 即梦',
  },
  works: {
    index: '02 / WORKS',
    title: '项目作品',
    en: 'SELECTED PROJECTS',
    view: 'VIEW +',
    hint: '横向滚动浏览',
  },
  skills: {
    index: '03 / SKILLS',
    title: '个人优势',
    en: 'CORE STRENGTHS',
    design: '设计能力',
    designEn: 'DESIGN',
    software: '软件熟练度',
    softwareEn: 'SOFTWARE',
    ai: 'AIGC 工具',
    aiEn: 'GENERATIVE AI',
  },
  contact: {
    eyebrow: "LET'S CREATE TOGETHER",
    title1: '让我们聊聊',
    title2: '你的下一个项目',
    btn: '发送合作邀请',
    copyPrefix: '©',
    top: 'BACK TO TOP ↑',
  },
  mascot: {
    pop: '戳我一下 ✦',
    livePrefix: 'LIVE · ',
  },
}
