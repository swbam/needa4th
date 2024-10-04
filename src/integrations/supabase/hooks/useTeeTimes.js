import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';
import { toast } from "sonner";

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) {
        console.error('Supabase error:', error);
        throw new Error(error.message);
    }
    return data;
};

export const useTeeTimes = () => useQuery({
    queryKey: ['tee_times'],
    queryFn: async () => {
        try {
            console.log('Fetching last 5 tee times...');
            const teeTimes = await fromSupabase(
                supabase
                    .from('tee_times')
                    .select('*')
                    .order('tee_date', { ascending: false })
                    .order('tee_time', { ascending: false })
                    .limit(5)
            );
            
            console.log('Raw tee times data:', teeTimes);

            if (!teeTimes || teeTimes.length === 0) {
                console.log('No tee times found in the database.');
                return [];
            }

            // Fetch all courses
            const { data: courses } = await supabase
                .from('courses')
                .select('id, name');

            const coursesMap = Object.fromEntries(courses.map(course => [course.id, course]));

            // Combine tee times with course information
            const teeTimesWithCourses = teeTimes.map(teeTime => ({
                ...teeTime,
                course: coursesMap[teeTime.course_id] || { name: 'Unknown Course' }
            }));

            console.log('Fetched tee times with courses:', teeTimesWithCourses);
            return teeTimesWithCourses;
        } catch (error) {
            console.error('Error fetching tee times:', error);
            toast.error("Failed to fetch tee times. Please check the console for more details.");
            throw error;
        }
    },
    retry: 3,
    retryDelay: 1000,
});

export const useAddTeeTime = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newTeeTime) => fromSupabase(supabase.from('tee_times').insert([newTeeTime])),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tee_times'] });
            toast.success("Tee time added successfully!");
        },
        onError: (error) => {
            toast.error(`Failed to add tee time: ${error.message}`);
        },
    });
};

export const useUpdateTeeTime = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('tee_times').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tee_times'] });
            toast.success("Tee time updated successfully!");
        },
        onError: (error) => {
            toast.error(`Failed to update tee time: ${error.message}`);
        },
    });
};

export const useDeleteTeeTime = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('tee_times').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tee_times'] });
            toast.success("Tee time deleted successfully!");
        },
        onError: (error) => {
            toast.error(`Failed to delete tee time: ${error.message}`);
        },
    });
};

