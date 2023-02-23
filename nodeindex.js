const http = require("http")
const fs = require("fs")
var requests = require("requests")

const homefile = fs.readFileSync("home.html", "utf-8")

function replacevalval(tempval, orgval) {
    let temperature = tempval.replace("{%tempval%}", orgval.main.temp)
    temperature = temperature.replace("{%tempmin%}", orgval.main.temp_min)
    temperature = temperature.replace("{%tempmax%}", orgval.main.temp_max)
    temperature = temperature.replace("{%location%}", orgval.name)
    temperature = temperature.replace("{%country%}", orgval.sys.country)
    return temperature
}

const server = http.createServer((req, res) => {
    if (req.url == "/") {
        requests("https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=26510a48ee3046051cfc9056bfd01dd4")
            .on("data", (chunk) => {
                const objdata = JSON.parse(chunk)
                const arrdata = [objdata]
                const realtimedata = arrdata.map((val) => replacevalval(homefile, val)).join("")
                res.write(realtimedata)
            })
            .on("end", (err) => {
                if (err) return console.log("conn.refuesed", err)
                res.end()

            })
    }

})
server.listen("8005", "127.0.0.1")