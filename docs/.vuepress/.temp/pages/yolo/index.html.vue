<template><div><h1 id="c-调用yolov5" tabindex="-1"><a class="header-anchor" href="#c-调用yolov5"><span>C#调用YoloV5</span></a></h1>
<h2 id="使用yolo帮助我们识别自动化脚本2d-之类的图片" tabindex="-1"><a class="header-anchor" href="#使用yolo帮助我们识别自动化脚本2d-之类的图片"><span>使用yolo帮助我们识别自动化脚本2D 之类的图片</span></a></h2>
<p><img src="/docs/yolo/image.png" alt=""></p>
<blockquote>
<p>例如我们识别 这个标签, 兼容不同设备</p>
</blockquote>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2>
<blockquote>
<p>https://blog.csdn.net/qq_45945548/article/details/121701492</p>
</blockquote>
<h2 id="环境准备" tabindex="-1"><a class="header-anchor" href="#环境准备"><span>环境准备</span></a></h2>
<blockquote>
<p>下载yoloV5  yolov5-7.0
下载安装yolov5：yolov5 v6.0官方要求 Python&gt;=3.6 and PyTorch&gt;=1.7
yolov5源码下载：https://github.com/ultralytics/yolov5</p>
</blockquote>
<blockquote>
<p>在Net下使用 我们需要使用这个DLL https://github.com/techwingslab/yolov5-net
Install-Package Yolov5Net -Version 1.1.0</p>
</blockquote>
<h3 id="数据标注" tabindex="-1"><a class="header-anchor" href="#数据标注"><span>数据标注</span></a></h3>
<blockquote></blockquote>
<h2 id="模型训练" tabindex="-1"><a class="header-anchor" href="#模型训练"><span>模型训练</span></a></h2>
<blockquote>
<p>由于A卡折腾好久还是很慢,直接花10块租用一个云 gpu</p>
</blockquote>
<h3 id="使用命令" tabindex="-1"><a class="header-anchor" href="#使用命令"><span>使用命令</span></a></h3>
<blockquote>
<p>这个命令解释上方 csdn 有解释
使用云gpu 显卡 4060ti
python train.py --batch-size 10 --epochs 1050 --data datasets/gj2/gj2.yaml --cfg ./models/yolov5s.yaml --weights yolov5s.pt --resume=True</p>
</blockquote>
</div></template>


