import { fetchNotes } from '@/lib/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NoteClient from './Notes.client';

interface FiltersPageProps {
  params: Promise<{ slug: string[] }>;
}

const FiltersPage = async ({ params }: FiltersPageProps) => {
  const queryClient = new QueryClient();

  const debouncedSearch = '';
  const page = 1;

  const { slug } = await params;
  const tag = slug[0] == 'All' ? undefined : slug[0];

  await queryClient.prefetchQuery({
    queryKey: ['notes', debouncedSearch, page, tag],
    queryFn: () => fetchNotes(debouncedSearch, page, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteClient tag={tag} />
    </HydrationBoundary>
  );
};

export default FiltersPage;
