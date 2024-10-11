import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { useAddTeeTime, testAddTeeTimeAndPlayer } from '../integrations/supabase/hooks/useTeeTimes';
import { useSupabaseAuth } from '../integrations/supabase/auth';
import { toast } from "sonner";

const AddTeeTime = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const addTeeTimeMutation = useAddTeeTime();
  const { user } = useSupabaseAuth();

  const onSubmit = async (data) => {
    if (!user) {
      toast.error("Please sign in to add a tee time.");
      return;
    }
    try {
      await addTeeTimeMutation.mutateAsync({
        ...data,
        organizer_id: user.id,
      });
      navigate('/schedule');
    } catch (error) {
      console.error("Error adding tee time:", error);
      toast.error("Failed to add tee time. Please try again.");
    }
  };

  const handleTestAddTeeTimeAndPlayer = async () => {
    try {
      const result = await testAddTeeTimeAndPlayer();
      console.log('Test result:', result);
      toast.success("Test completed successfully. Check console for details.");
    } catch (error) {
      console.error('Test failed:', error);
      toast.error("Test failed. Check console for details.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-green-800">Add Tee Time</CardTitle>
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
              <Label htmlFor="location">Course</Label>
              <Controller
                name="location"
                control={control}
                rules={{ required: "Course is required" }}
                render={({ field }) => <Input id="location" {...field} className="w-full" />}
              />
              {errors.location && <span className="text-red-500 text-sm">{errors.location.message}</span>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="walk_ride">Walk/Ride</Label>
              <Controller
                name="walk_ride"
                control={control}
                rules={{ required: "Walk/Ride is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Walk/Ride" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="walk">Walk</SelectItem>
                      <SelectItem value="ride">Ride</SelectItem>
                      <SelectItem value="either">Either</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.walk_ride && <span className="text-red-500 text-sm">{errors.walk_ride.message}</span>}
            </div>
            <Button type="submit" className="w-full bg-green-800 hover:bg-green-700">Add Tee Time</Button>
          </form>
          <Button onClick={handleTestAddTeeTimeAndPlayer} className="w-full mt-4 bg-blue-500 hover:bg-blue-400">
            Run Test: Add Tee Time and Player
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddTeeTime;