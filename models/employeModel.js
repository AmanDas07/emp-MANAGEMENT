import mongoose from "mongoose";
const { Schema } = mongoose;
const employeeSchema = new mongoose.Schema({
    uniqueId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        trim: true,
        required: true

    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },

    mobileNo: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true,
    },
    photo: {
        data: Buffer,
        contentType: String,

    }
},
    { timestamps: true })

export default mongoose.model("employees", employeeSchema);