import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useAddCourse } from '../integrations/supabase/hooks/courses';

const AddCourse = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const addCourseMutation = useAddCourse();

  const onSubmit = async (data) => {
    try {
      await addCourseMutation.mutateAsync(data);
      toast.success("Course added successfully!");
      navigate('/schedule');
    } catch (error) {
      console.error("Error adding course:", error);
      toast.error("Failed to add course. Please try again.");
    }
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
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                {...register("city", { required: "City is required" })}
                className="w-full"
              />
              {errors.city && <span className="text-red-500 text-sm">{errors.city.message}</span>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                {...register("state", { required: "State is required" })}
                className="w-full"
              />
              {errors.state && <span className="text-red-500 text-sm">{errors.state.message}</span>}
            </div>
            <Button type="submit" className="w-full bg-green-800 hover:bg-green-700">Add Course</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddCourse;