import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookList.css';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const booksPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/books'
        );
        setBooks(response.data);
        const totalPages = Math.ceil(response.data.length / booksPerPage);
        setTotalPages(totalPages);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchData();
  }, []);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (endIndex < books.length) {
      setCurrentPage(currentPage + 1);
    }
  };
  const startIndex = (currentPage - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;

  const generadorDePrecio = () => {
    const precioRandom =
      Math.floor(Math.random() * (5000 - 1500 + 1)) + 1500;
    return precioRandom;
  };

  const handleOrdenLibros = () => {
    const librosOrdenados = [...books].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    setBooks(librosOrdenados);
  };

  const handleOrdenLibrosZA = () => {
    const librosOrdenados = [...books].sort((a, b) =>
      b.title.localeCompare(a.title)
    );
    setBooks(librosOrdenados);
  };

  const handleInput = (event) => {
    setSearchQuery(event.target.value);
  };

  const librosFiltrados = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const booksParaMostrar = librosFiltrados.slice(startIndex, endIndex);

  return (
    <>
      <div className='libros'>
        <h1> La lectura es un viaje. ¡Ven a explorarlo con nosotros! </h1>
        <h2>Lista de Libros</h2>
        <input type='text'placeholder='Buscar libros' value={searchQuery} onChange={handleInput} className='barraDeBusqueda'/>
        <div className='productos'>
          <ul>
            {booksParaMostrar.map((book) => (
              <li key={book.id}>
                <div className='imagenes-producto'>
                  <img src={book.image_url} alt={book.title} />
                </div>
                <div className='titulo'>
                  {book.title} - {book.authors}
                </div>
                <div>${generadorDePrecio()}</div>
                <div>
                  <button>Comprar</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className='paginacion'>
          <div className='botones-paginacion'>
            <button onClick={handlePreviousPage}>Página anterior</button>
            <button onClick={handleNextPage}>Página siguiente</button>
            <button onClick={handleOrdenLibros}>Ordenar A a la Z</button>
            <button onClick={handleOrdenLibrosZA}>Ordenar Z a la A</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookList
