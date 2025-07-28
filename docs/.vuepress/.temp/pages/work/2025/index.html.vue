<template><div><h3 id="宏基因系统" tabindex="-1"><a class="header-anchor" href="#宏基因系统"><span>宏基因系统</span></a></h3>
<table>
<thead>
<tr>
<th>工作内容</th>
<th>详细说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>机器人自动发布报告进程 -&gt; <strong>目的</strong></td>
<td>1.为了解决不同平台下和大小组批次发布报告进程进行统一管理 批次检验单是否成功<br>2. 解决手动排查问题<br>3. 同时报告监控否长时间未成功原因</td>
</tr>
<tr>
<td>后台管理配置</td>
<td>1. 通过用户配置检验的平台和大小组<br>2. &quot;钉钉webHook信息&quot;、时间间隔、批次号、通知消息模板等信息（例如配置：mNGS批次分析时间达到30分钟，超时分析通知，分析完成时，分析异常时）3.管理中心配置-&gt;送检单位配置,报告单配置,(通过配置设置,生成报告单解读)</td>
</tr>
<tr>
<td>客户端pc配置</td>
<td>1. 客户端通过定时任务，读取共享配置文件下的文件，进行推送信息（通过Http推送到iris、生信）<br>2. 根据后台管理配置，进行推送到不同平台下的钉钉和大小组<br>3. 达到批次发布报告进程跟踪</td>
</tr>
</tbody>
</table>
</div></template>


