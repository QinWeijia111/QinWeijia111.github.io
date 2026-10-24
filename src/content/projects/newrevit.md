---
title: NewRevit
subtitle: BIM 垂直领域 Agent 系统
category: AGENT 领域能力系统
order: 1
summary: 将真实 BIM 建模中的重复工作，转化为 Agent 可执行、可验证的工程工作流。
ownership: 从 0 到 1 设计、构建并持续维护
status: 持续维护 · 真实工程项目
poster: /images/newrevit.svg
posterAlt: NewRevit 高层能力示意：Agent 通过 MCP 与 Skills 连接 Revit 自动建模，并以回归评测验证结果。非客户模型截图。
technologies:
  - Agent Systems
  - MCP
  - Skills
  - TypeScript
  - C#
  - Revit API
highlights:
  - Agent + MCP + Skills + Revit Automation
  - 实际模型自动生成与跨模型评测
  - 从领域工作流到回归验证的完整工程实践
metrics:
  - value: 61+
    label: Agent 工具
    context: 公开层面的工具能力数量，不公开工具清单或 Schema。
  - value: 9/9
    label: 支路连接
    context: 已确认回归范围内的支路连接结果。
  - value: 9/9
    label: 主管连接
    context: 已确认回归范围内的主管连接结果。
  - value: '18'
    label: 回归覆盖泵数量
    context: 指定回归组合中的泵数量，不代表任意模型覆盖。
  - value: '0'
    label: 代表性回归物理碰撞
    context: 代表性跨模型回归的物理碰撞数，不保证所有场景无碰撞。
demo:
  status: approved
  src: /videos/newrevit-pirevit-demo.mp4
  captions: /videos/newrevit-pirevit-demo.zh.vtt
  note: NewRevit × PiRevit 联合演示：从桌面参数确认，到 Agent 执行与 Revit 模型自动生成。
  stages:
    - 任务参数确认
    - Agent 开始执行
    - Tool 调用过程
    - Revit 自动建模
    - 最终模型结果
links: []
myRole: 负责从问题定义、系统搭建到验证与迭代的完整过程。这是个人从零构建并持续维护的真实工程项目。本站仅介绍公开成果；客户模型、源码与内部实现材料不对外展示。
resultNote: 典型场景中，据工程师反馈，约一周重复工作量缩短至半小时级。这是场景反馈，并非受控基准或通用效率保证。
detailSections:
  - heading: 一次任务如何完成
    layout: flow
    description: 从需求到结果，Agent 执行与工程验证共同构成完整工作流。以下是公开层面的任务概览。
    items:
      - title: 工程需求
      - title: Agent + Skills
      - title: 读取当前 Revit 环境
      - title: 调用领域能力
      - title: 自动生成模型
      - title: 连接 / 碰撞等结果验证
      - title: 工程师复核
  - heading: 代表性应用场景
    layout: cards
    items:
      - title: 消防泵房自动建模
        description: 将重复的设备与管线建模组织为连贯任务，在真实 Revit 环境中生成模型并检查结果。
      - title: 消防水箱间设备定位与建模
        description: 围绕当前环境理解设备位置与建模需求，把定位和模型生成衔接到同一工作流中。
      - title: 普通 / 低净高空间适配
        description: 把当前模型的可用空间与工程约束纳入布局判断，不将同一布局直接套用到所有空间。
      - title: 跨模型回归
        description: 在不同模型环境中重复验证连接与碰撞等结果，观察能力能否稳定复用。
  - heading: 我重点解决的三个问题
    layout: cards
    items:
      - title: 可靠执行
        description: 为执行设置边界。在异常或结果不确定时先停止并核验，避免 Agent 盲目继续或重复操作。
      - title: 场景适应
        description: 根据当前模型环境进行布局和约束判断，让建模能力适应不同工程场景，而非只复现固定示例。
      - title: 真实评测
        description: 不只看“生成成功”，还检查连接、碰撞和跨模型结果，将验证反馈纳入后续迭代。
evolution:
  heading: 项目演进
  layout: flow
  description: 沿着“能力可调用 → 经验可复用 → 结果可验证 → 用户可使用”的路线持续演进。
  items:
    - title: Revit 自动化能力
    - title: MCP Tools
    - title: 领域 Skills
    - title: 真实回归评测
    - title: PiRevit 桌面产品
crossProject:
  project: pirevit
  heading: 从能力到产品
  description: NewRevit 解决 Agent 如何可靠操作 Revit；PiRevit 进一步解决这些能力如何进入可交互、可观测、可交付的桌面产品。
architectureDiagrams:
  - src: /images/newrevit-architecture-v1.png
    width: 1536
    height: 1024
    title: NewRevit 整体架构图
    alt: NewRevit 高层架构 PNG：Agent 与领域 Skills 通过 MCP 和 WebSocket 连接 C# Revit Add-in，由主线程调度和 Revit API 完成模型操作，并通过连接检查、碰撞检查和工程师复核验证结果。
    description: Agent 与领域 Skills 负责意图理解和工作流推进；TypeScript MCP Server 提供能力入口，通过 WebSocket 连接 Revit Add-in，由执行后端读取工程环境并进行确定性建模。图中同时展示真实回归与能力交付的关系，不展开私有工具契约、Prompt 或 Skills 原文。
---

## 项目概述

NewRevit 是 BIM 垂直领域 Agent 系统。我从 0 到 1 将工程经验、Agent 工具和 Revit 自动化连接起来，让真实建模工作形成可执行、可验证的流程。

## 项目背景 / 为什么需要这个系统

消防泵房和消防水箱间存在大量重复建模工作，但任务并不止于“创建元素”。设备和管线还受到可用空间、连接关系与工程规则的共同约束；一个模型里可以成立的布局，也未必适用于另一个模型。

单一脚本可以完成局部自动化，却难以串起需求确认、环境理解、建模与验收的完整工作流。Agent 可以组织这些步骤，但它生成的结果仍必须回到真实 Revit 中验证，最终由工程师判断是否满足任务要求。

## 我从 0 到 1 构建了什么

我把系统建设分成相互衔接的三层，从“能操作”推进到“能完成任务、能验证结果”。

1. **让 Agent 能调用 Revit 能力。** 将软件操作组织为 Agent 可调用的领域能力，让自然语言任务能够进入实际建模过程。
2. **将工程经验组织为 Skills / 工作流。** 把任务所需的经验与阶段判断放进可复用流程，连接需求、环境、执行和结果检查。
3. **将结果纳入真实评测与回归。** 在真实模型中检查连接与碰撞，并通过跨模型回归持续发现问题、调整能力。

这三层共同支撑从工程需求到实际模型生成的链路。公开展示聚焦系统职责和结果，不展开私有工具契约、提示词或 Skills 内容。
