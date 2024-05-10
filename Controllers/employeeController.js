
import { requireSignin } from "../middlewares/page.js"
import express from 'express';
import multer from "multer";
import employeModel from "../models/employeModel.js";
import fs from 'fs'
const empController = express.Router();

const upload = multer();
empController.post("/upload", requireSignin, upload.any(), async (req, res) => {
    const { buffer, mimetype } = req.files[0];


    const { name, email, mobileNo, designation, gender, course, uniqueId } = req.body


    try {
        switch (true) {
            case !name:
                return res.status(500).send({
                    error: 'Name is required'
                })
            case !email:
                return res.status(500).send({
                    error: 'Email is required'
                })
            case !mobileNo:
                return res.status(500).send({
                    error: 'MobileNo is required'
                })
            case !designation:
                return res.status(500).send({
                    error: 'Designation is required'
                })
            case !gender:
                return res.status(500).send({
                    error: 'Gender is required'
                })
            case !course:
                return res.status(500).send({
                    error: 'Course is required '
                })
            case !uniqueId:
                return res.status(500).send({
                    error: ' UniqueId is required uniqueId '
                })
            case !(mimetype === 'image/jpeg' || mimetype === 'image/png'):
                return res.status(400).send({ error: 'Only JPEG or PNG image formats are accepted' });
        }
        const employees = new employeModel({ ...req.body })
        if (req.files[0]) {
            employees.photo.data = buffer;
            employees.photo.contentType = mimetype;
        }
        await employees.save()
        res.status(201).send({
            success: true,
            message: 'Employee Registered Successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error in Registering Employee',
        })
    }
});


empController.get("/records", requireSignin, async (req, res) => {
    try {
        const records = await employeModel.find({}).sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            countTotal: records.length,
            message: "All Records",
            records,

        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in getting records",
            error: error.message
        })
    }


})

empController.delete("/deleteRecord/:id", requireSignin, async (req, res) => {
    const id = req.params.id

    try {
        console.log(id);
        await employeModel.findByIdAndDelete(id);
        res.status(200).send({ message: "Record deleted successfully" });

    } catch (error) {
        res.status(400).send({ message: "Could not delete Record" });
        console.log(error);
    }


})


empController.put("/update/:id", requireSignin, upload.any(), async (req, res) => {

    const { name, email, mobileNo, designation, gender, course } = req.body
    //const { buffer, mimetype } = req.files[0];
    console.log(req.body);
    console.log(req.files);
    const id = req.params.id;
    try {
        const record = await employeModel.findById(id);
        if (record) {
            record.name = name;
            record.email = email;
            record.mobileNo = mobileNo;
            record.designation = designation;
            record.gender = gender;
            record.course = course;
            record.email = email;
            if (req.files) {
                const { buffer, mimetype } = req.files[0];
                employees.photo.data = buffer;
                employees.photo.contentType = mimetype;
                employees.photo.name = originalname;
            }
            await record.save();
            res.status(200).send({ success: true, message: "Record Updated successfully" });
        }
        else {
            res.status(400).send({ success: false, message: "Record Not Found" });
        }

    } catch (error) {
        res.status(400).send({ message: "Could not Update Record" });
        console.log(error);
    }
})










export default empController;