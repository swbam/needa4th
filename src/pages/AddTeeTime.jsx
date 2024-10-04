import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAddTeeTime } from '@/integrations/supabase/hooks/useTeeTimes';
import { format } from 'date-fns';

const players = [
  'Parker Smith', 'Dominic Nanni', 'Connor Stanley', 'Jesus Rios', 'Derek Kozakiewicz',
  'Jackson Smith', 'Bob Murray', 'Mike Brooks', 'Andrew Rocco', 'Heath Mansfield',
  'Lane Hostettler', 'Josh Alcala', 'Richard Caruso', 'Martin Clayton', 'Salvador Guzman',
  'Jason Story', 'Nathan Bateman', 'Seth Bambling', 'Josh Link', 'Chris Baker',
  'Kyle McFarland', 'Gilmore Connors', 'Alex York', 'Guest', 'John Shrader'
].sort();

const courses = [
  'Pinehurst No. 2',
  'Pinehurst No. 4',
  'Pinehurst No. 8',
  'Tobacco Road'
];

const AddTeeTime = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const addTeeMutation = useAddTeeTime();

  const onSubmit = (data) => {
    const newTeeTime = {
      tee_date: data.date,
      tee_time: data.time,
      course: data.course,
      slot: 1, // Default to 1 for now
      players: [data.organizer],
      walk_ride: data.walkRide,
      organizer: data.organizer
    };

    addTeeMutation.mutate(newTeeTime, {
      onSuccess: () => {
        toast.success("Tee time added successfully!");
      },
      onError: (error) => {
        toast.error(`Failed to add tee time: ${error.message}`);
      }
    });
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
                rules={{ required: true }}
                render={({ field }) => <Input type="date" id="date" {...field} className="w-full" />}
              />
              {errors.date && <span className="text-red-500 text-sm">This field is required</span>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Controller
                name="time"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <Input type="time" id="time" {...field} className="w-full" />}
              />
              {errors.time && <span className="text-red-500 text-sm">This field is required</span>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="course">Course</Label>
              <Controller
                name="course"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course} value={course}>{course}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.course && <span className="text-red-500 text-sm">This field is required</span>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="organizer">Organizer</Label>
              <Controller
                name="organizer"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select an organizer" />
                    </SelectTrigger>
                    <SelectContent>
                      {players.map((player) => (
                        <SelectItem key={player} value={player}>{player}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.organizer && <span className="text-red-500 text-sm">This field is required</span>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="walkRide">Walk/Ride</Label>
              <Controller
                name="walkRide"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select walk or ride" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Walk">Walk</SelectItem>
                      <SelectItem value="Ride">Ride</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.walkRide && <span className="text-red-500 text-sm">This field is required</span>}
            </div>
            <Button type="submit" className="w-full bg-green-800 hover:bg-green-700">Add Tee Time</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddTeeTime;