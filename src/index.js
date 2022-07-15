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

app.get('/deletecourse', (req, res) => {
    res.render('deletecourse');
});

app.get('/deleteta', (req, res) => {
    res.render('deleteta');
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


app.get('/showdata', async (req, res) => {
    const prof = await PROF.find();
    const ta = await TA.find();

    var coursedetail = [];
    for (var i = 0; i < prof.length; i++) {
        var obj1 = {};
        obj1['courseCode'] = prof[i].courseCode;
        obj1['ugPg'] = prof[i].ugPg;
        obj1['electiveCore'] = prof[i].electiveCore;
        obj1['needToAttend'] = prof[i].needToAttend;
        obj1['noOfStudents'] = prof[i].nof;
        obj1['theoryLab'] = prof[i].theoryLab;
        obj1['taRollNumber1'] = prof[i].taRollNumber1;
        obj1['taRollNumber2'] = prof[i].taRollNumber2;
        obj1['taRollNumber3'] = prof[i].taRollNumber3;
        coursedetail.push(obj1)
    }

    var tadetail = [];
    for (var i = 0; i < ta.length; i++) {
        var obj = {};
        obj['rollNumber'] = ta[i].rollNumber;
        obj['pref1'] = ta[i].pref1;
        obj['pref2'] = ta[i].pref2;
        obj['pref3'] = ta[i].pref3;
        tadetail.push(obj);
    }

    res.send({coursedetail, tadetail});
});


app.get('/deletedata', async (req, res) => {
    await PROF.remove({});
    await TA.remove({});
    res.send("Dropped");
})


app.get('/result', async (req, res) => {
    const prof = await PROF.find();
    const ta = await TA.find();
    // res.send(match)
    res.json(allotment(prof, ta));
});

app.get('/api', async (req, res) => {
    res.json({
        "hello":["chris","ben"]
    });
})

app.post('/deletecourse1', async (req, res) => {
    console.log("starting");
    try {
        const courseCode = req.body.courseCode;
        console.log(courseCode);
        await PROF.findOneAndDelete({ courseCode });
        res.send(201);
    } catch(e) {
        console.log("catch");
        res.send(501);
    }
})
app.post('/deleteta1', async (req, res) => {
    console.log("starting");
    try {
        const rollNumber = req.body.rollNumber;
        console.log(rollNumber);
        await TA.findOneAndDelete({ rollNumber });
        res.send(201);
    } catch(e) {
        console.log("catch");
        res.send(501);
    }
})




app.listen(port, () => {
    console.log(`app is up on port ${port}!`)
});