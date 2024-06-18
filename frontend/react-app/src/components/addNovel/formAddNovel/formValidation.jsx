import { createContext, useContext, useState } from 'react';

const FormKoleksiContext = createContext();

export const useFormKoleksi = () => useContext(FormKoleksiContext);

export const FormKoleksiProvider = ({ children }) => {
  const [judulBuku, setJudulBuku] = useState('');
  const [genreSelected, setGenreSelected] = useState('');
  const [deskripsiBuku, setDeskripsiBuku] = useState('');
  const [kontenBuku, setKontenBuku] = useState('');
  const [file, setFile] = useState(null);

  const isFormValid = judulBuku.trim() !== '' && genreSelected !== '' && deskripsiBuku.trim() !== '' && kontenBuku.trim() !== '' && file;

  return (
    <FormKoleksiContext.Provider value={{
      judulBuku, setJudulBuku,
      genreSelected, setGenreSelected,
      deskripsiBuku, setDeskripsiBuku,
      kontenBuku, setKontenBuku,
      file, setFile,
      isFormValid,
    }}>
      {children}
    </FormKoleksiContext.Provider>
  );
};
