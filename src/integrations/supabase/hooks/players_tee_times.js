import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/*
### players_tee_times

| name        | type                     | format  | required |
|-------------|--------------------------|---------|----------|
| id          | integer                  | integer | true     |
| player_id   | integer                  | integer | false    |
| tee_time_id | integer                  | integer | false    |
| team        | character varying(20)    | string  | false    |

Foreign Key Relationships:
- player_id references players.id
- tee_time_id references tee_times.id
*/

export const usePlayersTeeTime = (id) => useQuery({
    queryKey: ['players_tee_times', id],
    queryFn: () => fromSupabase(supabase.from('players_tee_times').select('*').eq('id', id).single()),
});

export const usePlayersTeeTimesByPlayer = (playerId) => useQuery({
    queryKey: ['players_tee_times', 'player', playerId],
    queryFn: () => fromSupabase(supabase.from('players_tee_times').select('*').eq('player_id', playerId)),
});

export const usePlayersTeeTimesByTeeTime = (teeTimeId) => useQuery({
    queryKey: ['players_tee_times', 'tee_time', teeTimeId],
    queryFn: () => fromSupabase(supabase.from('players_tee_times').select('*').eq('tee_time_id', teeTimeId)),
});

export const useAddPlayerTeeTime = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newPlayerTeeTime) => fromSupabase(supabase.from('players_tee_times').insert([newPlayerTeeTime])),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['players_tee_times'] });
        },
    });
};

export const useUpdatePlayerTeeTime = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('players_tee_times').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['players_tee_times'] });
        },
    });
};

export const useDeletePlayerTeeTime = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('players_tee_times').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['players_tee_times'] });
        },
    });
};