import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/*
### needa4th

| name       | type                     | format | required |
|------------|--------------------------|--------|----------|
| id         | int8                     | number | true     |
| created_at | timestamp with time zone | string | true     |

Note: 
- 'id' is a Primary Key.
- 'created_at' has a default value of now().

No foreign key relationships are defined for this table.
*/

export const useNeeda4th = (id) => useQuery({
    queryKey: ['needa4th', id],
    queryFn: () => fromSupabase(supabase.from('needa4th').select('*').eq('id', id).single()),
});

export const useNeeda4ths = () => useQuery({
    queryKey: ['needa4th'],
    queryFn: () => fromSupabase(supabase.from('needa4th').select('*')),
});

export const useAddNeeda4th = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newNeeda4th) => fromSupabase(supabase.from('needa4th').insert([newNeeda4th])),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['needa4th'] });
        },
    });
};

export const useUpdateNeeda4th = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('needa4th').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['needa4th'] });
        },
    });
};

export const useDeleteNeeda4th = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('needa4th').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['needa4th'] });
        },
    });
};