const Course = require('./models/Course');
const {
    multipleMongooseToObject,
    MongooseToObject,
} = require('../../ultil/mongoose');

class SiteController {
    //[GET] /home
    async home(req, res) {
        try {
            const courses = await Course.find({});
            //let coursesList = courses.map(course => course.toObject())
            res.render('home', { courses: multipleMongooseToObject(courses) });
        } catch (err) {
            console.error('Error fetching courses:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    //[GET] /search:
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
