import mongoose from "mongoose";

const scheduleSchema = mongoose.Schema({
    day: {
        type: String,
        unique: true,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    }
})

const Schedule = mongoose.model('Schedule', scheduleSchema)

export default Schedule