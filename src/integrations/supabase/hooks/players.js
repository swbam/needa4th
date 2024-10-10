import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/*
### players

| name       | type                  | format  | required |
|------------|------------------------|---------|----------|
| id         | integer               | integer | true     |
| name       | character varying(100)| string  | true     |
| email      | character varying(100)| string  | false    |
| handicap   | numeric               | number  | false    |
| avatar_url | text                  | string  | false    |
*/

export const usePlayer = (id) => useQuery({
    queryKey: ['players', id],
    queryFn: () => fromSupabase(supabase.from('players').select('*').eq('id', id).single()),
});

export const usePlayers = () => useQuery({
    queryKey: ['players'],
    queryFn: () => fromSupabase(supabase.from('players').select('*')),
});

export const useAddPlayer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newPlayer) => fromSupabase(supabase.from('players').insert([newPlayer])),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['players'] });
        },
    });
};

export const useUpdatePlayer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('players').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['players'] });
        },
    });
};

export const useDeletePlayer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('players').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['players'] });
        },
    });
};