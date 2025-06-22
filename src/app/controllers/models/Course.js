const mongoose = require('mongoose');
const slugUpdater = require('mongoose-slug-updater');
const mongoose_delete = require('mongoose-delete');

mongoose.plugin(slugUpdater);

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Courses = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, maxLength: 600 },
        image: { type: String, maxLength: 255 },
        slug: { type: String, slug: 'name', unique: true },
        videoId: { type: String, required: true },
        level: { type: String, maxLength: 255 },
    },
    {
        timestamps: true,
    },
);
Courses.plugin(mongoose_delete, {
    deletedAt: true,
    overrideMethods: [
        'find',
        'findOne',
        'findOneAndUpdate',
        'update',
        'updateOne',
        'updateMany',
    ],
});
module.exports = mongoose.model('Courses', Courses);
