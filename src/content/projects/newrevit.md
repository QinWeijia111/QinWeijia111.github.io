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
technologies: [Agent Systems, MCP, Skills, TypeScript, C#, Revit API]
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
links: []
myRole: 负责从问题定义、系统搭建到验证与迭代的完整过程。这是个人从零构建并持续维护的真实工程项目。本站仅介绍公开成果；客户模型、源码与内部实现材料不对外展示。
resultNote: 典型场景中，据工程师反馈，约一周重复工作量缩短至半小时级。这是场景反馈，并非受控基准或通用效率保证。
---

## 项目概述

NewRevit 面向 BIM 垂直领域，把工程经验、Agent 工具和 Revit 自动化连接起来。重点是实际生成工程模型，并用回归验证结果，让 Agent 从“可以操作软件”走向“可以完成真实任务”。

## 真实问题

BIM 建模包含大量重复操作，也受到空间、连接和工程规则的共同约束。孤立的自动化脚本难以承载完整工作流；Agent 的输出也需要在真实软件中验证。

## 我构建了什么

我从 0 到 1 搭建 Agent、MCP、Skills 与 Revit 自动化之间的能力链路，将领域工作流组织成可复用能力，并建立跨模型的评测与持续迭代机制。

- 用 Tool 与 Skills 组织建模能力和领域工作流。
- 在真实 Revit 场景中完成模型自动生成。
- 通过连接检查、碰撞检查和跨模型回归验证结果。
- 将能力研发与桌面工作台集成衔接起来，支持持续交付。
