const express = require("express")
const fs = require("fs")
const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello")
})

// app.get("/posts", (req, res) => {
//     res.send("posts...")
// })

// app.get("/posts", (req, res) => {
//    const posts = fs.readFileSync("posts.txt", {encoding: "utf-8"})
//    res.send(posts)
// })


// app.get("/posts", (req, res) => {
//     // ->we have to get the post from file and store in a variable
//     const result = fs.readFileSync("./database.txt", "utf-8")
//     // and then send that as response.
//     res.send(result)
// })


// creating POST request.
// app.post("/posts", (req, res) => {
//    // console.log(req.body)
//      const data_recived = JSON.stringify(req.body);
//      fs.appendFileSync("./database.txt", data_recived, {encoding: "utf-8"})
//      res.send("we got your data")
// })
// thunderclient or postman or hoppscotch - tools




//GET
app.get("/attendence_data", (req, res) => {
  // READ the data from db.json and  store it in some variable.
  const result = fs.readFileSync("./db.json", {encoding: "utf-8"})
 // console.log(result)
  // perform whatever you want if required
  const parsed_result = JSON.parse(result)
  const attendance = parsed_result.attendance
  // send the responce
  res.send(attendance)
})

//POST
app.post("/mark_attendance", (req, res) => {
    // get data from the client -req.body
    const log = req.body;
    // store in db.json
    // 1. get attendance data
    const prev_data = fs.readFileSync("./db.json", {encoding: "utf-8"})
    const parsed_prev_data = JSON.parse(prev_data)
    const attendance = parsed_prev_data.attendance

    // 2. then add the recived data to it
    attendance.push(log)
    const latest_data = JSON.stringify(parsed_prev_data)

    // 3. finally store that in db.json
    fs.writeFileSync("./db.json", latest_data, "utf-8")

    res.send(log)
})


// PATCH
app.patch("/modify", (req, res) => {
    const {id, new_time} = req.body;
    fs.readFile("./db.json", "utf-8", (err, data) =>{
        if(err){
           return res.send("something went wrong, try again later")
        }
        const prev_data = JSON.parse(data)
       const new_att = prev_data.attendance.map((ele) => {
            if(ele.id === id){
                return{...ele, modified_time: new_time}
            }
            else{
                return ele;
            }
        })
        prev_data.attendance = new_att
        fs.writeFileSync("db.json", JSON.stringify(prev_data), "utf-8")
         
        res.send("done")
    })
})


//DELETE
app.delete("/deleting", (req, res) => {
    const {id, new_time} = req.body;
    fs.readFile("./db.json", "utf-8", (err, data) =>{
        if(err){
           return res.send("something went wrong, try again later")
        }
        const prev_data = JSON.parse(data)
       const new_att = prev_data.attendance.map((ele) => {
            if(ele.id === id){
                return{ modified_time: new_time}
            }
            else{
                return ele;
            }
        })
        prev_data.attendance = new_att
        fs.writeFileSync("db.json", JSON.stringify(prev_data), "utf-8")
         
        res.send("done")
    })
})


app.listen(5000, () => {
    console.log("server started at port 5000")
})



// CRUD method => CREATE READ UPDATE DELETE