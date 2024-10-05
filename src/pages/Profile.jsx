import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { users } from '../utils/csvData';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Simulate fetching the user profile
    const mockUser = users[0]; // Using the first user as an example
    setProfile(mockUser);
  }, []);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    // Simulate updating the profile
    toast.success("Profile updated successfully");
  };

  if (!profile) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Profile</h1>
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Avatar className="w-24 h-24">
              <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                value={profile.name} 
                onChange={(e) => setProfile({...profile, name: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={profile.email} 
                onChange={(e) => setProfile({...profile, email: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="homeCourse">Home Course</Label>
              <Input 
                id="homeCourse" 
                value={profile.homeCourse} 
                onChange={(e) => setProfile({...profile, homeCourse: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="rating">Rating</Label>
              <Input 
                id="rating" 
                type="number" 
                value={profile.rating || ''} 
                onChange={(e) => setProfile({...profile, rating: e.target.value})}
              />
            </div>
            <Button type="submit">Update Profile</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;