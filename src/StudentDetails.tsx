import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import TextInput from "./components/input";
import RadioInput from "./components/radioButton";
import SelectInput from "./components/select";
import CheckboxGroup from "./components/checkboxGroup";


interface Student {
    name: string;
    age: string;
    gender: string;
    course: string;
    skills: string[];
}

const StudentDetailsPage: React.FC = () => {
    const [formData, setFormData] = useState<Student>({
        name: "",
        age: "",
        gender: "",
        course: "",
        skills: [],
    });

    const [students, setStudents] = useState<Student[]>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    const courses = ["Mathematics", "Science", "Arts", "Engineering"];
    const skillsList = ["JavaScript", "React", "Python", "C++"];

    const handleInputChange = (name: string, value: string | number | string[]) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


    const handleSubmit = () => {
        if (editIndex !== null) {
            const updatedStudents = [...students];
            updatedStudents[editIndex] = { ...formData };
            setStudents(updatedStudents);
            setEditIndex(null);
        } else {
            setStudents((prev) => [...prev, formData]);
        }
        setFormData({ name: "", age: "", gender: "", course: "", skills: [] });
    };

    const handleEdit = (index: number) => {
        setFormData(students[index]);
        setEditIndex(index);
    };

    const handleDelete = (index: number) => {
        setStudents((prev) => prev.filter((_, i) => i !== index));
    };

    const columns: GridColDef[] = [
        { field: "name", headerName: "Name", flex: 1 },
        { field: "age", headerName: "Age", flex: 1 },
        { field: "gender", headerName: "Gender", flex: 1 },
        { field: "course", headerName: "Course", flex: 1 },
        {
            field: "skills",
            headerName: "Skills",
            flex: 2,
            valueGetter: (params: any) => params.row.skills.join(", "),
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1.5,
            renderCell: (params) => (
                <>
                    <Button color="primary" onClick={() => handleEdit(params.row.id as number)}>
                        Edit
                    </Button>
                    <Button color="error" onClick={() => handleDelete(params.row.id as number)}>
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    const rows = students.map((student, index) => ({ id: index, ...student }));

    return (
        <Box p={3} display="flex" flexDirection="column" gap={3}>
            <Box p={2} border="1px solid #ddd" borderRadius={2}>
                <h2>Student Details Form</h2>
                <Box display="flex" flexDirection="column" gap={2}>
                    <TextInput
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                    <TextInput
                        label="Age"
                        name="age"
                        type="number"
                        value={formData.age}
                        onChange={handleInputChange}
                    />
                    <RadioInput
                        name="gender"
                        label="Gender"
                        value={formData.gender}
                        options={["Male", "Female"]}
                        onChange={handleInputChange}
                    />
                    <SelectInput
                        name="course"
                        label="Course"
                        value={formData.course}
                        options={courses}
                        onChange={handleInputChange}
                    />
                    <CheckboxGroup
                        name="skills"
                        label="Skills"
                        options={skillsList}
                        selectedOptions={formData.skills}
                        onChange={(value) => handleInputChange("skills", value)}
                    />
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        {editIndex !== null ? "Update" : "Submit"}
                    </Button>
                </Box>
            </Box>

            <Box p={2} border="1px solid #ddd" borderRadius={2}>
                <h2>Student Details Table</h2>
                <DataGrid rows={rows} columns={columns} disableRowSelectionOnClick />
            </Box>
        </Box>
    );
};

export default StudentDetailsPage;
