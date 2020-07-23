module.exports={
    devServer: {
        open: true,
        host: 'localhost',
        https: false,
        port: 8012,
        proxy: {
            '/': {
                //要访问的跨域的域名
                // target: 'http://localhost:8083',
                target: 'http://49.4.115.117:8084',
                ws: true, // 是否启用websockets
                //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样客户端端和服务端进行数据的交互就不会有跨域问题
                changOrigin: true,
                /*pathRewrite: {
                    '^/api': ''
                }*/
            }
        },
    },
}
