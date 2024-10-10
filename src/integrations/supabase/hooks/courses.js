import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/*
### courses

| name  | type                  | format  | required |
|-------|------------------------|---------|----------|
| id    | integer               | integer | true     |
| name  | character varying(100)| string  | true     |
| city  | character varying(50) | string  | false    |
| state | character varying(2)  | string  | false    |
*/

export const useCourse = (id) => useQuery({
    queryKey: ['courses', id],
    queryFn: () => fromSupabase(supabase.from('courses').select('*').eq('id', id).single()),
});

export const useCourses = () => useQuery({
    queryKey: ['courses'],
    queryFn: () => fromSupabase(supabase.from('courses').select('*')),
});

export const useAddCourse = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newCourse) => fromSupabase(supabase.from('courses').insert([newCourse])),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['courses'] });
        },
    });
};

export const useUpdateCourse = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('courses').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['courses'] });
        },
    });
};

export const useDeleteCourse = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('courses').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['courses'] });
        },
    });
};