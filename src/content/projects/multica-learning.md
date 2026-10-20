---
title: Multica Learning
subtitle: 源码可验证的 Agent Runtime 研究与协作流程
category: 源码研究与 AGENT 协作
order: 3
summary: 以源码证据研究 Agent Runtime，将研究、写作、技术评审与人工审核组织成持续维护的知识生产流程。
ownership: 研究流程、Learning Squad 与公开学习站的设计和维护
status: 持续维护 · 开源研究
poster: /images/multica.svg
posterAlt: Multica Learning 研究流程示意：源码核验、教程生产、技术评审和人工审核，当前完成 M01 至 M06。
technologies:
  - Agent Runtime
  - Source Verification
  - Agentic Workflow
  - Astro
  - MDX
  - GitHub Actions
highlights:
  - 已完成 M01–M06 六个核心模块
  - 源码核验与 Agent Runtime 研究
  - Learning Squad 与人工审核的协作流程
metrics:
  - value: M01–M06
    label: 已完成研究模块
    context: 当前已完成的研究模块范围，不包含后续计划章节。
demo:
  status: not-applicable
  note: 完整教程与研究内容可在公开学习站阅读。
links:
  - label: 阅读完整学习站
    url: https://qinweijia111.github.io/multica-learning/
  - label: 查看 GitHub 仓库
    url: https://github.com/QinWeijia111/multica-learning
myRole: 设计并维护研究流程、协作规则与学习站，开展源码研究和内容核验。项目的价值在于对 Agent Systems 的理解，以及可复用的研究与工程协作实践。
resultNote: 已完成 M01–M06，并建立源码核验、研究交接、技术评审与持续发布的流程。项目研究上游 Multica，不声称实现了上游运行时。
detailSections:
  - heading: 已完成研究模块
    layout: cards
    description: M01–M06 从一次端到端执行出发，逐步深入对象、系统边界与任务调度。每个模块都连接到完整教程。
    items:
      - label: M01
        title: Issue → Coding Agent
        description: 建立从 Issue 到 Coding Agent 的端到端执行地图，理解一次工作如何到达本地执行环境。
        url: https://qinweijia111.github.io/multica-learning/learn/run-lifecycle
      - label: M02
        title: Object Model
        description: 梳理 Agent、Runtime、Run / Task 等核心对象，区分产品概念、源码对象和执行资源。
        url: https://qinweijia111.github.io/multica-learning/learn/product-source-object-model
      - label: M03
        title: Control Plane / Execution Plane
        description: 理解协调侧与本地执行侧的职责和边界，以及两侧如何接力完成任务。
        url: https://qinweijia111.github.io/multica-learning/learn/control-execution-plane
      - label: M04
        title: Trigger
        description: 研究不同触发方式如何进入统一执行主线，理解触发与实际执行之间的关系。
        url: https://qinweijia111.github.io/multica-learning/learn/trigger-convergence
      - label: M05
        title: Durable Task
        description: 理解一次 Agent 执行为什么需要耐久任务记录，以及执行信息如何跨越进程生命周期。
        url: https://qinweijia111.github.io/multica-learning/learn/durable-task
      - label: M06
        title: Wakeup / Polling / Claim
        description: 研究任务发现、执行权和并发控制，理解唤醒、轮询与领取的分工。
        url: https://qinweijia111.github.io/multica-learning/learn/task-claim-scheduling
  - heading: Source Verification 流程
    layout: flow
    description: 先固定研究问题与上游版本，再追踪源码、形成映射和研究记录；技术评审与人工审核之后才发布。结论必须能够回到证据，而不是只重复文档中的说法。
    items:
      - title: Research Question
      - title: Pin Upstream Commit
      - title: Source Verification
      - title: Source Map
      - title: Research Note
      - title: Tutorial Writing
      - title: Technical Review
      - title: Human Review
      - title: Publish
  - heading: 多 Agent 协作流程
    layout: flow
    description: Learning Squad 采用顺序路由协作：前一角色产出结构化交接，再交给下一角色。它不是简单并行 fan-out；最终范围判断与合并权保留给人。
    items:
      - title: Leader
      - title: Source Analyst
      - title: Tutorial Writer
      - title: Technical Reviewer
      - title: Human Merge
---

## 项目概述

Multica Learning 围绕开源项目 Multica，开展源码可验证的 Agent Runtime 研究，并把研究、写作、评审与发布组织成持续维护的 Agentic Workflow。

## 为什么要从源码验证行为

Agent 系统的真实行为横跨协调、持久化和本地执行等层次。仅阅读文档或单个函数，容易把对象名称、预期行为与实际执行混为一谈；研究成果在写作中也可能失去证据链。

我的做法是固定上游 commit，沿一个问题追踪入口、调用关系、状态变化与结果路径，再将源码事实和推断区分记录。学习站既展示结论，也保留便于复核的研究上下文。

## 我构建的研究与协作系统

我设计并维护 Learning Squad 的角色分工、结构化交接与审核流程，让源码研究能够持续转化为教程。源码核验、教程写作和技术评审各有职责，最终由人工确认并合并，通过公开站点交付内容。

当前已完成 M01–M06。这里展示的是我对上游系统的研究，以及自行组织的知识生产流程，不声称实现了 Multica 本体或其 Runtime。

## 从工程问题到源码研究

[NewRevit](/projects/newrevit/) 聚焦领域能力与真实回归，[PiRevit](/projects/pirevit/) 将能力带入运行时与桌面产品。围绕这些工程实践中持续遇到的执行、状态和协作问题，Multica Learning 进一步从公开源码研究运行机制。

三个项目分别呈现能力建设、产品交付与源码研究，也共同围绕一个方向：理解 Agent 如何在真实软件环境里可靠地工作，并把这一过程组织成可持续的工程实践。
