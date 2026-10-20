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
technologies: [Pi RPC, Tauri, Rust, React, TypeScript, Windows]
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
architecture: [Desktop Workbench, Pi RPC Runtime, Tools & Skills, Revit]
architectureNote: 产品层连接 Pi RPC 运行时；Pi 提供 Agent Core。
links: []
myRole: 负责运行时集成、桌面交互、可观测性与 Windows 产品化。Pi 提供 Agent Core；我的工作重点是将它与领域能力及产品体验连接起来。
resultNote: 从 Agent 能力到桌面交互与 Windows 交付，形成完整的产品工程实践；运行时核心使用 Pi，不声称自研 Pi Agent Core。
---

## 项目概述

PiRevit（Revit Agent Workbench）是面向 Revit 的 Agent Runtime 集成与桌面工作台。它承接 NewRevit 的工具能力，把执行过程、人工决策和会话状态呈现在统一的桌面体验中。

## 真实问题

真实使用者需要理解 Agent 正在做什么，在关键时刻参与决策，并在中断后继续工作。只有工具调用能力，还不足以形成可交付的桌面产品。

## 我构建了什么

我从 0 到 1 构建桌面产品层与 Pi RPC 运行时集成，围绕真实交互和交付完善 Agent 使用体验。

- **Pi RPC Agent Runtime**：连接 Pi 运行时与桌面应用。
- **Tool Activity**：展示工具执行活动，帮助理解任务进展。
- **Human-in-the-loop**：在需要确认时引入人工参与。
- **Session**：管理会话与历史上下文。
- **Observability**：用可观测信息支持定位问题与复现。
- **Windows productization**：完成桌面安装与产品交付实践。
