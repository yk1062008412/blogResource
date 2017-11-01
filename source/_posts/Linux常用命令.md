---
title: Linux常用命令
date: 2017-08-01 14:53:19
categories: "Linux"
tags: 
    - Linux
---

本文主要介绍Linux常用的一些基本命令。

1. 查看系统版本：
```
cat /etc/redhat-release 或 cat /etc/issue
```
2. 删除文件： 
```
rm -f /var/log/httpd/access.log
```
    将会强制删除/var/log/httpd/access.log这个文件。
3. 删除文件夹及文件夹下的所有子内容：
```
rm -rf /var/log/httpd/access
```
    将会删除/var/log/httpd/access目录以及其下所有文件、文件夹
4. 修改IP地址：
```
vi /etc/sysconfig/network-scripts
```
5. 查看Linux启动的服务
```
chkconfig --list 查询出所有当前运行的服务
```
6. 如果只是想当前的设置状态有效，在系统重启动后即不生效的话，可以用如下命令停止服务
```
service sshd stop
```
7. 移动文件夹到另一个文件夹(一般也用于文件或文件夹改名)
```
mv 文件夹/* 新文件夹/
```
8. 新建文件
```
touch a.txt
```
9. 查看某个命令的含义
```
man ls
```
10. 查看命令的说明文档
```
info ls
```
11. 查看系统运行的进程
```
ps aux
```
12. 查看当前用户UID，用户id
```
id
```
13. 查看当前用户GID，用户所属组
```
groups
```
14. 查看当前在线用户
```
who
```
15. 快速切换到root用户
```
su
```
16. 查看当前目录下的文件，包括隐藏文件或文件夹
```
ls -la
```
    隐藏文件的文件名以 . 开始
17. 查看文件内容
```
cat a.txt：查看文件全部内容
head -n a.txt：查看文件前n行内容，默认前10行
tail -n a.txt: 查看文件后n行内容，默认后10行，一般用于查看日志文件
```
18. 修改文件权限
```
chmod 777 a.txt
```
    修改整个文件夹目录及目录下所有文件权限:
```
chmod -R 777 文件目录名/
```
19. 查看linux系统的默认编码和支持的其他编码
```
echo $LANG     //查看系统当前语系
locale         //查看当前系统的语言环境
locale -a      //查看系统支持的所有语言
```
20. 搜索文件
    · locate：从后台数据库 /var/lib/mlocate 中进行搜索，速度很快，但无法搜索新建的文件。强制更新后台数据库 update.只能按照文件名搜索。
    · whereis: 只能搜索命令。即搜索命令的命令
    · which：搜索命令的命令
    · find /home -name aaa.txt。在系统中搜索指定文件。
        ```
            -name 严格按照大小写查找
            -iname 不区分大小写查找
        ```
    · grep: grep "char" aaa.txt。在文件中搜索指定字符串。
    · grep -v "char" aaa.txt。在文件中搜索不包含指定字符串char的字符串。(-v为取反)
    · man: 查看命令的帮助文档
    · whatis:查看命令的帮助级别 == man -f
    · passwd：修改密码
    · apropos：列出与命令相关帮助文档的所有信息 ==man -k
21. 压缩文件
    · zip
        压缩文件： zip a.zip a
        压缩文件夹： zip -r a.zip a
        解压文件：unzip a.zip
    · gz
        压缩源文件为原文件名.gz,并且源文件消失：gzip a
        压缩为.gz格式，源文件保留：gzip -c a > a.gz
        压缩目录下的所有子文件，但是不能压缩目录：gzip -r 目录
        解压缩文件：gzip -d a.gz
        解压缩文件：gunzip a.gz
        解压缩目录下的文件：gunzip -r 目录
    · bz2
        压缩为.bz2格式，不保留源文件：bzip2 源文件
        压缩之后保留源文件：bzip2 -k 源文件
        ** 注意：bzip2命令不能压缩目录 **
        解压缩，-k保留压缩文件：bzip2 -d 压缩文件
        解压缩，-k保留压缩文件：bunzip2 压缩文件
    · tar
        打包命令：tar -cvf a.tar a
        解打包命令：tar -xvf a.tar
    · tar.gz 打包并压缩
        压缩为.tar.gz格式：tar -zcvf a.tar.gz 源文件
        解压缩：tar -zxvf a.tar.gz
    · tar.bz2
        压缩为.tar.bz2格式：tar -jcvf a.tar.bz2 源文件
        解压缩：tar -jxvf a.tar.bz2
        指定位置的解压缩：tar - jxvf a.tar.bz2 -C /temp/
        仅查看压缩文件：tar -ztvf a.tar.gz
22. 关机(shutdown对服务器最安全)
```
shutdown -h 12:00 & 关机并将命令放在后台运行
shutdown -c 取消前一个关机命令
halt 关机
poweroff 关机
init 0 关机
```
23. 重启
```
shutdown -r 重启
reboot
init 6
```
24. 查询系统运行级别
```
runlevel
cat /etc/inittab
```
25. 退出登录
```
logout
```
26. 查询系统中已经挂载好的设备：
```
mount
```
27. Linux默认不支持NTFS文件系统。
    支持的条件为安装 ntfs-3g.
28. 查看用户登录信息
```
w：能看到用户登录情况及内存使用情况
who：只能看到用户登录情况
last:查看系统中所有用户登录信息
lastlog:查看所有用户的最后一次登录信息
```
29. 查看系统中所有的命令别名
```
alias
```
30. 历史命令
```
查看历史命令: history
清空历史命令: history -c
把缓存中的历史命令写入历史命令保存文件 ~/.bash_history：history -w
修改历史命令保存条数： vi /etc/profile   HISTSIZE
```
31. 查看当前日期：
```
date
```
32. 查看进程树：
```
pstree
```
33. Linux安装第三方插件来支持中文显示：zhcon


目前就先这么多，等待以后补充。


