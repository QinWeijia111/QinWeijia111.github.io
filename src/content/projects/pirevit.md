---
title: PiRevit
subtitle: Revit Agent 运行时与桌面工作台
category: 运行时与桌面产品
order: 2
summary: 基于 Pi RPC，将 Agent 能力带入可交互、可观测、可交付的 Revit 桌面工作台。
ownership: 从 0 到 1 构建运行时集成与桌面产品层
status: 持续维护 · 真实工程项目
poster: /images/pirevit.svg
posterAlt: PiRevit 产品层示意：桌面工作台连接 Pi RPC Runtime、人工确认、会话与工具活动。非实际产品截图。
technologies:
  - Pi RPC
  - Tauri
  - Rust
  - React
  - TypeScript
  - Windows
highlights:
  - Pi RPC Agent Runtime 与 Desktop Agent
  - Tool Activity、HITL、Session 与 Observability
  - Windows 桌面产品化与交付
metrics: []
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
architecture:
  - Desktop Workbench
  - Pi RPC Runtime
  - Tools & Skills
  - Revit
architectureNote: Pi 提供 Agent Core；PiRevit 负责运行时集成、桌面交互、可观测性和产品化。
links: []
myRole: 负责运行时集成、桌面交互、可观测性与 Windows 产品化。Pi 提供 Agent Core；我的工作重点是将它与领域能力及产品体验连接起来。
resultNote: 从 Agent 能力到桌面交互与 Windows 交付，形成完整的产品工程实践；运行时核心使用 Pi，不声称自研 Pi Agent Core。
detailSections:
  - heading: 一次真实任务旅程
    layout: flow
    description: HITL 在需要用户判断时介入，并非每次任务都机械触发。用户既能看到执行进展，也能在关键节点保留控制权。
    items:
      - title: 用户填写任务参数
      - title: PiRevit 启动 Agent
      - title: Agent 查询当前 Revit 环境
      - title: Tool Activity 实时展示
      - title: 遇到动态歧义时触发 HITL
      - title: 用户确认
      - title: Agent 继续执行
      - title: Revit 完成建模
      - title: Session / Trace 保留执行过程
  - heading: 我的工作重点
    layout: cards
    items:
      - title: Runtime Integration
        description: 基于 Pi RPC 连接运行时与桌面产品，管理 Agent 的启动、执行、中断和事件呈现。Pi 提供 Agent Core。
      - title: Human-in-the-loop
        description: 把任务开始前的参数确认与执行中的动态歧义分开处理，在需要时请求用户决策，再继续任务。
      - title: Session / State
        description: 让会话与用户可观察的执行信息能够保存和恢复，帮助使用者继续先前的工作。
      - title: Observability
        description: 以 Tool Activity 和 Trace 呈现工具活动、结果与错误线索，让异常能够被理解和定位。
      - title: Windows Delivery
        description: 将运行时与桌面体验组织为可安装、可使用的 Windows 产品，完成从开发环境到用户环境的交付。
crossProject:
  project: newrevit
  heading: 能力来源
  description: PiRevit 不重新实现 BIM 建模逻辑，而是消费 NewRevit 已验证的 Tool 与 Skills，并在其上构建 Runtime、Session、HITL、Trace 和桌面体验。
---

## 项目概述

PiRevit（Revit Agent Workbench）是我从 0 到 1 构建的 Revit Agent 运行时集成与桌面工作台。它基于 Pi RPC，把领域工具能力连接到真实用户可以参与、理解和持续使用的桌面体验。

## 为什么需要 PiRevit

NewRevit 已经解决了 Agent 如何操作 Revit。真实工程用户还需要看见 Agent 正在做什么，在关键节点做确认，保存和恢复会话，并在出错后定位问题。系统也需要以桌面产品的形式被安装和使用。

因此，PiRevit 的重点是把能力变成一段完整的使用旅程：从任务输入到执行反馈，从人工确认到结果呈现，再到会话与问题线索的保留。

## 从能力列表到用户工作台

工作台把分散的运行时事件转化为用户可观察的执行过程。用户通过任务参数表达需求，通过 Tool Activity 理解进展；遇到执行中才出现的歧义时，由 HITL 请求确认，而不是让 Agent 静默猜测。

任务结束或中断后，Session 与 Trace 分别支持继续工作和定位问题。这些工作属于运行时集成与产品工程；Agent Core 使用 Pi，不归为我的自研实现。
