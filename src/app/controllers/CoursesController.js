const Course = require('./models/Course');
const {
    multipleMongooseToObject,
    MongooseToObject,
} = require('../../ultil/mongoose');

class CoursesController {
    //[GET] /news
    index(req, res) {
        res.render('news');
    }

    //[GET] /courses/show
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render('courses/show', {
                    course: MongooseToObject(course),
                });
            })
            .catch(next);
    }

    //[GET] /courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    //[POST] /courses/store
    store(req, res, next) {
        const formData = req.body;
        console.log('formData', formData);
        formData.image = `https://img.youtube.com/vi/${formData.videoId}/sddefault.jpg`;
        const course = new Course(formData);
        course
            .save()
            .then(() => res.redirect('/'))
            .catch((error) => {
                console.error('Error saving course:', error);
                if (error.code === 11000) {
                    // Duplicate key error (shouldn't happen with our slug generation, but just in case)
                    return res
                        .status(400)
                        .send('Course with this name already exists');
                }
                next(error);
            });
    }

    //[GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) =>
                res.render('courses/edit', {
                    course: MongooseToObject(course),
                }),
            )
            .catch(next);
    }

    //[PUT] /courses/:id (for updating courses)
    update(req, res, next) {
        Course.findById(req.params.id)
            .then((course) => {
                if (!course) {
                    return res.status(404).send('Course not found');
                }

                // Update course data
                Object.assign(course, req.body);
                course.image = `https://img.youtube.com/vi/${course.videoId}/sddefault.jpg`;

                return course.save();
            })
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    //[DELETE] /courses/:id
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }
}

module.exports = new CoursesController();
