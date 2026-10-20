# PR #1 可读性与项目叙事整改

保留暖灰 + 深绿、卡片边框与圆角、现有页面骨架和 CI 工具。本轮只调整阅读层级、内容和项目间的浏览连续性。

## 审阅重点

- 系统字体栈，无外部字体；body 17px，项目卡正文 15px、highlights 14px、ownership 13px，辅助文字最低 12px。
- 详情正文 17px、780px 最大行宽；视频、Metrics 与流程卡保持全宽。
- NewRevit：建设的三层、7 步任务流程、4 类应用场景、3 个重点问题、5 步演进路线。
- PiRevit：9 步用户旅程、5 项工作重点、Pi RPC 高层架构及准确归属说明。
- Multica：6 张研究模块卡、可访问的章节链接、源码核验流程、顺序协作流程，以及与前两个工程项目的联系。
- NewRevit ↔ PiRevit 双向入口，以及按项目顺序生成的上一篇 / 下一篇。
- 两个视频页面各有 5 阶段观看指南，不使用未经核实的时间点。

## Desktop / Mobile 截图

截图只展示网页的文本与原有概念图，不包含从视频新增的真实 Revit 截图。1440px 桌面、390px 手机。其他断点与暗色完整页面截图由浏览器测试生成，保存在本地 `test-results/`；远端 HTML 报告由现有 CI 上传。

| 内容              | Desktop                      | Mobile                      |
| ----------------- | ---------------------------- | --------------------------- |
| 首页项目卡        | [查看](desktop-home.jpg)     | [查看](mobile-home.jpg)     |
| NewRevit 任务流程 | [查看](desktop-newrevit.jpg) | [查看](mobile-newrevit.jpg) |
| PiRevit 用户旅程  | [查看](desktop-pirevit.jpg)  | [查看](mobile-pirevit.jpg)  |
| Multica 研究模块  | [查看](desktop-multica.jpg)  | [查看](mobile-multica.jpg)  |

## 隐私与审核

未新增私有源码、Schema、Prompt、Skills 原文、内部路径、Family 名称或客户资产。NewRevit 原有指标与适用范围完整保留；Pi Core 和上游 Multica 的归属没有变化。PDF 仍不公开下载。

真实 Demo 截图 poster 暂缓：本轮保留概念封面，支持未来通过 `demo.poster` 配置已审核图片。在单独的截图审核完成前不添加实际 Revit 截图。已批准的视频文件及字幕轨道没有改变。

Agent 已做截图目视检查和自动化验证；这不代替用户的最终人工内容/视觉审核。PR 仍不合并。

另见 [Mobile 架构换行](mobile-architecture.jpg)。
