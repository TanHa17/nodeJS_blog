const Course = require('./models/Course');
const {
    multipleMongooseToObject,
    MongooseToObject,
} = require('../../ultil/mongoose');

class MeController {
    //[GET] /me/stored/courses
    async storedCourses(req, res, next) {
        try {
            const courses = await Course.find({});
            //let coursesList = courses.map(course => course.toObject())
            res.render('me/stored-courses', {
                courses: multipleMongooseToObject(courses),
            });
        } catch (err) {
            console.error('Error fetching courses:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    //[GET] /me/stored/news
    storedNews(req, res, next) {
        // res.render('me/stored-news');
        res.send('stored news');
    }

    //[GET] /me/trash/courses
    async trashCourses(req, res, next) {
        try {
            const courses = await Course.findWithDeleted({ deleted: true });
            res.render('me/trash-courses', {
                courses: multipleMongooseToObject(courses),
            });
        } catch (err) {
            console.error('Error fetching courses:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = new MeController();
