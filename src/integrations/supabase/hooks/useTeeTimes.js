import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/*
### tee_times

| name       | type                     | format                | required |
|------------|--------------------------|------------------------|----------|
| id         | int8                     | number                | true     |
| created_at | timestamp with time zone | string                | true     |
| tee_date   | date                     | string                | false    |
| tee_time   | time without time zone   | string                | false    |
| location   | text                     | string                | false    |
| players    | text[]                   | array of strings      | false    |
| walk_ride  | text                     | string                | false    |
| organizer  | text                     | string                | false    |
| attendees  | text[]                   | array of strings      | false    |

No foreign key relationships identified.
*/

export const useTeeTime = (id) => useQuery({
    queryKey: ['tee_times', id],
    queryFn: () => fromSupabase(supabase.from('tee_times').select('*').eq('id', id).single()),
});

export const useTeeTimes = () => useQuery({
    queryKey: ['tee_times'],
    queryFn: () => fromSupabase(supabase.from('tee_times').select('*')),
});

export const useAddTeeTime = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newTeeTime) => fromSupabase(supabase.from('tee_times').insert([newTeeTime])),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tee_times'] });
        },
    });
};

export const useUpdateTeeTime = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('tee_times').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tee_times'] });
        },
    });
};

export const useDeleteTeeTime = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('tee_times').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tee_times'] });
        },
    });
};