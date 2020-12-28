var mongoose = require('mongoose'), Schema = mongoose.Schema;

const sampleSchema = new Schema({
    created_at: {
        type: Date,
		default: Date.now
    },
    title:String,
    content: String,
});

module.exports = mongoose.model('sample', sampleSchema);