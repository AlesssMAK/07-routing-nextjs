'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { fetchNotes } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import css from './page.module.css';
import Text from '@/components/Text/Text';

const NoteClient = ({ tag }: { tag?: string }) => {
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isSuccess, isLoading, isFetching } = useQuery({
    queryKey: ['notes', debouncedSearch, page, tag],
    queryFn: () => fetchNotes(debouncedSearch, page, tag),
    placeholderData: keepPreviousData,
  });

  if (!isLoading && !isFetching && data?.notes.length === 0) {
    return (
      <Text
        textAlign="center"
        marginBottom="20"
      >
        {' '}
        No notes found for your request.{' '}
      </Text>
    );
  }

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}

      <header className={css.toolbar}>
        <Toaster />
        <SearchBox
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        {isSuccess && data?.totalPages > 1 && (
          <Pagination
            totalPages={data?.totalPages ?? 0}
            page={page}
            onPageChange={(newPage) => setPage(newPage)}
          />
        )}
        <button
          className={css.button}
          onClick={openModal}
        >
          Create note +
        </button>
      </header>
      {isSuccess && data?.notes?.length > 0 && <NoteList notes={data?.notes} />}
    </div>
  );
};

export default NoteClient;
