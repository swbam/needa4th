import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useAddCourse } from '../integrations/supabase/hooks/courses';

const AddCourse = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      state: 'TN'
    }
  });
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
          <CardTitle className="text-2xl font-bold text-[#006747]">Add New Course</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">Course Name</Label>
              <Controller
                name="name"
                control={control}
                rules={{ required: "Course name is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="name"
                    className="w-full"
                    placeholder="Enter course name"
                  />
                )}
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="city" className="text-sm font-medium text-gray-700">City</Label>
              <Controller
                name="city"
                control={control}
                rules={{ required: "City is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="city"
                    className="w-full"
                    placeholder="Enter city"
                  />
                )}
              />
              {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="state" className="text-sm font-medium text-gray-700">State</Label>
              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="state"
                    className="w-full bg-gray-100"
                    readOnly
                  />
                )}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-[#006747] hover:bg-[#005236] text-white"
            >
              Add Course
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddCourse;