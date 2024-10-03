import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const courses = [
  'Henry Horton', 'Mccabe', 'Harpeth Hills', 'Ted Rhodes', 'Towhee', 'Franklin Bridge',
  'Little Course', 'Nashboro', 'Old Fort', 'Cheekwood', 'Hermitage (Presidents)',
  'Shelby', 'Two Rivers', 'Percy Warner', 'Gaylord', 'Hermitage (Generals)',
  'Montgomery Bell', 'Greystone'
];

const players = [
  'Parker Smith', 'Dominic Nanni', 'Connor Stanley', 'Jesus Rios', 'Derek Kozakiewicz',
  'Jackson Smith', 'Bob Murray', 'Mike Brooks', 'Andrew Rocco', 'Heath Mansfield',
  'Lane Hostettler', 'Josh Alcala', 'Richard Caruso', 'Martin Clayton', 'Salvador Guzman',
  'Jason Story', 'Nathan Bateman', 'Seth Bambling', 'Josh Link', 'Chris Baker',
  'Kyle McFarland', 'Gilmore Connors', 'Alex York', 'Guest', 'John Shrader'
];

const AddTeeTime = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    toast.success("Tee time added successfully!");
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
              <Label htmlFor="location">Location</Label>
              <Controller
                name="location"
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
              {errors.location && <span className="text-red-500 text-sm">This field is required</span>}
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
            <Button type="submit" className="w-full bg-green-800 hover:bg-green-700">Add Tee Time</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddTeeTime;