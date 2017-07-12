## mac开发中的配置记录

### 1. 通过zsh配置快速打开webstorm
#### 标签
[webstorm][工具]
#### 描述
希望通过命令直接启动webstorm或直接通过webstorm打开当前目录项目。
#### 方案
1. 首先配置webstorm，Tools => Create Command Line Launcher，设置命令后可以在zsh中直接执行`webstorm`启动；
2. 在.zshrc中配置`alias ws="webstorm"`，然后打开新终端窗口，输入`ws .`。
