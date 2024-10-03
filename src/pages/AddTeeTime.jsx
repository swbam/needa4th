import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const AddTeeTime = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // This is where you would typically send the data to your backend
    console.log(data);
    toast.success("Tee time added successfully!");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-green-800 mb-6">Add Tee Time</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
        <div>
          <Label htmlFor="date">Date</Label>
          <Input type="date" id="date" {...register("date", { required: true })} />
          {errors.date && <span className="text-red-500">This field is required</span>}
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input type="text" id="location" {...register("location", { required: true })} />
          {errors.location && <span className="text-red-500">This field is required</span>}
        </div>
        <div>
          <Label htmlFor="time">Time</Label>
          <Input type="time" id="time" {...register("time", { required: true })} />
          {errors.time && <span className="text-red-500">This field is required</span>}
        </div>
        <div>
          <Label htmlFor="players">Number of Players</Label>
          <Input type="number" id="players" {...register("players", { required: true, min: 1, max: 4 })} />
          {errors.players && <span className="text-red-500">Please enter a number between 1 and 4</span>}
        </div>
        <Button type="submit" className="w-full">Add Tee Time</Button>
      </form>
    </div>
  );
};

export default AddTeeTime;