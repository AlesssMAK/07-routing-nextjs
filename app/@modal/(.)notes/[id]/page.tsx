import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NotePreviewDetails from './NotePreview.client';

type NotePreviewProps = {
  params: Promise<{ id: string }>;
};

const ModalPage = async ({ params }: NotePreviewProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['noteHubKeyById', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewDetails />
    </HydrationBoundary>
  );
};

export default ModalPage;
