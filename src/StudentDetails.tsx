import React, { useState } from "react";
import { Box, Button, Grid2, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import TextInput from "./components/input";
import RadioInput from "./components/radioButton";
import SelectInput from "./components/select";
import CheckboxGroup from "./components/checkboxGroup";
import DialogBox from "./components/dailogComponent";


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
    const [openDialog, setOpenDialog] = useState<boolean>(false)
    const [deletIndex, setDeleteIndex] = useState<number | null>(null);

    const courses = ["Mathematics", "Science", "Arts", "Engineering"];
    const skillsList = ["JavaScript", "React", "Python", "C++"];

    const handleInputChange = (name: string, value: string | number | string[]) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


    const handleSubmit = () => {
        if (editIndex !== null) {
            const updatedStudents = [...students];
            updatedStudents[editIndex] = { ...formData, skills: formData.skills || [] };
            setStudents(updatedStudents);
            setEditIndex(null);
        } else {
            setStudents((prev) => [
                ...prev,
                { ...formData, skills: formData.skills || [] },
            ]);
        }
        setFormData({ name: "", age: "", gender: "", course: "", skills: [] });
    };

    const handleEdit = (index: number) => {
        setFormData(students[index]);
        setEditIndex(index);
    };

    const handleDelete = () => {
        setStudents((prev) => prev.filter((_, i) => i !== deletIndex));
        setOpenDialog(false)
        setDeleteIndex(null)
    };

    const onDeleteClick = (index: number) => {
        setDeleteIndex(index)
        setOpenDialog(true)
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
            valueGetter: (params: any) => {
                return params?.length > 0 ? params?.join(", ") : "N/A";
            },
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
                    <Button color="error" onClick={() => onDeleteClick(params.row.id as number)}>
                        Delete
                    </Button>
                </>
            ),
        },
    ];


    const rows = students.map((student, index) => ({ id: index, ...student }));

    return (
        <Box p={3} display="flex" flexDirection="column" gap={3}>
            <Box p={2} border="1px solid #ddd" borderRadius={2} >
                     <Grid2 container spacing={2} sx={{ display: "flex", justifyContent: "center" }}>
                     

                     <Grid2 size={12} sx={{display: "flex", justifyContent: "center"}} >
                     <h2>Student Details Form</h2>
                        </Grid2>
                        <Grid2 size={8} >
                            <TextInput
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </Grid2>
                        <Grid2 size={8}>
                            <TextInput
                                label="Age"
                                name="age"
                                type="number"
                                value={formData.age}
                                onChange={handleInputChange}
                            />
                        </Grid2>
                        <Grid2 size={8} >
                            <RadioInput
                                name="gender"
                                label="Gender"
                                value={formData.gender}
                                options={["Male", "Female"]}
                                onChange={handleInputChange}
                            />
                        </Grid2>
                        <Grid2 size={8}>
                            <SelectInput
                                name="course"
                                label="Course"
                                value={formData.course}
                                options={courses}
                                onChange={handleInputChange}
                            />
                        </Grid2>
                        <Grid2 size={8}>
                            <CheckboxGroup
                                name="skills"
                                label="Skills"
                                options={skillsList}
                                selectedOptions={formData.skills}
                                onChange={(value) => handleInputChange("skills", value)}
                            />
                        </Grid2>
                        <Grid2 size={8} sx={{ display: "flex", justifyContent: "center" }}>
                            <Button variant="contained" color="primary" onClick={handleSubmit}>
                                {editIndex !== null ? "Update" : "Submit"}
                            </Button>
                        </Grid2>
                    </Grid2>
             </Box>

            <Box p={2} border="1px solid #ddd" borderRadius={2}>
                <h2>Student Details Table</h2>
                <DataGrid rows={rows} columns={columns} disableRowSelectionOnClick />
            </Box>



            {openDialog && <DialogBox onClose={() => setOpenDialog(false)} openDialog={openDialog}>
                <Grid2 container spacing={2}>
                    <Grid2 size={12}>
                        <Typography variant='subtitle1'>
                            Are you sure you want to delete this entry?
                        </Typography>
                    </Grid2>

                    <Grid2 size={12} sx={{ display: "flex", justifyContent: "space-around" }}>
                        <Button onClick={() => setOpenDialog(false)} variant='outlined'>
                            No
                        </Button>
                        <Button onClick={handleDelete} variant='outlined'>
                            Yes
                        </Button>
                    </Grid2>

                </Grid2>
            </DialogBox>}
        </Box>
    );
};

export default StudentDetailsPage;
