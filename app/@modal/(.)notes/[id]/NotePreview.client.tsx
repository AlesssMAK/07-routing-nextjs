'use client';

import { useParams } from 'next/navigation';
import css from './NotePreview.module.css';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';

const NotePreviewDetails = () => {
  const router = useRouter();
  const close = () => router.back();

  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['noteHubKeyById', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (error || !note) {
    throw error;
  }

  return (
    <Modal onClose={close}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{note.createdAt}</p>
          <button
            className={css.backBtn}
            type="button"
            onClick={close}
          >
            Back
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default NotePreviewDetails;
