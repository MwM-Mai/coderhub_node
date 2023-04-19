// 一. 生成私钥
 
// macOS 系统 终端可以使用 openssl; window 系统无法使用 openssl

// 1. window 系统 打开 git bash

// 2. 执行 openssl 命令

// 3. 执行 genrsa -out private.key 1024 (genrsa 生成rsa; -out 导出; private.key 私钥; 1024 长度)

// 二. 根据私钥生成公钥

// rsa -in(输入) private.key -pubout(公钥) -out public.key