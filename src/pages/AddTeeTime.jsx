import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { importAllData } from '../utils/importData';

const players = [
  'Parker Smith', 'Dominic Nanni', 'Connor Stanley', 'Jesus Rios', 'Derek Kozakiewicz',
  'Jackson Smith', 'Bob Murray', 'Mike Brooks', 'Andrew Rocco', 'Heath Mansfield',
  'Lane Hostettler', 'Josh Alcala', 'Richard Caruso', 'Martin Clayton', 'Salvador Guzman',
  'Jason Story', 'Nathan Bateman', 'Seth Bambling', 'Josh Link', 'Chris Baker',
  'Kyle McFarland', 'Gilmore Connors', 'Alex York', 'Guest', 'John Shrader'
];

const AddTeeTime = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem('courses') || '[]');
    setCourses(storedCourses);
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    toast.success("Tee time added successfully!");
  };

  const handleImport = async () => {
    const csvData = `
Date,Location,Time,Players,Slot,Walk/Ride,Organizer,Attendee
4/1/2024,Pinehurst No. 2,7:00 AM,4,1,Walk,Parker Smith,Parker Smith
4/1/2024,Pinehurst No. 2,7:00 AM,4,2,Walk,Parker Smith,Dominic Nanni
4/1/2024,Pinehurst No. 2,7:00 AM,4,3,Walk,Parker Smith,Connor Stanley
4/1/2024,Pinehurst No. 2,7:00 AM,4,4,Walk,Parker Smith,Jesus Rios
4/1/2024,Pinehurst No. 2,7:10 AM,4,1,Walk,Derek Kozakiewicz,Derek Kozakiewicz
4/1/2024,Pinehurst No. 2,7:10 AM,4,2,Walk,Derek Kozakiewicz,Jackson Smith
4/1/2024,Pinehurst No. 2,7:10 AM,4,3,Walk,Derek Kozakiewicz,Bob Murray
4/1/2024,Pinehurst No. 2,7:10 AM,4,4,Walk,Derek Kozakiewicz,Mike Brooks
4/1/2024,Pinehurst No. 2,7:20 AM,4,1,Walk,Andrew Rocco,Andrew Rocco
4/1/2024,Pinehurst No. 2,7:20 AM,4,2,Walk,Andrew Rocco,Heath Mansfield
4/1/2024,Pinehurst No. 2,7:20 AM,4,3,Walk,Andrew Rocco,Lane Hostettler
4/1/2024,Pinehurst No. 2,7:20 AM,4,4,Walk,Andrew Rocco,Josh Alcala
4/1/2024,Pinehurst No. 2,7:30 AM,4,1,Walk,Richard Caruso,Richard Caruso
4/1/2024,Pinehurst No. 2,7:30 AM,4,2,Walk,Richard Caruso,Martin Clayton
4/1/2024,Pinehurst No. 2,7:30 AM,4,3,Walk,Richard Caruso,Salvador Guzman
4/1/2024,Pinehurst No. 2,7:30 AM,4,4,Walk,Richard Caruso,Jason Story
4/1/2024,Pinehurst No. 2,7:40 AM,4,1,Walk,Nathan Bateman,Nathan Bateman
4/1/2024,Pinehurst No. 2,7:40 AM,4,2,Walk,Nathan Bateman,Seth Bambling
4/1/2024,Pinehurst No. 2,7:40 AM,4,3,Walk,Nathan Bateman,Josh Link
4/1/2024,Pinehurst No. 2,7:40 AM,4,4,Walk,Nathan Bateman,Chris Baker
4/1/2024,Pinehurst No. 2,7:50 AM,4,1,Walk,Kyle McFarland,Kyle McFarland
4/1/2024,Pinehurst No. 2,7:50 AM,4,2,Walk,Kyle McFarland,Gilmore Connors
4/1/2024,Pinehurst No. 2,7:50 AM,4,3,Walk,Kyle McFarland,Alex York
4/1/2024,Pinehurst No. 2,7:50 AM,4,4,Walk,Kyle McFarland,Guest
4/1/2024,Pinehurst No. 2,8:00 AM,1,1,Walk,John Shrader,John Shrader
Name,Email,Home Course,Rating
Parker Smith,parker@example.com,Pinehurst No. 2,4.2
Dominic Nanni,dominic@example.com,Pinehurst No. 4,3.8
Connor Stanley,connor@example.com,Pinehurst No. 8,4.5
Jesus Rios,jesus@example.com,Tobacco Road,4.0
Derek Kozakiewicz,derek@example.com,Pinehurst No. 2,3.9
Jackson Smith,jackson@example.com,Pinehurst No. 4,4.1
Bob Murray,bob@example.com,Pinehurst No. 8,3.7
Mike Brooks,mike@example.com,Tobacco Road,4.3
Andrew Rocco,andrew@example.com,Pinehurst No. 2,4.4
Heath Mansfield,heath@example.com,Pinehurst No. 4,3.6
Lane Hostettler,lane@example.com,Pinehurst No. 8,4.2
Josh Alcala,josh.a@example.com,Tobacco Road,3.9
Richard Caruso,richard@example.com,Pinehurst No. 2,4.1
Martin Clayton,martin@example.com,Pinehurst No. 4,3.8
Salvador Guzman,salvador@example.com,Pinehurst No. 8,4.0
Jason Story,jason@example.com,Tobacco Road,4.3
Nathan Bateman,nathan@example.com,Pinehurst No. 2,3.7
Seth Bambling,seth@example.com,Pinehurst No. 4,4.2
Josh Link,josh.l@example.com,Pinehurst No. 8,3.9
Chris Baker,chris@example.com,Tobacco Road,4.1
Kyle McFarland,kyle@example.com,Pinehurst No. 2,4.4
Gilmore Connors,gilmore@example.com,Pinehurst No. 4,3.8
Alex York,alex@example.com,Pinehurst No. 8,4.2
Guest,guest@example.com,N/A,N/A
John Shrader,john@example.com,Tobacco Road,4.0
    `;
    
    try {
      await importAllData(csvData);
      toast.success("Data imported successfully!");
    } catch (error) {
      console.error('Error importing data:', error);
      toast.error("Error importing data. Please check the console for details.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto mb-8">
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
                        <SelectItem key={course.id} value={course.name}>{course.name}</SelectItem>
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
      
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-green-800">Import Data</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={handleImport} className="w-full bg-blue-600 hover:bg-blue-700">
            Import Tee Times and Users
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddTeeTime;