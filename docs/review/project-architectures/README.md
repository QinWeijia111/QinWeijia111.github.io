# NewRevit / Multica Learning 架构图验收

两图已由用户在本地审核后授权提交 PR。沿用已确认的 PiRevit PNG 风格，使用现有图片弹窗，不引入新的交互框架。

| 项目             | Desktop                              | Mobile                              |
| ---------------- | ------------------------------------ | ----------------------------------- |
| NewRevit         | [查看](newrevit-desktop.png)         | [查看](newrevit-mobile.png)         |
| Multica Learning | [查看](multica-learning-desktop.png) | [查看](multica-learning-mobile.png) |

NewRevit 的高层职责依据本地源码核验；公开图不展示私有实现。Multica Learning 的内容依据公开仓库快照 `ee5701a44f1550b3ed1ee2fbe527b131ef15194c` 中的项目说明、研究/版本治理文档、Learning Squad、内容 Schema、章节路由和 CI/Pages 工作流；它展示的是学习项目自身的研究与知识生产体系，不是对上游 Multica Runtime 的实现归属声明。

两页的 PNG 加载、关闭按钮、遮罩、Esc、焦点返回及 URL 保持均通过桌面和手机测试。图片文件、范围和校验值见 CONTENT_BOUNDARY。PR 仍由人工决定是否合并。
