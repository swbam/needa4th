import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { useAddTeeTime } from '../integrations/supabase/hooks/useTeeTimes';
import { useSupabaseAuth } from '../integrations/supabase/auth';
import { usePlayers } from '../integrations/supabase/hooks/players';
import { toast } from "sonner";
import { format } from 'date-fns';

const AddTeeTime = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const addTeeTimeMutation = useAddTeeTime();
  const { user } = useSupabaseAuth();
  const { data: players, isLoading: playersLoading } = usePlayers();

  const onSubmit = async (data) => {
    if (!user) {
      toast.error("Please sign in to add a tee time.");
      return;
    }
    try {
      const formattedDateTime = format(new Date(`${data.date}T${data.time}`), "yyyy-MM-dd'T'HH:mm:ssXXX");
      const newTeeTime = {
        date_time: formattedDateTime,
        course_id: parseInt(data.course),
        organizer_id: user.id,
      };
      await addTeeTimeMutation.mutateAsync(newTeeTime);
      toast.success("Tee time added successfully!");
      navigate('/schedule');
    } catch (error) {
      console.error("Error adding tee time:", error);
      toast.error("Failed to add tee time. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#006747]">Add Tee Time</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Controller
                name="date"
                control={control}
                rules={{ required: "Date is required" }}
                render={({ field }) => (
                  <DatePicker
                    date={field.value}
                    onDateChange={field.onChange}
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
                      {/* Replace this with actual course data */}
                      <SelectItem value="1">Course 1</SelectItem>
                      <SelectItem value="2">Course 2</SelectItem>
                      <SelectItem value="3">Course 3</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.course && <span className="text-red-500 text-sm">{errors.course.message}</span>}
            </div>
            <Button type="submit" className="w-full bg-[#006747] hover:bg-[#005236] text-white">
              Add Tee Time
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddTeeTime;