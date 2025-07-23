
# C#调用YoloV5


## 使用yolo帮助我们识别自动化脚本2D 之类的图片
![](/docs/yolo/image.png)
> 例如我们识别 这个标签, 兼容不同设备


## 参考 
> https://blog.csdn.net/qq_45945548/article/details/121701492

## 环境准备
> 下载yoloV5  yolov5-7.0
> 下载安装yolov5：yolov5 v6.0官方要求 Python>=3.6 and PyTorch>=1.7
> yolov5源码下载：https://github.com/ultralytics/yolov5

> 在Net下使用 我们需要使用这个DLL https://github.com/techwingslab/yolov5-net
> Install-Package Yolov5Net -Version 1.1.0

### 数据标注
> 


## 模型训练
> 由于A卡折腾好久还是很慢,直接花10块租用一个云 gpu
>  
### 使用命令
> 这个命令解释上方 csdn 有解释 
> 使用云gpu 显卡 4060ti
> python train.py --batch-size 10 --epochs 1050 --data datasets/gj2/gj2.yaml --cfg ./models/yolov5s.yaml --weights yolov5s.pt --resume=True

