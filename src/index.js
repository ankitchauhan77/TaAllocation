const path = require('path');
const express = require('express');
const hbs = require('hbs');
const TA = require('./models/TA');
const PROF = require('./models/Prof');
const COURSE = require('./models/Course');
const res = require('express/lib/response');
const async = require('hbs/lib/async');
require('./db/mongoose')
const allotment = require('./utils/allotment');

const app = express();
const port = process.env.PORT;

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));
app.use(express.json());

app.get('', (req, res) => {
    res.render('index');
});

app.get('/ta', (req, res) => {
    res.render('tadetails');
});

app.get('/faculty', (req, res) => {
    res.render('faculty');
});

app.get('/course', (req, res) => {
    res.render('addcourse');
});

// API for tadetails
app.post('/tadetails', async (req, res) => {
    try {
        const rollNumber = req.body.rollNumber;
        const ta = await TA.findOneAndDelete({ rollNumber });
        console.log(ta);
        const newTa = new TA(req.body);
        // console.log(newTa);
        await newTa.save();
        res.status(201).send(newTa);
    } catch (e) {
        res.status(500).send(e);
    }
});


// API for coursedetails
app.post('/coursedetails', async (req, res) => {
    try {
        const courseCode = req.body.courseCode;
        const course = await COURSE.findOneAndDelete({ courseCode });
        // console.log(course);
        const newCourse = new COURSE(req.body);
        // console.log(newCourse);
        await newCourse.save();
        res.status(201).send(newCourse);
    } catch (e) {
        res.status(500).send(e);
    }
});

// API for profdetails
app.post('/profdetails', async (req, res) => {
    try {
        // console.log(req.body);
        const courseCode = req.body.courseCode;
        const prof = await PROF.findOneAndDelete({ courseCode });
        const newProf = new PROF(req.body);
        console.log(newProf);
        await newProf.save();
        res.status(201).send(newProf);
    } catch (e) {
        res.status(500).send(e);
    }
});


app.get('/result', async (req, res) => {
    const prof = await PROF.find();
    const ta = await TA.find();
    // var profarr = [];
    // var taarr = [];
    // var n = prof.length, m = ta.length;
    // for (var i = 0; i < n; i++) {
    //     profarr.push(prof[i].courseCode);
    // }
    // for (var i = 0; i < m; i++) {
    //     taarr.push(ta[i].rollNumber)
    // }
    // var A = {};
    // var B = {};
    // for (var i = 0; i < profarr.length; i++) {
    //     A[profarr[i]] = [];
    //     if (prof[i].taRollNumber1 != "") A[profarr[i]].push(prof[i].taRollNumber1);
    //     if (prof[i].taRollNumber2 != "") A[profarr[i]].push(prof[i].taRollNumber2);
    //     if (prof[i].taRollNumber3 != "") A[profarr[i]].push(prof[i].taRollNumber3);
    //     for (var j = 0; j < m; j++) {
    //         var flag = true;
    //         for (var k = 0; k < A[profarr[i]].length; k++) {
    //             if (A[profarr[i]][k] === taarr[j]) flag = false;
    //         }
    //         if (flag) {
    //             A[profarr[i]].push(taarr[j]);
    //         }
    //     }
    // }

    // for (var i = 0; i < taarr.length; i++) {
    //     B[taarr[i]] = [];
    //     if (ta[i].pref1 != "") B[taarr[i]].push(ta[i].pref1);
    //     if (ta[i].pref2 != "") B[taarr[i]].push(ta[i].pref2);
    //     if (ta[i].pref3 != "") B[taarr[i]].push(ta[i].pref3);
    //     for (var j = 0; j < n; j++) {
    //         var flag = true;
    //         for (var k = 0; k < B[taarr[i]].length; k++) {
    //             if (B[taarr[i]][k] === profarr[j]) flag = false;
    //         }
    //         if (flag) {
    //             B[taarr[i]].push(profarr[j]);
    //         }
    //     }
    // }
    // var match = {};
    // for (var i = 0; i < m; i++) match[taarr[i]] = [];
    // while (true) {
    //     var rem = [];
    //     for (var i = 0; i < n; i++) rem.push(profarr[i]);
    //     var count = 0
    //     while (rem.length !== 0) {
    //         var course = rem[0];

    //         for (var j = 0; j < A[course].length; j++) {
    //             var a = A[course][j];
    //             var already_have = false;
    //             for (var id =  0; id < match[a].length; id++) {
    //                 if (match[a][id] == course) already_have = true;
    //             }
    //             if (already_have) continue;
    //             if (match[a].length < 3) {
    //                 match[a].push(course);
    //                 count++;
    //                 break;
    //             } else {
    //                 var temp = [-1, -1, -1];
    //                 var apref

    //                 for (var k = B[a].length - 1; k >= 0; k--) {

    //                     for (var e = 0; e < 3; e++) {
    //                         if (match[a][e] == B[a][k]) {
    //                             temp[e] = k;
    //                         }
    //                     }
    //                     if (a == B[a][k]) apref = k;
    //                 }
    //                 var f = 0;
    //                 for (var k = 0; k < 3; k++) {
    //                     if (apref == temp[k]) f = 1;
    //                 }
    //                 if (f === 1) continue;
    //                 var ind = 0
    //                 for (var k = 1; k < 3; k++) {
    //                     if (temp[k] > temp[ind]) {
    //                         ind = k;
    //                     }
    //                 }

    //                 if (temp[ind] > apref) {
    //                     match[a][ind] = course;
    //                     count++;
    //                     break;
    //                 }



    //             }
    //         }
    //         rem.shift();
            

    //     }
    //     if (count === 0) {
    //         break
    //     }
    // }




    // res.send(match)
    res.json(allotment(prof, ta));
});

app.get('/api', async (req, res) => {
    res.json({
        "hello":["chris","ben"]
    });
})



app.listen(port, () => {
    console.log(`app is up on port ${port}!`)
});