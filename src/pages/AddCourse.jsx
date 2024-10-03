import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const AddCourse = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // In a real application, this would be an API call
    const existingCourses = JSON.parse(localStorage.getItem('courses') || '[]');
    const newCourse = { ...data, id: Date.now() };
    localStorage.setItem('courses', JSON.stringify([...existingCourses, newCourse]));
    toast.success("Course added successfully!");
    navigate('/schedule');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-green-800">Add New Course</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Course Name</Label>
              <Input
                id="name"
                {...register("name", { required: "Course name is required" })}
                className="w-full"
              />
              {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                {...register("location", { required: "Location is required" })}
                className="w-full"
              />
              {errors.location && <span className="text-red-500 text-sm">{errors.location.message}</span>}
            </div>
            <Button type="submit" className="w-full bg-green-800 hover:bg-green-700">Add Course</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddCourse;