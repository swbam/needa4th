import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAddTeeTime } from '../integrations/supabase/hooks/useTeeTimes';
import { useSupabaseAuth } from '../integrations/supabase/auth';
import { useCourses } from '../integrations/supabase/hooks/courses';
import { usePlayers } from '../integrations/supabase/hooks/players';
import { toast } from "sonner";
import { format } from 'date-fns';

const AddTeeTime = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const addTeeTimeMutation = useAddTeeTime();
  const { user } = useSupabaseAuth();
  const { data: courses, isLoading: coursesLoading } = useCourses();
  const { data: players, isLoading: playersLoading } = usePlayers();

  const onSubmit = async (data) => {
    if (!user) {
      toast.error("Please sign in to add a tee time.");
      return;
    }
    try {
      const formattedDateTime = format(new Date(`${data.date}T${data.time}`), "yyyy-MM-dd'T'HH:mm:ssXXX");
      const organizer = players.find(player => player.name.toLowerCase().startsWith(data.organizer.toLowerCase()));
      
      if (!organizer) {
        toast.error("Organizer not found. Please enter a valid name.");
        return;
      }

      const newTeeTime = {
        date_time: formattedDateTime,
        course_id: parseInt(data.course),
        organizer_id: organizer.id,
      };
      await addTeeTimeMutation.mutateAsync(newTeeTime);
      toast.success("Tee time added successfully!");
      navigate('/schedule');
    } catch (error) {
      console.error("Error adding tee time:", error);
      toast.error("Failed to add tee time. Please try again.");
    }
  };

  // Sort courses alphabetically
  const sortedCourses = courses?.sort((a, b) => a.name.localeCompare(b.name)) || [];

  return (
    <div className="pt-14">
      <div className="bg-white w-full py-4 shadow-sm">
        <h1 className="text-[#006747] text-center font-semibold text-xl">Add Tee Time</h1>
      </div>
      <div className="container mx-auto px-4 py-6">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Controller
                  name="date"
                  control={control}
                  rules={{ required: "Date is required" }}
                  render={({ field }) => (
                    <Input
                      type="date"
                      id="date"
                      {...field}
                      className="w-full"
                    />
                  )}
                />
                {errors.date && <span className="text-red-500 text-sm">{errors.date.message}</span>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Controller
                  name="time"
                  control={control}
                  rules={{ required: "Time is required" }}
                  render={({ field }) => <Input type="time" id="time" {...field} className="w-full" />}
                />
                {errors.time && <span className="text-red-500 text-sm">{errors.time.message}</span>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="course">Course</Label>
                <Controller
                  name="course"
                  control={control}
                  rules={{ required: "Course is required" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Course" />
                      </SelectTrigger>
                      <SelectContent>
                        {coursesLoading ? (
                          <SelectItem value="loading">Loading courses...</SelectItem>
                        ) : (
                          sortedCourses.map((course) => (
                            <SelectItem key={course.id} value={course.id.toString()}>
                              {course.name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.course && <span className="text-red-500 text-sm">{errors.course.message}</span>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="organizer">Organizer Name</Label>
                <Controller
                  name="organizer"
                  control={control}
                  rules={{ required: "Organizer name is required" }}
                  render={({ field }) => <Input type="text" id="organizer" {...field} className="w-full" placeholder="Enter organizer's first name" />}
                />
                {errors.organizer && <span className="text-red-500 text-sm">{errors.organizer.message}</span>}
              </div>
              <Button type="submit" className="w-full bg-[#006747] hover:bg-[#005236] text-white">
                Add Tee Time
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddTeeTime;