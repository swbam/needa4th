import React, { useState, useEffect } from 'react';
import { useSupabaseAuth } from '../integrations/supabase';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from '../integrations/supabase/supabase';
import { toast } from "sonner";

const Profile = () => {
  const { user } = useSupabaseAuth();
  const [profile, setProfile] = useState(null);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
    } else {
      setProfile(data);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('profiles')
      .upsert({ 
        id: user.id, 
        name: profile.name, 
        email: profile.email, 
        handicap: profile.handicap 
      });

    if (error) {
      toast.error("Failed to update profile");
    } else {
      toast.success("Profile updated successfully");
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(fileName, file, { upsert: true });

    if (uploadError) {
      toast.error("Error uploading avatar");
    } else {
      const { data } = supabase.storage.from('avatars').getPublicUrl(fileName);
      setAvatar(data.publicUrl);
      await supabase
        .from('profiles')
        .upsert({ id: user.id, avatar_url: data.publicUrl });
      toast.success("Avatar uploaded successfully");
    }
  };

  if (!user) {
    return <LoginForm />;
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
              <AvatarImage src={profile?.avatar_url || avatar} />
              <AvatarFallback>{profile?.name?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            <Input 
              type="file" 
              onChange={handleAvatarUpload} 
              accept="image/*"
              className="mt-2"
            />
          </div>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                value={profile?.name || ''} 
                onChange={(e) => setProfile({...profile, name: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={profile?.email || ''} 
                onChange={(e) => setProfile({...profile, email: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="handicap">Handicap</Label>
              <Input 
                id="handicap" 
                type="number" 
                value={profile?.handicap || ''} 
                onChange={(e) => setProfile({...profile, handicap: e.target.value})}
              />
            </div>
            <Button type="submit">Update Profile</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error("Failed to log in");
    } else {
      toast.success("Logged in successfully");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Login</h1>
      <Card>
        <CardHeader>
          <CardTitle>Login to access your profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit">Login</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;