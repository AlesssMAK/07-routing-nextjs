import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NoteClient from './Notes.client';
import { fetchNotes } from '@/lib/api';

const Notes = async () => {
  const queryClient = new QueryClient();

  const debouncedSearch = '';
  const page = 1;

  await queryClient.prefetchQuery({
    queryKey: ['notes', debouncedSearch, page],
    queryFn: () => fetchNotes(debouncedSearch, page),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteClient />
    </HydrationBoundary>
  );
};

export default Notes;
